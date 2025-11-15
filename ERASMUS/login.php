<?php
require_once __DIR__ . '/config.php';

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = isset($_POST['email']) ? trim((string)$_POST['email']) : '';
    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Please enter a valid email.';
    } else {
        $pdo = getDB();
        if (function_exists('columnExists') && columnExists($pdo, 'subscribers', 'status')) {
            $stmt = $pdo->prepare("SELECT id, name, email FROM subscribers WHERE email = :email AND status = 'active' LIMIT 1");
        } else {
            $stmt = $pdo->prepare("SELECT id, name, email FROM subscribers WHERE email = :email LIMIT 1");
        }
        $stmt->execute([':email' => $email]);
        $user = $stmt->fetch();
        if ($user) {
            $_SESSION['subscriber_id'] = (int)$user['id'];
            $_SESSION['subscriber_email'] = $user['email'];
            $_SESSION['subscriber_name'] = $user['name'];
            $redirect = isset($_GET['redirect']) ? $_GET['redirect'] : 'events/index.php';
            header('Location: ' . $redirect);
            exit;
        } else {
            $error = 'This email is not subscribed.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign in to reservations</title>
  <link rel="stylesheet" href="style.css">
  <style>
    .auth-box{max-width:480px;margin:40px auto;background:#fff;border-radius:10px;padding:24px;box-shadow:0 10px 25px rgba(0,0,0,.08)}
    .auth-box h2{margin:0 0 10px}
    .error{color:#b00020;margin-bottom:12px}
    .actions{margin-top:16px;display:flex;gap:10px}
    .btn{display:inline-block;background:#667eea;color:#fff;border:none;padding:10px 16px;border-radius:8px;cursor:pointer}
    .btn.secondary{background:#e0e0e0;color:#333}
    input[type=email]{width:100%;padding:10px;border:1px solid #e0e0e0;border-radius:8px}
  </style>
  </head>
<body>
  <div class="auth-box">
    <h2>Access event reservations</h2>
    <p>Enter your subscription email.</p>
    <?php if ($error): ?>
      <div class="error"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>
    <form method="post">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required>
      <div class="actions">
        <button class="btn" type="submit">Sign in</button>
        <a class="btn secondary" href="index.html">Back</a>
      </div>
    </form>
  </div>
</body>
</html>
