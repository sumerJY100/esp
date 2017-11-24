package com.manager;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import base.dao.BaseDao;
import base.manager.BaseManager;
import base.pojo.BasePojo;

import com.dao.LowAlarmDao;
import com.pojo.Heater;
import com.pojo.Hopper;
import com.pojo.LowAlarm;
import com.pojo.LowDevice;
import com.pojo.Rapper;

@Service
public class LowAlarmManager extends BaseManager<LowAlarm> {

	@Resource
	private LowAlarmDao lowAlarmDao;

	@Override
	public LowAlarmDao getBaseDao() {
		return lowAlarmDao;
	}

	public void generatorCommunicationInterruptAlarm(BasePojo basePojo) {
		if (null != basePojo) {
			if (basePojo instanceof Heater) {
				// generatorLowAlarm(basePojo, LowAlarm.DEVICE_TYPE_HEATER,
				// LowAlarm.ALARM_COMMUNICATION_INTERUPT);
			} else if (basePojo instanceof Rapper) {
				// generatorLowAlarm(basePojo, LowAlarm.DEVICE_TYPE_RAPPER,
				// LowAlarm.ALARM_COMMUNICATION_INTERUPT);
			} else if (basePojo instanceof Hopper) {
				// generatorLowAlarm(basePojo, LowAlarm.DEVICE_TYPE_HOPPER,
				// LowAlarm.ALARM_COMMUNICATION_INTERUPT);
			} else if (basePojo instanceof LowDevice) {
				generatorLowAlarm(basePojo, LowAlarm.DEVICE_TYPE_LOW_DEVICE, LowAlarm.ALARM_COMMUNICATION_INTERUPT);
			}
		}
	}

	public void generatorLowAlarm(BasePojo basePojo, Integer deviceType, Integer alarmType) {

		if (null != basePojo) {
			LowAlarm lowAlarmTemp = getLowAlarm(basePojo.getId(), deviceType, alarmType);
//			System.out.println("basePojo.getId:" + basePojo.getId() + ", deviceType:" + deviceType + ",alarmType:" + alarmType + "," + lowAlarmTemp);
			if (null == lowAlarmTemp) {

				LowAlarm lowAlarm = new LowAlarm();
				lowAlarm.setAlarmTime(new Date());
				lowAlarm.setAlarmType(alarmType);
				lowAlarm.setDeviceType(deviceType);
				lowAlarm.setDeviceId(basePojo.getId());
				lowAlarm.setAlarmState(1);
				if (basePojo instanceof Heater) {
					Heater heater = (Heater) basePojo;
					if (null != heater.getEp()) {
						lowAlarm.setEpName(heater.getEp().getName());
					}
					lowAlarm.setEpDeviceId(heater.getEpId());
				} else if (basePojo instanceof Rapper) {
					Rapper rapper = (Rapper) basePojo;
					if (null != rapper.getEp()) {
						lowAlarm.setEpName(rapper.getEp().getName());
					}
					lowAlarm.setEpDeviceId(rapper.getEpId());
				} else if (basePojo instanceof Hopper) {
					Hopper hopper = (Hopper) basePojo;
					if (null != hopper.getEp()) {
						lowAlarm.setEpName(hopper.getEp().getName());
					}
					lowAlarm.setEpDeviceId(hopper.getEpId());
				} else if (basePojo instanceof LowDevice) {
					LowDevice lowDevice = (LowDevice) basePojo;
					lowAlarm.setEpDeviceId(lowDevice.getId());
				}
				this.getBaseDao().save(lowAlarm);
			}
		}
	}

	/**
	 * 判断当前告警是否存在
	 * 
	 * @param deviceId
	 *            设备ID
	 * @param deviceType
	 * @param alarmType
	 * @return
	 */
	private LowAlarm getLowAlarm(Integer deviceId, Integer deviceType, Integer alarmType) {
		if (null != deviceId && null != deviceType && null != alarmType) {
			String[] propertiesArr = new String[] { "deviceId", "deviceType", "alarmType", "alarmState" };
			Object[] valuesArr = new Object[] { deviceId, deviceType, alarmType, 1 };
			List<LowAlarm> lowAlarmList = lowAlarmDao.findByPropertys(propertiesArr, valuesArr, true, BaseDao.QUERY_CONNECT_AND);
			if (null != lowAlarmList && lowAlarmList.size() > 0) {
				return lowAlarmList.get(0);
			}
		}
		return null;
	}

}
