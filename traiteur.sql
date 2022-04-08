-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2021 at 09:08 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `traiteur`
--
CREATE DATABASE IF NOT EXISTS `traiteur` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `traiteur`;

-- --------------------------------------------------------

--
-- Table structure for table `commandes`
--

CREATE TABLE `commandes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `plat_id` int(11) DEFAULT NULL,
  `portion` varchar(50) DEFAULT NULL,
  `options` varchar(50) DEFAULT NULL,
  `prix` decimal(5,2) DEFAULT NULL,
  `quantite` tinyint(3) DEFAULT NULL,
  `dans_panier` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `commandes`
--

INSERT INTO `commandes` (`id`, `user_id`, `plat_id`, `portion`, `options`, `prix`, `quantite`, `dans_panier`, `createdAt`, `updatedAt`) VALUES
(5, 2, 3, 'individuelle', 'non végétarienne', '7.60', 2, 1, '2021-12-16 16:33:21', '2021-12-17 19:21:36'),
(6, 2, 5, 'familiale', 'non végétarienne', '6.00', 3, 1, '2021-12-16 21:34:04', '2021-12-17 19:51:49'),
(10, 2, 8, 'individuelle', 'non végétarienne', '10.00', 2, 1, '2021-12-17 19:27:31', '2021-12-17 19:52:56'),
(11, 2, 8, 'pour deux', 'non végétarienne', '10.00', 2, 1, '2021-12-17 19:53:23', '2021-12-17 19:53:23');

-- --------------------------------------------------------

--
-- Table structure for table `plats`
--

CREATE TABLE `plats` (
  `plat_id` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `description` text NOT NULL,
  `options` varchar(50) DEFAULT NULL,
  `prix` decimal(5,2) DEFAULT NULL,
  `actif` tinyint(1) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `plats`
--

INSERT INTO `plats` (`plat_id`, `nom`, `description`, `options`, `prix`, `actif`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'La poutine du roi', 'De la viande, du fromage et quelques secrets du chef', 'non végétarienne', '10.50', 0, 'logo.png', '2021-12-16 03:09:39', '2021-12-16 03:24:35'),
(2, 'La salade spéciale', 'Des fines herbes de chez nous', 'végétarienne', '8.90', 1, 'vege1.jpg', '2021-12-16 03:11:04', '2021-12-16 03:11:04'),
(3, 'Le poisson d\'or', 'Issu du lac Miam-miam', 'non végétarienne', '7.60', 1, 'poisson.png', '2021-12-16 03:12:32', '2021-12-16 03:12:32'),
(5, 'Amusons-nous', 'Une spécialité du dimanche', 'non végétarienne', '7.60', 1, 'surf.jpg', '2021-12-16 03:15:23', '2021-12-16 03:20:59'),
(6, 'La pizza du jour', 'les ingrédients du terroir', 'végétarienne', '8.00', 1, 'pizza_vege1.jpg', '2021-12-17 06:42:36', '2021-12-17 06:42:36'),
(8, 'Burger du sportif', 'Vient avec une fraîche..', 'non végétarienne', '10.00', 1, 'burger1.jpg', '2021-12-17 06:54:22', '2021-12-17 06:54:22'),
(10, 'Pizza delicious', 'Une délice ronde', 'non végétarienne', '11.00', 0, 'pizza1.jpg', '2021-12-17 07:29:17', '2021-12-17 07:29:17'),
(12, 'Le dessert du coin', 'Mielleux', 'végétarienne', '5.00', 1, 'dessert1jpg.jpg', '2021-12-17 07:35:04', '2021-12-17 07:35:04');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `username` text DEFAULT NULL,
  `about` text DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `type_compte` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `firstname`, `lastname`, `username`, `about`, `email`, `password`, `last_login`, `status`, `type_compte`, `createdAt`, `updatedAt`) VALUES
(1, 'Bertin', 'BMM', 'Bertin', 'rrer', 'fsdfsfs', '123', '2021-12-14 20:37:33', 'active', 'administrateur', '2021-12-14 20:37:33', '2021-12-14 20:37:33'),
(2, 'Patricia', 'Mouya', 'pat', 'dsfs', 'ddffdg', '123', '2021-12-15 04:46:44', 'active', 'client', '2021-12-15 04:46:44', '2021-12-15 04:46:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `commandes`
--
ALTER TABLE `commandes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `plat_id` (`plat_id`);

--
-- Indexes for table `plats`
--
ALTER TABLE `plats`
  ADD PRIMARY KEY (`plat_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `commandes`
--
ALTER TABLE `commandes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `plats`
--
ALTER TABLE `plats`
  MODIFY `plat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `commandes`
--
ALTER TABLE `commandes`
  ADD CONSTRAINT `commandes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `commandes_ibfk_2` FOREIGN KEY (`plat_id`) REFERENCES `plats` (`plat_id`) ON DELETE CASCADE ON UPDATE CASCADE;


--
-- Metadata
--
USE `phpmyadmin`;

--
-- Metadata for table commandes
--

--
-- Metadata for table plats
--

--
-- Metadata for table users
--

--
-- Metadata for database traiteur
--
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
