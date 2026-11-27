<?php
/**
 * Public form endpoint for the static site on Smarthost.
 * Accepts JSON from the contact form ("contact"), the AIO lead form ("aio") and
 * the store audit landing page ("audit", /audyt-ai-dla-sklepu) and e-mails it
 * to kontakt@boostnow.pl with PHP mail(). Audit requests are also appended to
 * a JSON Lines file (one lead per line) outside the web root when possible,
 * otherwise in _leads/, which .htaccess blocks from the web.
 */

declare(strict_types=1);

date_default_timezone_set('Europe/Warsaw');

const RECIPIENT = 'kontakt@boostnow.pl';
const SENDER = 'kontakt@boostnow.pl';        // domain covered by SPF (a mx)
const RATE_LIMIT = 5;                         // submissions per IP...
const RATE_WINDOW = 600;                      // ...per 10 minutes
const AUDIT_PLATFORMS = ['Shopify', 'WooCommerce', 'PrestaShop', 'Shoper', 'IdoSell', 'Inna', 'Nie wiem'];

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

/** Single-line text: strip control characters (incl. CR/LF), trim, cap length. */
function line(array $p, string $key, int $max): string
{
    $v = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', (string)($p[$key] ?? '')) ?? '';
    return mb_substr(trim($v), 0, $max + 1);
}

/**
 * Store URL as typed ("sklep.pl", "https://www.sklep.pl/x/"). Returns
 * "https://host/path" (same rules as client/src/components/audit/auditForm.ts)
 * or null.
 */
function normalize_store_url(string $raw): ?string
{
    $raw = trim($raw);
    if ($raw === '' || strlen($raw) > 2048 || preg_match('/\s/', $raw)) return null;
    if (!preg_match('#^[a-z][a-z0-9+.-]*://#i', $raw)) $raw = 'https://' . $raw;
    $u = parse_url($raw);
    if (!is_array($u) || empty($u['host'])) return null;
    $scheme = strtolower($u['scheme'] ?? '');
    if ($scheme !== 'http' && $scheme !== 'https') return null;
    if (isset($u['user']) || isset($u['pass']) || isset($u['port'])) return null;
    $host = strtolower($u['host']);
    if (strlen($host) < 4 || strlen($host) > 253) return null;
    if (!preg_match('/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/', $host)) return null;
    $path = rtrim($u['path'] ?? '', '/');
    return $scheme . '://' . $host . $path;
}

/** Directory for the audit lead log; null if nothing is writable. */
function leads_dir(): ?string
{
    $candidates = [dirname(__DIR__) . '/boostnow-leads', __DIR__ . '/_leads'];
    foreach ($candidates as $dir) {
        if (!is_dir($dir)) @mkdir($dir, 0750, true);
        if (is_dir($dir) && is_writable($dir)) {
            if (strpos($dir, __DIR__) === 0 && !is_file($dir . '/.htaccess')) {
                @file_put_contents($dir . '/.htaccess', "Require all denied\nDeny from all\n");
            }
            return $dir;
        }
    }
    return null;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['success' => false, 'message' => 'Metoda niedozwolona.']);
}

// Only accept submissions sent from our own pages (same host as this script).
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$originPort = parse_url($origin, PHP_URL_PORT);
$originHost = (string)parse_url($origin, PHP_URL_HOST) . ($originPort ? ':' . $originPort : '');
$allowedHosts = ['boostnow.pl', 'www.boostnow.pl', (string)($_SERVER['HTTP_HOST'] ?? '')];
if ($origin !== '' && !in_array($originHost, $allowedHosts, true)) {
    respond(403, ['success' => false, 'message' => 'Niedozwolone źródło.']);
}

$raw = file_get_contents('php://input', false, null, 0, 20000);
$p = json_decode($raw ?: '', true);
if (!is_array($p)) {
    respond(400, ['success' => false, 'message' => 'Nieprawidłowe dane formularza.']);
}

// Honeypot: real visitors never see this field. Pretend success to bots.
if (trim((string)($p['website'] ?? '')) !== '') {
    respond(200, ['success' => true]);
}

// Simple per-IP rate limit, stored in the system temp directory.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rlFile = sys_get_temp_dir() . '/boostnow-form-' . hash('sha256', $ip);
$now = time();
$hits = [];
if (is_readable($rlFile)) {
    $hits = array_filter(
        array_map('intval', explode(',', (string)file_get_contents($rlFile))),
        fn ($t) => $t > $now - RATE_WINDOW
    );
}
if (count($hits) >= RATE_LIMIT) {
    respond(429, ['success' => false, 'message' => 'Za dużo zgłoszeń. Spróbuj za kilka minut.']);
}

