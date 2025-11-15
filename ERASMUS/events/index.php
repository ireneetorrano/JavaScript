<?php
require_once __DIR__ . '/../middleware/require_subscription.php';
require_once __DIR__ . '/../config.php';

$pdo = getDB();
$msg = isset($_GET['msg']) ? $_GET['msg'] : '';

$stmt = $pdo->query("SELECT id, title, description, starts_at, capacity FROM events ORDER BY starts_at ASC");
$events = $stmt->fetchAll();

// Compute remaining per event
$remaining = [];
if ($events) {
    $ids = array_column($events, 'id');
    if ($ids) {
        $in = implode(',', array_map('intval', $ids));
        $res = $pdo->query("SELECT event_id, SUM(CASE WHEN status='confirmed' THEN 1 ELSE 0 END) as booked FROM reservations WHERE event_id IN ($in) GROUP BY event_id")->fetchAll();
        $bookedByEvent = [];
        foreach ($res as $r) { $bookedByEvent[(int)$r['event_id']] = (int)$r['booked']; }
        foreach ($events as $e) {
            $booked = $bookedByEvent[$e['id']] ?? 0;
            $remaining[$e['id']] = max(0, (int)$e['capacity'] - $booked);
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event reservations</title>
  <link rel="stylesheet" href="../style.css">
  <style>
    .wrap{max-width:960px;margin:20px auto;padding:0 16px}
    .event{background:#fff;border:1px solid #eee;border-radius:10px;padding:16px;margin-bottom:14px;display:flex;gap:16px;align-items:center;justify-content:space-between;box-shadow:0 10px 20px rgba(0,0,0,.06)}
    .event h3{margin:0 0 6px}
    .muted{color:#777}
    .success{color:#1b5e20;margin-bottom:12px}
    .error{color:#b00020;margin-bottom:12px}
    .btn{background:#667eea;color:#fff;border:none;border-radius:8px;padding:8px 12px;cursor:pointer}
    .btn[disabled]{background:#bbb;cursor:not-allowed}
    /* Toast notification */
    .toast{position:fixed;top:20px;right:20px;background:#2e7d32;color:#fff;padding:12px 16px;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.15);opacity:0;transform:translateY(-10px);transition:opacity .25s ease, transform .25s ease;z-index:1000}
    .toast.show{opacity:1;transform:translateY(0)}
  </style>
</head>
<body>
  <div class="page">
    <?php include __DIR__ . '/../partials/header.php'; ?>
    <div class="wrap">
      <h2>Book events</h2>
      <?php if ($msg): ?>
        <div class="success" style="display:none;"><?= htmlspecialchars($msg) ?></div>
        <div id="toast" class="toast"><?= htmlspecialchars($msg) ?></div>
        <script>
          (function(){
            var t = document.getElementById('toast');
            if(t){
              setTimeout(function(){ t.classList.add('show'); }, 60);
              setTimeout(function(){ t.classList.remove('show'); }, 4000);
            }
          })();
        </script>
      <?php endif; ?>
      <?php foreach ($events as $e): $rem = $remaining[$e['id']] ?? (int)$e['capacity']; ?>
        <div class="event">
          <div>
            <h3><?= htmlspecialchars($e['title']) ?></h3>
            <div class="muted">Date: <?= htmlspecialchars($e['starts_at']) ?> · Capacity: <?= (int)$e['capacity'] ?> · Remaining: <?= (int)$rem ?></div>
            <?php if (!empty($e['description'])): ?><p><?= nl2br(htmlspecialchars($e['description'])) ?></p><?php endif; ?>
          </div>
          <div>
            <form method="post" action="reserve_action.php">
              <input type="hidden" name="event_id" value="<?= (int)$e['id'] ?>">
              <button class="btn" type="submit" <?= $rem <= 0 ? 'disabled' : '' ?>>Book</button>
            </form>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
    <?php include __DIR__ . '/../partials/footer.php'; ?>
  </div>
</body>
</html>
