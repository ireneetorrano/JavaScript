<?php
require_once __DIR__ . '/../middleware/require_subscription.php';
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php');
    exit;
}

$subscriberId = (int)$_SESSION['subscriber_id'];
$eventId = isset($_POST['event_id']) ? (int)$_POST['event_id'] : 0;

if ($eventId <= 0) {
    header('Location: index.php?msg=' . urlencode('Invalid event.'));
    exit;
}

$pdo = getDB();

// Check event exists
$stmt = $pdo->prepare('SELECT id, capacity FROM events WHERE id = :id');
$stmt->execute([':id' => $eventId]);
$event = $stmt->fetch();
if (!$event) {
    header('Location: index.php?msg=' . urlencode('Event does not exist.'));
    exit;
}

// Check not already reserved
$stmt = $pdo->prepare("SELECT 1 FROM reservations WHERE event_id = :e AND subscriber_id = :s AND status='confirmed' LIMIT 1");
$stmt->execute([':e' => $eventId, ':s' => $subscriberId]);
if ($stmt->fetch()) {
    header('Location: index.php?msg=' . urlencode('You already have a reservation for this event.'));
    exit;
}

// Check capacity
$stmt = $pdo->prepare("SELECT COUNT(*) AS booked FROM reservations WHERE event_id = :e AND status='confirmed'");
$stmt->execute([':e' => $eventId]);
$booked = (int)$stmt->fetchColumn();
if ($booked >= (int)$event['capacity']) {
    header('Location: index.php?msg=' . urlencode('No spots available.'));
    exit;
}

// Insert reservation
$ins = $pdo->prepare('INSERT INTO reservations (event_id, subscriber_id, status) VALUES (:e, :s, "confirmed")');
$ins->execute([':e' => $eventId, ':s' => $subscriberId]);

header('Location: index.php?msg=' . urlencode('Reservation confirmed.'));
exit;
?>
