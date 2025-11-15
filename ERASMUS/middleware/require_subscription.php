<?php
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

if (empty($_SESSION['subscriber_id'])) {
    $target = '/ERASMUS/login.php';
    $redirect = isset($_SERVER['REQUEST_URI']) ? urlencode($_SERVER['REQUEST_URI']) : '';
    header('Location: ' . $target . ($redirect ? ('?redirect=' . $redirect) : ''));
    exit;
}
?>
