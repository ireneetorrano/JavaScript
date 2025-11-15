CREATE DATABASE IF NOT EXISTS erasmus_newsletter
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;
USE erasmus_newsletter;

-- Subscribers table: newsletter signups
CREATE TABLE IF NOT EXISTS subscribers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  status ENUM('active','unsubscribed') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Events table: events available for reservation
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  starts_at DATETIME NOT NULL,
  capacity INT NOT NULL DEFAULT 50,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Reservations table: link subscriber to event
CREATE TABLE IF NOT EXISTS reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT NOT NULL,
  subscriber_id INT NOT NULL,
  reserved_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status ENUM('confirmed','cancelled') NOT NULL DEFAULT 'confirmed',
  UNIQUE KEY uniq_reservation (event_id, subscriber_id),
  CONSTRAINT fk_res_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  CONSTRAINT fk_res_sub FOREIGN KEY (subscriber_id) REFERENCES subscribers(id) ON DELETE CASCADE
);

-- Seed some sample events
INSERT INTO events (title, description, starts_at, capacity) VALUES
('Welcome Party', 'Kickoff party for new Erasmus students', DATE_ADD(NOW(), INTERVAL 7 DAY), 100),
('City Tour', 'Guided tour around the historic center', DATE_ADD(NOW(), INTERVAL 10 DAY), 40),
('Language Exchange', 'Meetup to practice languages', DATE_ADD(NOW(), INTERVAL 14 DAY), 60)
ON DUPLICATE KEY UPDATE title=VALUES(title);
