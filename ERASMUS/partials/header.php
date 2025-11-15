<?php
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}
$name = isset($_SESSION['subscriber_name']) ? $_SESSION['subscriber_name'] : null;

// Build link prefix that works whether current page is in /events or in project root
$script = isset($_SERVER['SCRIPT_NAME']) ? $_SERVER['SCRIPT_NAME'] : '';
$prefix = (strpos($script, '/events/') !== false) ? '../' : '';
?>
<header class="site-header">
  <div class="site-header__inner">
    <h1 class="site-title">
      <a href="<?= $prefix ?>index.html">Erasmus Ljubljana</a>
    </h1>
    <nav class="site-nav">
      <?php if ($name): ?>
        <span>Hi, <?= htmlspecialchars($name) ?></span>
        <a class="logout" href="<?= $prefix ?>logout.php">Log out</a>
      <?php else: ?>
        <a href="<?= $prefix ?>login.php">Sign in</a>
      <?php endif; ?>
    </nav>
  </div>
</header>
