CREATE DATABASE IF NOT EXISTS nomad_permis
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE nomad_permis;

CREATE TABLE IF NOT EXISTS site_settings (
  id TINYINT UNSIGNED NOT NULL DEFAULT 1,
  address VARCHAR(255) NOT NULL DEFAULT '',
  phone VARCHAR(80) NOT NULL DEFAULT '',
  email VARCHAR(190) NOT NULL DEFAULT '',
  contact_intro TEXT NULL,
  contact_message_placeholder TEXT NULL,
  google_api_key VARCHAR(255) NULL,
  google_place_id VARCHAR(255) NULL,
  google_profile_query VARCHAR(255) NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS formulas (
  formula_key VARCHAR(120) NOT NULL,
  title VARCHAR(190) NOT NULL,
  description TEXT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  badge VARCHAR(120) NULL,
  note VARCHAR(190) NULL,
  cta_label VARCHAR(190) NULL,
  is_recommended TINYINT(1) NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (formula_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS formula_features (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  formula_key VARCHAR(120) NOT NULL,
  feature_text VARCHAR(255) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY idx_formula_features_formula (formula_key),
  CONSTRAINT fk_formula_features_formula
    FOREIGN KEY (formula_key) REFERENCES formulas (formula_key)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS leads (
  lead_id VARCHAR(120) NOT NULL,
  created_at DATETIME NOT NULL,
  status VARCHAR(60) NOT NULL DEFAULT 'Nouveau',
  formula_key VARCHAR(120) NULL,
  plan_title VARCHAR(190) NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  full_name VARCHAR(190) NOT NULL,
  phone VARCHAR(80) NOT NULL,
  email VARCHAR(190) NOT NULL,
  city VARCHAR(190) NULL,
  message TEXT NULL,
  raw_payload JSON NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (lead_id),
  KEY idx_leads_status (status),
  KEY idx_leads_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contacts (
  contact_id VARCHAR(120) NOT NULL,
  created_at DATETIME NOT NULL,
  status VARCHAR(60) NOT NULL DEFAULT 'Nouveau',
  full_name VARCHAR(190) NOT NULL,
  phone VARCHAR(80) NOT NULL,
  email VARCHAR(190) NOT NULL,
  city VARCHAR(190) NULL,
  message TEXT NULL,
  source VARCHAR(60) NULL,
  raw_payload JSON NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (contact_id),
  KEY idx_contacts_status (status),
  KEY idx_contacts_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS videos (
  video_id VARCHAR(120) NOT NULL,
  first_name VARCHAR(120) NOT NULL,
  title VARCHAR(190) NOT NULL,
  parcours VARCHAR(190) NULL,
  duration VARCHAR(80) NULL,
  preview_url TEXT NULL,
  video_url TEXT NULL,
  subtitle TEXT NULL,
  file_name VARCHAR(255) NULL,
  mime_type VARCHAR(120) NULL,
  file_size BIGINT UNSIGNED NULL,
  is_published TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (video_id),
  KEY idx_videos_published (is_published)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS faqs (
  faq_id VARCHAR(120) NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (faq_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS roles (
  role_id VARCHAR(120) NOT NULL,
  role_name VARCHAR(120) NOT NULL UNIQUE,
  is_system TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS role_permissions (
  role_id VARCHAR(120) NOT NULL,
  permission_key VARCHAR(120) NOT NULL,
  PRIMARY KEY (role_id, permission_key),
  CONSTRAINT fk_role_permissions_role
    FOREIGN KEY (role_id) REFERENCES roles (role_id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS users (
  user_id VARCHAR(120) NOT NULL,
  full_name VARCHAR(190) NOT NULL,
  username VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role_id VARCHAR(120) NULL,
  role_name VARCHAR(120) NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id),
  KEY idx_users_role (role_id),
  CONSTRAINT fk_users_role
    FOREIGN KEY (role_id) REFERENCES roles (role_id)
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS activity_logs (
  log_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  created_at DATETIME NOT NULL,
  user_name VARCHAR(190) NULL,
  action VARCHAR(190) NOT NULL,
  details TEXT NULL,
  raw_payload JSON NULL,
  PRIMARY KEY (log_id),
  KEY idx_activity_created_at (created_at),
  KEY idx_activity_action (action)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
VALUES ('2026_07_26_create_professional_nomad_schema');
