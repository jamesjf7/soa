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
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `transactions` */

insert  into `transactions`(`id`,`plan_id`,`user_id`,`created_at`) values 
(6,1,3,'2021-04-30 17:06:06');

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
  `is_active` int(1) DEFAULT '1' COMMENT '0 = tidak aktif, 1 = aktif',
  `api_hit` int(11) DEFAULT '0',
  `last_hit` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`email`,`username`,`password`,`token`,`image`,`age`,`role`,`balance`,`is_active`,`api_hit`,`last_hit`) values 
(1,'admin1','admin1@admin.com','admin1','admin1','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMUBhZG1pbi5jb20iLCJ1c2VybmFtZSI6ImFkbWluMSIsInBhc3N3b3JkIjoiYWRtaW4xIiwicm9sZSI6IjAiLCJpYXQiOjE2MTkyNDQ2MzF9.N8yr95LJ-OwNEjwKYJhL0Nhjx96RqVZFW2_cWGKvMsU',NULL,21,0,0,1,40,'2021-05-10 20:04:06'),
(3,'budi','budi5@budi.com','budi5','budi5','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJidWRpNSIsInJvbGUiOiIxIiwiaWF0IjoxNjE5Nzc2NDg2fQ._YzE8NhN3U1_ytO3eItLSBcL1GxuZ9mCBsZ_CzY_WiA',NULL,20,1,1000000,1,100,'2021-05-12 20:04:09');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
