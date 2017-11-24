package com.dao;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

import base.dao.BaseDaoForAnnotation;

import com.pojo.EpHistory;

@Repository
public class EpHistoryDao extends BaseDaoForAnnotation<EpHistory, Integer> {

	public List<EpHistory> findByEpIdAndBeginDateAnEndDate(Integer epId, Date beginDate, Date endDate) {
		String hql = "from EpHistory eh where eh.deviceId = ? and eh.recordTime > ? and eh.recordTime < ? order by eh.recordTime";
		return this.find(hql, epId,beginDate,endDate);
	}

	public List<EpHistory> findDataByQueryTime(Integer epId,Date queryBeginTime, Date queryEndTime) {
		if(null != queryBeginTime && null != queryEndTime){
			return findByEpIdAndBeginDateAnEndDate(epId,queryBeginTime,queryEndTime);
		}
		return null;
	}
}
