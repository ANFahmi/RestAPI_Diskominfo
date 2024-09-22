-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql12.freesqldatabase.com
-- Generation Time: Sep 22, 2024 at 08:26 AM
-- Server version: 5.5.62-0ubuntu0.14.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql12732611`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `created_at`, `updated_at`) VALUES
(1, '2024-09-21 23:46:26', '2024-09-21 23:46:26'),
(2, '2024-09-21 23:47:19', '2024-09-21 23:47:19'),
(4, '2024-09-21 23:47:57', '2024-09-21 23:47:57'),
(5, '2024-09-21 23:48:18', '2024-09-21 23:48:18'),
(6, '2024-09-21 23:51:24', '2024-09-21 23:51:24'),
(7, '2024-09-21 23:52:05', '2024-09-21 23:52:05');

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_item`
--

INSERT INTO `order_item` (`id`, `order_id`, `product_id`, `quantity`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 5, '2024-09-21 23:46:26', '2024-09-21 23:46:26'),
(2, 1, 3, 5, '2024-09-21 23:46:26', '2024-09-21 23:46:26'),
(5, 4, 4, 5, '2024-09-21 23:47:57', '2024-09-21 23:47:57'),
(6, 4, 6, 5, '2024-09-21 23:47:57', '2024-09-21 23:47:57'),
(7, 5, 4, 5, '2024-09-21 23:48:18', '2024-09-21 23:48:18'),
(8, 5, 6, 5, '2024-09-21 23:48:18', '2024-09-21 23:48:18'),
(9, 7, 3, 5, '2024-09-21 23:52:05', '2024-09-21 23:52:05');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `sold` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `stock`, `sold`, `created_at`, `updated_at`) VALUES
(2, 'Laptop Y', 15000000, 10, 5, '2024-09-21 23:42:13', '2024-09-21 23:46:26'),
(3, 'Laptop Z', 15000000, 20, 10, '2024-09-21 23:42:18', '2024-09-22 00:36:39'),
(4, 'Laptop A', 20000000, 5, 10, '2024-09-21 23:43:06', '2024-09-21 23:52:49'),
(6, 'Laptop R', 20000000, 5, 10, '2024-09-21 23:44:38', '2024-09-21 23:52:49');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `iduser` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `hobby` varchar(45) NOT NULL,
  `age` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`iduser`, `name`, `email`, `hobby`, `age`) VALUES
(1, 'Fahmi', 'fahmianf@gmail.com', 'Lari', 25),
(2, 'Gusti Ayu Istiara Bukian', 'istiara@gmail.com', 'Makan Cireng', 22),
(3, 'Tiara', 'tiara@gmail.com', 'Fotografi', 20),
(4, 'Mimi', 'mimi@gmail.com', 'Belajar', 25);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`iduser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `iduser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
