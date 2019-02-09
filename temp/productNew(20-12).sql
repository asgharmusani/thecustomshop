-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.23-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for thecustomshop
DROP DATABASE IF EXISTS `thecustomshop`;
CREATE DATABASE IF NOT EXISTS `thecustomshop` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `thecustomshop`;

-- Dumping structure for table thecustomshop.admin
DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `lastlogin` datetime DEFAULT NULL,
  `gender` enum('M','F') DEFAULT NULL,
  `phonenumber` varchar(15) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table thecustomshop.admin: ~0 rows (approximately)
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- Dumping structure for table thecustomshop.cart
DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `user_id` int(10) unsigned NOT NULL,
  `product_id` int(10) unsigned NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table thecustomshop.cart: ~0 rows (approximately)
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;

-- Dumping structure for table thecustomshop.cart_product
DROP TABLE IF EXISTS `cart_product`;
CREATE TABLE IF NOT EXISTS `cart_product` (
  `user_id` int(10) unsigned NOT NULL,
  `product_id` int(10) unsigned NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_product_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `cart_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table thecustomshop.cart_product: ~0 rows (approximately)
/*!40000 ALTER TABLE `cart_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_product` ENABLE KEYS */;

-- Dumping structure for table thecustomshop.fabric_tag
DROP TABLE IF EXISTS `fabric_tag`;
CREATE TABLE IF NOT EXISTS `fabric_tag` (
  `tag_id` int(10) unsigned NOT NULL,
  `fabric_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`tag_id`,`fabric_id`),
  UNIQUE KEY `fabric_tag_tag_id_fabric_id_unique` (`tag_id`,`fabric_id`),
  KEY `fabric_id` (`fabric_id`),
  CONSTRAINT `fabric_tag_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fabric_tag_ibfk_2` FOREIGN KEY (`fabric_id`) REFERENCES `product_fabric` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table thecustomshop.fabric_tag: ~0 rows (approximately)
/*!40000 ALTER TABLE `fabric_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `fabric_tag` ENABLE KEYS */;

