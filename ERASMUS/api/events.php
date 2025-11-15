<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../config.php';

try {
    $pdo = getDB();
    $sql = "
        SELECT e.id, e.title, e.description, e.starts_at, e.capacity,
               (e.capacity - COALESCE(SUM(CASE WHEN r.status='confirmed' THEN 1 ELSE 0 END),0)) AS remaining
        FROM events e
        LEFT JOIN reservations r ON r.event_id = e.id
        GROUP BY e.id
        ORDER BY e.starts_at ASC
    ";
    $events = $pdo->query($sql)->fetchAll();
    echo json_encode(['success' => true, 'data' => $events]);
} catch (Throwable $e) {
    http_response_code(500);
    error_log($e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Server error']);
}
?>
