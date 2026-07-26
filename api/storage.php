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

function dt(?string $value): string
{
    if (!$value) return date('Y-m-d H:i:s');
    $time = strtotime($value);
    return $time ? date('Y-m-d H:i:s', $time) : date('Y-m-d H:i:s');
}

function money($value): float
{
    return (float) preg_replace('/[^0-9.]/', '', (string) $value);
}

function save_json_backup(PDO $pdo, string $key, $value): void
{
    $stmt = $pdo->prepare(
        'INSERT INTO app_storage (storage_key, storage_value, updated_at)
         VALUES (:storage_key, :storage_value, NOW())
         ON DUPLICATE KEY UPDATE storage_value = VALUES(storage_value), updated_at = NOW()'
    );
    $stmt->execute([
        ':storage_key' => $key,
        ':storage_value' => json_encode($value, JSON_UNESCAPED_UNICODE),
    ]);
}

function save_leads(PDO $pdo, array $leads): void
{
    $pdo->exec('DELETE FROM leads');
    $stmt = $pdo->prepare(
        'INSERT INTO leads
        (lead_id, created_at, status, plan_title, price, full_name, phone, email, city, message, raw_payload)
        VALUES
        (:id, :created_at, :status, :plan, :price, :name, :phone, :email, :city, :message, :raw)'
    );
    foreach ($leads as $lead) {
        if (!is_array($lead)) continue;
        $stmt->execute([
            ':id' => (string) ($lead['id'] ?? 'NOMAD-' . uniqid()),
            ':created_at' => dt($lead['createdAt'] ?? null),
            ':status' => (string) ($lead['status'] ?? 'Nouveau'),
            ':plan' => (string) ($lead['plan'] ?? ''),
            ':price' => money($lead['price'] ?? 0),
            ':name' => (string) ($lead['name'] ?? ''),
            ':phone' => (string) ($lead['phone'] ?? ''),
            ':email' => (string) ($lead['email'] ?? ''),
            ':city' => (string) ($lead['city'] ?? ''),
            ':message' => (string) ($lead['message'] ?? ''),
            ':raw' => json_encode($lead, JSON_UNESCAPED_UNICODE),
        ]);
    }
}

function save_contacts(PDO $pdo, array $contacts): void
{
    $pdo->exec('DELETE FROM contacts');
    $stmt = $pdo->prepare(
        'INSERT INTO contacts
        (contact_id, created_at, status, full_name, phone, email, city, message, source, raw_payload)
        VALUES
        (:id, :created_at, :status, :name, :phone, :email, :city, :message, :source, :raw)'
    );
    foreach ($contacts as $contact) {
        if (!is_array($contact)) continue;
        $stmt->execute([
            ':id' => (string) ($contact['id'] ?? 'CONTACT-' . uniqid()),
            ':created_at' => dt($contact['createdAt'] ?? null),
            ':status' => (string) ($contact['status'] ?? 'Nouveau'),
            ':name' => (string) ($contact['name'] ?? ''),
            ':phone' => (string) ($contact['phone'] ?? ''),
            ':email' => (string) ($contact['email'] ?? ''),
            ':city' => (string) ($contact['city'] ?? ''),
            ':message' => (string) ($contact['message'] ?? ''),
            ':source' => (string) ($contact['source'] ?? ''),
            ':raw' => json_encode($contact, JSON_UNESCAPED_UNICODE),
        ]);
    }
}

function save_formulas(PDO $pdo, array $formulas): void
{
    $pdo->exec('DELETE FROM formula_features');
    $pdo->exec('DELETE FROM formulas');
    $formulaStmt = $pdo->prepare(
        'INSERT INTO formulas
        (formula_key, title, description, price, badge, note, cta_label, is_recommended, is_active, sort_order)
        VALUES
        (:formula_key, :title, :description, :price, :badge, :note, :cta_label, :recommended, :active, :sort_order)'
    );
    $featureStmt = $pdo->prepare(
        'INSERT INTO formula_features (formula_key, feature_text, sort_order)
         VALUES (:formula_key, :feature_text, :sort_order)'
    );
    foreach (array_values($formulas) as $index => $formula) {
        if (!is_array($formula)) continue;
        $key = (string) ($formula['key'] ?? 'formule-' . $index);
        $formulaStmt->execute([
            ':formula_key' => $key,
            ':title' => (string) ($formula['title'] ?? ''),
            ':description' => (string) ($formula['description'] ?? ''),
            ':price' => money($formula['price'] ?? 0),
            ':badge' => (string) ($formula['badge'] ?? ''),
            ':note' => (string) ($formula['note'] ?? ''),
            ':cta_label' => (string) ($formula['ctaLabel'] ?? ''),
            ':recommended' => !empty($formula['recommended']) ? 1 : 0,
            ':active' => ($formula['active'] ?? true) ? 1 : 0,
            ':sort_order' => $index,
        ]);
        foreach (array_values($formula['features'] ?? []) as $featureIndex => $feature) {
            $featureStmt->execute([
                ':formula_key' => $key,
                ':feature_text' => (string) $feature,
                ':sort_order' => $featureIndex,
            ]);
        }
    }
}