$form = in_array($p['form'] ?? '', ['aio', 'audit', 'geo'], true) ? $p['form'] : 'contact';
$email = line($p, 'email', 254);
$errors = [];
$lead = null;

if ($form === 'audit') {
    $email = mb_strtolower($email);
    $firstName = line($p, 'firstName', 80);
    $storeUrl = normalize_store_url((string)($p['storeUrl'] ?? ''));
    $platform = line($p, 'platform', 40);
    $marketing = ($p['marketingConsent'] ?? false) === true;
    $variant = in_array($p['landingVariant'] ?? '', ['A', 'B'], true) ? $p['landingVariant'] : '';
    if ($storeUrl === null) $errors[] = 'adres sklepu';
    if ($firstName === '' || mb_strlen($firstName) > 80) $errors[] = 'imię';
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 254) $errors[] = 'e-mail';
    if ($platform !== '' && !in_array($platform, AUDIT_PLATFORMS, true)) $errors[] = 'platforma';
    if (($p['operationalConsent'] ?? false) !== true) $errors[] = 'zgoda na przesłanie audytu';
    if ($errors) {
        respond(422, ['success' => false, 'message' => 'Sprawdź pola: ' . implode(', ', $errors) . '.']);
    }

    $nowUtc = gmdate('Y-m-d\TH:i:s\Z');
    $lead = [
        'id' => bin2hex(random_bytes(8)),
        'storeUrl' => $storeUrl,
        'email' => $email,
        'firstName' => $firstName,
        'platform' => $platform,
        'operationalConsentAt' => $nowUtc,
        'marketingConsent' => $marketing,
        'marketingConsentAt' => $marketing ? $nowUtc : null,
        'landingVariant' => $variant,
        'utmSource' => line($p, 'utmSource', 200),
        'utmMedium' => line($p, 'utmMedium', 200),
        'utmCampaign' => line($p, 'utmCampaign', 200),
        'utmContent' => line($p, 'utmContent', 200),
        'referrer' => line($p, 'referrer', 500),
        'status' => 'new',
        'createdAt' => $nowUtc,
        'updatedAt' => $nowUtc,
    ];

    // Deduplicate on store host (without www.) + e-mail: a repeat request gets the same
    // success answer but no second e-mail or log entry.
    $dedupHost = preg_replace('/^www\./', '', (string)parse_url($storeUrl, PHP_URL_HOST));
    $dedupKey = hash('sha256', $dedupHost . '|' . $email);
    $lead['dedupKey'] = $dedupKey;
    $dir = leads_dir();
    $logFile = $dir ? $dir . '/audit-leads.jsonl' : null;
    if ($logFile && is_readable($logFile)) {
        $fh = fopen($logFile, 'r');
        while ($fh && ($row = fgets($fh)) !== false) {
            if (strpos($row, '"dedupKey":"' . $dedupKey . '"') !== false) {
                fclose($fh);
                respond(200, ['success' => true, 'duplicate' => true]);
            }
        }
        if ($fh) fclose($fh);
    }

    $subject = 'Nowe zgłoszenie: audyt AI sklepu (' . parse_url($storeUrl, PHP_URL_HOST) . ')';
    $body = "Formularz: audyt AI dla sklepu (boostnow.pl/audyt-ai-dla-sklepu)\n\n"
        . "Sklep: {$storeUrl}\n"
        . "Imię: {$firstName}\n"
        . "E-mail: {$email}\n"
        . 'Platforma: ' . ($platform !== '' ? $platform : 'nie podano') . "\n\n"
        . "Zgoda na przesłanie audytu: tak ({$nowUtc} UTC)\n"
        . 'Zgoda marketingowa: ' . ($marketing ? "TAK ({$nowUtc} UTC)" : 'NIE (nie wysyłać materiałów marketingowych)') . "\n\n"
        . 'Wariant strony: ' . ($variant !== '' ? $variant : 'brak') . "\n"
        . 'UTM: source=' . $lead['utmSource'] . ' medium=' . $lead['utmMedium']
        . ' campaign=' . $lead['utmCampaign'] . ' content=' . $lead['utmContent'] . "\n"
        . 'Referrer: ' . ($lead['referrer'] !== '' ? $lead['referrer'] : 'brak') . "\n"
        . "Status: new\nID: {$lead['id']}\n"
        . ($logFile ? '' : "\nUWAGA: brak zapisu do pliku leadów (katalog niezapisywalny).\n");
} else {
    $name = line($p, 'name', 120);
    if ($name === '' || mb_strlen($name) > 120) $errors[] = 'imię';
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 254) $errors[] = 'e-mail';
}

