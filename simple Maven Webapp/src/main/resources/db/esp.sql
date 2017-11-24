# SQL Manager 2007 for MySQL 4.1.2.1
# ---------------------------------------
# Host     : 127.0.0.1
# Port     : 3306
# Database : esp


SET FOREIGN_KEY_CHECKS=0;

DROP DATABASE IF EXISTS `esp`;

CREATE DATABASE `esp`
    CHARACTER SET 'utf8'
    COLLATE 'utf8_general_ci';

USE `esp`;

#
# Structure for the `ep` table : 
#

DROP TABLE IF EXISTS `ep`;

CREATE TABLE `ep` (
  `id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `primary_current_reading` float DEFAULT NULL,
  `primary_voltage_reading` float DEFAULT NULL,
  `second_current_reading` float DEFAULT NULL,
  `second_voltage_reading` float DEFAULT NULL,
  `spark_reading` int(11) DEFAULT NULL,
  `second_current_set` float DEFAULT NULL,
  `second_voltage_set` float DEFAULT NULL,
  `spark_set` int(11) DEFAULT NULL,
  `run_state` int(11) DEFAULT NULL,
  `alarm_state` int(11) DEFAULT NULL,
  `alarm_type` int(11) DEFAULT NULL,
  `operate` int(11) DEFAULT NULL COMMENT '鎿嶄綔0涓哄仠姝?紝1涓鸿繍琛',
  `alarm_reset` int(11) DEFAULT NULL,
  `none` varchar(200) DEFAULT NULL COMMENT '澶囨敞',
  `run_way` int(11) DEFAULT NULL,
  `first_current_set` int(11) DEFAULT NULL,
  `spark_sensitivity_set` int(11) DEFAULT NULL,
  `conduction_angle_set` int(11) DEFAULT NULL,
  `second_voltage_peak_reading` int(11) DEFAULT NULL,
  `ordinal_position` int(11) DEFAULT NULL COMMENT '浣嶇疆\0s',
  `primary_current_set` int(11) DEFAULT NULL,
  `communication_flag` int(11) DEFAULT NULL COMMENT '0姝ｅ父銆?涓?柇\r\n\0ion\0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='楂橀?鐢垫簮';

#
# Structure for the `ep_alarm` table : 
#

DROP TABLE IF EXISTS `ep_alarm`;

CREATE TABLE `ep_alarm` (
  `id` int(11) NOT NULL,
  `alarm_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ep_device_id` int(11) DEFAULT NULL,
  `alarm_state` int(11) DEFAULT NULL,
  `alarm_type` int(11) DEFAULT NULL,
  `un_alarm_time` timestamp NOT NULL DEFAULT '1999-12-31 17:01:01',
  `ep_name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for the `ep_history` table : 
#

DROP TABLE IF EXISTS `ep_history`;

CREATE TABLE `ep_history` (
  `id` int(11) NOT NULL,
  `deviceId` int(11) DEFAULT NULL,
  `primary_current` float DEFAULT NULL,
  `primary_voltage` float DEFAULT NULL,
  `second_current` float DEFAULT NULL,
  `second_voltage` float DEFAULT NULL,
  `record_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='楂橀?鐢垫簮鍘嗗彶鏁版嵁璁板綍';

#
# Structure for the `heater` table : 
#

DROP TABLE IF EXISTS `heater`;

CREATE TABLE `heater` (
  `id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `run_state` int(11) DEFAULT NULL,
  `alarm_state` int(11) DEFAULT NULL,
  `comunication` int(11) DEFAULT NULL,
  `operate` int(11) DEFAULT NULL,
  `run_type` int(11) DEFAULT NULL COMMENT '0涓哄仠姝?紝1涓鸿繛缁?紝2涓鸿嚜鍔╘0e\0o\0\02\08\0k',
  `note` varchar(200) DEFAULT NULL,
  `ep_id` int(11) DEFAULT NULL,
  `heater_type` int(11) DEFAULT NULL COMMENT '0涓虹摲濂椼?1涓虹摲杞淬?2涓虹伆鏂',
  `heater_temprator_id` int(11) DEFAULT NULL,
  `low_device_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='鍔犵儹鍣';

#
# Structure for the `heater_temprator` table : 
#

DROP TABLE IF EXISTS `heater_temprator`;

CREATE TABLE `heater_temprator` (
  `id` int(11) NOT NULL,
  `ep_id` int(11) DEFAULT NULL,
  `temprator` int(11) DEFAULT NULL,
  `temprator_upper` int(11) DEFAULT NULL,
  `temprator_lower` int(11) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `temprator_type` int(11) DEFAULT NULL COMMENT '0-cizhou;1-citao;2-leftHopper;3-rightHopper',
  `low_device_id` int(11) DEFAULT NULL,
  `communication` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for the `hopper` table : 
#

DROP TABLE IF EXISTS `hopper`;

CREATE TABLE `hopper` (
  `id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `ep_id` int(11) DEFAULT NULL,
  `location` int(11) DEFAULT NULL COMMENT '0-left;1-right',
  `hopper_level` int(11) DEFAULT NULL,
  `alarm_hopper_level` int(11) DEFAULT NULL,
  `comunication` int(11) DEFAULT NULL,
  `run_state` int(11) DEFAULT NULL,
  `low_device_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for the `low_alarm` table : 
#

DROP TABLE IF EXISTS `low_alarm`;

CREATE TABLE `low_alarm` (
  `ID` int(11) NOT NULL,
  `alarm_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ep_device_id` int(11) DEFAULT NULL,
  `alarm_state` int(11) DEFAULT NULL,
  `alarm_type` int(11) DEFAULT NULL,
  `un_alarm_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ep_name` varchar(200) DEFAULT NULL,
  `device_type` int(11) DEFAULT NULL,
  `device_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for the `low_device` table : 
#

DROP TABLE IF EXISTS `low_device`;

CREATE TABLE `low_device` (
  `id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `run_state` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for the `pointdata` table : 
#

DROP TABLE IF EXISTS `pointdata`;

CREATE TABLE `pointdata` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `deviceid` int(11) DEFAULT NULL,
  `pointaddress` varchar(255) DEFAULT NULL,
  `pointaddresstype` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for the `rapper` table : 
#

DROP TABLE IF EXISTS `rapper`;

CREATE TABLE `rapper` (
  `id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `run_state` int(11) DEFAULT NULL,
  `alarm_state` int(11) DEFAULT NULL,
  `comunication` int(11) DEFAULT NULL COMMENT '閫氳?涓?柇锛?琛ㄧずOK锛?琛ㄧず涓?柇',
  `operate` int(11) DEFAULT NULL COMMENT '1涓哄惎鍔?紝0涓虹粓姝',
  `run_type` int(11) DEFAULT NULL COMMENT '杩愯?鏂瑰紡0涓哄仠杩愶紝1涓鸿繛缁?紝2涓哄懆鏈',
  `note` varchar(200) DEFAULT NULL COMMENT '澶囨敞',
  `ep_id` int(11) DEFAULT NULL,
  `rapper_type` int(11) DEFAULT NULL COMMENT '1涓洪槼鏋侊紝0涓洪槾鏋乗0nner\0\0',
  `run_way` int(11) DEFAULT NULL,
  `low_device_id` int(11) DEFAULT NULL,
  `beginTime` int(11) DEFAULT NULL,
  `runTime` int(11) DEFAULT NULL,
  `waitTime` int(11) DEFAULT NULL,
  `runWay` int(11) DEFAULT NULL COMMENT '0stop1running2cycling',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='鎸?墦';

#
# Structure for the `weixin` table : 
#

DROP TABLE IF EXISTS `weixin`;

CREATE TABLE `weixin` (
  `id` int(11) NOT NULL,
  `weixin_num` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `weixin_state` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for the `ep` table  (LIMIT 0,500)
#

INSERT INTO `ep` (`id`, `name`, `primary_current_reading`, `primary_voltage_reading`, `second_current_reading`, `second_voltage_reading`, `spark_reading`, `second_current_set`, `second_voltage_set`, `spark_set`, `run_state`, `alarm_state`, `alarm_type`, `operate`, `alarm_reset`, `none`, `run_way`, `first_current_set`, `spark_sensitivity_set`, `conduction_angle_set`, `second_voltage_peak_reading`, `ordinal_position`, `primary_current_set`, `communication_flag`) VALUES 
  (1,'1A11',0,-1,0,0,0,500,70,10,-1,1,1,NULL,NULL,NULL,NULL,NULL,40,100,0,1,200,1),
  (2,'1A12',0,-1,0,0,0,1200,70,10,-1,1,1,NULL,NULL,NULL,NULL,NULL,40,100,0,2,200,1),
  (3,'1A13',0,-1,0,0,0,1200,70,10,-1,1,1,NULL,NULL,NULL,NULL,NULL,40,100,0,3,200,1),
  (4,'1A14',0,-1,0,0,0,400,70,10,-1,1,1,NULL,NULL,NULL,NULL,NULL,40,100,0,4,200,1),
  (5,'1A15',0,-1,0,0,0,400,70,10,-1,1,1,NULL,NULL,NULL,NULL,NULL,40,100,0,5,200,1),
  (6,'1A21',0,-1,0,0,0,500,70,10,-1,1,1,NULL,NULL,NULL,NULL,NULL,40,100,0,6,200,1),
  (7,'1A22',0,-1,0,0,0,1000,70,10,-1,1,1,NULL,NULL,NULL,NULL,NULL,40,100,0,7,200,1),
  (8,'1A23',0,-1,0,0,0,600,70,10,-1,1,1,NULL,NULL,NULL,NULL,NULL,40,100,0,8,200,1),
  (9,'1A24',0,-1,0,0,0,800,70,10,-1,1,1,NULL,NULL,NULL,NULL,NULL,40,100,0,9,200,1),
  (10,'1A25',0,-1,0,0,0,400,70,10,-1,1,1,NULL,NULL,NULL,NULL,NULL,40,100,0,10,200,1),
  (11,'1B11',0,-1,0,0,0,1100,70,10,-1,1,1,NULL,NULL,NULL,NULL,NULL,40,100,0,11,200,1),
  (12,'1B13',0,-1,0,0,0,900,70,10,-1,1,1,NULL,NULL,NULL,NULL,NULL,40,100,0,13,200,1),
  (13,'1B14',0,-1,0,0,0,1300,70,10,-1,1,1,NULL,NULL,NULL,NULL,NULL,40,100,0,14,200,1),
  (14,'1B15',0,-1,0,0,0,500,70,10,-1,1,1,NULL,NULL,NULL,NULL,NULL,40,100,0,15,200,1),
  (15,'1B21',0,-1,0,0,0,700,70,10,-1,1,1,NULL,NULL,NULL,NULL,NULL,40,100,0,16,200,1),
  (16,'1B22',0,-1,0,0,0,NULL,NULL,NULL,-1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,17,NULL,1),
  (17,'1B12',0,-1,0,0,0,800,70,10,-1,1,1,NULL,NULL,NULL,NULL,NULL,40,100,0,12,200,1),
  (18,'1B23',0,-1,0,0,0,NULL,NULL,NULL,-1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,18,NULL,1),
  (19,'1B24',0,-1,0,0,0,NULL,NULL,NULL,-1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,19,NULL,1),
  (20,'1B25',0,-1,0,0,0,NULL,NULL,NULL,-1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,20,NULL,1);

COMMIT;

#
# Data for the `ep_alarm` table  (LIMIT 0,500)
#

INSERT INTO `ep_alarm` (`id`, `alarm_time`, `ep_device_id`, `alarm_state`, `alarm_type`, `un_alarm_time`, `ep_name`) VALUES 
  (1,'2015-01-29 09:24:49',1,1,1,'2015-01-29 09:24:49','1A11'),
  (2,'2015-01-29 09:24:49',2,1,1,'2015-01-29 09:24:49','1A12'),
  (3,'2015-01-29 09:24:49',3,1,1,'2015-01-29 09:24:49','1A13'),
  (4,'2015-01-29 09:24:49',4,1,1,'2015-01-29 09:24:49','1A14'),
  (5,'2015-01-29 09:24:49',5,1,1,'2015-01-29 09:24:49','1A21'),
  (6,'2015-01-29 09:24:49',6,1,1,'2015-01-29 09:24:49','1A22'),
  (7,'2015-01-29 09:24:49',7,1,1,'2015-01-29 09:24:49','1A23'),
  (8,'2015-01-29 09:24:49',8,1,1,'2015-01-29 09:24:49','1A24'),
  (9,'2015-01-29 09:24:49',9,1,1,'2015-01-29 09:24:49','1B11'),
  (10,'2015-01-29 09:24:49',10,1,1,'2015-01-29 09:24:49','1B12'),
  (11,'2015-01-29 09:24:49',11,1,1,'2015-01-29 09:24:49','1B13'),
  (12,'2015-01-29 09:24:49',12,1,1,'2015-01-29 09:24:49','1B14'),
  (13,'2015-01-29 09:24:49',13,1,1,'2015-01-29 09:24:49','1B21'),
  (14,'2015-01-29 09:24:49',14,1,1,'2015-01-29 09:24:49','1B22'),
  (15,'2015-01-29 09:24:49',15,1,1,'2015-01-29 09:24:49','1B23'),
  (16,'2015-01-29 09:24:49',16,1,1,'2015-01-29 09:24:49','1B24'),
  (17,'2016-06-22 15:47:09',17,1,1,'2016-06-22 15:47:09','1A15'),
  (18,'2016-06-22 15:47:09',18,1,1,'2016-06-22 15:47:09','1B15'),
  (19,'2016-06-22 15:47:09',19,1,1,'2016-06-22 15:47:09','2A15'),
  (20,'2016-06-22 15:47:09',20,1,1,'2016-06-22 15:47:09','2B15');

COMMIT;

#
# Data for the `heater` table  (LIMIT 0,500)
#

INSERT INTO `heater` (`id`, `name`, `run_state`, `alarm_state`, `comunication`, `operate`, `run_type`, `note`, `ep_id`, `heater_type`, `heater_temprator_id`, `low_device_id`) VALUES 
  (1,'1A11',0,1,0,NULL,0,NULL,1,2,2,1),
  (2,'1A12',0,1,0,NULL,0,NULL,2,2,2,1),
  (3,'1A14',-1,1,0,NULL,2,NULL,3,2,20,1),
  (4,'1A14',-1,1,0,NULL,2,NULL,4,2,20,1),
  (6,'1A22',-1,1,0,NULL,2,NULL,7,2,21,1),
  (7,'1A23',-1,1,0,NULL,2,NULL,8,2,24,1),
  (8,'1A24',-1,1,0,NULL,2,NULL,9,2,24,1),
  (9,'1B11',-1,1,0,NULL,2,NULL,11,2,25,3),
  (10,'1B12',-1,1,0,NULL,2,NULL,12,2,25,3),
  (11,'1B13',-1,1,0,NULL,2,NULL,13,2,28,3),
  (12,'1B14',-1,1,0,NULL,2,NULL,14,2,28,3),
  (13,'1B21',-1,1,0,NULL,2,NULL,16,2,29,3),
  (14,'1B22',-1,1,0,NULL,2,NULL,17,2,29,3),
  (15,'1B23',-1,1,0,NULL,2,NULL,18,2,32,3),
  (16,'1B24',-1,1,0,NULL,2,NULL,19,2,32,3),
  (17,'1A11',0,1,0,NULL,0,NULL,1,0,1,1),
  (18,'1A12',1,1,0,NULL,2,NULL,2,0,1,1),
  (20,'1A14',-1,1,0,NULL,2,NULL,4,0,7,1),
  (21,'1A21',-1,1,0,NULL,2,NULL,6,0,8,1),
  (22,'1A22',-1,1,0,NULL,2,NULL,7,0,8,1),
  (23,'1A23',-1,1,0,NULL,2,NULL,8,0,11,1),
  (24,'1A24',-1,1,0,NULL,2,NULL,9,0,11,1),
  (25,'1B11',-1,1,0,NULL,2,NULL,11,0,12,3),
  (26,'1B12',-1,1,0,NULL,2,NULL,12,0,12,3),
  (27,'1B13',-1,1,0,NULL,2,NULL,13,0,15,3),
  (28,'1B14',-1,1,0,NULL,2,NULL,14,0,15,3),
  (29,'1B21',-1,1,0,NULL,2,NULL,16,0,16,3),
  (30,'1B22',-1,1,0,NULL,2,NULL,17,0,16,3),
  (31,'1B23',-1,1,0,NULL,2,NULL,18,0,19,3),
  (32,'1B24',-1,1,0,NULL,2,NULL,19,0,19,3),
  (33,'1A11',1,1,0,NULL,1,NULL,1,1,1,1),
  (37,'1A12',-1,1,0,NULL,NULL,NULL,2,1,3,1),
  (38,'1A13',-1,1,0,NULL,NULL,NULL,3,1,5,1),
  (9086,'1A11',0,1,0,NULL,0,NULL,1,3,2,1),
  (9087,'1A12',0,1,0,NULL,0,NULL,2,3,2,1),
  (9088,'1A13',1,1,0,NULL,1,NULL,3,3,2,1),
  (9089,'1A14',1,1,0,NULL,1,NULL,4,3,2,1),
  (9090,'1A15',1,1,0,NULL,1,NULL,5,3,2,1),
  (9091,'1A21',0,1,0,NULL,0,NULL,6,3,2,1),
  (9092,'1A22',0,1,0,NULL,0,NULL,7,3,2,1),
  (9093,'1A23',1,1,0,NULL,1,NULL,8,3,2,1),
  (9094,'1A24',1,1,0,NULL,1,NULL,9,3,2,1),
  (9095,'1A25',1,1,0,NULL,1,NULL,10,3,2,1),
  (9096,'1B11',1,1,0,NULL,1,NULL,11,3,2,3),
  (9097,'1B12',1,1,0,NULL,1,NULL,12,3,2,3),
  (9098,'1B13',1,1,0,NULL,1,NULL,13,3,2,3),
  (9099,'1B14',1,1,0,NULL,1,NULL,14,3,2,3),
  (9100,'1B15',1,1,0,NULL,1,NULL,15,3,2,3),
  (9101,'1B21',1,1,0,NULL,1,NULL,16,3,2,3),
  (9102,'1B22',1,1,0,NULL,1,NULL,17,3,2,3),
  (9103,'1B23',1,1,0,NULL,1,NULL,18,3,2,3),
  (9104,'1B24',1,1,0,NULL,1,NULL,19,3,2,3),
  (9105,'1B25',1,1,0,NULL,1,NULL,20,3,2,3);

COMMIT;

#
# Data for the `heater_temprator` table  (LIMIT 0,500)
#

INSERT INTO `heater_temprator` (`id`, `ep_id`, `temprator`, `temprator_upper`, `temprator_lower`, `name`, `temprator_type`, `low_device_id`, `communication`) VALUES 
  (1,1,92,120,120,'1A11',0,1,1),
  (2,1,140,122,98,'1A11',2,1,1),
  (3,2,NULL,NULL,120,'1A12',0,1,1),
  (4,2,NULL,NULL,NULL,'1A12',2,1,1),
  (5,3,NULL,100,90,'1A13',0,1,1),
  (6,3,NULL,NULL,NULL,'1A13',2,1,1),
  (7,4,140,NULL,NULL,'1A14',0,1,1),
  (8,5,0,NULL,NULL,'1A21',0,1,1),
  (9,6,NULL,NULL,NULL,'1A22',0,1,1),
  (10,7,NULL,NULL,NULL,'1A23',0,1,1),
  (11,8,0,NULL,NULL,'1A24',0,1,1),
  (12,9,0,NULL,NULL,'1B11',0,3,0),
  (13,10,NULL,NULL,NULL,'1B12',0,3,0),
  (14,11,NULL,NULL,NULL,'1B13',0,3,0),
  (15,12,0,NULL,NULL,'1B14',0,3,0),
  (16,13,0,NULL,NULL,'1B21',0,3,0),
  (17,14,NULL,NULL,NULL,'1B22',0,3,0),
  (18,15,NULL,NULL,NULL,'1B23',0,3,0),
  (19,16,0,NULL,NULL,'1B24',0,3,0),
  (20,4,140,NULL,NULL,'1A14',2,1,1),
  (21,5,0,NULL,NULL,'1A21',2,1,1),
  (22,6,NULL,NULL,NULL,'1A22',2,1,1),
  (23,7,NULL,NULL,NULL,'1A23',2,1,1),
  (24,8,0,NULL,NULL,'1A24',2,1,1),
  (25,9,0,NULL,NULL,'1B11',2,3,0),
  (26,10,NULL,NULL,NULL,'1B12',2,3,0),
  (27,11,NULL,NULL,NULL,'1B13',2,3,0),
  (28,12,0,NULL,NULL,'1B14',2,3,0),
  (29,13,0,NULL,NULL,'1B21',2,3,0),
  (30,14,NULL,NULL,NULL,'1B22',2,3,0),
  (31,15,NULL,NULL,NULL,'1B23',2,3,0),
  (32,16,0,NULL,NULL,'1B24',2,3,0),
  (33,NULL,67,NULL,NULL,'烟气进口温度',2,1,1),
  (34,NULL,68,NULL,NULL,'烟气进口温度2',2,1,1),
  (35,NULL,69,NULL,NULL,'烟气进口温度3',2,1,1),
  (36,NULL,72,NULL,NULL,'烟气进口温度4',2,1,1),
  (37,NULL,65,NULL,NULL,'烟气出口温度1',2,1,1),
  (38,NULL,70,NULL,NULL,'烟气出口温度2',2,1,1),
  (39,NULL,72,NULL,NULL,'烟气出口温度3',2,1,1),
  (40,NULL,65,NULL,NULL,'烟气出口温度4',2,1,1),
  (41,NULL,60,NULL,NULL,'烟气出口浓度1',2,1,1),
  (42,NULL,69,NULL,NULL,'烟气出口浓度2',2,1,1),
  (43,NULL,68,NULL,NULL,'烟气出口浓度3',2,1,1),
  (44,NULL,67,NULL,NULL,'烟气出口浓度4',2,1,1),
  (45,NULL,252,NULL,NULL,'锅炉负荷',2,1,1);

COMMIT;

#
# Data for the `hopper` table  (LIMIT 0,500)
#

INSERT INTO `hopper` (`id`, `name`, `ep_id`, `location`, `hopper_level`, `alarm_hopper_level`, `comunication`, `run_state`, `low_device_id`) VALUES 
  (1,'1A11',1,0,28,0,1,-1,1),
  (2,'1A11',1,1,59,0,1,-1,1),
  (3,'1A12',2,0,28,0,1,-1,1),
  (4,'1A12',2,1,16,0,1,-1,1),
  (5,'1A13',3,0,35,0,1,-1,1),
  (6,'1A13',3,1,82,0,1,-1,1),
  (7,'1A14',4,0,28,0,1,-1,1),
  (8,'1A14',4,1,28,0,1,-1,1),
  (9,'1A15',5,0,53,0,1,-1,1),
  (10,'1A15',5,1,29,0,1,-1,1),
  (11,'1A21',6,0,90,0,1,-1,1),
  (12,'1A21',6,1,28,0,1,-1,1),
  (13,'1A22',7,0,28,0,1,-1,1),
  (14,'1A22',7,1,28,0,1,-1,1),
  (15,'1A23',8,0,28,0,1,-1,1),
  (16,'1A23',8,1,13,0,1,-1,1),
  (17,'1A24',9,0,28,0,1,-1,1),
  (18,'1A24',9,1,36,0,1,-1,1),
  (19,'1A25',10,0,28,0,1,-1,1),
  (20,'1A25',10,1,28,0,1,-1,1),
  (21,'1B11',11,0,25,0,0,0,2),
  (22,'1B11',11,1,50,0,0,0,2),
  (23,'1B12',12,0,28,0,0,0,2),
  (24,'1B12',12,1,58,0,0,0,2),
  (25,'1B13',13,0,28,0,0,0,2),
  (26,'1B13',13,1,28,0,0,0,2),
  (27,'1B14',14,0,28,0,0,0,2),
  (28,'1B14',14,1,42,0,0,0,2),
  (29,'1B15',15,0,28,0,0,0,2),
  (30,'1B15',15,1,46,0,0,0,2),
  (31,'1B21',16,0,28,0,0,0,2),
  (32,'1B21',16,1,15,0,0,0,2),
  (33,'1B22',17,0,43,0,0,0,2),
  (34,'1B22',17,1,28,0,0,0,2),
  (35,'1B23',18,0,28,0,0,0,2),
  (36,'1B23',18,1,28,0,0,0,2),
  (37,'1B24',19,0,28,0,0,0,2),
  (38,'1B24',19,1,28,0,0,0,2),
  (39,'1B25',20,0,28,0,0,0,2),
  (40,'1B25',20,1,28,0,0,0,2);

COMMIT;

#
# Data for the `low_alarm` table  (LIMIT 0,500)
#

INSERT INTO `low_alarm` (`ID`, `alarm_time`, `ep_device_id`, `alarm_state`, `alarm_type`, `un_alarm_time`, `ep_name`, `device_type`, `device_id`) VALUES 
  (1,'2015-01-29 10:11:34',1,1,1,'2015-01-29 10:11:34',NULL,4,1),
  (2,'2015-01-29 10:11:35',3,1,1,'2015-01-29 10:11:35',NULL,4,3);

COMMIT;

#
# Data for the `low_device` table  (LIMIT 0,500)
#

INSERT INTO `low_device` (`id`, `name`, `run_state`) VALUES 
  (1,'A侧低压柜',0),
  (3,'B侧低压柜',0);

COMMIT;

#
# Data for the `rapper` table  (LIMIT 0,500)
#

INSERT INTO `rapper` (`id`, `name`, `run_state`, `alarm_state`, `comunication`, `operate`, `run_type`, `note`, `ep_id`, `rapper_type`, `run_way`, `low_device_id`, `beginTime`, `runTime`, `waitTime`, `runWay`) VALUES 
  (8,'1A11',-1,1,0,NULL,-1,NULL,1,0,NULL,1,46,13,10,1),
  (9,'1A11',-1,1,0,NULL,-1,NULL,1,1,NULL,1,11,36,13,1),
  (10,'1A12',-1,1,0,NULL,-1,NULL,2,0,NULL,1,0,30,5,1),
  (11,'1A12',-1,1,0,NULL,-1,NULL,2,1,NULL,1,5,42,5,1),
  (12,'1A13',-1,1,0,NULL,-1,NULL,3,0,NULL,1,9,25,5,1),
  (13,'1A13',-1,1,0,NULL,-1,NULL,3,1,NULL,1,5,55,5,1),
  (14,'1A14',-1,1,0,NULL,-1,NULL,4,0,NULL,1,70,35,5,2),
  (15,'1A14',-1,1,0,NULL,-1,NULL,4,1,NULL,1,5,45,20,1),
  (16,'1A21',-1,1,0,NULL,-1,NULL,6,0,NULL,1,5,26,5,1),
  (17,'1A21',-1,1,0,NULL,-1,NULL,6,1,NULL,1,5,2563,5,1),
  (18,'1A22',-1,1,0,NULL,-1,NULL,7,0,NULL,1,0,65,60,2),
  (19,'1A22',-1,1,0,NULL,-1,NULL,7,1,NULL,1,5,5,5,2),
  (20,'1A23',-1,1,0,NULL,-1,NULL,8,0,NULL,1,0,5,70,2),
  (21,'1A23',-1,1,0,NULL,-1,NULL,8,1,NULL,1,5,5,5,2),
  (22,'1A24',-1,1,0,NULL,-1,NULL,8,0,NULL,1,0,5,80,2),
  (23,'1A24',-1,1,0,NULL,-1,NULL,8,1,NULL,1,5,5,5,2),
  (24,'1B11',-1,1,0,NULL,-1,NULL,9,0,NULL,3,5,56,90,1),
  (25,'1B11',-1,1,0,NULL,-1,NULL,9,1,NULL,3,5,5,5,2),
  (26,'1B12',-1,1,0,NULL,-1,NULL,10,0,NULL,3,0,5,100,2),
  (27,'1B12',-1,1,0,NULL,-1,NULL,10,1,NULL,3,5,5,5,2),
  (28,'1B13',-1,1,0,NULL,-1,NULL,11,0,NULL,3,0,10,5,2),
  (29,'1B13',-1,1,0,NULL,-1,NULL,11,1,NULL,3,5,6,5,2),
  (30,'1B14',-1,1,0,NULL,-1,NULL,12,0,NULL,3,0,10,5,2),
  (31,'1B14',-1,1,0,NULL,-1,NULL,12,1,NULL,3,5,5,5,2),
  (32,'1B21',-1,1,0,NULL,-1,NULL,13,0,NULL,3,0,10,5,2),
  (33,'1B21',-1,1,0,NULL,-1,NULL,13,1,NULL,3,5,5,5,2),
  (34,'1B22',-1,1,0,NULL,-1,NULL,14,0,NULL,3,0,10,5,2),
  (35,'1B22',-1,1,0,NULL,-1,NULL,14,1,NULL,3,5,5,5,2),
  (36,'1B23',-1,1,0,NULL,-1,NULL,15,0,NULL,3,0,10,5,2),
  (37,'1B23',-1,1,0,NULL,-1,NULL,15,1,NULL,3,5,5,5,2),
  (38,'1B24',-1,1,0,NULL,-1,NULL,16,0,NULL,3,0,10,5,2),
  (39,'1B24',-1,1,0,NULL,-1,NULL,16,1,NULL,3,5,5,5,2);

COMMIT;

