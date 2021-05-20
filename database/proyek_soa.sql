/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 10.4.17-MariaDB : Database - proyek_soa
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`proyek_soa` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `proyek_soa`;

/*Table structure for table `plans` */

DROP TABLE IF EXISTS `plans`;

CREATE TABLE `plans` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `api_hit` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `plans` */

insert  into `plans`(`id`,`name`,`price`,`duration`,`api_hit`) values 
(1,'SILVER',100000,30,100),
(2,'GOLD',150000,60,200),
(3,'DIAMOND',200000,90,300);

/*Table structure for table `transactions` */

DROP TABLE IF EXISTS `transactions`;

CREATE TABLE `transactions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `plan_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `transactions` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `role` int(1) DEFAULT NULL COMMENT '0 = admin, 1 = user',
  `balance` int(11) DEFAULT NULL,
  `is_active` int(1) DEFAULT 1 COMMENT '0 = tidak aktif, 1 = aktif',
  `api_hit` int(11) DEFAULT 0,
  `last_hit` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`email`,`username`,`password`,`token`,`image`,`age`,`role`,`balance`,`is_active`,`api_hit`,`last_hit`) values 
(1,'admin1','admin1@admin.com','admin1','admin1','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbjEiLCJyb2xlIjoiMCIsImlhdCI6MTYyMTQ4ODc0Mn0.rTdR4H9MbHW266mElA3WHK9_Dm-9wxWkEq61n0XjZJU',NULL,20,0,0,1,100,'2021-05-20 13:35:53'),
(2,'user1','user1@user.com','user1','user1','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyMSIsInJvbGUiOiIxIiwiaWF0IjoxNjIxNDg4Nzc2fQ.NeBArNO2fZGm5n99WHnWxPg6_FQJjHsIt_8_IX5mPj4',NULL,29,1,0,1,100000000,'2021-05-20 13:35:57'),
(3,'user2','user2@user.com','user2','user2','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ1c2VyMiIsInJvbGUiOiIxIiwiaWF0IjoxNjIxNDg4NzkxfQ.BDsXlJ7kDaWsj_VElYwYmJ1BXHTf9Wr7NWlZrjYM_9g',NULL,25,1,0,1,0,'2021-05-20 13:35:59'),
(4,'user3','user3@user.com','user3','user3','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJ1c2VyMyIsInJvbGUiOiIxIiwiaWF0IjoxNjIxNDg4OTEyfQ.ROHbv_vkDqmFMGiTUh-7hBLyEisjdzcKHR-VpMdFRBo',NULL,23,1,0,1,100,'2021-05-20 13:36:01'),
(5,'user4','user4@user.com','user4','user4','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJ1c2VyNCIsInJvbGUiOiIxIiwiaWF0IjoxNjIxNDg4OTQ2fQ.XjGVhfcFXxmiE3I_lPY84Mu68v0CaYolQZ5ig8uXN-Q',NULL,22,1,0,1,100,'2021-05-20 13:35:46');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
