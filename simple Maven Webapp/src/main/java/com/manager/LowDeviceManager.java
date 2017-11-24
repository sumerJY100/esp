package com.manager;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import base.manager.BaseManager;

import com.dao.HeaterDao;
import com.dao.HopperDao;
import com.dao.LowDeviceDao;
import com.dao.RapperDao;
import com.pojo.Heater;
import com.pojo.Hopper;
import com.pojo.LowDevice;
import com.pojo.Rapper;

@Service
public class LowDeviceManager extends BaseManager<LowDevice> {

	@Resource
	
	private LowDeviceDao lowDeviceDao;
	@Resource
	private HeaterDao heaterDao;
	@Resource
	private RapperDao rapperDao;
	@Resource
	private HopperDao hopperDao;

	@Override
	public LowDeviceDao getBaseDao() {
		return lowDeviceDao;
	}

	public String getLowDeviceTable() {
		StringBuffer buffer = new StringBuffer();
		buffer.append("<table><tbody>");
		List<LowDevice> lowDeviceList = lowDeviceDao.findAll();
		if (null != lowDeviceList && lowDeviceList.size() > 0) {
			for (LowDevice lowDevice : lowDeviceList) {
				if (null != lowDevice) {
					buffer.append("<tr>");
					buffer.append("<td>" + lowDevice.getId() + "</td>");
					buffer.append("<td>" + lowDevice.getName() + "</td>");
					buffer.append("<td>" + lowDevice.getRunState() + "</td>");
					buffer.append("<td><a href='addOrEditLowDevice.do?lowDevice.id=" + lowDevice.getId() + "'>修改  </a></td>");
					buffer.append("<td><a href='delLowDevice.do?lowDevice.id=" + lowDevice.getId() + "'>删除  </a></td>");
					buffer.append("</tr>");
				}
			}
		}
		buffer.append("</tbody></table>");
		return buffer.toString();
	}

	public List<LowDevice> findAllInList() {
		List<LowDevice> lowDeviceList = lowDeviceDao.findAll();
		if(null != lowDeviceList){
			if(lowDeviceList.size() > 0){
				for(LowDevice lowDevice:lowDeviceList){
					if(null != lowDevice && null != lowDevice.getId()){
						List<Rapper> rapperList = rapperDao.findByProperty("lowDeviceId", lowDevice.getId());
						List<Heater> heaterList = heaterDao.findByProperty("lowDeviceId", lowDevice.getId());
						List<Hopper> hopperList = hopperDao.findByProperty("lowDeviceId", lowDevice.getId());
						
						lowDevice.setHeaterList(heaterList);
						lowDevice.setRapperList(rapperList);
						lowDevice.setHopperList(hopperList);
					}
				}
			}
		}
		return lowDeviceList;
	}

}
