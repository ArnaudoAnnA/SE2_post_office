-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2023 at 12:53 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_se2_2023_team3`
--

-- --------------------------------------------------------

--
-- Table structure for table `configuration`
--

DROP TABLE IF EXISTS `configuration`;
CREATE TABLE `configuration` (
  `CounterID` int(11) NOT NULL,
  `ServiceID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `configuration`
--

INSERT INTO `configuration` (`CounterID`, `ServiceID`) VALUES
(1, 1),
(1, 3),
(2, 2),
(2, 4),
(3, 1),
(3, 4),
(4, 2),
(4, 4),
(5, 1),
(5, 2),
(6, 3),
(6, 4),
(7, 1),
(7, 3),
(8, 2),
(8, 3);

-- --------------------------------------------------------

--
-- Table structure for table `counter`
--

DROP TABLE IF EXISTS `counter`;
CREATE TABLE `counter` (
  `CounterID` int(11) NOT NULL,
  `Description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `counter`
--

INSERT INTO `counter` (`CounterID`, `Description`) VALUES
(1, 'Counter 1'),
(2, 'Counter 2'),
(3, 'Counter 3'),
(4, 'Counter 4'),
(5, 'Counter 5'),
(6, 'Counter 6'),
(7, 'Counter 7'),
(8, 'Counter 8');

-- --------------------------------------------------------

--
-- Table structure for table `queues`
--

DROP TABLE IF EXISTS `queues`;
CREATE TABLE `queues` (
  `ServiceID` int(11) NOT NULL,
  `ClientNumber` int(11) NOT NULL,
  `CounterID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `queues`
--

INSERT INTO `queues` (`ServiceID`, `ClientNumber`, `CounterID`) VALUES
(2, 1, 2),
(1, 2, 1),
(4, 4, 3),
(4, 6, 4),
(4, 7, 6),
(1, 8, 5),
(1, 9, 7),
(2, 12, 8),
(3, 15, NULL),
(1, 16, NULL),
(4, 17, NULL),
(2, 18, NULL),
(3, 19, NULL),
(4, 20, NULL),
(1, 21, NULL),
(3, 22, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
CREATE TABLE `service` (
  `ServiceID` int(11) NOT NULL,
  `Description` varchar(30) NOT NULL,
  `ServiceTime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`ServiceID`, `Description`, `ServiceTime`) VALUES
(1, 'Shipping', 10),
(2, 'Accounts Management', 20),
(3, 'Bills', 15),
(4, 'Current Account Service', 25);

-- --------------------------------------------------------

--
-- Table structure for table `statistics`
--

DROP TABLE IF EXISTS `statistics`;
CREATE TABLE `statistics` (
  `ID` int(11) NOT NULL,
  `CounterID` int(11) NOT NULL,
  `ServiceID` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `statistics`
--

INSERT INTO `statistics` (`ID`, `CounterID`, `ServiceID`, `date`) VALUES
(1, 2, 2, '2023-10-22'),
(2, 1, 1, '2023-10-22'),
(3, 1, 3, '2023-10-23'),
(4, 3, 4, '2023-10-23'),
(5, 2, 4, '2023-10-24'),
(6, 4, 4, '2023-10-24'),
(7, 6, 4, '2023-10-25'),
(8, 5, 1, '2023-10-25'),
(9, 7, 1, '2023-10-26'),
(10, 4, 2, '2023-10-26'),
(11, 5, 2, '2023-10-27'),
(12, 8, 2, '2023-10-27'),
(13, 6, 3, '2023-10-28'),
(14, 7, 3, '2023-10-28'),
(15, 4, 2, '2023-10-24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `configuration`
--
ALTER TABLE `configuration`
  ADD PRIMARY KEY (`CounterID`,`ServiceID`),
  ADD KEY `ServiceID` (`ServiceID`);

--
-- Indexes for table `counter`
--
ALTER TABLE `counter`
  ADD UNIQUE KEY `CounterID` (`CounterID`),
  ADD UNIQUE KEY `CounterID_2` (`CounterID`),
  ADD UNIQUE KEY `CounterID_3` (`CounterID`);

--
-- Indexes for table `queues`
--
ALTER TABLE `queues`
  ADD PRIMARY KEY (`ClientNumber`),
  ADD KEY `ServiceID` (`ServiceID`),
  ADD KEY `CounterID` (`CounterID`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`ServiceID`),
  ADD UNIQUE KEY `ServiceID` (`ServiceID`);

--
-- Indexes for table `statistics`
--
ALTER TABLE `statistics`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `CounterID` (`CounterID`),
  ADD KEY `ServiceID` (`ServiceID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `counter`
--
ALTER TABLE `counter`
  MODIFY `CounterID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `queues`
--
ALTER TABLE `queues`
  MODIFY `ClientNumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `ServiceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `statistics`
--
ALTER TABLE `statistics`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `configuration`
--
ALTER TABLE `configuration`
  ADD CONSTRAINT `configuration_ibfk_1` FOREIGN KEY (`CounterID`) REFERENCES `counter` (`CounterID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `configuration_ibfk_2` FOREIGN KEY (`ServiceID`) REFERENCES `service` (`ServiceID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `queues`
--
ALTER TABLE `queues`
  ADD CONSTRAINT `queues_ibfk_1` FOREIGN KEY (`ServiceID`) REFERENCES `service` (`ServiceID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `queues_ibfk_2` FOREIGN KEY (`CounterID`) REFERENCES `counter` (`CounterID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `statistics`
--
ALTER TABLE `statistics`
  ADD CONSTRAINT `statistics_ibfk_1` FOREIGN KEY (`CounterID`) REFERENCES `counter` (`CounterID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `statistics_ibfk_2` FOREIGN KEY (`ServiceID`) REFERENCES `service` (`ServiceID`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
