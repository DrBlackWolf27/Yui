-- MySQL dump 10.13  Distrib 8.0.21, for Linux (x86_64)
--
-- Host: localhost    Database: shop
-- ------------------------------------------------------
-- Server version	8.0.21-0ubuntu0.20.04.4

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

--
-- Table structure for table `cookie_to_account`
--

DROP TABLE IF EXISTS `cookie_to_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cookie_to_account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_token` varchar(255) DEFAULT NULL,
  `time` varchar(50) DEFAULT NULL,
  `cookie` varchar(750) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cookie_to_account`
--

LOCK TABLES `cookie_to_account` WRITE;
/*!40000 ALTER TABLE `cookie_to_account` DISABLE KEYS */;
INSERT INTO `cookie_to_account` VALUES (42,'P2b0PgsFnvwcOAhCeUcEwcdJMWiV5mvXOZP8W6lY','1606032907770','R5pkeerBjz40EbB6PwcQm2Z9Sf0'),(43,'XnnMI0LRmcBU3ciKQU4FvU8wZiFgWKROIWmwSeR8','1606050709114','AZtRt5PT4kAyLA3PR8lvC4LEDKJAwXO8nsj07opRcarTMXP7rU'),(44,'XnnMI0LRmcBU3ciKQU4FvU8wZiFgWKROIWmwSeR8','1606051592036','xAuyOr10uWY8MjD7u77BY6TldsCf9mblmyyjOBsrm5oeVskqLK'),(45,'HWPnnWZHkPb51VCui2ST0Qo7bACAw8qAVv6QKHmU','1606052181022','LlzCGaZkp0zCOFcj6YbIxkWGpip5HX4Mihhf3PG79vg3F0byw4'),(46,'WwWpxC9Znk6WSduGt0MwW982OTjuapQy1rq37Kq6','1607172990813','AnarzeC3sDoMrz8YOwtA91hO9F3tEpXUcOQaAnvN51hz6lpPzo');
/*!40000 ALTER TABLE `cookie_to_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historique_de_recherche`
--

DROP TABLE IF EXISTS `historique_de_recherche`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historique_de_recherche` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recherche` varchar(255) DEFAULT NULL,
  `recherche_sha512` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historique_de_recherche`
--

