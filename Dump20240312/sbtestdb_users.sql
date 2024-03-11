-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: sbtestdb
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` text NOT NULL,
  `secondName` text,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `photo` text,
  `registrationDate` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('272493c1-ade0-4670-b7e7-ebe412a3a988','Oleg','Olegov','89745ewrterg@mail.ru','b108fdf8c7b6bdd4e66a6e3e2d5dd3636456831fad30fda68a8f821eeee02714','Male','19fa3240df10480e0b7971cc7aeb5e6e.jpg','2024-03-11 16:14:42','2024-03-11 18:30:36'),('340a132f-e59c-4351-87a6-777c5d827da6','Vladimir',NULL,'zxcvbn@mail.ru','b108fdf8c7b6bdd4e66a6e3e2d5dd3636456831fad30fda68a8f821eeee02714',NULL,NULL,'2024-03-10 11:10:04','2024-03-10 11:10:04'),('a1f8a87e-dec4-4d82-b031-15595f012f54','Vladimir','Ivanov','zaqwsxcderrfv@mail.ru','b108fdf8c7b6bdd4e66a6e3e2d5dd3636456831fad30fda68a8f821eeee02714','Male','photo2.jpg','2024-03-10 15:35:12','2024-03-10 16:46:16'),('c90380e4-2548-4cb5-b16e-5e065b9ab91d','Vladimir','Ivanov','asdfgh@mail.ru','b108fdf8c7b6bdd4e66a6e3e2d5dd3636456831fad30fda68a8f821eeee02714','Male','photo1.jpg','2024-03-10 08:53:00','2024-03-10 11:06:23');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-12  1:41:07
