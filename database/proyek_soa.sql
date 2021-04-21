/*
SQLyog Enterprise v13.1.1 (64 bit)
MySQL - 10.1.37-MariaDB : Database - proyek_soa
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`proyek_soa` /*!40100 DEFAULT CHARACTER SET latin1 */;

/*Table structure for table `favorite` */

DROP TABLE IF EXISTS `favorite`;

CREATE TABLE `favorite` (
  `user_id` int(11) NOT NULL,
  `resep_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`resep_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `favorite` */

/*Table structure for table `paket` */

DROP TABLE IF EXISTS `paket`;

CREATE TABLE `paket` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) DEFAULT NULL,
  `harga` int(11) DEFAULT NULL,
  `durasi` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `paket` */

insert  into `paket`(`id`,`nama`,`harga`,`durasi`) values 
(1,'SILVER',100000,30),
(2,'GOLD',150000,60),
(3,'DIAMOND',200000,90);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) DEFAULT NULL,
  `umur` int(11) DEFAULT NULL,
  `berat` int(11) DEFAULT NULL COMMENT 'kg',
  `fat` int(3) DEFAULT NULL COMMENT '0 s/d 100',
  `role` int(1) DEFAULT NULL COMMENT '0 = admin, 1 = user',
  `saldo` int(11) DEFAULT NULL,
  `is_premium` int(1) DEFAULT NULL COMMENT '0 = tidak, 1 = ya',
  `is_active` int(1) DEFAULT '1' COMMENT '0 = tidak aktif, 1 = aktif',
  `api_hit` int(11) DEFAULT '0',
  `paket_id` int(11) DEFAULT NULL,
  `paket_start` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `user` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
