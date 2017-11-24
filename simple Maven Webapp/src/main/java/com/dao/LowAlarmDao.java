package com.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import base.dao.BaseDaoForAnnotation;

import com.pojo.LowAlarm;

@Repository
public class LowAlarmDao extends BaseDaoForAnnotation<LowAlarm, Integer> {

	public List<LowAlarm> findAlarmInAlarm() {
		String hql = " from LowAlarm la where la.alarmState = 1 order by la.alarmTime " ;
		return this.find(hql);
	}
}
