<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Methode non autorisee.']);
    exit;
}

$recipient = 'contact@nomad-votre-permis.fr';
$siteName = 'NOMAD - Votre permis en province';

function clean_text($value) {
    $value = is_string($value) ? $value : '';
    $value = str_replace(["\r", "\n"], ' ', $value);
    return trim(strip_tags($value));
}

function clean_message($value) {
    $value = is_string($value) ? $value : '';
    return trim(strip_tags($value));
}

$type = clean_text($_POST['type'] ?? '');
$name = clean_text($_POST['name'] ?? '');
$phone = clean_text($_POST['phone'] ?? '');
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$city = clean_text($_POST['city'] ?? '');
$message = clean_message($_POST['message'] ?? '');
$plan = clean_text($_POST['plan'] ?? '');
$price = clean_text($_POST['price'] ?? '');

if (!$name || !$phone || !$email) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Nom, telephone et email sont obligatoires.']);
    exit;
}

$isFormula = $type === 'formula';
$subject = $isFormula ? 'Nouvelle demande de formule NOMAD' : 'Nouveau message contact NOMAD';

$lines = [
    $subject,
    '',
    'Nom complet : ' . $name,
    'Telephone : ' . $phone,
    'Email : ' . $email,
    'Ville : ' . ($city ?: 'Non precisee'),
];

if ($isFormula) {
    $lines[] = 'Formule choisie : ' . ($plan ?: 'Non precisee');
    $lines[] = 'Prix : ' . ($price ?: 'Non precise');
}

$lines[] = '';
$lines[] = 'Message :';
$lines[] = $message ?: '-';
$lines[] = '';
$lines[] = 'Envoye depuis le site ' . $siteName . '.';

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: NOMAD <no-reply@nomad-votre-permis.fr>',
    'Reply-To: ' . $name . ' <' . $email . '>',
];

$sent = mail($recipient, '=?UTF-8?B?' . base64_encode($subject) . '?=', implode("\n", $lines), implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => "Le mail n'a pas pu etre envoye par le serveur."]);
    exit;
}

echo json_encode(['ok' => true, 'message' => 'Mail envoye.']);
