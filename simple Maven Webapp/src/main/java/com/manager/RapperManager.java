package com.manager;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import base.dao.BaseDao;
import base.manager.BaseManager;

import com.dao.EPDao;
import com.dao.LowDeviceDao;
import com.dao.RapperDao;
import com.json.RapperJson;
import com.pojo.Ep;
import com.pojo.LowDevice;
import com.pojo.Rapper;

@Service
public class RapperManager extends BaseManager<Rapper> {

	@Resource
	private RapperDao rapperDao;
	@Resource
	private EPDao epDao;
	@Resource
	private LowDeviceDao lowDeviceDao;

	@Override
	public RapperDao getBaseDao() {
		return rapperDao;
	}

	public Map<String, RapperJson> getLatestDataToRapperJson() {
		// TODO Auto-generated method stub
		return null;
	}

	public String getListRapperDataForTable() {

		return getListRapperDataForTable(null);
	}

	public String getListRapperDataForTable(Integer rapperType) {
		StringBuffer buffer = new StringBuffer();
		buffer.append("<table><tbody>");
		List<Rapper> rapperList = null;
		if (null == rapperType) {
			rapperList = this.getBaseDao().findAllOrderByProperty("epId", BaseDao.QUERY_ASC);
		} else {
			rapperList = this.getBaseDao().findByProperty("rapperType", rapperType);
		}
		List<Ep> epList = epDao.findAll();
		List<LowDevice> lowDeviceList = lowDeviceDao.findAll();
		Map<Integer, LowDevice> lowDeviceMap = new HashMap<Integer, LowDevice>();
		for (LowDevice lowDevice : lowDeviceList) {
			lowDeviceMap.put(lowDevice.getId(), lowDevice);
		}

		for (Rapper rapper : rapperList) {
			buffer.append("<tr>");
			buffer.append("<td>" + rapper.getId() + "</td>");
			buffer.append("<td>" + rapper.getName() + "</td>");
			buffer.append("<td>" + (null == rapper.getRapperType() ? "--" : (rapper.getRapperType().intValue() == 0 ? "<font style='color:red'>阳极</font>" : "阴极")) + "</td>");
			buffer.append("<td>" + (null == rapper.getRunState() ? "0" : rapper.getRunState()) + "</td>");
			buffer.append("<td>" + rapper.getAlarmState() + "</td>");
			buffer.append("<td>" + rapper.getComunication() + "</td>");
			buffer.append("<td>" + rapper.getRunWay() + "</td>");
			buffer.append("<td>" + rapper.getBeginTime() + "</td>");
			buffer.append("<td>" + rapper.getRunTime() + "</td>");
			buffer.append("<td>" + rapper.getWaitTime() + "</td>");

			if (null != rapper && null != rapper.getEpId()) {
				for (Ep ep : epList) {
					if (ep.getId().equals(rapper.getEpId())) {
						rapper.setEp(ep);
						break;
					}
				}
			}
			if (null != rapper && null != rapper.getLowDeviceId())
				rapper.setLowDevice(lowDeviceMap.get(rapper.getLowDeviceId()));
			if (null != rapper && null != rapper.getEp())
				buffer.append("<td>" + (null == rapper.getEp().getName() ? "--" : rapper.getEp().getName()) + "</td>");
			else
				buffer.append("<td>--</td>");
			if (null != rapper && null != rapper.getLowDevice())
				buffer.append("<td>" + rapper.getLowDevice().getName() + "</td>");
			else
				buffer.append("<td>" + "--" + "</td>");
			buffer.append("<td><a href='addOrEditRapper.do?rapper.id=" + rapper.getId() + "'>修改  </a></td>");
			buffer.append("<td><a href='delRapper.do?rapper.id=" + rapper.getId() + "'>删除  </a></td>");
			buffer.append("</tr>");
		}
		buffer.append("</tbody></table>");
		return buffer.toString();
	}

