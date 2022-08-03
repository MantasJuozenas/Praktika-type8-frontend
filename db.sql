-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Aug 03, 2022 at 05:00 AM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `type8-praktikinis-darbas`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `answer_id` int(11) NOT NULL,
  `a_user_id` int(11) NOT NULL,
  `a_question_id` int(11) NOT NULL,
  `a_body` text NOT NULL,
  `a_time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `a_edited` tinyint(1) DEFAULT NULL,
  `a_edited_time_stamp` text,
  `a_like` int(11) NOT NULL DEFAULT '0',
  `a_dislike` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`answer_id`, `a_user_id`, `a_question_id`, `a_body`, `a_time_stamp`, `a_edited`, `a_edited_time_stamp`, `a_like`, `a_dislike`) VALUES
(1, 1, 8, 'Kazkas kazka', '2022-07-26 12:36:17', NULL, '2022-07-26 15:36:17', 6, 4),
(2, 2, 8, 'answers test body', '2022-07-27 08:52:52', NULL, '2022-07-27 11:52:52', 2, 2),
(3, 2, 9, 'answers test body', '2022-07-27 08:58:10', NULL, '2022-07-27 11:58:10', 0, 0),
(4, 4, 8, 'Edited test body', '2022-08-01 12:41:43', 1, '2022-08-01', 0, 0),
(5, 4, 8, 'Test answer posting', '2022-08-01 12:41:54', NULL, NULL, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` int(11) NOT NULL,
  `q_title` varchar(225) NOT NULL,
  `q_body` text NOT NULL,
  `q_user_id` int(11) NOT NULL,
  `q_time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `q_edited` tinyint(1) DEFAULT NULL,
  `q_editet_time_stamp` text,
  `q_like` int(11) NOT NULL DEFAULT '0',
  `q_dislike` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `q_title`, `q_body`, `q_user_id`, `q_time_stamp`, `q_edited`, `q_editet_time_stamp`, `q_like`, `q_dislike`) VALUES
(4, 'Edited test', 'Edited test body', 1, '2022-07-26 10:52:18', 1, '2022-08-01 17:05:01', 8, 6),
(6, 'Edited test', 'adwwadwadawdawdawdad', 1, '2022-07-26 12:33:27', 1, '2022-07-29 10:26:00', 0, 0),
(7, 'Testukas2', 'test2', 1, '2022-07-26 12:33:28', NULL, NULL, 0, 0),
(8, 'Testukas2', 'test2', 1, '2022-07-26 12:33:28', NULL, NULL, 1, 0),
(9, 'Testukas2', 'test2', 1, '2022-07-27 08:57:29', NULL, NULL, 0, 0),
(10, 'I would like to know if it work or no', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus molestiae voluptate atque dolores, quas non totam vitae voluptatum dolor quae quos deserunt aut in nostrum id quaerat quisquam itaque cum provident excepturi quia temporibus iure libero! Illo nemo dolore nostrum distinctio nesciunt laborum, pariatur vel voluptatem quasi animi aut harum!Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus molestiae voluptate atque dolores, quas non totam vitae voluptatum dolor quae quos deserunt aut in nostrum id quaerat quisquam itaque cum provident excepturi quia temporibus iure libero! Illo nemo dolore nostrum distinctio nesciunt laborum, pariatur vel voluptatem quasi animi aut harum!', 1, '2022-07-28 17:39:41', NULL, NULL, 0, 0),
(11, 'This is simple test', 'This is a simple test if post works. This is a simple test if post works. This is a simple test if post works. This is a simple test if post works. This is a simple test if post works. This is a simple test if post works. This is a simple test if post works. This is a simple test if post works. This is a simple test if post works. This is a simple test if post works. This is a simple test if post works. This is a simple test if post works. ', 4, '2022-08-01 10:27:16', 1, '2022-08-01 17:03:22', 0, 0),
(12, 'How can I check that a string does not include the text of another string?', 'Edit the JS includes method would probably be your best bet. I get I\'m a little late in answering this question, I was just googling this myself and came up with this answer after some fiddling with the code. This code will return true if toState.name does NOT include the string given.\n\nHope this helps anyone searching the same question I had!', 4, '2022-08-01 10:29:12', 1, '2022-08-01 15:19:01', 0, 0),
(24, 'sadasd', 'adasdasdasda', 4, '2022-08-02 07:34:57', NULL, NULL, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(20) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `created_at`) VALUES
(1, 'Testas', 'Testukas', '$2a$10$nUZzsvP2M7l69I/6Fsbu4OpxdvFjQv5ZGMuyqeZjmJ.fjIJmLOrHm', '2022-07-26 09:43:57'),
(3, 'test@test.com', 'Testas', '$2a$10$Brgiu2VwTZQLxaC7JzKS6.vGzb17F.koGg/oHQt/vMKB8nOrCW0Hu', '2022-07-28 12:12:55'),
(4, 'm.juozenas@gmail.com', 'Mantas', '$2a$10$dfF55ZH/zMwVbkAigUboeuUgjl6snSMa5uDvVlWabh6jGakkYvkFG', '2022-07-28 12:23:33'),
(6, 'eve.holt@reqres.in', 'John', '$2a$10$gxhN80Z63rQo36UVAcGdm.4yoWKnMWk90GsRYFw01q1DTxsMvROl6', '2022-07-28 12:25:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`answer_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `answer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
