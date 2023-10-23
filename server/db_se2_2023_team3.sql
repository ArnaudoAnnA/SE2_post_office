-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Ott 22, 2023 alle 10:21
-- Versione del server: 10.4.24-MariaDB
-- Versione PHP: 8.1.6

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
-- Struttura della tabella `configuration`
--

CREATE TABLE `configuration` (
  `CounterID` int(11) NOT NULL,
  `ServiceID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `configuration`
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
-- Struttura della tabella `counter`
--

CREATE TABLE `counter` (
  `CounterID` int(11) NOT NULL,
  `Description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `counter`
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
-- Struttura della tabella `queues`
--

CREATE TABLE `queues` (
  `ServiceID` int(11) NOT NULL,
  `ClientNumber` int(11) NOT NULL,
  `CounterID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `queues`
--

INSERT INTO `queues` (`ServiceID`, `ClientNumber`, `CounterID`) VALUES
(2, 1, 2),
(1, 2, 3),
(3, 3, null),
(4, 4, 3),
(4, 5, 4),
(4, 6, null),
(4, 7, null),
(1, 8, null),
(1, 9, null),
(2, 10, null),
(2, 11, null),
(2, 12, null),
(3, 13, null),
(3, 14, null);

-- --------------------------------------------------------

--
-- Struttura della tabella `service`
--

CREATE TABLE `service` (
  `ServiceID` int(11) NOT NULL,
  `Description` varchar(30) NOT NULL,
  `ServiceTime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `service`
--

INSERT INTO `service` (`ServiceID`, `Description`, `ServiceTime`) VALUES
(1, 'Shipping', 10),
(2, 'Accounts Management', 20),
(3, 'Bills', 15),
(4, 'Current Account Service', 25);

-- --------------------------------------------------------

--
-- Struttura della tabella `statistics`
--

CREATE TABLE `statistics` (
  `ID` int(11) NOT NULL,
  `CounterID` int(11) NOT NULL,
  `ServiceID` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `statistics`
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
(14, 7, 3, '2023-10-28');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `configuration`
--
ALTER TABLE `configuration`
  ADD PRIMARY KEY (`CounterID`,`ServiceID`),
  ADD KEY `ServiceID` (`ServiceID`);

--
-- Indici per le tabelle `counter`
--
ALTER TABLE `counter`
  ADD UNIQUE KEY `CounterID` (`CounterID`),
  ADD UNIQUE KEY `CounterID_2` (`CounterID`),
  ADD UNIQUE KEY `CounterID_3` (`CounterID`);

--
-- Indici per le tabelle `queues`
--
ALTER TABLE `queues`
  ADD PRIMARY KEY (`ClientNumber`),
  ADD KEY `ServiceID` (`ServiceID`),
  ADD KEY `CounterID` (`CounterID`);

--
-- Indici per le tabelle `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`ServiceID`),
  ADD UNIQUE KEY `ServiceID` (`ServiceID`);

--
-- Indici per le tabelle `statistics`
--
ALTER TABLE `statistics`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `CounterID` (`CounterID`),
  ADD KEY `ServiceID` (`ServiceID`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `counter`
--
ALTER TABLE `counter`
  MODIFY `CounterID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT per la tabella `queues`
--
ALTER TABLE `queues`
  MODIFY `ClientNumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT per la tabella `service`
--
ALTER TABLE `service`
  MODIFY `ServiceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `statistics`
--
ALTER TABLE `statistics`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `configuration`
--
ALTER TABLE `configuration`
  ADD CONSTRAINT `configuration_ibfk_1` FOREIGN KEY (`CounterID`) REFERENCES `counter` (`CounterID`),
  ADD CONSTRAINT `configuration_ibfk_2` FOREIGN KEY (`ServiceID`) REFERENCES `service` (`ServiceID`);

--
-- Limiti per la tabella `queues`
--
ALTER TABLE `queues`
  ADD CONSTRAINT `queues_ibfk_1` FOREIGN KEY (`ServiceID`) REFERENCES `service` (`ServiceID`),
  ADD CONSTRAINT `queues_ibfk_2` FOREIGN KEY (`CounterID`) REFERENCES `counter` (`CounterID`);

--
-- Limiti per la tabella `statistics`
--
ALTER TABLE `statistics`
  ADD CONSTRAINT `statistics_ibfk_1` FOREIGN KEY (`CounterID`) REFERENCES `counter` (`CounterID`),
  ADD CONSTRAINT `statistics_ibfk_2` FOREIGN KEY (`ServiceID`) REFERENCES `service` (`ServiceID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