if ($form === 'contact') {
    $company = line($p, 'company', 160);
    $message = trim(str_replace("\r\n", "\n", (string)($p['message'] ?? '')));
    $message = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]+/u', '', $message) ?? '';
    if (mb_strlen($company) > 160) $errors[] = 'firma';
    if (mb_strlen($message) < 10 || mb_strlen($message) > 5000) $errors[] = 'wiadomość';
    $subject = 'Nowe zapytanie ze strony BoostNow';
    $body = "Formularz: kontakt (boostnow.pl)\n\n"
        . "Imię i nazwisko: {$name}\n"
        . "E-mail: {$email}\n"
        . 'Firma: ' . ($company !== '' ? $company : 'nie podano') . "\n\n"
        . "Wiadomość:\n{$message}\n";
} elseif ($form === 'geo') {
    $siteUrl = line($p, 'siteUrl', 2048);
    $message = trim(str_replace("\r\n", "\n", (string)($p['message'] ?? '')));
    $message = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]+/u', '', $message) ?? '';
    if ($siteUrl === '' || !preg_match('/\.[a-z]{2,}/i', $siteUrl)) $errors[] = 'adres strony';
    if (mb_strlen($message) > 2000) $errors[] = 'wiadomość';
    if (($p['consent'] ?? false) !== true) $errors[] = 'zgoda na kontakt';
    $subject = 'Nowe zgłoszenie: pozycjonowanie GEO (' . $siteUrl . ')';
    $body = "Formularz: pozycjonowanie GEO (boostnow.pl/pozycjonowanie-geo)\n\n"
        . "Imię: {$name}\n"
        . "E-mail: {$email}\n"
        . "Strona: {$siteUrl}\n"
        . 'Cel: ' . ($message !== '' ? $message : 'nie podano') . "\n"
        . 'Zgoda na kontakt: tak (' . gmdate('Y-m-d H:i:s') . " UTC)\n";
} elseif ($form === 'aio') {
    $domain = line($p, 'domain', 253);
    $industry = line($p, 'industry', 120);
    if ($domain === '' || mb_strlen($domain) > 253) $errors[] = 'domena';
    if (mb_strlen($industry) > 120) $errors[] = 'branża';
    $subject = 'Nowe zgłoszenie AIO ze strony BoostNow';
    $body = "Formularz: AIO dla e-commerce (boostnow.pl/aio)\n\n"
        . "Imię: {$name}\n"
        . "E-mail: {$email}\n"
        . "Domena sklepu: {$domain}\n"
        . 'Branża: ' . ($industry !== '' ? $industry : 'nie podano') . "\n";
}

if ($errors) {
    respond(422, ['success' => false, 'message' => 'Sprawdź pola: ' . implode(', ', $errors) . '.']);
}

$body .= "\n--\nWysłano: " . date('Y-m-d H:i:s') . "\nIP: {$ip}\n";

$headers = implode("\r\n", [
    'From: =?UTF-8?B?' . base64_encode('Formularz BoostNow') . '?= <' . SENDER . '>',
    'Reply-To: ' . $email,                    // validated above, cannot contain CR/LF
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$sent = mail(RECIPIENT, $encodedSubject, $body, $headers, '-f' . SENDER);
if (!$sent) {
    error_log('[contact.php] mail() failed for form ' . $form);
    // The audit request is still worth keeping: log it and report success
    // only if the log write works, so the lead is not lost silently.
    if (!($lead && $logFile && @file_put_contents($logFile, json_encode($lead, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n", FILE_APPEND | LOCK_EX))) {
        respond(500, ['success' => false, 'message' => 'Nie udało się wysłać wiadomości.']);
    }
    $lead = null; // already logged
}

if ($lead && $logFile) {
    @file_put_contents($logFile, json_encode($lead, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n", FILE_APPEND | LOCK_EX);
}

$hits[] = $now;
@file_put_contents($rlFile, implode(',', $hits), LOCK_EX);

respond(200, ['success' => true]);
