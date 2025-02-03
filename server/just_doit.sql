/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80026
 Source Host           : localhost:3306
 Source Schema         : just_doit

 Target Server Type    : MySQL
 Target Server Version : 80026
 File Encoding         : 65001

 Date: 25/01/2025 00:06:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for just_doit_menu
-- ----------------------------
DROP TABLE IF EXISTS `just_doit_menu`;
CREATE TABLE `just_doit_menu`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `label` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '路由名称',
  `icon` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '图标',
  `path` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '路由访问路径',
  `parent_id` int NULL DEFAULT NULL COMMENT '上级ID',
  `page_url` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '路由文件路径',
  `status` int NOT NULL DEFAULT 1 COMMENT '状态',
  `parent_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '上级名称',
  `type` int NOT NULL COMMENT '权限类型，1：模块，2：页面',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of just_doit_menu
-- ----------------------------
INSERT INTO `just_doit_menu` VALUES (1, '2025-01-20 16:59:21.727506', '2025-01-22 23:46:53.634066', 'aa', '首页', 'icon-zhuye', '/home', NULL, '/home/index', 1, NULL, 2);
INSERT INTO `just_doit_menu` VALUES (2, '2025-01-20 16:59:21.000000', '2025-01-20 16:59:21.000000', 'asd', '用户管理', 'icon-yonghu', '', NULL, '', 1, NULL, 1);
INSERT INTO `just_doit_menu` VALUES (3, '2025-01-20 16:59:21.000000', '2025-01-22 23:46:48.787610', '', '用户列表', '', '/user', 2, '/user/index', 1, NULL, 2);
INSERT INTO `just_doit_menu` VALUES (4, '2025-01-20 16:59:21.000000', '2025-01-20 16:59:21.000000', '', '角色列表', '', '/role', 2, '/user/role', 1, NULL, 2);
INSERT INTO `just_doit_menu` VALUES (5, '2025-01-20 18:15:39.045692', '2025-01-21 21:23:33.015074', '', '菜单列表', '', '/menu', 2, '/user/menu', 1, NULL, 2);
INSERT INTO `just_doit_menu` VALUES (6, '2025-01-20 18:16:50.662721', '2025-01-20 18:16:50.662721', '', '打坐管理', 'icon-dazuo', '', NULL, '', 1, NULL, 1);
INSERT INTO `just_doit_menu` VALUES (7, '2025-01-20 18:17:33.882552', '2025-01-21 21:24:13.000000', '', '模式列表', '', '/mode', 6, '/dazuo/mode', 1, NULL, 2);
INSERT INTO `just_doit_menu` VALUES (8, '2025-01-20 18:18:03.752932', '2025-01-21 21:30:48.000000', '', '打坐记录', '', '/record', 6, '/dazuo/record', 1, NULL, 2);

-- ----------------------------
-- Table structure for just_doit_mode
-- ----------------------------
DROP TABLE IF EXISTS `just_doit_mode`;
CREATE TABLE `just_doit_mode`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主题名称',
  `type` int NOT NULL COMMENT '计时方式，1：正，2：反,3:不计时',
  `time` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '计时分钟',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of just_doit_mode
-- ----------------------------
INSERT INTO `just_doit_mode` VALUES (1, '2025-01-21 22:31:18.015770', '2025-01-21 22:31:18.015770', '', '无极模式', 3, '');
INSERT INTO `just_doit_mode` VALUES (2, '2025-01-21 22:32:35.359797', '2025-01-21 22:33:28.000000', '番茄模式是一种很热门的计时方式，是经过科学验证过的，25分钟是一段很好的时间', '番茄模式', 2, '25');

-- ----------------------------
-- Table structure for just_doit_record
-- ----------------------------
DROP TABLE IF EXISTS `just_doit_record`;
CREATE TABLE `just_doit_record`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `status` int NOT NULL COMMENT '记录状态，1：已完成，0：未完成',
  `duringTime` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '持续时间',
  `modeId` int NOT NULL COMMENT '模式ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of just_doit_record
-- ----------------------------
INSERT INTO `just_doit_record` VALUES (1, '2025-01-21 23:14:15.426431', '2025-01-21 23:14:15.426431', NULL, 1, '4', 1);
INSERT INTO `just_doit_record` VALUES (2, '2025-01-21 23:14:55.724866', '2025-01-21 23:14:55.724866', NULL, 1, '45', 1);
INSERT INTO `just_doit_record` VALUES (3, '2025-01-21 23:15:00.173006', '2025-01-21 23:15:00.173006', NULL, 1, '49', 1);
INSERT INTO `just_doit_record` VALUES (4, '2025-01-21 23:15:56.182549', '2025-01-21 23:15:56.182549', NULL, 1, '53', 1);
INSERT INTO `just_doit_record` VALUES (5, '2025-01-21 23:17:06.582705', '2025-01-21 23:17:06.582705', NULL, 0, '57', 2);

-- ----------------------------
-- Table structure for just_doit_role
-- ----------------------------
DROP TABLE IF EXISTS `just_doit_role`;
CREATE TABLE `just_doit_role`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名称',
  `status` int NOT NULL DEFAULT 1 COMMENT '状态 1启用 0禁用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of just_doit_role
-- ----------------------------
INSERT INTO `just_doit_role` VALUES (8, '2025-01-21 13:23:29.259739', '2025-01-21 13:23:29.259739', NULL, '菩提座下', 1);
INSERT INTO `just_doit_role` VALUES (9, '2025-01-21 13:23:29.000000', '2025-01-21 13:23:29.000000', NULL, '花果山弟子', 1);

-- ----------------------------
-- Table structure for just_doit_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `just_doit_role_menu`;
CREATE TABLE `just_doit_role_menu`  (
  `role_id` int NOT NULL,
  `menu_id` int NOT NULL,
  PRIMARY KEY (`role_id`, `menu_id`) USING BTREE,
  INDEX `IDX_6f35a1c9dd88acf3bb172f3fd7`(`role_id`) USING BTREE,
  INDEX `IDX_4eddb4ac564f29c90fcd5dc5bd`(`menu_id`) USING BTREE,
  CONSTRAINT `FK_4eddb4ac564f29c90fcd5dc5bd1` FOREIGN KEY (`menu_id`) REFERENCES `just_doit_menu` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `FK_6f35a1c9dd88acf3bb172f3fd7b` FOREIGN KEY (`role_id`) REFERENCES `just_doit_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of just_doit_role_menu
