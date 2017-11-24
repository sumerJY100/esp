package com.manager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import base.dao.BaseDao;
import base.manager.BaseManager;

import com.dao.EPDao;
import com.dao.HeaterDao;
import com.dao.HeaterTempratorDao;
import com.dao.LowDeviceDao;
import com.json.HeaterJson;
import com.pojo.Ep;
import com.pojo.Heater;
import com.pojo.HeaterTemprator;
import com.pojo.LowDevice;

@Service
public class HeaterManager extends BaseManager<Heater> {

	@Resource
	private HeaterDao heaterDao;
	@Resource
	private EPDao epDao;
	@Resource
	private HeaterTempratorDao heaterTempratorDao;
	@Resource
	private LowDeviceDao lowDeviceDao;

	@Override
	public HeaterDao getBaseDao() {
		return heaterDao;
	}

	public String getListHeaterDataForTable() {
		StringBuffer buffer = new StringBuffer();
		buffer.append("<table><tbody>");
		List<Heater> heaterList = this.getBaseDao().findAllOrderByProperty("epId", BaseDao.QUERY_ASC);
		List<Ep> epList = epDao.findAll();
		List<LowDevice> lowDeviceList = lowDeviceDao.findAll();
		List<HeaterTemprator> htList = heaterTempratorDao.findAll();
		Map<Integer, Ep> map = new HashMap<Integer, Ep>();
		Map<Integer, HeaterTemprator> htMap = new HashMap<Integer, HeaterTemprator>();
		Map<Integer, LowDevice> lowDeviceMap = new HashMap<Integer, LowDevice>();
		for (Ep ep : epList) {
			map.put(ep.getId(), ep);
		}
		for (HeaterTemprator ht : htList) {
			htMap.put(ht.getId(), ht);
		}
		for (LowDevice lowDevice : lowDeviceList) {
			lowDeviceMap.put(lowDevice.getId(), lowDevice);
		}
		for (Heater heater : heaterList) {
			if (null != heater && null != heater.getEpId()) {
				heater.setEp(map.get(heater.getEpId()));
			}
			if (null != heater && null != heater.getLowDeviceId()) {
				heater.setLowDevice(lowDeviceMap.get(heater.getLowDeviceId()));
			}
			heater.setHeaterTemprator(htMap.get(heater.getHeaterTempratorId()));
			buffer.append("<tr>");
			buffer.append("<td>" + heater.getId() + "</td>");
			buffer.append("<td>" + heater.getName() + "</td>");
			buffer.append("<td>" + (null == heater.getRunState() ? "0" : heater.getRunState()) + "</td>");
			buffer.append("<td>" + (null == heater.getAlarmState() ? "0" : heater.getAlarmState()) + "</td>");
			buffer.append("<td>" + (null == heater.getComunication() ? "0" : heater.getComunication()) + "</td>");
			buffer.append("<td>" + heater.getHeaterTypeString() + "</td>");
			if (null != heater && null != heater.getEp()) {
				buffer.append("<td>" + (null == heater.getEp().getName() ? "--" : heater.getEp().getName()) + "</td>");
			} else {
				buffer.append("<td>" + "--" + "</td>");
			}

			if (null != heater && null != heater.getHeaterTemprator()) {
				buffer.append("<td>" + heater.getHeaterTemprator().getName() + "-" + heater.getHeaterTemprator().getTempratorTypeString() + "</td>");
				buffer.append("<td>" + heater.getHeaterTemprator().getTemprator() + "</td>");
				buffer.append("<td>" + heater.getHeaterTemprator().getTempratorLower() + "</td>");
				buffer.append("<td>" + heater.getHeaterTemprator().getTempratorUpper() + "</td>");
			} else {
				buffer.append("<td>" + "--" + "</td>");
				buffer.append("<td>" + "--" + "</td>");
				buffer.append("<td>" + "--" + "</td>");
				buffer.append("<td>" + "--" + "</td>");
			}
			if (null != heater && null != heater.getLowDevice()) {
				buffer.append("<td>" + heater.getLowDevice().getName() + "</td>");
			} else {
				buffer.append("<td>" + "--" + "</td>");
			}
			buffer.append("<td><a href='addOrEditHeater.do?heater.id=" + heater.getId() + "'>修改  </a></td>");
			buffer.append("<td><a href='delHeater.do?heater.id=" + heater.getId() + "'>删除  </a></td>");
			buffer.append("</tr>");
		}
		buffer.append("</table></tbody>");
		return buffer.toString();
	}

	public Map<String, HeaterJson> getLatestDataToHeaterJson() {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * 获取JSON
	 * 
	 * @return
	 */
	public List<HeaterJson> getHeaterJson() {
		List<HeaterJson> list = new ArrayList<HeaterJson>();
		List<HeaterTemprator> htList = heaterTempratorDao.findAllOrderByProperty("epId", BaseDao.QUERY_ASC);
		List<Heater> heaterList = heaterDao.findAll();
		Map<Integer, List<Heater>> heaterMap = new HashMap<Integer, List<Heater>>();
		for (Heater heater : heaterList) {
			Set<Integer> keySet = heaterMap.keySet();
			if (!keySet.contains(heater.getHeaterTempratorId())) {
				heaterMap.put(heater.getHeaterTempratorId(), new ArrayList<Heater>());
			}
			List<Heater> tempHeaterList = heaterMap.get(heater.getHeaterTempratorId());
			if (null != tempHeaterList) {
				tempHeaterList.add(heater);
				Collections.sort(tempHeaterList, new Comparator<Heater>() {
					
					@Override
					public int compare(Heater o1, Heater o2) {
						int result = o1.getEpId() - o2.getEpId();
						if (result == 0) {
							return o2.getHeaterType() - o1.getHeaterType();
						} else {
							return result;
						}
					}

				});
			}
		}
		for (HeaterTemprator heaterTemprator : htList) {
			HeaterJson hj = new HeaterJson();
			hj.setHeaterTempratorId(heaterTemprator.getId());
			hj.setHeaterTemprator(heaterTemprator);
			hj.setHeaterList(heaterMap.get(heaterTemprator.getId()));
			list.add(hj);
		}
		return list;
	}

	public void updateCommunicationByLowDevice(LowDevice lowDevice) {
		String hqlString = " update  Heater r set r.comunication = ?  where r.lowDeviceId = ? ";
		heaterDao.updateByHql(hqlString, lowDevice.getRunState(), lowDevice.getId());
	}

}
