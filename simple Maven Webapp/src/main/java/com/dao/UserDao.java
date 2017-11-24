package com.dao;

import org.springframework.stereotype.Repository;

import base.dao.BaseDaoForAnnotation;

import com.pojo.User;

@Repository
public class UserDao extends BaseDaoForAnnotation<User, Integer> {
}
