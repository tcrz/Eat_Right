DROP DATABASE IF EXISTS eat_right_db;

CREATE DATABASE IF NOT EXISTS eat_right_db;
CREATE USER IF NOT EXISTS 'eat_right_devs'@'localhost' IDENTIFIED BY 'eat_right_dev_pwd';
GRANT ALL PRIVILEGES ON eat_right_db.* TO 'eat_right_devs'@'localhost';
FLUSH PRIVILEGES;

USE eat_right_db;


DROP TABLE IF EXISTS `recipes`;

CREATE TABLE `recipes` 
	(`id` varchar(45) NOT NULL, 
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, 
	`name` varchar(45) NOT NULL,
	`ingredients` varchar(32000) NOT NULL, 
	`preparation` varchar(32000) NOT NULL,
	`user_name` varchar(45) NOT NULL,
	`filename` varchar(200) NOT NUll,
	`mimetype` varchar(10) NOT NUll,
	PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1;