-- Dumping structure for table thecustomshop.product
DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sku` varchar(50) DEFAULT NULL,
  `title` varchar(80) DEFAULT NULL,
  `subtitle` varchar(50) DEFAULT NULL,
  `description` text,
  `haveStock` tinyint(1) DEFAULT '0',
  `current_stock` int(10) unsigned DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `isFeatured` tinyint(1) DEFAULT '0',
  `fabric_id` int(10) unsigned DEFAULT NULL,
  `category_id` int(10) unsigned DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fabric_id` (`fabric_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`fabric_id`) REFERENCES `product_fabric` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `product_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;

-- Dumping data for table thecustomshop.product: ~0 rows (approximately)
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
REPLACE INTO `product` (`id`, `sku`, `title`, `subtitle`, `description`, `haveStock`, `current_stock`, `isActive`, `isFeatured`, `fabric_id`, `category_id`, `createdAt`, `updatedAt`) VALUES
	(25, NULL, 'Mosaic Purple', NULL, 'Cufflings for men.', 1, 10, 1, 1, NULL, 3, '2018-12-18 17:51:53', '2018-12-18 17:51:54'),
	(26, NULL, 'Crystals Silver', NULL, 'Cufflings for men.', 1, 10, 1, 1, NULL, 3, '2018-12-20 11:54:37', '2018-12-20 11:54:37'),
	(27, NULL, 'Cylinder Style Silver', NULL, 'Cufflings for men.', 1, 10, 1, 1, NULL, 3, '2018-12-20 12:03:57', '2018-12-20 12:03:57'),
	(28, NULL, 'Milky Block White', NULL, 'Cufflings for men.', 1, 10, 1, 1, NULL, 3, '2018-12-20 12:22:21', '2018-12-20 12:22:21'),
	(29, NULL, 'Sapphire with Stones', NULL, 'Cufflings for men.', 1, 10, 1, 1, NULL, 3, '2018-12-20 13:07:28', '2018-12-20 13:07:28'),
	(30, NULL, 'Golden flower shaped', NULL, 'Cufflings for men.', 1, 10, 1, 1, NULL, 3, '2018-12-20 13:08:47', '2018-12-20 13:08:47'),
	(31, NULL, 'Red and Blue Rectangular', NULL, 'Cufflings for men.', 1, 10, 1, 1, NULL, 3, '2018-12-20 13:11:32', '2018-12-20 13:11:32'),
	(32, NULL, 'Chanel pyramid style', NULL, 'Cufflings for men.', 1, 10, 1, 1, NULL, 3, '2018-12-20 13:12:51', '2018-12-20 13:12:51'),
	(33, NULL, 'Chanel Box Crystals', NULL, 'Cufflings for men.', 1, 10, 1, 1, NULL, 3, '2018-12-20 13:13:56', '2018-12-20 13:13:56'),
	(34, NULL, 'Blue fan shaped', NULL, 'Cufflings for men.', 1, 10, 1, 1, NULL, 3, '2018-12-20 13:14:41', '2018-12-20 13:14:41'),
	(35, NULL, 'Black and White eye shaped', NULL, 'Cufflings for men.', 1, 10, 1, 1, NULL, 3, '2018-12-20 13:16:38', '2018-12-20 13:16:38'),
	(36, NULL, 'Black square shaped', NULL, 'Cufflings for men.', 1, 10, 1, 1, NULL, 3, '2018-12-20 13:17:12', '2018-12-20 13:17:12'),
	(37, NULL, 'Brown Dashed', NULL, 'Cufflings for men.', 1, 10, 1, 1, NULL, 3, '2018-12-20 13:19:31', '2018-12-20 13:19:31'),
	(38, NULL, 'Pink and Blue Rectangular', NULL, 'Cufflings for men.', 1, 10, 1, 1, NULL, 3, '2018-12-20 13:20:14', '2018-12-20 13:20:14'),
	(39, NULL, 'Red and Black stripes with stones', NULL, 'Cufflings for men.', 1, 10, 1, 1, NULL, 3, '2018-12-20 13:20:46', '2018-12-20 13:20:46'),
	(40, NULL, 'Black and white dots', NULL, 'Ties for men.', 1, 3, 1, 1, NULL, 3, '2018-12-20 13:22:42', '2018-12-20 13:22:42'),
	(41, NULL, 'Sky blue with dots', NULL, 'Ties for men.', 1, 3, 1, 1, NULL, 3, '2018-12-20 13:25:42', '2018-12-20 13:25:42'),
	(42, NULL, 'Yellow with birds-eye', NULL, 'Ties for men.', 1, 3, 1, 1, NULL, 3, '2018-12-20 13:27:00', '2018-12-20 13:27:00'),
	(43, NULL, 'Light brown polka dots', NULL, 'Ties for men.', 1, 3, 1, 1, NULL, 3, '2018-12-20 13:28:24', '2018-12-20 13:28:24'),
	(44, NULL, 'Light blue fish style', NULL, 'Ties for men.', 1, 3, 1, 1, NULL, 3, '2018-12-20 13:33:32', '2018-12-20 13:33:32'),
	(45, NULL, 'Royal blue with dots', NULL, 'Ties for men.', 1, 3, 1, 1, NULL, 3, '2018-12-20 13:34:19', '2018-12-20 13:34:19'),
	(46, NULL, 'Dark pink with texture', NULL, 'Ties for men.', 1, 3, 1, 1, NULL, 3, '2018-12-20 13:34:57', '2018-12-20 13:34:57'),
	(47, NULL, 'Light Purple Small Checkered', NULL, 'Shirts for men.', 1, 3, 1, 1, 1, 2, '2018-12-20 16:57:19', '2018-12-20 16:57:19');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;

-- Dumping structure for table thecustomshop.product_category
DROP TABLE IF EXISTS `product_category`;
CREATE TABLE IF NOT EXISTS `product_category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table thecustomshop.product_category: ~3 rows (approximately)
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
REPLACE INTO `product_category` (`id`, `category`) VALUES
	(1, 'suits'),
	(2, 'formal'),
	(3, 'accessories');
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;

-- Dumping structure for table thecustomshop.product_fabric
DROP TABLE IF EXISTS `product_fabric`;
CREATE TABLE IF NOT EXISTS `product_fabric` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `text` varchar(50) DEFAULT NULL,
  `url` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table thecustomshop.product_fabric: ~0 rows (approximately)
/*!40000 ALTER TABLE `product_fabric` DISABLE KEYS */;
REPLACE INTO `product_fabric` (`id`, `text`, `url`) VALUES
	(1, 'Light Purple Checkered', NULL);
/*!40000 ALTER TABLE `product_fabric` ENABLE KEYS */;

-- Dumping structure for table thecustomshop.product_image
DROP TABLE IF EXISTS `product_image`;
CREATE TABLE IF NOT EXISTS `product_image` (
  `id` int(10) unsigned NOT NULL,
  `product_id` int(10) unsigned NOT NULL,
  `url` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table thecustomshop.product_image: ~0 rows (approximately)
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
REPLACE INTO `product_image` (`id`, `product_id`, `url`, `createdAt`, `updatedAt`) VALUES
	(1, 25, NULL, '2018-12-18 17:52:47', '2018-12-18 17:52:47'),
	(1, 26, NULL, '2018-12-20 11:58:23', '2018-12-20 11:58:23'),
	(1, 27, NULL, '2018-12-20 12:08:02', '2018-12-20 12:08:03'),
	(1, 28, NULL, '2018-12-20 12:30:38', '2018-12-20 12:30:38'),
	(1, 29, NULL, '2018-12-20 13:07:28', '2018-12-20 13:07:28'),
	(1, 30, NULL, '2018-12-20 13:08:47', '2018-12-20 13:08:47'),
	(1, 31, NULL, '2018-12-20 13:11:32', '2018-12-20 13:11:32'),
	(1, 32, NULL, '2018-12-20 13:12:51', '2018-12-20 13:12:51'),
	(1, 33, NULL, '2018-12-20 13:13:56', '2018-12-20 13:13:56'),
	(1, 34, NULL, '2018-12-20 13:14:41', '2018-12-20 13:14:41'),
	(1, 35, NULL, '2018-12-20 13:16:38', '2018-12-20 13:16:38'),
	(1, 36, NULL, '2018-12-20 13:17:12', '2018-12-20 13:17:12'),
	(1, 37, NULL, '2018-12-20 13:19:31', '2018-12-20 13:19:31'),
	(1, 38, NULL, '2018-12-20 13:20:14', '2018-12-20 13:20:14'),
	(1, 39, NULL, '2018-12-20 13:20:46', '2018-12-20 13:20:46'),
	(1, 40, NULL, '2018-12-20 13:23:34', '2018-12-20 13:23:34'),
	(1, 41, NULL, '2018-12-20 13:26:21', '2018-12-20 13:26:21'),
	(1, 42, NULL, '2018-12-20 13:27:00', '2018-12-20 13:27:00'),
	(1, 43, NULL, '2018-12-20 13:28:37', '2018-12-20 13:28:37'),
	(1, 44, NULL, '2018-12-20 13:33:45', '2018-12-20 13:33:45'),
	(1, 45, NULL, '2018-12-20 13:34:20', '2018-12-20 13:34:20'),
	(1, 46, NULL, '2018-12-20 13:34:57', '2018-12-20 13:34:57'),
	(1, 47, NULL, '2018-12-20 16:57:19', '2018-12-20 16:57:19'),
	(2, 47, NULL, '2018-12-20 16:57:19', '2018-12-20 16:57:19');
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;

-- Dumping structure for table thecustomshop.product_price
DROP TABLE IF EXISTS `product_price`;
CREATE TABLE IF NOT EXISTS `product_price` (
  `id` int(10) unsigned NOT NULL,
  `product_id` int(10) unsigned NOT NULL,
  `price` int(11) DEFAULT NULL,
  `discounted_price` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_price_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table thecustomshop.product_price: ~0 rows (approximately)
/*!40000 ALTER TABLE `product_price` DISABLE KEYS */;
REPLACE INTO `product_price` (`id`, `product_id`, `price`, `discounted_price`, `createdAt`, `updatedAt`) VALUES
	(1, 25, 5000, NULL, '2018-12-18 17:54:08', '2018-12-18 17:54:09'),
	(1, 26, 5000, NULL, '2018-12-20 11:59:45', '2018-12-20 11:59:45'),
	(1, 27, 5000, NULL, '2018-12-20 12:09:28', '2018-12-20 12:09:29'),
	(1, 28, 5000, NULL, '2018-12-20 12:30:38', '2018-12-20 12:30:38'),
	(1, 29, 5000, NULL, '2018-12-20 13:07:28', '2018-12-20 13:07:28'),
	(1, 30, 5000, NULL, '2018-12-20 13:08:47', '2018-12-20 13:08:47'),
	(1, 31, 5000, NULL, '2018-12-20 13:11:32', '2018-12-20 13:11:32'),
	(1, 32, 5000, NULL, '2018-12-20 13:12:51', '2018-12-20 13:12:51'),
	(1, 33, 5000, NULL, '2018-12-20 13:13:56', '2018-12-20 13:13:56'),
	(1, 34, 5000, NULL, '2018-12-20 13:14:42', '2018-12-20 13:14:42'),
	(1, 35, 5000, NULL, '2018-12-20 13:16:38', '2018-12-20 13:16:38'),
	(1, 36, 5000, NULL, '2018-12-20 13:17:12', '2018-12-20 13:17:12'),
	(1, 37, 5000, NULL, '2018-12-20 13:19:31', '2018-12-20 13:19:31'),
	(1, 38, 5000, NULL, '2018-12-20 13:20:14', '2018-12-20 13:20:14'),
	(1, 39, 5000, NULL, '2018-12-20 13:20:46', '2018-12-20 13:20:46'),
	(1, 40, 3000, NULL, '2018-12-20 13:23:34', '2018-12-20 13:23:34'),
	(1, 41, 3000, NULL, '2018-12-20 13:26:21', '2018-12-20 13:26:21'),
	(1, 42, 3000, NULL, '2018-12-20 13:27:00', '2018-12-20 13:27:00'),
	(1, 43, 3000, NULL, '2018-12-20 13:28:37', '2018-12-20 13:28:37'),
	(1, 44, 3000, NULL, '2018-12-20 13:33:45', '2018-12-20 13:33:45'),
	(1, 45, 3000, NULL, '2018-12-20 13:34:20', '2018-12-20 13:34:20'),
	(1, 46, 3000, NULL, '2018-12-20 13:34:57', '2018-12-20 13:34:57'),
	(1, 47, 13000, NULL, '2018-12-20 16:57:19', '2018-12-20 16:57:19');
/*!40000 ALTER TABLE `product_price` ENABLE KEYS */;

-- Dumping structure for table thecustomshop.product_stock
DROP TABLE IF EXISTS `product_stock`;
CREATE TABLE IF NOT EXISTS `product_stock` (
  `id` int(10) unsigned NOT NULL,
  `product_id` int(10) unsigned NOT NULL,
  `stock` int(10) unsigned DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_stock_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table thecustomshop.product_stock: ~0 rows (approximately)
/*!40000 ALTER TABLE `product_stock` DISABLE KEYS */;
REPLACE INTO `product_stock` (`id`, `product_id`, `stock`, `createdAt`, `updatedAt`) VALUES
	(1, 25, 10, '2018-12-18 17:57:00', '2018-12-18 17:57:01'),
	(1, 26, 10, '2018-12-20 12:00:22', '2018-12-20 12:00:23'),
	(1, 27, 10, '2018-12-20 12:17:58', '2018-12-20 12:17:58'),
	(1, 28, 10, '2018-12-20 12:30:38', '2018-12-20 12:30:38'),
	(1, 29, 10, '2018-12-20 13:07:28', '2018-12-20 13:07:28'),
	(1, 30, 10, '2018-12-20 13:08:47', '2018-12-20 13:08:47'),
	(1, 31, 10, '2018-12-20 13:11:32', '2018-12-20 13:11:32'),
	(1, 32, 10, '2018-12-20 13:12:51', '2018-12-20 13:12:51'),
	(1, 33, 10, '2018-12-20 13:13:56', '2018-12-20 13:13:56'),
	(1, 34, 10, '2018-12-20 13:14:42', '2018-12-20 13:14:42'),
	(1, 35, 10, '2018-12-20 13:16:38', '2018-12-20 13:16:38'),
	(1, 36, 10, '2018-12-20 13:17:12', '2018-12-20 13:17:12'),
	(1, 37, 10, '2018-12-20 13:19:31', '2018-12-20 13:19:31'),
	(1, 38, 10, '2018-12-20 13:20:14', '2018-12-20 13:20:14'),
	(1, 39, 10, '2018-12-20 13:20:47', '2018-12-20 13:20:47'),
	(1, 40, 3, '2018-12-20 13:23:34', '2018-12-20 13:23:34'),
	(1, 41, 3, '2018-12-20 13:26:21', '2018-12-20 13:26:21'),
	(1, 42, 3, '2018-12-20 13:27:01', '2018-12-20 13:27:01'),
	(1, 43, 3, '2018-12-20 13:28:37', '2018-12-20 13:28:37'),
	(1, 44, 3, '2018-12-20 13:33:45', '2018-12-20 13:33:45'),
	(1, 45, 3, '2018-12-20 13:34:20', '2018-12-20 13:34:20'),
	(1, 46, 3, '2018-12-20 13:34:57', '2018-12-20 13:34:57'),
	(1, 47, 4, '2018-12-20 16:57:19', '2018-12-20 16:57:19');
/*!40000 ALTER TABLE `product_stock` ENABLE KEYS */;

-- Dumping structure for table thecustomshop.product_tag
DROP TABLE IF EXISTS `product_tag`;
CREATE TABLE IF NOT EXISTS `product_tag` (
  `tag_id` int(10) unsigned NOT NULL,
  `product_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`tag_id`,`product_id`),
  UNIQUE KEY `product_tag_tag_id_product_id_unique` (`tag_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_tag_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_tag_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table thecustomshop.product_tag: ~0 rows (approximately)
/*!40000 ALTER TABLE `product_tag` DISABLE KEYS */;
REPLACE INTO `product_tag` (`tag_id`, `product_id`) VALUES
	(9, 25),
	(14, 25),
	(9, 26),
	(9, 27),
	(16, 27),
	(9, 28),
	(9, 29),
	(12, 29),
	(9, 30),
	(17, 30),
	(9, 31),
	(9, 32),
	(9, 33),
	(9, 34),
	(12, 34),
	(9, 35),
	(9, 36),
	(9, 37),
	(9, 38),
	(9, 39),
	(8, 40),
	(8, 41),
	(8, 42),
	(8, 43),
	(8, 44),
	(8, 45),
	(8, 46),
	(6, 47),
	(14, 47);
/*!40000 ALTER TABLE `product_tag` ENABLE KEYS */;

-- Dumping structure for table thecustomshop.sessions
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table thecustomshop.sessions: ~1 rows (approximately)
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
REPLACE INTO `sessions` (`session_id`, `expires`, `data`) VALUES
	('5PkxSqsUND9J8KrMHpPxKxMJp-M6CPeF', 1545393541, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"basket":[]}'),
	('Fj9guel7SJAEUk0gZWaqmB6_f_Qw8Fya', 1545390153, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"basket":[]}'),
	('GjpZ1dkj-ttubX0-cY_i3IdtbEIcFItV', 1545389875, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"basket":[]}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;

-- Dumping structure for table thecustomshop.tag
DROP TABLE IF EXISTS `tag`;
CREATE TABLE IF NOT EXISTS `tag` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tag` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

-- Dumping data for table thecustomshop.tag: ~8 rows (approximately)
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
REPLACE INTO `tag` (`id`, `tag`) VALUES
	(1, 'two-piece'),
	(2, 'three-piece'),
	(6, 'shirts'),
	(8, 'ties'),
	(9, 'cuffs'),
	(12, 'blue'),
	(13, 'grey'),
	(14, 'purple'),
	(15, 'mosaic'),
	(16, 'silver'),
	(17, 'golden');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;

-- Dumping structure for table thecustomshop.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `lastlogin` datetime DEFAULT NULL,
  `gender` enum('M','F') DEFAULT NULL,
  `phonenumber` varchar(15) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table thecustomshop.user: ~0 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Dumping structure for table thecustomshop.user_detail
DROP TABLE IF EXISTS `user_detail`;
CREATE TABLE IF NOT EXISTS `user_detail` (
  `user_id` int(10) unsigned NOT NULL,
  `phone_number_add` varchar(15) DEFAULT NULL,
  `region` varchar(15) DEFAULT NULL,
  `city` varchar(15) DEFAULT NULL,
  `address1` varchar(80) DEFAULT NULL,
  `address2` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `user_detail_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table thecustomshop.user_detail: ~0 rows (approximately)
/*!40000 ALTER TABLE `user_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_detail` ENABLE KEYS */;

-- Dumping structure for table thecustomshop.user_measurement
DROP TABLE IF EXISTS `user_measurement`;
CREATE TABLE IF NOT EXISTS `user_measurement` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `category` varchar(20) DEFAULT NULL,
  `user_tag` varchar(20) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_measurement_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table thecustomshop.user_measurement: ~0 rows (approximately)
/*!40000 ALTER TABLE `user_measurement` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_measurement` ENABLE KEYS */;

-- Dumping structure for table thecustomshop.user_measurement_detail
DROP TABLE IF EXISTS `user_measurement_detail`;
CREATE TABLE IF NOT EXISTS `user_measurement_detail` (
  `m_id` int(10) unsigned NOT NULL,
  `neck_circumference` float DEFAULT NULL,
  `shoulder_width` float DEFAULT NULL,
  `chest_circumference` float DEFAULT NULL,
  `stomach_circumference` float DEFAULT NULL,
  `buttocks` float DEFAULT NULL,
  `jacket_length` float DEFAULT NULL,
  `shirt_length` float DEFAULT NULL,
  `bicep` float DEFAULT NULL,
  `jacket_sleeve_length` float DEFAULT NULL,
  `shirt_sleeve_length` float DEFAULT NULL,
  `wrist` float DEFAULT NULL,
  `waistcoat_length` float DEFAULT NULL,
  `coat_tail_length` float DEFAULT NULL,
  `waist` float DEFAULT NULL,
  `u_measurement` float DEFAULT NULL,
  `thigh` float DEFAULT NULL,
  `leg_length` float DEFAULT NULL,
  `trouser_leg_circumference` float DEFAULT NULL,
  PRIMARY KEY (`m_id`),
  CONSTRAINT `user_measurement_detail_ibfk_1` FOREIGN KEY (`m_id`) REFERENCES `user_measurement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table thecustomshop.user_measurement_detail: ~0 rows (approximately)
/*!40000 ALTER TABLE `user_measurement_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_measurement_detail` ENABLE KEYS */;

-- Dumping structure for table thecustomshop.user_wish
DROP TABLE IF EXISTS `user_wish`;
CREATE TABLE IF NOT EXISTS `user_wish` (
  `user_id` int(10) unsigned NOT NULL,
  `product_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `user_wish_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_wish_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table thecustomshop.user_wish: ~0 rows (approximately)
/*!40000 ALTER TABLE `user_wish` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_wish` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
