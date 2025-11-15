<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/config.php';

$input = file_get_contents('php://input');
$data = [];
if (!empty($input)) {
    $decoded = json_decode($input, true);
    if (json_last_error() === JSON_ERROR_NONE) {
        $data = $decoded;
    }
}
if (empty($data)) {
    $data = $_POST;
}

$name = isset($data['name']) ? trim((string)$data['name']) : '';
$email = isset($data['email']) ? trim((string)$data['email']) : '';

if ($name === '' || $email === '') {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Missing required fields: name and email.'
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid email format.'
    ]);
    exit;
}

try {
    $pdo = getDB();
    // Ensure schema exists or is compatible
    if (function_exists('ensureSubscribersSchema')) {
        ensureSubscribersSchema($pdo);
    }

    // Check if this email is already subscribed (active)
    $sel = $pdo->prepare("SELECT id, name, status FROM subscribers WHERE email = :email LIMIT 1");
    $sel->execute([':email' => $email]);
    $existing = $sel->fetch();

    if ($existing && (!isset($existing['status']) || $existing['status'] === 'active')) {
        // Already subscribed: start session and return informative message without modifying DB
        $_SESSION['subscriber_id'] = (int)$existing['id'];
        $_SESSION['subscriber_email'] = $email;
        $_SESSION['subscriber_name'] = $existing['name'] ?: $name;

        echo json_encode([
            'success' => true,
            'message' => 'You are already subscribed.'
        ]);
        exit;
    }

    // New subscription or reactivation
    $sqlWithStatus = "INSERT INTO subscribers (email, name, status) VALUES (:email, :name, 'active')
                      ON DUPLICATE KEY UPDATE name = VALUES(name), status = 'active'";
    try {
        $stmt = $pdo->prepare($sqlWithStatus);
        $stmt->execute([':email' => $email, ':name' => $name]);
    } catch (PDOException $e) {
        if ((int)$e->errorInfo[1] === 1054) { // Unknown column 'status'
            $sqlNoStatus = "INSERT INTO subscribers (email, name)
                            VALUES (:email, :name)
                            ON DUPLICATE KEY UPDATE name = VALUES(name)";
            $stmt = $pdo->prepare($sqlNoStatus);
            $stmt->execute([':email' => $email, ':name' => $name]);
        } else {
            throw $e;
        }
    }

    $id = (int)$pdo->lastInsertId();
    if ($id === 0) {
        $sel = $pdo->prepare('SELECT id FROM subscribers WHERE email = :email LIMIT 1');
        $sel->execute([':email' => $email]);
        $row = $sel->fetch();
        $id = $row ? (int)$row['id'] : 0;
    }

    // Set session for immediate access to reservations
    if ($id > 0) {
        $_SESSION['subscriber_id'] = $id;
        $_SESSION['subscriber_email'] = $email;
        $_SESSION['subscriber_name'] = $name;
    }

    echo json_encode([
        'success' => true,
        'message' => 'Subscription successful.'
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    error_log($e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Server error. Please try later.'
    ]);
}
?>
