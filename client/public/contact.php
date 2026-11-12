<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Metoda niedozwolona.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody ?: '', true);

$name = trim((string)($payload['name'] ?? ''));
$email = trim((string)($payload['email'] ?? ''));
$company = trim((string)($payload['company'] ?? ''));
$message = trim((string)($payload['message'] ?? ''));

if ($name === '' || mb_strlen($name) > 120 || !filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 254 || mb_strlen($message) < 10 || mb_strlen($message) > 5000 || mb_strlen($company) > 160) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Sprawdź poprawność formularza.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$subject = 'Nowe zapytanie ze strony BoostNow';
$body = "Imię i nazwisko: {$name}\n"
    . "E-mail: {$email}\n"
    . "Firma: " . ($company !== '' ? $company : 'Nie podano') . "\n\n"
    . "Wiadomość:\n{$message}\n";

$headers = [
    'From: formularz@boostnow.pl',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = mail('kontakt@boostnow.pl', $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Nie udało się wysłać wiadomości.'], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