LOCK TABLES `historique_de_recherche` WRITE;
/*!40000 ALTER TABLE `historique_de_recherche` DISABLE KEYS */;
INSERT INTO `historique_de_recherche` VALUES (1,'search=test','fff2fa28987177e8c41f8ef993c28839cee00a3f7d1c55bec3dfbeb9a3db90a59aa8502327190168b69c1aee3a4bd8937a6874919846cf86bcce9be5bd879a6b');
/*!40000 ALTER TABLE `historique_de_recherche` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historique_de_vente`
--

DROP TABLE IF EXISTS `historique_de_vente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historique_de_vente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `produit_token` varchar(255) DEFAULT NULL,
  `user_token` varchar(255) DEFAULT NULL,
  `qt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historique_de_vente`
--

LOCK TABLES `historique_de_vente` WRITE;
/*!40000 ALTER TABLE `historique_de_vente` DISABLE KEYS */;
/*!40000 ALTER TABLE `historique_de_vente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membres`
--

DROP TABLE IF EXISTS `membres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) DEFAULT NULL,
  `pseudo` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(750) DEFAULT NULL,
  `grade` varchar(255) DEFAULT NULL,
  `derniereco` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membres`
--

LOCK TABLES `membres` WRITE;
/*!40000 ALTER TABLE `membres` DISABLE KEYS */;
INSERT INTO `membres` VALUES (8,'P2b0PgsFnvwcOAhCeUcEwcdJMWiV5mvXOZP8W6lY','quentin','nom-user','prenom-user','test@gmail.com','9c0c32a77976d1b85e599695a331f11881aabe1a4bb96f07547f282dd5cba15dfc4d1582be0213b252e8b1d46278276fdc5c5f2432bc72bd620bc1410fb44987','admin','1605971023529'),(9,'XnnMI0LRmcBU3ciKQU4FvU8wZiFgWKROIWmwSeR8','user-4rPwrAy','nom-user','prenom-user','audrey.rebelo@hotmail.com','575d8b228887b0342968b736fe4a4e38d9b56a6f514cac28f46f5840595d70d8b830a37931142b5cbda6b10b4d5fa28be5d88776ebb5669da6559453cb7165f1','user','1606050609810'),(10,'HWPnnWZHkPb51VCui2ST0Qo7bACAw8qAVv6QKHmU','ethan','nom-user','prenom-user','ethan.martin@gmail.com','b699c69cf29ea8143eda5070836ff7bffcc991aa3bc597564d204023e7334b8d25891c520fe53ffe6fbe31ecca28b96cb0caac42b2e178c0a8d05e1ec925713e','admin','1606052127747'),(11,'WwWpxC9Znk6WSduGt0MwW982OTjuapQy1rq37Kq6','user-4YLlMHv','nom-user','prenom-user','ferweadi.pro@gmail.com','d0253019bc7413eaac14850bb5f78400abb222d77dba006892446ff0593a125e70573e8296253b002cd004317d1ca6cd2e17612b9bd154022399b9edec3f24a5','user','1607172842949');
/*!40000 ALTER TABLE `membres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `panier`
--

DROP TABLE IF EXISTS `panier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `panier` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_token` varchar(255) DEFAULT NULL,
  `produit_token` varchar(255) DEFAULT NULL,
  `produit_qt` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `panier`
--

LOCK TABLES `panier` WRITE;
/*!40000 ALTER TABLE `panier` DISABLE KEYS */;
/*!40000 ALTER TABLE `panier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produits`
--

DROP TABLE IF EXISTS `produits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `prix` int DEFAULT NULL,
  `type_general` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `url_pic` text,
  `shop_tag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produits`
--

LOCK TABLES `produits` WRITE;
/*!40000 ALTER TABLE `produits` DISABLE KEYS */;
INSERT INTO `produits` VALUES (2,'GxD96w744gWNGgfuj4J6L62Cdzj3FXi9','produit 1','costard1 toute taille chanvre',15,'vetements','veste','/files/produits/produit-test/01.jpg','gfezghr'),(3,'EvhPG95trNC3hWbf3iPE68W93k6T4rj5','produit 2','costard 2 XS-S lenpur',115,'vetements','veste','/files/produits/produit-test/02.jpg','gfezghr'),(4,'vh396R7GmaGRw6Mx7QEr52Eff68P2fAe','produit 3','costard 3 M-L-XL',17,'vetements','veste','/files/produits/produit-test/03.jpg','gfezghr'),(5,'fyw8N673WyrH97Yq8vF5RQC8v8vDqzN4','produit 4','pentalon 01',40,'vetements','pentalon','/files/produits/produit-test/04.png','gfezghr'),(6,'fyw8N673WyrH97Yq8vF5RQC8v8vDqzN45','produit 5','jean 01',50,'vetements','pentalon','/files/produits/produit-test/05.png','gfezghr'),(7,'4u3SGVWF69gsT29fnpZkd2H7e52TxG5x','produit 6','toute taille 100% coton',15,'vetements','t-shirt','/files/produits/produit-test/06.png','gfezghr'),(8,'vr7s3iDeY2T3tJ87vYT6Q7i3Ms2pfDV8','produit 7','toute taille 110% coton',12,'vetements','t-shirt','/files/produits/produit-test/07.png','gfezghr'),(9,'U69afs6WtnkTG2MzN42z7FV9z9U9dNq8','produit 8','toute taille 100% coton1',10,'vetements','t-shirt','/files/produits/produit-test/08.png','gfezghr'),(10,'67qJmS96D5xis5v24MtBt65yTDw4UzTM','produit 9','toute taille 100% coton13',65,'vetements','t-shirt','/files/produits/produit-test/09.png','gfezghr'),(11,'AX45s9t3gkMWq722QM4Fspm7hRQw4Ws5','produit 10','veste2 fibre Ingeo XS-S-',23,'vetements','veste','/files/produits/produit-test/10.png','gfezghr'),(12,'9aJ2VVreAN86R64k9M3y477kHjEzkhmV','produit 11','veste 1 cuirvegetal M-L-XL',17,'vetements','veste','/files/produits/produit-test/11.png','gfezghr'),(13,'XMdW5JgSf4SJxq839v6t285wM9Mk2fYj','produit 12','veste 3 coton naturel toute taille',21,'vetements','veste','/files/produits/produit-test/12.png','dqsftyfuhtbg'),(15,'LfKnHhTite826qSfwrZSKigw6','nom du produits','tezgriagbiezofjiuebfvhfzojievjnfiop',15,'vetement','t-shirt','/files/produits/produit-test/12.png','gfezghr'),(16,'YvdPsSYYmUeGjEmAfnlbSu9ND','nom du produits','tezgriagbiezofjiuebfvhfzojievjnfiop',15,'vetement','t-shirt','/files/produits/produit-test/12.png','gfezghr'),(19,'inTYrbMobX8hsIDTk3m8JaCRx','azd','azzg',0,'vetements','t-shirt','/test/test2/uio.jpg','gfezghr');
/*!40000 ALTER TABLE `produits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produits_cac`
--

DROP TABLE IF EXISTS `produits_cac`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produits_cac` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code_commande` varchar(255) DEFAULT NULL,
  `token_produits` text,
  `user_token` text,
  `date` varchar(255) DEFAULT NULL,
  `end_time` varchar(255) DEFAULT NULL,
  `etat` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produits_cac`
--

LOCK TABLES `produits_cac` WRITE;
/*!40000 ALTER TABLE `produits_cac` DISABLE KEYS */;
INSERT INTO `produits_cac` VALUES (3,'DsNQQfse4I6PD','4u3SGVWF69gsT29fnpZkd2H7e52TxG5x','P2b0PgsFnvwcOAhCeUcEwcdJMWiV5mvXOZP8W6lY','1606036097512','18000000',0),(4,'Ytvs4rCjIsVhD','U69afs6WtnkTG2MzN42z7FV9z9U9dNq8','XnnMI0LRmcBU3ciKQU4FvU8wZiFgWKROIWmwSeR8','1606051869907','86400000',0),(5,'MCiaojBqM0kps','U69afs6WtnkTG2MzN42z7FV9z9U9dNq8','HWPnnWZHkPb51VCui2ST0Qo7bACAw8qAVv6QKHmU','1606052234462','7200000',0),(6,'ijfav8emuU7Xz','XMdW5JgSf4SJxq839v6t285wM9Mk2fYj','WwWpxC9Znk6WSduGt0MwW982OTjuapQy1rq37Kq6','1607173417207','7200000',0),(7,'ijfav8emuU7Xz','LfKnHhTite826qSfwrZSKigw6','WwWpxC9Znk6WSduGt0MwW982OTjuapQy1rq37Kq6','1607173417208','7200000',0),(8,'ijfav8emuU7Xz','fyw8N673WyrH97Yq8vF5RQC8v8vDqzN4','WwWpxC9Znk6WSduGt0MwW982OTjuapQy1rq37Kq6','1607173417208','7200000',0);
/*!40000 ALTER TABLE `produits_cac` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produits_commande`
--

DROP TABLE IF EXISTS `produits_commande`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produits_commande` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code_commande` varchar(255) DEFAULT NULL,
  `token_produits` text,
  `user_token` text,
  `date` varchar(255) DEFAULT NULL,
  `etat` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produits_commande`
--

LOCK TABLES `produits_commande` WRITE;
/*!40000 ALTER TABLE `produits_commande` DISABLE KEYS */;
INSERT INTO `produits_commande` VALUES (1,'w2MfZ5dDwG3FK','vr7s3iDeY2T3tJ87vYT6Q7i3Ms2pfDV8','M9Dbxt0bomKW5QPIOHpcAYdkRxktwSDFujGkmStW','1605968054781',0),(2,'w2MfZ5dDwG3FK','vr7s3iDeY2T3tJ87vYT6Q7i3Ms2pfDV8','M9Dbxt0bomKW5QPIOHpcAYdkRxktwSDFujGkmStW','1605968148494',0),(3,'vEEgELWDGUSNy','EvhPG95trNC3hWbf3iPE68W93k6T4rj5','P2b0PgsFnvwcOAhCeUcEwcdJMWiV5mvXOZP8W6lY','1606037033599',0),(4,'tNRKgmdagV5zq','vh396R7GmaGRw6Mx7QEr52Eff68P2fAe','XnnMI0LRmcBU3ciKQU4FvU8wZiFgWKROIWmwSeR8','1606051752187',0),(5,'PEw5WOnzf3way','vh396R7GmaGRw6Mx7QEr52Eff68P2fAe','HWPnnWZHkPb51VCui2ST0Qo7bACAw8qAVv6QKHmU','1606052206377',0);
/*!40000 ALTER TABLE `produits_commande` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produits_esseillage`
--

DROP TABLE IF EXISTS `produits_esseillage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produits_esseillage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code_commande` varchar(255) DEFAULT NULL,
  `token_produits` text,
  `user_token` text,
  `date` varchar(255) DEFAULT NULL,
  `etat` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produits_esseillage`
--

LOCK TABLES `produits_esseillage` WRITE;
/*!40000 ALTER TABLE `produits_esseillage` DISABLE KEYS */;
INSERT INTO `produits_esseillage` VALUES (1,'LJjEkxr1nio6U','EvhPG95trNC3hWbf3iPE68W93k6T4rj5','P2b0PgsFnvwcOAhCeUcEwcdJMWiV5mvXOZP8W6lY','1606035103231',0);
/*!40000 ALTER TABLE `produits_esseillage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produits_vetements_tailles`
--

DROP TABLE IF EXISTS `produits_vetements_tailles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produits_vetements_tailles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `produits_token` varchar(255) DEFAULT NULL,
  `xs` tinyint(1) DEFAULT NULL,
  `s` tinyint(1) DEFAULT NULL,
  `m` tinyint(1) DEFAULT NULL,
  `l` tinyint(1) DEFAULT NULL,
  `xl` tinyint(1) DEFAULT NULL,
  `bebe_mois` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produits_vetements_tailles`
--

LOCK TABLES `produits_vetements_tailles` WRITE;
/*!40000 ALTER TABLE `produits_vetements_tailles` DISABLE KEYS */;
INSERT INTO `produits_vetements_tailles` VALUES (1,'EvhPG95trNC3hWbf3iPE68W93k6T4rj5',1,1,1,1,1,0),(2,'fyw8N673WyrH97Yq8vF5RQC8v8vDqzN4',0,1,1,1,1,0);
/*!40000 ALTER TABLE `produits_vetements_tailles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promo`
--

DROP TABLE IF EXISTS `promo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `by_token` tinyint(1) DEFAULT NULL,
  `promo_by_token` varchar(255) DEFAULT NULL,
  `by_type_general` tinyint(1) DEFAULT NULL,
  `promo_by_type_general` varchar(255) DEFAULT NULL,
  `by_type` tinyint(1) DEFAULT NULL,
  `promo_by_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promo`
--

LOCK TABLES `promo` WRITE;
/*!40000 ALTER TABLE `promo` DISABLE KEYS */;
/*!40000 ALTER TABLE `promo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-06 10:51:10
