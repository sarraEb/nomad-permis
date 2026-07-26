CREATE DATABASE IF NOT EXISTS nomad_permis
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE nomad_permis;

CREATE TABLE IF NOT EXISTS app_storage (
  storage_key VARCHAR(120) NOT NULL,
  storage_value LONGTEXT NOT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (storage_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS database_migrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  migration_name VARCHAR(190) NOT NULL UNIQUE,
  applied_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO database_migrations (migration_name)
VALUES ('2026_07_26_create_nomad_storage');