	public List<RapperJson> getFreshRapperData() {
		List<RapperJson> list = new ArrayList<RapperJson>();

		List<Ep> epList = epDao.findAllOrderByLocation();
		List<Rapper> rapperList = rapperDao.findAll();
		for (Ep ep : epList) {
			for (Rapper rapper : rapperList) {
				if (ep.getId().equals(rapper.getEpId())) {
					if (rapper.getRapperType().equals(Rapper.RAPPERTYPE_ANODE)) {
						ep.setAnodeRapper(rapper);
					} else if (rapper.getRapperType().equals(Rapper.RAPPERTYPE_CATCHODE)) {
						ep.setCathodeRapper(rapper);
					}
				}
			}
		}

		for (Ep ep : epList) {
			RapperJson rapperJson = null;
			if (null != ep.getAnodeRapper()) {
				rapperJson = new RapperJson();
				rapperJson.setAnodeRapperId(ep.getAnodeRapper().getId());
				rapperJson.setAnodeRapperMode(ep.getAnodeRapper().getRunType());
				rapperJson.setAnodeRapperState(ep.getAnodeRapper().getRunState());
				rapperJson.setAnodeCommunication(ep.getAnodeRapper().getComunication());
				rapperJson.setAnodeRapperBeginTime(ep.getAnodeRapper().getBeginTime());
				rapperJson.setAnodeRapperRunTime(ep.getAnodeRapper().getRunTime());
				rapperJson.setAnodeRapperWaitTime(ep.getAnodeRapper().getWaitTime());

				rapperJson.setAnodeRunWay(ep.getAnodeRapper().getRunWay());
			}
			if (null != ep.getCathodeRapper()) {
				rapperJson = new RapperJson();
				rapperJson.setCatchodeRapperId(ep.getCathodeRapper().getId());
				rapperJson.setCatchodeRapperMode(ep.getCathodeRapper().getRunType());
				rapperJson.setCatchodeRapperState(ep.getCathodeRapper().getRunState());
				rapperJson.setCathodeCommunication(ep.getCathodeRapper().getComunication());
				rapperJson.setCatchodeRapperBeginTime(ep.getCathodeRapper().getBeginTime());
				rapperJson.setCatchodeRapperRunTime(ep.getCathodeRapper().getRunTime());
				rapperJson.setCatchodeRapperWaitTime(ep.getCathodeRapper().getWaitTime());

				rapperJson.setCathodeRunWay(ep.getCathodeRapper().getRunWay());
			}
			if (null != rapperJson) {
				rapperJson.setEpId(ep.getId());
				rapperJson.setEpName(ep.getName());

				list.add(rapperJson);
			}
		}
		return list;
	}

	public void updateCommunicationByLowDevice(LowDevice lowDevice) {
		String hqlString = " update  Rapper r set r.comunication = ?  where r.lowDeviceId = ? ";
		rapperDao.updateByHql(hqlString, lowDevice.getRunState(), lowDevice.getId());

	}

	/**
	 * 
	 * @author 夏江勇 2016年12月3日 上午11:43:45
	 * 
	 * @param rapper
	 * @param setMethod
	 * @param getMethod
	 */
	public void findRapperByEpNameAndRapperTypeAndUpdateValue(Rapper rapper, Method setMethod, Method getMethod) {
		// TODO Auto-generated method stub
		String hqlString = " from Rapper r where r.name= ? and r.rapperType = ? ";
		List<Rapper> rapperList = rapperDao.find(hqlString, rapper.getName(), rapper.getRapperType());
		if (null != rapperList && rapperList.size() > 0) {
			Rapper resultRapper = rapperList.get(0);
			try {
				Object obj = getMethod.invoke(rapper);
				setMethod.invoke(resultRapper, obj);
				rapperDao.update(resultRapper);
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (IllegalArgumentException e) {
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				e.printStackTrace();
			}
		}
	}

}