function save_videos(PDO $pdo, array $videos): void
{
    $pdo->exec('DELETE FROM videos');
    $stmt = $pdo->prepare(
        'INSERT INTO videos
        (video_id, first_name, title, parcours, duration, preview_url, video_url, subtitle, file_name, mime_type, file_size, is_published, created_at)
        VALUES
        (:id, :first_name, :title, :parcours, :duration, :preview_url, :video_url, :subtitle, :file_name, :mime_type, :file_size, :published, :created_at)'
    );
    foreach ($videos as $video) {
        if (!is_array($video)) continue;
        $stmt->execute([
            ':id' => (string) ($video['id'] ?? 'VIDEO-' . uniqid()),
            ':first_name' => (string) ($video['firstName'] ?? $video['name'] ?? ''),
            ':title' => (string) ($video['title'] ?? ''),
            ':parcours' => (string) ($video['parcours'] ?? ''),
            ':duration' => (string) ($video['duration'] ?? ''),
            ':preview_url' => (string) ($video['preview'] ?? $video['previewUrl'] ?? ''),
            ':video_url' => (string) ($video['url'] ?? $video['videoUrl'] ?? ''),
            ':subtitle' => (string) ($video['subtitle'] ?? ''),
            ':file_name' => (string) ($video['fileName'] ?? ''),
            ':mime_type' => (string) ($video['mimeType'] ?? ''),
            ':file_size' => (int) ($video['fileSize'] ?? 0),
            ':published' => !empty($video['published']) ? 1 : 0,
            ':created_at' => dt($video['createdAt'] ?? null),
        ]);
    }
}

function save_faqs(PDO $pdo, array $faqs): void
{
    $pdo->exec('DELETE FROM faqs');
    $stmt = $pdo->prepare(
        'INSERT INTO faqs (faq_id, question, answer, is_active, sort_order, created_at)
         VALUES (:id, :question, :answer, :active, :sort_order, :created_at)'
    );
    foreach (array_values($faqs) as $index => $faq) {
        if (!is_array($faq)) continue;
        $stmt->execute([
            ':id' => (string) ($faq['id'] ?? 'FAQ-' . uniqid()),
            ':question' => (string) ($faq['question'] ?? ''),
            ':answer' => (string) ($faq['answer'] ?? ''),
            ':active' => ($faq['active'] ?? true) ? 1 : 0,
            ':sort_order' => $index,
            ':created_at' => dt($faq['createdAt'] ?? null),
        ]);
    }
}

function save_roles(PDO $pdo, array $roles): void
{
    $pdo->exec('UPDATE users SET role_id = NULL');
    $pdo->exec('DELETE FROM role_permissions');
    $pdo->exec('DELETE FROM roles');
    $roleStmt = $pdo->prepare(
        'INSERT INTO roles (role_id, role_name, is_system, created_at)
         VALUES (:id, :name, :system, :created_at)'
    );
    $permStmt = $pdo->prepare(
        'INSERT INTO role_permissions (role_id, permission_key)
         VALUES (:role_id, :permission_key)'
    );
    foreach ($roles as $role) {
        if (!is_array($role)) continue;
        $id = (string) ($role['id'] ?? 'ROLE-' . uniqid());
        $roleStmt->execute([
            ':id' => $id,
            ':name' => (string) ($role['name'] ?? ''),
            ':system' => !empty($role['protected']) ? 1 : 0,
            ':created_at' => dt($role['createdAt'] ?? null),
        ]);
        foreach (($role['permissions'] ?? []) as $permission) {
            $permStmt->execute([
                ':role_id' => $id,
                ':permission_key' => (string) $permission,
            ]);
        }
    }
}

function save_users(PDO $pdo, array $users): void
{
    $pdo->exec('DELETE FROM users');
    $stmt = $pdo->prepare(
        'INSERT INTO users
        (user_id, full_name, username, password_hash, role_id, role_name, is_active, created_at)
        VALUES
        (:id, :name, :username, :password, :role_id, :role_name, :active, :created_at)'
    );
    $roleLookup = [];
    foreach ($pdo->query('SELECT role_id, role_name FROM roles')->fetchAll() as $role) {
        $roleLookup[$role['role_name']] = $role['role_id'];
    }
    foreach ($users as $user) {
        if (!is_array($user)) continue;
        $roleName = (string) ($user['role'] ?? '');
        $stmt->execute([
            ':id' => (string) ($user['id'] ?? 'USER-' . uniqid()),
            ':name' => (string) ($user['name'] ?? ''),
            ':username' => (string) ($user['username'] ?? ''),
            ':password' => password_hash((string) ($user['password'] ?? ''), PASSWORD_DEFAULT),
            ':role_id' => $roleLookup[$roleName] ?? null,
            ':role_name' => $roleName,
            ':active' => ($user['active'] ?? true) ? 1 : 0,
            ':created_at' => dt($user['createdAt'] ?? null),
        ]);
    }
}