-- ----------------------------
INSERT INTO `just_doit_role_menu` VALUES (8, 1);
INSERT INTO `just_doit_role_menu` VALUES (8, 2);
INSERT INTO `just_doit_role_menu` VALUES (8, 3);
INSERT INTO `just_doit_role_menu` VALUES (8, 4);
INSERT INTO `just_doit_role_menu` VALUES (8, 5);
INSERT INTO `just_doit_role_menu` VALUES (8, 6);
INSERT INTO `just_doit_role_menu` VALUES (8, 7);
INSERT INTO `just_doit_role_menu` VALUES (8, 8);
INSERT INTO `just_doit_role_menu` VALUES (9, 1);
INSERT INTO `just_doit_role_menu` VALUES (9, 6);
INSERT INTO `just_doit_role_menu` VALUES (9, 7);
INSERT INTO `just_doit_role_menu` VALUES (9, 8);

-- ----------------------------
-- Table structure for just_doit_theme
-- ----------------------------
DROP TABLE IF EXISTS `just_doit_theme`;
CREATE TABLE `just_doit_theme`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主题名称',
  `type` int NOT NULL COMMENT '计时方式，1：正，2：反',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of just_doit_theme
-- ----------------------------

-- ----------------------------
-- Table structure for just_doit_user
-- ----------------------------
DROP TABLE IF EXISTS `just_doit_user`;
CREATE TABLE `just_doit_user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `username` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名称',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '123456' COMMENT '用户密码',
  `isNotify` int NOT NULL COMMENT '邮箱提醒状态 1/0 开/关',
  `email` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户邮箱',
  `gender` int NOT NULL COMMENT '性别 ， 1：男，2：女',
  `avator` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户头像',
  `role_id` int NOT NULL COMMENT '用户角色ID',
  `notifyTime` datetime(0) NULL DEFAULT NULL COMMENT '邮箱提醒时间',
  `role_name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户角色名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of just_doit_user
-- ----------------------------
INSERT INTO `just_doit_user` VALUES (1, '2025-01-10 11:43:26.261766', '2025-01-21 13:24:12.000000', NULL, 'wukong', '123456', 0, '1', 1, '', 8, NULL, '菩提座下');
INSERT INTO `just_doit_user` VALUES (4, '2025-01-21 13:25:33.191996', '2025-01-21 13:25:33.191996', NULL, 'chikao', '123456', 0, '160636', 1, NULL, 9, NULL, '花果山弟子');

SET FOREIGN_KEY_CHECKS = 1;
