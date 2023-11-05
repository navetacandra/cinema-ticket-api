CREATE TABLE IF NOT EXISTS `users` (
  `uid` int(13) PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) UNIQUE NOT NULL,
  `phone_number` char(15) UNIQUE NOT NULL,
  `password` text NOT NULL,
  `role` char(5) NOT NULL DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS `user_tokens` (
  `token_id` int(13) PRIMARY KEY AUTO_INCREMENT,
  `user_id` int(13) NOT NULL,
  `token` text UNIQUE NOT NULL,
  `user_agent` text NOT NULL,
  `ip` char(15) NOT NULL
);

CREATE TABLE IF NOT EXISTS `movies` (
  `movie_id` int(13) PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `poster_url` varchar(255) NOT NULL,
  `synopsis` text NOT NULL,
  `rating` decimal(10,2) NOT NULL DEFAULT 0.00,
  `duration` int(13) NOT NULL
);

CREATE TABLE IF NOT EXISTS `cinemas` (
  `cinema_id` int(13) PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` text NOT NULL
);

CREATE TABLE IF NOT EXISTS `studios` (
  `studio_id` int(13) PRIMARY KEY AUTO_INCREMENT,
  `cinema_id` int(13) NOT NULL,
  `name` varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `seats` (
  `seat_id` int(13) PRIMARY KEY AUTO_INCREMENT,
  `studio_id` int(13) NOT NULL,
  `name` char(5) NOT NULL
);

CREATE TABLE IF NOT EXISTS `shows` (
  `show_id` int(13) PRIMARY KEY AUTO_INCREMENT,
  `studio_id` int(13) NOT NULL,
  `movie_id` int(13) NOT NULL,
  `schedule` char(5) NOT NULL,
  `price` int(13) NOT NULL,
  `date` date NOT NULL
);

CREATE TABLE IF NOT EXISTS `books` (
  `book_id` int(13) PRIMARY KEY AUTO_INCREMENT,
  `user_id` int(13) NOT NULL,
  `show_id` int(13) NOT NULL,
  `seat_id` int(13) NOT NULL
);

CREATE TABLE IF NOT EXISTS `checkouts` (
  `checkout_id` int(13) PRIMARY KEY AUTO_INCREMENT,
  `book_id` int(13) NOT NULL,
  `paid` boolean NOT NULL,
  `status` char(10) NOT NULL
);

ALTER TABLE `user_tokens` ADD CONSTRAINT `fk_user_tokens_users_uid` FOREIGN KEY (`user_id`) REFERENCES `users` (`uid`) ON DELETE CASCADE;

ALTER TABLE `studios` ADD CONSTRAINT `fk_studios_cinemas_cinema_id` FOREIGN KEY (`cinema_id`) REFERENCES `cinemas` (`cinema_id`) ON DELETE CASCADE;

ALTER TABLE `seats` ADD CONSTRAINT `fk_seats_studios_studio_id` FOREIGN KEY (`studio_id`) REFERENCES `studios` (`studio_id`) ON DELETE CASCADE;

ALTER TABLE `shows` ADD CONSTRAINT `fk_shows_studios_studio_id` FOREIGN KEY (`studio_id`) REFERENCES `studios` (`studio_id`) ON DELETE CASCADE;

ALTER TABLE `shows` ADD CONSTRAINT `fk_shows_movies_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`) ON DELETE CASCADE;

ALTER TABLE `books` ADD CONSTRAINT `fk_books_users_uid` FOREIGN KEY (`user_id`) REFERENCES `users` (`uid`) ON DELETE CASCADE;

ALTER TABLE `books` ADD CONSTRAINT `fk_books_shows_show_id` FOREIGN KEY (`show_id`) REFERENCES `shows` (`show_id`) ON DELETE CASCADE;

ALTER TABLE `books` ADD CONSTRAINT `fk_books_seats_seat_id` FOREIGN KEY (`seat_id`) REFERENCES `seats` (`seat_id`) ON DELETE CASCADE;

ALTER TABLE `checkouts` ADD CONSTRAINT `fk_checkouts_books_book_id` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE;
