/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 100137
Source Host           : localhost:3306
Source Database       : template

Target Server Type    : MYSQL
Target Server Version : 100137
File Encoding         : 65001

Date: 2018-12-12 11:02:02
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for messages
-- ----------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user1_id` int(11) DEFAULT NULL,
  `user2_id` int(11) DEFAULT NULL,
  `text` text,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user1_id` (`user1_id`),
  KEY `user2_id` (`user2_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`user1_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`user2_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of messages
-- ----------------------------
INSERT INTO `messages` VALUES ('1', '1', '2', 'hello Gagik', '1');
INSERT INTO `messages` VALUES ('35', '2', '1', 'hello Koryun', '1');
INSERT INTO `messages` VALUES ('49', '4', '2', 'barev Gagik', '1');
INSERT INTO `messages` VALUES ('50', '1', '2', 'asdasd', '1');
INSERT INTO `messages` VALUES ('51', '1', '2', 'verj', '1');
INSERT INTO `messages` VALUES ('52', '4', '2', 'how are you', '1');
INSERT INTO `messages` VALUES ('53', '4', '2', 'are you here?\n', '1');
INSERT INTO `messages` VALUES ('54', '1', '2', 'ujytfjuytfjuytfjuyf', '1');
INSERT INTO `messages` VALUES ('55', '4', '2', 'where are you\n', '1');
INSERT INTO `messages` VALUES ('56', '2', '1', 'barev koryun', '1');
INSERT INTO `messages` VALUES ('57', '2', '1', 'inch ka\n', '1');

-- ----------------------------
-- Table structure for notif
-- ----------------------------
DROP TABLE IF EXISTS `notif`;
CREATE TABLE `notif` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user1_id` int(11) DEFAULT NULL,
  `user2_id` int(11) DEFAULT NULL,
  `text` text,
  `status` int(1) DEFAULT NULL,
  `proj_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user1_id` (`user1_id`),
  KEY `user2_id` (`user2_id`),
  KEY `notif_ibfk_3` (`proj_id`),
  CONSTRAINT `notif_ibfk_1` FOREIGN KEY (`user1_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notif_ibfk_2` FOREIGN KEY (`user2_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notif_ibfk_3` FOREIGN KEY (`proj_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of notif
-- ----------------------------
INSERT INTO `notif` VALUES ('1', '1', '2', 'Koryun Apresyan -Ը Ձեզ կցել է asdasd պրոեկտը:', '1', '10');
INSERT INTO `notif` VALUES ('2', '2', '1', 'Gagik ավարտել Է պրոեկտը', '1', null);
INSERT INTO `notif` VALUES ('3', '2', '1', 'Gagik ավարտել Է պրոեկտը', '1', null);
INSERT INTO `notif` VALUES ('4', '2', '1', 'Gagik ավարտել Է պրոեկտը', '1', null);
INSERT INTO `notif` VALUES ('5', '2', '1', 'Gagik ավարտել Է պրոեկտը', '1', null);
INSERT INTO `notif` VALUES ('6', '1', '2', 'Ձեր ռեյտինգը = 2', '1', null);
INSERT INTO `notif` VALUES ('7', '1', '2', 'Ձեր ռեյտինգը = 5', '1', null);

-- ----------------------------
-- Table structure for projects
-- ----------------------------
DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `knowledge` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `deadLine` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of projects
-- ----------------------------
INSERT INTO `projects` VALUES ('1', 'proekt_1', '150000.00', 'php', 'responsive', 'task', '2018.30.12');
INSERT INTO `projects` VALUES ('2', 'xndir', '20000.00', 'nodeJS', 'no description', 'project', '2018-11-25');
INSERT INTO `projects` VALUES ('3', 'xndir', '2000.00', 'nodeJS', 'fghfgh', 'Project', '2018-11-25');
INSERT INTO `projects` VALUES ('4', 'xndir', '2000.00', 'nodeJS', 'hnjn', 'Project', '2018-11-25');
INSERT INTO `projects` VALUES ('5', 'Harut', '2000.00', 'srthsrth srthsrth', '', 'Project', '2018-11-22');
INSERT INTO `projects` VALUES ('8', '', '0.00', '', '', 'Project', '');
INSERT INTO `projects` VALUES ('9', '7uirtu', '567567.00', 'uydtyuy', 'rtyjrtyj', 'Project', '2018-11-09');
INSERT INTO `projects` VALUES ('10', 'asdasd', '0.00', 'asd', 'asdasdasdasd', 'Task', '');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `admin` int(11) DEFAULT NULL,
  `imgsrc` varchar(255) DEFAULT NULL,
  `login` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `reyting` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'Koryun', 'Apresyan', '21', 'senior', '1', 'admin.jpg', 'lg', 'sha1$c24340ac$1$72369e27d88dc412f4fe4ea3ce7139258635fb19', '098038385', '5');
INSERT INTO `users` VALUES ('2', 'Gagik', 'Surenyan', '45', 'no-level', '0', 'default.jpg', 'bbbb', 'sha1$8eb38d77$1$c5f3adf50ec19ed3f27d79c91abc5ded3762ed28', '098008800', '5');
INSERT INTO `users` VALUES ('4', 'Tigran', 'parsdaryan', '25', 'usanox', '0', '1542209209918Lighthouse.jpg', 'cccc', 'cccc', '077476794', '1');
INSERT INTO `users` VALUES ('5', 'Armen', 'Ashotyan', '35', 'Patgamavor', '0', '1542373187786Ashotyan.jpg', 'valod', 'valod', '099889988', '5');
INSERT INTO `users` VALUES ('6', 'Vahag', 'Altunyan', '21', 'c++ deweloper', '0', '1543384373780vahag.jpg', 'vahag', 'altunyan', '098525200', '5');
INSERT INTO `users` VALUES ('7', 'Mane', 'Poghosyan', '21', 'methaled', '0', '1543384419694mane.jpg', 'mane', 'poghosyan', '098512121', '5');
INSERT INTO `users` VALUES ('8', 'Arrpi', 'Arustamyan', '21', 'mathanaliz', '0', '1543384477642arpi.jpg', 'arpi', 'arustamyan', '098521463', '5');
INSERT INTO `users` VALUES ('9', 'Levon', 'Mosinyan', '19', 'Serjant', '0', '1543384525975levon.jpg', 'levon', 'mosinyan', '077050678', '5');
INSERT INTO `users` VALUES ('10', 'Alla', 'Davtyan', '19', 'likvid', '0', '1543384587135alla.jpg', 'alla', 'davtyan', '095654565', '5');
INSERT INTO `users` VALUES ('11', 'Narek', 'Avetyan', '25', 'Beginner', '1', 'default.jpg', 'narek', 'sha1$3372f3a0$1$59597e31c7fcff8111bf8fb81bf25a03ed12762c', '098035656', '5');

-- ----------------------------
-- Table structure for user_proj
-- ----------------------------
DROP TABLE IF EXISTS `user_proj`;
CREATE TABLE `user_proj` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `proj_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `proj_id` (`proj_id`),
  CONSTRAINT `user_proj_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_proj_ibfk_2` FOREIGN KEY (`proj_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_proj
-- ----------------------------
INSERT INTO `user_proj` VALUES ('2', '1', '2');
INSERT INTO `user_proj` VALUES ('3', '2', '3');
INSERT INTO `user_proj` VALUES ('4', '5', '4');
INSERT INTO `user_proj` VALUES ('5', '2', '5');
INSERT INTO `user_proj` VALUES ('15', '1', '8');
INSERT INTO `user_proj` VALUES ('17', '2', '9');
INSERT INTO `user_proj` VALUES ('27', '1', '1');
INSERT INTO `user_proj` VALUES ('28', '2', '1');
INSERT INTO `user_proj` VALUES ('29', '4', '1');
INSERT INTO `user_proj` VALUES ('37', '1', '1');
INSERT INTO `user_proj` VALUES ('39', '9', '1');
INSERT INTO `user_proj` VALUES ('40', '10', '1');
INSERT INTO `user_proj` VALUES ('41', '5', '2');
INSERT INTO `user_proj` VALUES ('42', '8', '2');
INSERT INTO `user_proj` VALUES ('43', '2', '10');
SET FOREIGN_KEY_CHECKS=1;
