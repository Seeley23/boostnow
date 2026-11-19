<?php
/**
 * Public form endpoint for the static site on Smarthost.
 * Accepts JSON from the contact form ("contact") and the AIO lead form ("aio")
 * and e-mails it to kontakt@boostnow.pl with PHP mail().
 */

declare(strict_types=1);

date_default_timezone_set('Europe/Warsaw');

const RECIPIENT = 'kontakt@boostnow.pl';
const SENDER = 'kontakt@boostnow.pl';        // domain covered by SPF (a mx)
const RATE_LIMIT = 5;                         // submissions per IP...
const RATE_WINDOW = 600;                      // ...per 10 minutes

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

$form = ($p['form'] ?? 'contact') === 'aio' ? 'aio' : 'contact';
$name = line($p, 'name', 120);
$email = line($p, 'email', 254);

$errors = [];
if ($name === '' || mb_strlen($name) > 120) $errors[] = 'imię';
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 254) $errors[] = 'e-mail';

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
} else {
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
    respond(500, ['success' => false, 'message' => 'Nie udało się wysłać wiadomości.']);
}

$hits[] = $now;
@file_put_contents($rlFile, implode(',', $hits), LOCK_EX);

respond(200, ['success' => true]);
