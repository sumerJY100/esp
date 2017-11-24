package com.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import base.dao.BaseDaoForAnnotation;

import com.pojo.EpAlarm;

@Repository
public class EpAlarmDao extends BaseDaoForAnnotation<EpAlarm, Integer> {

	public List<EpAlarm> findAlarmInAlarm() {
		String hql = " from EpAlarm ea where ea.alarmState = 1 order by ea.alarmTime";
		return this.find(hql);
	}
}
