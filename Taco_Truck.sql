-- phpMyAdmin SQL Dump
-- version 4.0.6deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 05, 2014 at 07:02 PM
-- Server version: 5.5.35-0ubuntu0.13.10.2
-- PHP Version: 5.5.3-1ubuntu2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `Taco_Truck`
--
CREATE DATABASE Taco_Truck;
USE Taco_Truck;
-- --------------------------------------------------------

--
-- Table structure for table `Locations`
--

CREATE TABLE IF NOT EXISTS `Locations` (
  `LocationId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(60) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `City` varchar(255) NOT NULL,
  `State` varchar(50) NOT NULL,
  `Zipcode` int(11) NOT NULL,
  PRIMARY KEY (`LocationId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `Locations`
--

INSERT INTO `Locations` (`LocationId`, `Name`, `Address`, `City`, `State`, `Zipcode`) VALUES
(1, 'Klyde Warren Park', '2012 Woodall Rodgers Fwy', 'Dallas', 'TX', 75201),
(2, 'Southern Methodist Unversity', '6425 Boaz Lane', 'Dallas', 'TX', 75205),
(3, 'Addison Circle Park', 'Addison Circle', 'Addison', 'TX', 75001),
(4, 'Truck Yard', '5624 Sears St', 'Dallas', 'TX', 75206),
(5, 'Deep Ellum', '2630 Commerce St', 'Dallas', 'TX', 75226),
(6, 'Klyde Warren Park', '2012 Woodall Rodgers Fwy', 'Dallas', 'TX', 75201),
(7, 'Southern Methodist Unversity', '6425 Boaz Lane', 'Dallas', 'TX', 75205),
(8, 'Addison Circle Park', 'Addison Circle', 'Addison', 'TX', 75001),
(9, 'Truck Yard', '5624 Sears St', 'Dallas', 'TX', 75206),
(10, 'Deep Ellum', '2630 Commerce St', 'Dallas', 'TX', 75226);

-- --------------------------------------------------------

--
-- Table structure for table `Menu`
--

CREATE TABLE IF NOT EXISTS `Menu` (
  `TacoFixinId` int(11) NOT NULL AUTO_INCREMENT,
  `ItemType` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Price` double NOT NULL,
  `HeatRating` int(11) DEFAULT NULL,
  PRIMARY KEY (`TacoFixinId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=46 ;

--
-- Dumping data for table `Menu`
--

INSERT INTO `Menu` (`TacoFixinId`, `ItemType`, `Name`, `Price`, `HeatRating`) VALUES
(1, 'type', 'Steak', 1, 0),
(2, 'type', 'Chicken', 0.75, 0),
(3, 'type', 'Carnitas', 1, 0),
(4, 'type', 'Veggie', 0.5, 0),
(5, 'tortillas', 'Flour', 0.25, 0),
(6, 'tortillas', 'Cayenne', 0.35, 0),
(7, 'tortillas', 'Wheat', 0.35, 0),
(8, 'tortillas', 'Spinach', 0.3, 0),
(9, 'rice', 'Cilantro Rice', 0.25, 0),
(10, 'rice', 'Spanish Rice', 0.25, 0),
(11, 'cheese', 'Queso Fresco', 0.5, 0),
(12, 'cheese', 'Cheddar/Jack Mix', 0.35, 0),
(13, 'cheese', 'Monterrey Jack', 0.35, 0),
(14, 'beans', 'Refried Beans', 0.35, 0),
(15, 'beans', 'Whole Pinto Beans', 0.25, 0),
(16, 'beans', 'Black Beans', 0.1, 0),
(17, 'sauces', 'Hot Tomatillo', 0, 3),
(18, 'sauces', 'Death', 0, 4),
(19, 'sauces', 'Fresh Lime Juice', 0, 1),
(20, 'sauces', 'Bad Ass BBQ', 0, 2),
(21, 'sauces', 'Mild Tomatillo', 0, 2),
(22, 'sauces', 'Ranch', 0, 1),
(23, 'sauces', 'No Sauce', 0, 0),
(24, 'sauces', 'Habenero', 0, 3),
(25, 'sauces', 'Salsa', 0, 2),
(26, 'sauces', 'Ancho', 0, 1),
(27, 'sauces', 'Tomatillo', 0, 1),
(28, 'sauces', 'Herb Vinigrette', 0, 1),
(29, 'vegetables', 'Poblano Salsa', 0, 0),
(30, 'vegetables', 'Roasted Garlic', 0, 0),
(31, 'vegetables', 'Peppers/Onions', 0, 0),
(32, 'vegetables', 'Red Onion', 0, 0),
(33, 'vegetables', 'Jalapenos', 0, 0),
(34, 'vegetables', 'Pico de Gallo', 0, 0),
(35, 'vegetables', 'White Onion', 0, 0),
(36, 'vegetables', 'Tomatoes', 0, 0),
(37, 'vegetables', 'Cilantro', 0, 0),
(38, 'vegetables', 'Tortilla Strips', 0, 0),
(39, 'vegetables', 'Lettuce', 0, 0),
(40, 'extras', 'X - Extra Meat/Veggies', 1, 0),
(41, 'extras', 'Sour Cream', 0.75, 0),
(42, 'extras', 'Guacamole', 0.75, 0),
(43, 'extras', 'Queso', 0.5, 0),
(44, 'extras', 'Sliced Avocado', 0.75, 0),
(45, 'extras', 'Bacon', 0.5, 0);

-- --------------------------------------------------------

--
-- Table structure for table `OrderItem`
--

CREATE TABLE IF NOT EXISTS `OrderItem` (
  `OrderItemId` int(11) NOT NULL AUTO_INCREMENT,
  `OrderId` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  PRIMARY KEY (`OrderItemId`,`OrderId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- Dumping data for table `OrderItem`
--

INSERT INTO `OrderItem` (`OrderItemId`, `OrderId`, `Quantity`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 1),
(4, 1, 2),
(5, 2, 2),
(6, 2, 2),
(7, 2, 2),
(8, 2, 3),
(9, 3, 1),
(10, 3, 1),
(11, 3, 1),
(12, 3, 1),
(13, 4, 1),
(14, 4, 1),
(15, 4, 1),
(16, 4, 3),
(17, 5, 2),
(18, 5, 1),
(19, 5, 2),
(20, 5, 3);

-- --------------------------------------------------------

--
-- Table structure for table `OrderItemDetails`
--

CREATE TABLE IF NOT EXISTS `OrderItemDetails` (
  `OrderItemDetailId` int(11) NOT NULL AUTO_INCREMENT,
  `OrderItemId` int(11) NOT NULL,
  `TacoFixinId` int(11) NOT NULL,
  PRIMARY KEY (`OrderItemDetailId`,`OrderItemId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=104 ;

--
-- Dumping data for table `OrderItemDetails`
--

INSERT INTO `OrderItemDetails` (`OrderItemDetailId`, `OrderItemId`, `TacoFixinId`) VALUES
(1, 1, 1),
(2, 1, 5),
(3, 1, 16),
(4, 2, 2),
(5, 2, 6),
(6, 2, 9),
(7, 2, 16),
(8, 3, 3),
(9, 3, 7),
(10, 3, 20),
(11, 3, 41),
(12, 4, 4),
(13, 4, 8),
(14, 4, 18),
(15, 5, 4),
(16, 5, 8),
(17, 5, 32),
(18, 5, 11),
(19, 5, 30),
(20, 5, 36),
(21, 5, 14),
(22, 5, 40),
(23, 6, 3),
(24, 6, 7),
(25, 6, 9),
(26, 6, 16),
(27, 6, 18),
(28, 6, 30),
(29, 6, 31),
(30, 6, 40),
(31, 6, 41),
(32, 7, 2),
(33, 7, 6),
(34, 7, 40),
(35, 7, 41),
(36, 7, 42),
(37, 8, 1),
(38, 8, 5),
(39, 8, 9),
(40, 8, 14),
(41, 8, 38),
(42, 9, 1),
(43, 9, 5),
(44, 9, 26),
(45, 9, 33),
(46, 9, 39),
(47, 10, 2),
(48, 10, 5),
(49, 10, 11),
(50, 10, 10),
(51, 10, 14),
(52, 10, 18),
(53, 10, 29),
(54, 10, 30),
(55, 10, 31),
(56, 10, 32),
(57, 11, 3),
(58, 11, 5),
(59, 11, 38),
(60, 11, 30),
(61, 12, 4),
(62, 12, 6),
(63, 12, 9),
(64, 12, 16),
(65, 12, 17),
(66, 12, 44),
(67, 13, 4),
(68, 13, 6),
(69, 13, 16),
(70, 14, 3),
(71, 14, 5),
(72, 14, 10),
(73, 14, 13),
(74, 14, 20),
(75, 14, 30),
(76, 15, 2),
(77, 15, 7),
(78, 15, 25),
(79, 15, 32),
(80, 15, 33),
(81, 16, 1),
(82, 16, 8),
(83, 16, 9),
(84, 16, 21),
(85, 16, 35),
(86, 17, 1),
(87, 17, 8),
(88, 17, 22),
(89, 17, 30),
(90, 17, 31),
(91, 18, 2),
(92, 18, 8),
(93, 19, 3),
(94, 19, 7),
(95, 19, 33),
(96, 20, 4),
(97, 20, 6),
(98, 20, 30),
(99, 20, 31),
(100, 20, 32),
(101, 20, 33),
(102, 20, 39),
(103, 20, 40);

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE IF NOT EXISTS `Orders` (
  `OrderId` int(2) DEFAULT NULL,
  `UserId` int(2) DEFAULT NULL,
  `Date` varchar(19) DEFAULT NULL,
  `Total` varchar(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Orders`
--

INSERT INTO `Orders` (`OrderId`, `UserId`, `Date`, `Total`) VALUES
(1, 1, '12/22/2014 5:57:19', '$68.15'),
(2, 1, '1/14/2015 6:56:35', '$28.51'),
(3, 2, '12/23/2013 12:50:40', '$91.76'),
(4, 2, '4/27/2013 8:41:09', '$23.46'),
(5, 3, '2/13/2014 18:33:08', '$9.26'),
(6, 3, '10/6/2013 2:07:47', '$51.78'),
(7, 4, '12/9/2014 1:25:38', '$18.32'),
(8, 4, '5/11/2013 16:03:37', '$21.24'),
(9, 5, '9/19/2014 15:17:08', '$98.65'),
(10, 5, '6/20/2014 9:29:33', '$20.1'),
(11, 6, '3/25/2013 1:03:52', '$22.82'),
(12, 6, '1/20/2014 0:59:20', '$75.48'),
(13, 7, '9/27/2014 12:52:10', '$52.44'),
(14, 7, '1/8/2015 3:47:51', '$60.46'),
(15, 8, '10/19/2013 8:53:41', '$22.7'),
(16, 8, '7/29/2014 10:15:40', '$60.6'),
(17, 9, '7/9/2014 7:47:40', '$70.42'),
(18, 9, '2/27/2014 19:49:39', '$27.05'),
(19, 10, '5/23/2014 16:23:46', '$32.9'),
(20, 10, '5/22/2013 5:16:24', '$44.23'),
(21, 1, '7/14/2014 14:44:12', '$37.92'),
(22, 2, '9/25/2013 12:17:35', '$18.76'),
(23, 3, '2/21/2014 9:49:30', '$34.4'),
(24, 4, '5/8/2014 2:34:09', '$75.92'),
(25, 5, '10/28/2014 19:26:35', '$69.64'),
(26, 6, '5/22/2013 0:51:56', '$13.3'),
(27, 7, '2/28/2014 12:10:06', '$1.69'),
(28, 8, '1/16/2014 14:24:49', '$56.42'),
(29, 9, '3/21/2013 9:28:10', '$15.94');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE IF NOT EXISTS `Users` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `GivenName` varchar(50) NOT NULL,
  `Surname` varchar(50) NOT NULL,
  `EmailAddress` varchar(40) NOT NULL,
  `Password` varchar(20) NOT NULL,
  `TelephoneNumber` varchar(12) NOT NULL,
  `CC_Provider` varchar(30) NOT NULL,
  `CC_Number` varchar(20) NOT NULL,
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`UserId`, `GivenName`, `Surname`, `EmailAddress`, `Password`, `TelephoneNumber`, `CC_Provider`, `CC_Number`) VALUES
(1, 'Bobby', 'Dickerson', 'BobbyDDickerson@armyspy.com', 'oom1duH0quei', '310-706-5713', 'Visa', '4581172250956295'),
(2, 'John', 'Horan', 'JohnMHoran@cuvox.de', 'uM0zohG5', '802-906-9635', 'Visa', '4833554465137429'),
(3, 'Lula', 'Benjamin', 'LulaTBenjamin@einrot.com', 'ohF0zooquu1', '641-740-3120', 'Visa', '4173199486453080'),
(4, 'Franklin', 'Hills', 'FranklinIHills@rhyta.com', 'eeWahXo5ee', '402-647-8591', 'Visa', '4937182773835950'),
(5, 'Samuel', 'Blevins', 'SamuelCBlevins@cuvox.de', 'TaeXo2OoV8u', '815-982-3812', 'American Express', '379823789416348'),
(6, 'William', 'Raymond', 'WilliamRRaymond@cuvox.de', 'Jiech8aiCh', '732-432-0200', 'American Express', '345650978113056'),
(7, 'Janice', 'Robertson', 'JaniceRRobertson@superrito.com', 'kohgae4OeGh', '479-214-4112', 'American Express', '375651072455574'),
(8, 'Lashawn', 'Lambert', 'LashawnTLambert@einrot.com', 'Lu0icho2yee', '859-955-0616', 'American Express', '342691124360073'),
(9, 'Vanessa', 'Seals', 'VanessaGSeals@dayrep.com', 'tooWee3Mo6ae', '417-629-4257', 'Mastercard', '5513462587501850'),
(10, 'Bethany', 'Tong', 'BethanyETong@dayrep.com', 'ahC7Veigha', '937-260-7087', 'Mastercard', '5345523630534291');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
