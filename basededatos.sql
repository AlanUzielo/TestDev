-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: juntas
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE juntas;

USE juntas;

--
-- Table structure for table `reservacion`
--

DROP TABLE IF EXISTS `reservacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservacion` (
  `id_reservacion` int NOT NULL AUTO_INCREMENT,
  `id_sala` int NOT NULL,
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime NOT NULL,
  PRIMARY KEY (`id_reservacion`,`id_sala`),
  KEY `id_sala_idx` (`id_sala`),
  CONSTRAINT `id_sala` FOREIGN KEY (`id_sala`) REFERENCES `sala` (`id_sala`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservacion`
--

LOCK TABLES `reservacion` WRITE;
/*!40000 ALTER TABLE `reservacion` DISABLE KEYS */;
INSERT INTO `reservacion` VALUES (35,6,'2024-05-29 15:59:00','2024-05-29 16:59:00'),(38,18,'2024-05-24 07:00:00','2024-05-24 08:59:00'),(39,18,'2024-05-24 09:00:00','2024-05-24 10:59:00'),(40,18,'2024-05-24 11:00:00','2024-05-24 12:59:00'),(41,10,'2024-05-29 16:00:00','2024-05-29 17:59:00'),(43,12,'2024-05-31 20:00:00','2024-05-31 21:59:00'),(44,14,'2024-05-24 12:00:00','2024-05-24 13:59:00'),(47,11,'2024-05-30 15:00:00','2024-05-30 16:59:00'),(48,9,'2024-05-31 14:00:00','2024-05-31 15:59:00'),(49,10,'2024-05-31 13:00:00','2024-05-31 14:59:00'),(51,10,'2024-05-25 11:00:00','2024-05-25 12:59:00');
/*!40000 ALTER TABLE `reservacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sala`
--

DROP TABLE IF EXISTS `sala`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sala` (
  `id_sala` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `ubicacion` varchar(45) NOT NULL,
  `capacidad` int NOT NULL,
  PRIMARY KEY (`id_sala`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sala`
--

LOCK TABLES `sala` WRITE;
/*!40000 ALTER TABLE `sala` DISABLE KEYS */;
INSERT INTO `sala` VALUES (6,'Hellen Keller','Av. Poliducto #51',35),(9,'Horizonte','Calle Ejecutiva #456, Ciudad Ejecutiva',20),(10,'Centro Vivo','Plaza Central #789, Ciudad Central',100),(11,'InnovaSpace',' Av. Innovación #101, Ciudad Innovadora',30),(12,'TechNexus','Av. Tecnología #246, Ciudad Tecnológica',70),(14,'Bicentenario','Av. Independencia #200',20),(15,'Victoria Medina','Edificio Principal',10),(16,'Saturino Herrán','Segundo Piso',25),(17,'Confluencia','Tercer piso',16),(18,'Sin Fronteras','Av. López Mateos #512',60),(20,'Premium','Pulgas Pandas',80);
/*!40000 ALTER TABLE `sala` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-21 23:54:02
