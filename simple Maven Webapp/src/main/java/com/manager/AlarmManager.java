package com.manager;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import base.dao.BaseDao;
import base.manager.BaseManager;
import base.pojo.BasePojo;

import com.dao.EpAlarmDao;
import com.dao.HeaterDao;
import com.dao.HeaterTempratorDao;
import com.dao.HopperDao;
import com.dao.LowAlarmDao;
import com.dao.LowDeviceDao;
import com.dao.RapperDao;
import com.pojo.EpAlarm;
import com.pojo.Heater;
import com.pojo.HeaterTemprator;
import com.pojo.Hopper;
import com.pojo.LowAlarm;
import com.pojo.LowDevice;
import com.pojo.Rapper;



@Service
public class AlarmManager extends BaseManager {
	@Resource
	private EpAlarmDao epAlarmDao;
	@Resource
	private LowAlarmDao lowAlarmDao;
	@Resource
	private LowDeviceDao lowDeviceDao;
	@Resource
	private HeaterDao heaterDao;
	@Resource
	private RapperDao rapperDao;
	@Resource
	private HopperDao hopperDao;
	@Resource
	private HeaterTempratorDao heaterTempratorDao;
	
	@Override
	public BaseDao getBaseDao() {
		return epAlarmDao;
	}

	public String showLatestAlarmLog() {
		List<EpAlarm> epAlaramList = epAlarmDao.findAlarmInAlarm();
		List<LowAlarm> lowAlarmList = lowAlarmDao.findAlarmInAlarm();
		setLowAlarmListByLowDevices(lowAlarmList);
		return getListTableString(epAlaramList,lowAlarmList);
	}
	
	public String showAllAlarmLog() {
		List<EpAlarm> epAlarmList = epAlarmDao.findAll();
		List<LowAlarm> lowAlarmList = lowAlarmDao.findAll();
		setLowAlarmListByLowDevices(lowAlarmList);
		return getListTableString(epAlarmList,lowAlarmList);
	}
	private void setLowAlarmListByLowDevices(List<LowAlarm> lowAlarmList){
		List<LowDevice> lowDeviceList = lowDeviceDao.findAll();
		List<Heater> heaterList = heaterDao.findAll();
		List<Rapper> rapperList = rapperDao.findAll();
		List<Hopper> hopperList = hopperDao.findAll();
		List<HeaterTemprator> heaterTmperatorList = heaterTempratorDao.findAll();
		setLowAlarmList(lowAlarmList,lowDeviceList,heaterList,rapperList,hopperList,heaterTmperatorList);
	}
	private void setLowAlarmList(List<LowAlarm> lowAlarmList, List<LowDevice> lowDeviceList, List<Heater> heaterList, List<Rapper> rapperList,
			List<Hopper> hopperList, List<HeaterTemprator> heaterTmperatorList) {
		Map<String,BasePojo> lowDeviceMap = generatorMapFromBasePojoList(lowDeviceList);
		if(null != lowAlarmList && null != lowDeviceMap){
			for(LowAlarm lowAlarm:lowAlarmList){
				if(null != lowAlarm.getDeviceId() && null != lowAlarm.getDeviceType()){
					String deviceTypeAndDeviceIdString = lowAlarm.getDeviceType().toString() + "-" + lowAlarm.getDeviceId().toString();
					BasePojo bp = lowDeviceMap.get(deviceTypeAndDeviceIdString);
					lowAlarm.setLowDevice(bp);
				}
			}
		}
	}

	private Map<String, BasePojo> generatorMapFromBasePojoList(Object obj) {
		Map<String,BasePojo> map = new HashMap<String,BasePojo>();
		if(obj instanceof List){
			List list = (List) obj;
			for(Object o:list){
				if(o instanceof BasePojo){
					BasePojo bp = (BasePojo) o;
					if(o instanceof Heater){
						map.put(LowAlarm.DEVICE_TYPE_HEATER.toString() + "-" + bp.getId().toString(), bp);
					}else if(o instanceof Rapper){
						map.put(LowAlarm.DEVICE_TYPE_RAPPER.toString() + "-" + bp.getId().toString(), bp);
					}else if(o instanceof LowDevice){
						
						map.put(LowAlarm.DEVICE_TYPE_LOW_DEVICE.toString() + "-" + bp.getId().toString(), bp);
					}else if(o instanceof HeaterTemprator){
						map.put(LowAlarm.DEVICE_HEATER_TEMPRATOR.toString() + "-" + bp.getId().toString(), bp);
					}else if(o instanceof Hopper){
						map.put(LowAlarm.DEVICE_TYPE_HOPPER.toString() + "-" + bp.getId().toString(), bp);
					}
				}
			}
		}
		return map;
	}

	private String getListTableString(List<EpAlarm> epAlaramList,List<LowAlarm> lowAlarmList){
		StringBuffer buffer = new StringBuffer();
		List<BasePojo> list = new ArrayList<BasePojo>();
		list.addAll(epAlaramList);
		list.addAll(lowAlarmList);
		Collections.sort(list, new AlarmComparator());
		buffer.append("<table><tbody>");
		for(BasePojo bp:list){
			if(null != bp){
				buffer.append("<tr>");
				Object returnObj = null;
				try {
					if (bp instanceof EpAlarm) {
						for (Method m : EpAlarm.getMethodForListTable) {
							returnObj = m.invoke(bp);
							buffer.append("<td>");
							buffer.append(null == returnObj?"--":returnObj);
							buffer.append("</td>");
						}
					} else if (bp instanceof LowAlarm) {
						for(Method m:LowAlarm.getMethodForListTable){
							returnObj = m.invoke(bp);
							buffer.append("<td>");
							buffer.append(null == returnObj?"--":returnObj);
							buffer.append("</td>");
						}
					}
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					e.printStackTrace();
				}
				buffer.append("</tr>");
			}
		}
		buffer.append("</tbody></table>");
		return buffer.toString();
	}
	private class AlarmComparator implements Comparator<BasePojo>{

	
		@Override
		public int compare(BasePojo o1, BasePojo o2) {
			if(null != o1 && null != o2){
				Date o1Time = null;
				if(o1 instanceof EpAlarm){
					o1Time = ((EpAlarm)o1).getAlarmTime();
				}else if(o1 instanceof LowAlarm){
					o1Time = ((LowAlarm)o1).getAlarmTime();
				}
				Date o2Time = null;
				if(o2 instanceof EpAlarm){
					o2Time = ((EpAlarm)o2).getAlarmTime();
				}else if(o1 instanceof LowAlarm){
					o2Time = ((LowAlarm)o2).getAlarmTime();
				}
				if(null != o1Time && null != o2Time){
					if(o1Time.getTime() - o2Time.getTime() !=0){
						return o1Time.getTime() - o2Time.getTime()>0?1:-1;
					}else{
						return 0;
					}
				}
			}
			return 0;
		}
		
	}


	

}
