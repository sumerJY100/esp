package com.manager;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import base.dao.BaseDao;
import base.manager.BaseManager;

import com.dao.EPDao;
import com.dao.HeaterTempratorDao;
import com.dao.LowDeviceDao;
import com.pojo.Ep;
import com.pojo.HeaterTemprator;
import com.pojo.LowDevice;

@Service
public class HeaterTempratorManager extends BaseManager<HeaterTemprator> {

	@Resource
	private HeaterTempratorDao heaterTempratorDao;
	@Resource
	private EPDao epDao;
	@Resource
	private LowDeviceDao lowDeviceDao;

	@Override
	public HeaterTempratorDao getBaseDao() {
		return heaterTempratorDao;
	}

	public String getListDataForTable() {
		StringBuffer buffer = new StringBuffer();
		buffer.append("<table><tbody>");
		List<HeaterTemprator> list = heaterTempratorDao.findAllOrderByProperty("epId", BaseDao.QUERY_ASC);
		List<Ep> epList = epDao.findAll();
		List<LowDevice> lowDeviceList = lowDeviceDao.findAll();
		Map<Integer, LowDevice> lowDeviceMap = new HashMap<Integer, LowDevice>();
		for (LowDevice lowDevice : lowDeviceList) {
			lowDeviceMap.put(lowDevice.getId(), lowDevice);
		}
		Map<Integer, Ep> map = new HashMap<Integer, Ep>();
		for (Ep ep : epList) {
			map.put(ep.getId(), ep);
		}
		if (null != list && list.size() > 0) {
			for (HeaterTemprator ht : list) {
				buffer.append("<tr>");
				buffer.append("<td>" + ht.getId() + "</td>");
				buffer.append("<td>" + ht.getName() + "</td>");
				buffer.append("<td>" + ht.getTempratorTypeString() + "</td>");
				buffer.append("<td>" + ht.getCommunication() + "</td>");
				ht.setEp(map.get(ht.getEpId()));
				buffer.append("<td>" + (null == ht.getEp() ? "--" : ht.getEp().getName()) + "</td>");
				buffer.append("<td>" + ht.getTemprator() + "</td>");
				buffer.append("<td>" + ht.getTempratorLower() + "</td>");
				buffer.append("<td>" + ht.getTempratorUpper() + "</td>");
				if (null != ht & null != ht.getLowDeviceId())
					ht.setLowDevice(lowDeviceMap.get(ht.getLowDeviceId()));
				if (null != ht && null != ht.getLowDevice())
					buffer.append("<td>" + ht.getLowDevice().getName() + "</td>");
				else
					buffer.append("<td>" + "--" + "</td>");
				buffer.append("<td><a href ='addOrEditHeaterTemprator.do?heaterTemprator.id=" + ht.getId() + "'>修改</a></td>");
				buffer.append("<td><a href ='delHeaterTemprator.do?heaterTemprator.id=" + ht.getId() + "'>删除</a></td>");
				buffer.append("</tr>");
			}
		}
		buffer.append("</tbody></table>");
		return buffer.toString();
	}

	public void updateCommunicationByLowDevice(LowDevice lowDevice) {
		String hqlString = " update  HeaterTemprator r set r.communication = ?  where r.lowDeviceId = ? ";
		heaterTempratorDao.updateByHql(hqlString, lowDevice.getRunState(), lowDevice.getId());
	}

}