function save_activity(PDO $pdo, array $entries): void
{
    $pdo->exec('DELETE FROM activity_logs');
    $stmt = $pdo->prepare(
        'INSERT INTO activity_logs (created_at, user_name, action, details, raw_payload)
         VALUES (:created_at, :user_name, :action, :details, :raw)'
    );
    foreach ($entries as $entry) {
        if (!is_array($entry)) continue;
        $stmt->execute([
            ':created_at' => dt($entry['createdAt'] ?? null),
            ':user_name' => (string) ($entry['user'] ?? ''),
            ':action' => (string) ($entry['action'] ?? ''),
            ':details' => (string) ($entry['details'] ?? ''),
            ':raw' => json_encode($entry, JSON_UNESCAPED_UNICODE),
        ]);
    }
}

function save_settings(PDO $pdo, array $settings): void
{
    $stmt = $pdo->prepare(
        'INSERT INTO site_settings
        (id, address, phone, email, contact_intro, contact_message_placeholder, google_api_key, google_place_id, google_profile_query)
        VALUES
        (1, :address, :phone, :email, :contact_intro, :placeholder, :api_key, :place_id, :query)
        ON DUPLICATE KEY UPDATE
          address = VALUES(address),
          phone = VALUES(phone),
          email = VALUES(email),
          contact_intro = VALUES(contact_intro),
          contact_message_placeholder = VALUES(contact_message_placeholder),
          google_api_key = VALUES(google_api_key),
          google_place_id = VALUES(google_place_id),
          google_profile_query = VALUES(google_profile_query)'
    );
    $stmt->execute([
        ':address' => (string) ($settings['address'] ?? ''),
        ':phone' => (string) ($settings['phone'] ?? ''),
        ':email' => (string) ($settings['email'] ?? ''),
        ':contact_intro' => (string) ($settings['contactIntro'] ?? ''),
        ':placeholder' => (string) ($settings['contactMessagePlaceholder'] ?? ''),
        ':api_key' => (string) ($settings['googleApiKey'] ?? ''),
        ':place_id' => (string) ($settings['googlePlaceId'] ?? ''),
        ':query' => (string) ($settings['googleProfileQuery'] ?? ''),
    ]);
}

function load_all(PDO $pdo): array
{
    $data = [];
    foreach ($pdo->query('SELECT storage_key, storage_value FROM app_storage')->fetchAll() as $row) {
        $data[$row['storage_key']] = json_decode($row['storage_value'], true);
    }
    return $data;
}

try {
    $pdo = nomad_db();
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    $action = $_GET['action'] ?? '';

    if ($method === 'GET' && $action === 'load') {
        respond(['ok' => true, 'data' => load_all($pdo)]);
    }

    if ($method === 'POST' && $action === 'save') {
        $payload = json_decode(file_get_contents('php://input') ?: '', true);
        if (!is_array($payload) || empty($payload['key'])) {
            respond(['ok' => false, 'message' => 'Payload invalide.'], 422);
        }

        $key = preg_replace('/[^a-zA-Z0-9_\-]/', '', (string) $payload['key']);
        $value = $payload['value'] ?? null;

        $pdo->beginTransaction();
        save_json_backup($pdo, $key, $value);
        if ($key === 'nomad_leads' && is_array($value)) save_leads($pdo, $value);
        if ($key === 'nomad_contacts' && is_array($value)) save_contacts($pdo, $value);
        if ($key === 'nomad_formulas' && is_array($value)) save_formulas($pdo, $value);
        if ($key === 'nomad_videos' && is_array($value)) save_videos($pdo, $value);
        if ($key === 'nomad_faqs' && is_array($value)) save_faqs($pdo, $value);
        if ($key === 'nomad_roles' && is_array($value)) save_roles($pdo, $value);
        if ($key === 'nomad_users' && is_array($value)) save_users($pdo, $value);
        if ($key === 'nomad_activity_log' && is_array($value)) save_activity($pdo, $value);
        if ($key === 'nomad_site_settings' && is_array($value)) save_settings($pdo, $value);
        $pdo->commit();

        respond(['ok' => true]);
    }

    respond(['ok' => false, 'message' => 'Action non autorisee.'], 405);
} catch (Throwable $exception) {
    if (isset($pdo) && $pdo instanceof PDO && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    respond([
        'ok' => false,
        'message' => 'Erreur base de donnees.',
        'detail' => $exception->getMessage(),
    ], 500);
}
