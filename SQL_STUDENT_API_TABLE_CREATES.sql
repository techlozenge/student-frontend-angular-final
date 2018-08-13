CREATE DATABASE student_api;

USE student_api;

DROP TABLE IF EXISTS `major`;

CREATE TABLE `major` (
  `major_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `major` varchar(30) DEFAULT NULL,
  `sat` smallint(4) unsigned DEFAULT NULL,
  PRIMARY KEY (`major_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `major` (`major_id`, `major`, `sat`)
VALUES
  (1,'General Business',800),
  (2,'Accounting',1000),
  (3,'Finance',1100),
  (4,'Math',1300),
  (5,'Engineering',1350),
  (6,'Education',900),
  (7,'Basket Weaving'),
  (8,'General Studies',500);


DROP TABLE IF EXISTS `student`;

CREATE TABLE `student` (
  `student_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `gpa` decimal(5,1) DEFAULT NULL,
  `sat` smallint(4) DEFAULT NULL,
  `major_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `major_id` (`major_id`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `major` (`major_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `student` (`student_id`, `first_name`, `last_name`, `start_date`, `gpa`, `sat`, `major_id`)
VALUES
  (1,'Eric','Ephram','2016-03-31',NULL,NULL,NULL),
  (2,'Greg','Gould','2016-09-30',NULL,NULL,NULL),
  (3,'Adam','Ant','2016-06-02',NULL,NULL,NULL),
  (4,'Howard','Hess','2016-02-28',NULL,NULL,NULL),
  (5,'Charles','Caldwell','2016-05-07',NULL,NULL,NULL),
  (6,'James','Joyce','2016-08-27',NULL,NULL,NULL),
  (7,'Doug','Dumas','2016-07-04',NULL,NULL,NULL),
  (8,'Kevin','Kraft','2016-04-15',NULL,NULL,NULL),
  (9,'Frank','Fountain','2016-01-31',NULL,NULL,NULL),
  (10,'Brian','Biggs','2015-12-25',NULL,NULL,NULL);

DROP TABLE IF EXISTS `grade`;

CREATE TABLE `grade` (
  `grade_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `grade` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`grade_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `grade` (`grade_id`, `grade`)
VALUES
  (1,'Incomplete'),
  (2,'Complete and unsatisfactory'),
  (3,'Complete and satisfactory'),
  (4,'Exceeds expectations'),
  (5,'Not graded');



DROP TABLE IF EXISTS `instructor`;

CREATE TABLE `instructor` (
  `instructor_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `major_id` int(10) unsigned DEFAULT NULL,
  `years_of_expierience` tinyint(2) unsigned DEFAULT '1',
  `tenured` tinyint(1) NOT NULL,
  PRIMARY KEY (`instructor_id`),
  KEY `major_id` (`major_id`),
  CONSTRAINT `instructor_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `major` (`major_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `class`;

CREATE TABLE `class` (
  `class_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `instructor_id` int(10) unsigned DEFAULT NULL,
  `subject` varchar(30) DEFAULT NULL,
  `course` smallint(4) unsigned DEFAULT NULL,
  PRIMARY KEY (`class_id`),
  KEY `instuctor_id` (`instructor_id`),
  CONSTRAINT `class_ibfk_1` FOREIGN KEY (`instructor_id`) REFERENCES `instructor` (`instructor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `class` (`class_id`, `instructor_id`, `subject`, `course`)
VALUES
  (1,NULL,'English',101),
  (2,NULL,'English',102),
  (3,NULL,'English',103),
  (4,NULL,'English',201),
  (5,NULL,'English',202),
  (6,NULL,'English',203),
  (7,NULL,'English',301),
  (8,NULL,'English',302),
  (9,NULL,'English',303),
  (10,NULL,'Math',201),
  (11,NULL,'Math',202),
  (12,NULL,'Math',203),
  (13,NULL,'Math',204),
  (14,NULL,'Math',301),
  (15,NULL,'Math',302),
  (16,NULL,'Math',303),
  (17,NULL,'Math',304),
  (18,NULL,'History',101),
  (19,NULL,'History',201),
  (20,NULL,'History',301),
  (21,NULL,'Computer Science',311),
  (22,NULL,'Computer Science',312),
  (23,NULL,'Computer Science',313),
  (24,NULL,'Computer Science',441),
  (25,NULL,'Computer Science',442),
  (26,NULL,'Computer Science',443),
  (27,NULL,'Psychology',101),
  (28,NULL,'Psychology',102),
  (29,NULL,'Psychology',231),
  (30,NULL,'Psychology',232),
  (31,NULL,'Education',221),
  (32,NULL,'Education',222),
  (33,NULL,'Education',223),
  (34,NULL,'Education',351),
  (35,NULL,'Education',352),
  (36,NULL,'Education',353);

DROP TABLE IF EXISTS `major_class`;

CREATE TABLE `major_class` (
  `major_class_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `major_id` int(11) unsigned DEFAULT NULL,
  `class_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`major_class_id`),
  KEY `major_id` (`major_id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `major_class_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `major` (`major_id`),
  CONSTRAINT `major_class_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `student_class`;

CREATE TABLE `student_class` (
  `student_class_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `student_id` int(11) unsigned DEFAULT NULL,
  `class_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`student_class_id`),
  KEY `student_id` (`student_id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `student_class_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `student_class_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `assignment`;

CREATE TABLE `assignment` (
  `assignment_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `student_id` int(11) unsigned DEFAULT NULL,
  `assignment_nbr` int(11) DEFAULT NULL,
  `grade_id` int(11) unsigned DEFAULT NULL,
  `class_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`assignment_id`),
  KEY `grade_id` (`grade_id`),
  KEY `student_id` (`student_id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `assignment_ibfk_2` FOREIGN KEY (`grade_id`) REFERENCES `grade` (`grade_id`),
  CONSTRAINT `assignment_ibfk_3` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `assignment_ibfk_4` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
