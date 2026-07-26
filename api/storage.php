<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

require __DIR__ . '/db.php';

function respond(array $payload, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    $pdo = nomad_db();
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    $action = $_GET['action'] ?? '';

    if ($method === 'GET' && $action === 'load') {
        $rows = $pdo->query('SELECT storage_key, storage_value FROM app_storage')->fetchAll();
        $data = [];
        foreach ($rows as $row) {
            $data[$row['storage_key']] = json_decode($row['storage_value'], true);
        }
        respond(['ok' => true, 'data' => $data]);
    }

    if ($method === 'POST' && $action === 'save') {
        $raw = file_get_contents('php://input');
        $payload = json_decode($raw ?: '', true);
        if (!is_array($payload) || empty($payload['key'])) {
            respond(['ok' => false, 'message' => 'Payload invalide.'], 422);
        }

        $key = preg_replace('/[^a-zA-Z0-9_\-]/', '', (string) $payload['key']);
        $value = json_encode($payload['value'] ?? null, JSON_UNESCAPED_UNICODE);

        $stmt = $pdo->prepare(
            'INSERT INTO app_storage (storage_key, storage_value, updated_at)
             VALUES (:storage_key, :storage_value, NOW())
             ON DUPLICATE KEY UPDATE storage_value = VALUES(storage_value), updated_at = NOW()'
        );
        $stmt->execute([
            ':storage_key' => $key,
            ':storage_value' => $value,
        ]);

        respond(['ok' => true]);
    }

    respond(['ok' => false, 'message' => 'Action non autorisee.'], 405);
} catch (Throwable $exception) {
    respond([
        'ok' => false,
        'message' => 'Erreur base de donnees.',
        'detail' => $exception->getMessage(),
    ], 500);
}

