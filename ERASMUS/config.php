<?php
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

// Database configuration
$DB_HOST = 'localhost';
$DB_NAME = 'erasmus_newsletter';
$DB_USER = 'root';
$DB_PASS = '';

function getDB(): PDO {
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }
    global $DB_HOST, $DB_NAME, $DB_USER, $DB_PASS;
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    try {
        // Try direct connection to DB
        $dsn = "mysql:host={$DB_HOST};dbname={$DB_NAME};charset=utf8mb4";
        $pdo = new PDO($dsn, $DB_USER, $DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        if ((int)$e->getCode() === 1049) { // Unknown database
            // Connect to server and create the database
            $serverDsn = "mysql:host={$DB_HOST};charset=utf8mb4";
            $serverPdo = new PDO($serverDsn, $DB_USER, $DB_PASS, $options);
            $serverPdo->exec("CREATE DATABASE IF NOT EXISTS `{$DB_NAME}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
            // Reconnect to newly ensured DB
            $dsn = "mysql:host={$DB_HOST};dbname={$DB_NAME};charset=utf8mb4";
            $pdo = new PDO($dsn, $DB_USER, $DB_PASS, $options);
            return $pdo;
        }
        throw $e;
    }
}

function tableExists(PDO $pdo, string $table): bool {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = :t");
    $stmt->execute([':t' => $table]);
    return (int)$stmt->fetchColumn() > 0;
}

function columnExists(PDO $pdo, string $table, string $column): bool {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = :t AND column_name = :c");
    $stmt->execute([':t' => $table, ':c' => $column]);
    return (int)$stmt->fetchColumn() > 0;
}

function ensureSubscribersSchema(PDO $pdo): void {
    // Create table if missing
    if (!tableExists($pdo, 'subscribers')) {
        $pdo->exec(
            "CREATE TABLE `subscribers` (
                `id` INT AUTO_INCREMENT PRIMARY KEY,
                `email` VARCHAR(255) NOT NULL,
                `name` VARCHAR(100) NOT NULL,
                `status` ENUM('active','unsubscribed') NOT NULL DEFAULT 'active',
                `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY `uniq_email` (`email`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );
        return;
    }
    // Add missing columns/indexes for compatibility
    if (!columnExists($pdo, 'subscribers', 'status')) {
        $pdo->exec("ALTER TABLE `subscribers` ADD COLUMN `status` ENUM('active','unsubscribed') NOT NULL DEFAULT 'active' AFTER `name`");
    }
    // Ensure unique index on email
    try { $pdo->exec("ALTER TABLE `subscribers` ADD UNIQUE KEY `uniq_email` (`email`)"); } catch (Throwable $e) { /* ignore if exists */ }
}
?>
