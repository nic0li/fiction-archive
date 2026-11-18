CREATE SCHEMA IF NOT EXISTS `fiction_archive`
DEFAULT CHARACTER SET utf8mb4;
USE `fiction_archive`;

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) UNIQUE NOT NULL,
  `email` VARCHAR(200) UNIQUE NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `name` VARCHAR(200),
  `avatar` VARCHAR(200),
  `description` TEXT,
  `created_at` DATETIME,
  `updated_at` DATETIME
);

-- -----------------------------------------------------
-- Table `permissions`
-- -----------------------------------------------------
CREATE TABLE `permissions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) UNIQUE NOT NULL,
  `created_at` DATETIME,
  `updated_at` DATETIME
);

-- -----------------------------------------------------
-- Table `genres`
-- -----------------------------------------------------
CREATE TABLE `genres` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) UNIQUE NOT NULL,
  `created_at` DATETIME,
  `updated_at` DATETIME
);

-- -----------------------------------------------------
-- Table `categories`
-- -----------------------------------------------------
CREATE TABLE `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) UNIQUE NOT NULL,
  `created_at` DATETIME,
  `updated_at` DATETIME
);

-- -----------------------------------------------------
-- Table `ratings`
-- -----------------------------------------------------
CREATE TABLE `ratings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) UNIQUE NOT NULL,
  `created_at` DATETIME,
  `updated_at` DATETIME
);

-- -----------------------------------------------------
-- Table `stories`
-- -----------------------------------------------------
CREATE TABLE `stories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `rating_id` INT NOT NULL,
  `directory` VARCHAR(200),
  `title` VARCHAR(200),
  `cover` VARCHAR(200),
  `synopsis` TEXT,
  `is_completed` TINYINT,
  `is_interactive` TINYINT,
  `is_visible` TINYINT,
  `created_at` DATETIME,
  `updated_at` DATETIME,
  CONSTRAINT `fk_stories_rating`
    FOREIGN KEY (`rating_id`)
    REFERENCES `ratings` (`id`)
);

-- -----------------------------------------------------
-- Table `chapters`
-- -----------------------------------------------------
CREATE TABLE `chapters` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `story_id` INT NOT NULL,
  `title` VARCHAR(200),
  `content` TEXT,
  `initial_notes` TEXT,
  `final_notes` TEXT,
  `is_visible` TINYINT,
  `created_at` DATETIME,
  `updated_at` DATETIME,
  CONSTRAINT `fk_chapters_story`
    FOREIGN KEY (`story_id`)
    REFERENCES `stories` (`id`)
);

-- -----------------------------------------------------
-- Table `user_permissions`
-- -----------------------------------------------------
CREATE TABLE `user_permissions` (
  `user_id` INT NOT NULL,
  `permission_id` INT NOT NULL,
  `created_at` DATETIME,
  `updated_at` DATETIME,
  PRIMARY KEY (`user_id`, `permission_id`),
  CONSTRAINT `fk_user_permissions_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`),
  CONSTRAINT `fk_user_permissions_permission`
    FOREIGN KEY (`permission_id`)
    REFERENCES `permissions` (`id`)
);

-- -----------------------------------------------------
-- Table `user_stories`
-- -----------------------------------------------------
CREATE TABLE `user_stories` (
  `user_id` INT NOT NULL,
  `story_id` INT NOT NULL,
  `created_at` DATETIME,
  `updated_at` DATETIME,
  PRIMARY KEY (`user_id`, `story_id`),
  CONSTRAINT `fk_user_stories_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`),
  CONSTRAINT `fk_user_stories_story`
    FOREIGN KEY (`story_id`)
    REFERENCES `stories` (`id`)
);

-- -----------------------------------------------------
-- Table `story_genres`
-- -----------------------------------------------------
CREATE TABLE `story_genres` (
  `story_id` INT NOT NULL,
  `genre_id` INT NOT NULL,
  `created_at` DATETIME,
  `updated_at` DATETIME,
  PRIMARY KEY (`story_id`, `genre_id`),
  CONSTRAINT `fk_story_genres_story`
    FOREIGN KEY (`story_id`)
    REFERENCES `stories` (`id`),
  CONSTRAINT `fk_story_genres_genre`  
    FOREIGN KEY (`genre_id`)
    REFERENCES `genres` (`id`)
);

-- -----------------------------------------------------
-- Table `story_categories`
-- -----------------------------------------------------
CREATE TABLE `story_categories` (
  `story_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  `created_at` DATETIME,
  `updated_at` DATETIME,
  PRIMARY KEY (`story_id`, `category_id`),
  CONSTRAINT `fk_story_categories_story`
    FOREIGN KEY (`story_id`)
    REFERENCES `stories` (`id`),
  CONSTRAINT `fk_story_categories_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `categories` (`id`)
);
