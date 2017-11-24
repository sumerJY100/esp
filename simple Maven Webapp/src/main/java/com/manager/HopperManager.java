package com.manager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Service;

import base.manager.BaseManager;

import com.dao.EPDao;
import com.dao.HopperDao;
import com.dao.LowDeviceDao;
import com.dao.RapperDao;
import com.json.HopperJson;
import com.pojo.Ep;
import com.pojo.Hopper;
import com.pojo.LowDevice;



@Service
public class HopperManager extends BaseManager<Hopper> {

	@Resource
	private EPDao epDao;
	@Resource
	private RapperDao rapperDao;
	@Resource 
	private HopperDao hopperDao;
	@Resource
	private LowDeviceDao lowDeviceDao;
	@Override
	public HopperDao getBaseDao() {
		return hopperDao;
	}
	public String getHopperListForTable() {
		StringBuffer buffer = new StringBuffer();
		List<Hopper> hopperList = hopperDao.findAll();
		List<Ep> epList = epDao.findAll();
		Map<Integer,Ep> epMap = new HashMap<Integer ,Ep>();
		List<LowDevice> lowDeviceList = lowDeviceDao.findAll();
		Map<Integer,LowDevice> lowDeviceMap = new HashMap<Integer,LowDevice>();
		for(LowDevice lowDevice:lowDeviceList){
			lowDeviceMap.put(lowDevice.getId(), lowDevice);
		}
		for(Ep ep:epList){
			epMap.put(ep.getId(), ep);
		}
		for(Hopper hopper:hopperList){
			if(null != hopper && null != hopper.getEpId()){
				hopper.setEp(epMap.get(hopper.getEpId()));
			}
		}
		Collections.sort(hopperList, new HopperComparator());
		
		buffer.append("<table><tbody>");
		for(Hopper hopper:hopperList){
			buffer.append("<tr>");
			buffer.append("<td>" + hopper.getId() + "</td>");
			buffer.append("<td>" + hopper.getName() + "</td>");
			buffer.append("<td>" + (null==hopper.getEp()?"--":hopper.getEp().getName()) + "</td>");
			buffer.append("<td>" + hopper.getLocation() + "</td>");
			buffer.append("<td>" + hopper.getHopperLevel() + "</td>");
			buffer.append("<td>" + hopper.getAlarmHopperLevel() + "</td>");
			if(null != hopper && hopper.getLowDeviceId() != null)
				hopper.setLowDevice(lowDeviceMap.get(hopper.getLowDeviceId()));
			if(null != hopper && hopper.getLowDevice() != null)
				buffer.append("<td>" + hopper.getLowDevice().getName() + "</td>");
			else
				buffer.append("<td>--</td>");
			buffer.append("<td><a href ='addOrEditHopper.do?hopper.id=" + hopper.getId() +"'>修改</a></td>");
			buffer.append("<td><a href ='delHopper.do?hopper.id=" + hopper.getId() +"'>删除</a></td>");
			buffer.append("</tr>");
		}
		buffer.append("</tbody></table>");
		return buffer.toString();
	}
	private class HopperComparator implements Comparator<Hopper>{
		
		@Override
		public int compare(Hopper o1, Hopper o2) {
			int result = 0;
			if(null != o1 && null != o2){
				if(null != o1.getEp() && null != o2.getEp()){
					if(null != o1.getEp().getOrdinalPosition() && null != o2.getEp().getOrdinalPosition()){
						result = o1.getEp().getOrdinalPosition() - o2.getEp().getOrdinalPosition();
						if(result == 0){
							if(null != o1.getLocation() && null != o2.getLocation()){
								result = o1.getLocation() - o2.getLocation();
							}
						}
					}
				}
			}
			return result;
		}
		

		
	}
	public String getHopperJSONData() {
		List<HopperJson> hjList = new ArrayList<HopperJson>();
		//Map<Integer ,Ep> epMap = epDao.findAllToMap();
		List<Ep> epList = epDao.findAllOrderByLocation();
		Map<Integer ,Ep> epMap = new HashMap<Integer,Ep>();
		for(Ep ep:epList){
			epMap.put(ep.getId(), ep);
		}
		List<Hopper> hopperList = hopperDao.findAll();
		Map<Integer,List<Hopper>> hopperMap = new HashMap<Integer,List<Hopper>>();
		for(Hopper hopper:hopperList){
			if(null != hopper && null != hopper.getEpId()){
				if(null == hopperMap.get(hopper.getEpId())){
					List<Hopper> tempList = new ArrayList<Hopper>();
					tempList.add(hopper);
					hopperMap.put(hopper.getEpId(), tempList);
				}else{
					hopperMap.get(hopper.getEpId()).add(hopper);
				}
				if(null != hopperMap.get(hopper.getEpId())){
					Collections.sort(hopperMap.get(hopper.getEpId()),new HopperComparator());
				}
			}
		}
		for(Ep ep:epList){
			HopperJson hj = new HopperJson();
			hj.setEpId(ep.getId());
			hj.setEp(ep);
			hj.setHopperList(hopperMap.get(ep.getId()));
			hjList.add(hj);
		}
		
		JSONArray jsonArray = JSONArray.fromObject(hjList);
		return jsonArray.toString();
	}
}
