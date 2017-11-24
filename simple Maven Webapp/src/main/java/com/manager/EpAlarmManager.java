package com.manager;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import base.dao.BaseDao;
import base.manager.BaseManager;

import com.dao.EPDao;
import com.dao.EpAlarmDao;
import com.pojo.Ep;
import com.pojo.EpAlarm;

@Service
public class EpAlarmManager extends BaseManager<EpAlarm> {

	@Resource
	private EpAlarmDao epAlarmDao;
	@Resource
	private EPDao epDao;

	@Override
	public EpAlarmDao getBaseDao() {
		return epAlarmDao;
	}

	public void generatorEpCommunicationInterruptAlarm(Ep ep) {
		generatorAlarm(ep, EpAlarm.ALARM_TYPE_COMMUNICATION_INTERRUPT);
	}

	/**
	 * 根据Ep编号与告警类型，查询是否存在没有接警的告警信息
	 * 
	 * @param ep
	 * @param alarmType
	 * @return
	 */
	private EpAlarm getAlarm(Ep ep, Integer alarmType) {
		String[] propertiesArr = new String[]{ "epDeviceId", "alarmType", "alarmState" };
		Object[] valuesArr = new Object[]{ ep.getId(), alarmType,1 };
		List<EpAlarm> epAlarmList = epAlarmDao.findByPropertys(propertiesArr ,valuesArr , true, BaseDao.QUERY_CONNECT_AND);
		if (null != epAlarmList && epAlarmList.size() > 0) {
			for (EpAlarm epAlarm : epAlarmList) {
				return epAlarm;
			}
		}
		return null;
	}

	/**
	 * 判断录入的告警信息是否仍没有解除告警 如果没有解除告警，则不进行录入告警信息
	 * 
	 * @param ep
	 * @param alarmType
	 */
	public void generatorAlarm(Ep ep, Integer alarmType) {
		if (null == getAlarm(ep, EpAlarm.ALARM_TYPE_COMMUNICATION_INTERRUPT)) {
			EpAlarm epAlarm = new EpAlarm();
			epAlarm.setAlarmState(1);
			epAlarm.setAlarmTime(new Date());
			epAlarm.setAlarmType(alarmType);
			epAlarm.setEpDeviceId(ep.getId());
			epAlarm.setEpName(ep.getName());
			epAlarmDao.save(epAlarm);
		}
	}

}
