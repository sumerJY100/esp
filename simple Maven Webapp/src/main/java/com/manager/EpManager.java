package com.manager;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import base.manager.BaseManager;

import com.dao.EPDao;
import com.dao.HeaterDao;
import com.dao.RapperDao;
import com.json.EpJson;
import com.json.EpReadingsForEpParamsSetJson;
import com.json.EpSetAndReadingsForEpParamSetJson;
import com.pojo.Ep;
import com.pojo.Heater;
import com.pojo.HeaterTemprator;
import com.pojo.Rapper;
import com.pojo.pojoEnum.EPLocationOperationEnum;

@Service
public class EpManager extends BaseManager<Ep> {

	@Resource
	private EPDao epDao;
	@Resource
	private RapperDao rapperDao;
	@Resource
	private HeaterDao heaterDao;
	@Resource
	private HeaterTempratorManager heaterTempratorManager;

	@Override
	public EPDao getBaseDao() {
		return epDao;
	}

	@Override
	public void saveOrUpdate(Ep ep) {
		if (null != ep && null != ep.getId()) {
			Ep oldEp = epDao.findById(ep.getId());
			boolean flag = this.setEpNotNullAttributeToAnotherEpAttribute(oldEp, ep);
			epDao.saveOrUpdate(ep);
		} else if (null != ep && null == ep.getId()) {
			epDao.saveOrUpdate(ep);
			this.changeEpLocation(ep, EPLocationOperationEnum.EP_ADD);
		}
	}

	/**
	 * 将一个元素的非空属性值，赋值给另外一个元素的null属性值， 如果有赋值成功的数据，则返回true，否则返回false
	 * 
	 * @param oldEp
	 * @param ep
	 * @return
	 */
	private boolean setEpNotNullAttributeToAnotherEpAttribute(Ep oldEp, Ep ep) {
		Field[] fArr = Ep.class.getDeclaredFields();
		Method[] mArr = Ep.class.getMethods();
		List<String> mNameList = new ArrayList<String>();
//		System.out.println("--");
		for (int i = 0; i < mArr.length; i++) {
			mNameList.add(mArr[i].getName());
		}
		boolean flag = false;
		for (int i = 0; i < fArr.length; i++) {
			String tempFieldName = fArr[i].getName();
			String getName = "get" + tempFieldName.substring(0, 1).toUpperCase() + tempFieldName.substring(1);
			String setName = "set" + tempFieldName.substring(0, 1).toUpperCase() + tempFieldName.substring(1);
//			System.out.println(getName);
			if (mNameList.contains(getName) && mNameList.contains(setName)) {
				try {
					Method getMethod = Ep.class.getMethod(getName);
					Object getReturnObj = getMethod.invoke(ep);
					Class returnTypeClass = getMethod.getReturnType();
					if (null == getReturnObj) {
						Object getReturnObjFromOldEp = getMethod.invoke(oldEp);
						if (null != getReturnObjFromOldEp) {
							Method setMethod = Ep.class.getMethod(setName, returnTypeClass);
							setMethod.invoke(ep, getReturnObjFromOldEp);
							flag = true;
						}
					}
				} catch (NoSuchMethodException e) {
					e.printStackTrace();
				} catch (SecurityException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IllegalArgumentException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return flag;
	}

	public String getListEpDataForTable() {
		StringBuffer buffer = new StringBuffer();
		buffer.append("<table><tbody>");
		List<Ep> epList = this.getBaseDao().findAllOrderByLocation();
		for (Ep ep : epList) {
			buffer.append("<tr>");
			buffer.append("<td>" + ep.getId() + "</td>");
			buffer.append("<td>" + ep.getName() + "</td>");
			buffer.append("<td>" + (null == ep.getRunState() ? "0" : ep.getRunState()) + "</td>");
			buffer.append("<td>" + (null == ep.getCommunicationFlag() ? "0" : ep.getCommunicationFlag()) + "</td>");
			buffer.append("<td>" + (null == ep.getAlarmState() ? "0" : ep.getAlarmState()) + "</td>");
			buffer.append("<td>" + (null == ep.getPrimaryCurrentReading() ? "0" : ep.getPrimaryCurrentReading()) + "</td>");
			buffer.append("<td>" + (null == ep.getPrimaryVoltageReading() ? "0" : ep.getPrimaryVoltageReading()) + "</td>");
			buffer.append("<td>" + (null == ep.getSecondCurrentReading() ? "0" : ep.getSecondCurrentReading()) + "</td>");
			buffer.append("<td>" + (null == ep.getSecondVoltageReading() ? "0" : ep.getSecondVoltageReading()) + "</td>");
			buffer.append("<td>" + (null == ep.getSparkReading() ? "0" : ep.getSparkReading()) + "</td>");
			buffer.append("<td>");
			if (epList.indexOf(ep) == 0) {
				buffer.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='changeEpLocationDown.do?ep.id=" + ep.getId() + "'>Down</a>");
			} else if (epList.indexOf(ep) == epList.size() - 1) {
				buffer.append("<a href='changeEpLocationUp.do?ep.id=" + ep.getId() + "'>Up</a>");
			} else {
				buffer.append("<a href='changeEpLocationUp.do?ep.id=" + ep.getId() + "'>Up</a>&nbsp;&nbsp;&nbsp;<a href='changeEpLocationDown.do?ep.id=" + ep.getId() + "'>Down</a>");
			}
			buffer.append("</td>");
			buffer.append("<td><a href='addOrEidtEp.do?ep.id=" + ep.getId() + "'>修改  </a></td>");
			buffer.append("<td><a href='delEp.do?ep.id=" + ep.getId() + "'>删除  </a></td>");
			buffer.append("</tr>");
		}
		buffer.append("</table></tbody>");
		return buffer.toString();
	}

	public Map<String, EpJson> getLatestDataToEpJson() {
		Map<String, EpJson> map = new HashMap<String, EpJson>();
		List<Ep> epList = epDao.findAll();
		if (null != epList) {
			for (Ep ep : epList) {
				ep.setAnodeRapper(rapperDao.findAnodeRapperByEp(ep.getId()));
				EpJson ej = new EpJson();
				ej.setEpState(ep.getRunState());
				ej.setEpWayString(ep.getRunWayString());

				ej.setName(ep.getName());
				ej.setRapperState(null != ep.getAnodeRapper() ? -1 : ep.getAnodeRapper().getRunState());
				map.put("EP" + ep.getName(), ej);
			}
		}
		return map;
	}

	public void changeEpLocation(Ep ep, EPLocationOperationEnum epLocationOperationEnum) {
		if (null == ep || null == ep.getOrdinalPosition()) {
			if (null != ep && null != ep.getId() && null == ep.getOrdinalPosition()) {
				ep.setOrdinalPosition(this.findMaxEpLocation() + 1);
				this.update(ep);
			}
			return;
		}
		List<Ep> epList = null;
		switch (epLocationOperationEnum) {
		case EP_DEL:
			// 如果删除后的最大位置小于删除元素的位置，则不变化，否则，更改小于删除元素位置的元素
			epList = this.findEpListByLocationMoreThanEp(ep);
			if (null != epList && epList.size() > 1) {
				// 更新epList
				for (Ep tempEp : epList) {
					tempEp.setOrdinalPosition(tempEp.getOrdinalPosition() - 1);
				}
				epDao.updateBath(epList);
			}
			break;
		case EP_ADD:
			//
			break;
		case EP_UPWARDS:
			//
			Ep downEp = this.findEpByLocation(ep.getOrdinalPosition() - 1);
			if (null != downEp) {
				downEp.setOrdinalPosition(downEp.getOrdinalPosition() + 1);
				this.update(downEp);
			}
			ep.setOrdinalPosition(ep.getOrdinalPosition() - 1);
			this.update(ep);
			break;
		case EP_DOWNWARDS:
			//
			Ep upEp = this.findEpByLocation(ep.getOrdinalPosition() + 1);
			if (null != upEp) {
				upEp.setOrdinalPosition(upEp.getOrdinalPosition() - 1);
				this.update(upEp);
			}
			ep.setOrdinalPosition(ep.getOrdinalPosition() + 1);
			this.update(ep);
			break;
		default:
		}
	}

	private Ep findEpByLocation(int location) {

		return epDao.findByLocation(location);
	}

	private List<Ep> findEpListByLocationMoreThanEp(Ep ep) {
		if (null != ep)
			return epDao.findEpListByLocationMoreThanEp(ep.getOrdinalPosition());
		else
			return null;
	}

	/**
	 * 查询location最大的Ep
	 * 
	 * @return
	 */
	private Integer findMaxEpLocation() {
		Ep ep = epDao.findMaxEpLocation();
		if (null == ep)
			return 0;
		return ep.getOrdinalPosition();
	}

	public List<EpSetAndReadingsForEpParamSetJson> getEpSetAndReadingsForEpParamSetJson() {
		List<EpSetAndReadingsForEpParamSetJson> list = new ArrayList<EpSetAndReadingsForEpParamSetJson>();
		List<Ep> epList = this.findAllOrderByLocation();
		for (Ep ep : epList) {
			EpSetAndReadingsForEpParamSetJson json = new EpSetAndReadingsForEpParamSetJson();
			json.setId(ep.getId());
			json.setConductionAngleSet(ep.getConductionAngleSet());
			json.setLocation(ep.getOrdinalPosition());
			json.setName(ep.getName());
			json.setPrimaryCurentSet(ep.getPrimaryCurrentSet());
			json.setSecondaryCurrentSet(null == ep.getSecondCurrentSet() ? 0 : ep.getSecondCurrentSet().intValue());
			json.setSecondaryVoltageSet(null == ep.getSecondVoltageSet() ? 0 : ep.getSecondVoltageSet().intValue());
			json.setSparkSensitivitySet(ep.getSparkSensitivitySet());
			json.setSparkSet(ep.getSparkSet());
			list.add(json);
		}
		return list;
	}

	public List<Ep> findAllOrderByLocation() {
		return epDao.findAllOrderByLocation();
	}

	public List<EpReadingsForEpParamsSetJson> getEpReadingsForEpParamsSetJson() {
		List<EpReadingsForEpParamsSetJson> list = new ArrayList<EpReadingsForEpParamsSetJson>();
		List<Ep> epList = this.findAllOrderByLocation();
		for (Ep ep : epList) {
			EpReadingsForEpParamsSetJson json = new EpReadingsForEpParamsSetJson();
			json.setId(ep.getId());
			json.setLocation(ep.getOrdinalPosition());
			json.setName(ep.getName());
			json.setPrimaryCurrent(null == ep.getPrimaryCurrentReading() ? 0 : ep.getPrimaryCurrentReading().intValue());
			json.setPrimaryVoltage(null == ep.getPrimaryVoltageReading() ? 0 : ep.getPrimaryVoltageReading().intValue());
			json.setSecondaryCurrent(null == ep.getSecondCurrentReading() ? 0 : ep.getSecondCurrentReading().intValue());
			json.setSecondaryVolatgePeak(ep.getSecondVoltagePeakReading());
			json.setSecondaryVoltage(null == ep.getSecondVoltageReading() ? 0 : ep.getSecondVoltageReading().intValue());
			json.setSpark(ep.getSparkReading());
			list.add(json);
		}
		return list;
	}

	@Override
	public void bathUpdate(List<Ep> epList) {
		super.bathUpdate(epList);
	}

	public void updateProperty(Ep ep) {
		// TODO Auto-generated method stub

	}

	/**
	 * 将低压设备连接到EP
	 * 
	 * @param epList
	 */
	public void setLowDeviceToEp(List<Ep> epList) {
		List<Heater> heaterList =  heaterDao.findAll();
		List<Rapper> rapperList = rapperDao.findAll();
		List<HeaterTemprator> heaterTempratorList = heaterTempratorManager.findAll();
		for(Heater heater:heaterList){
			if(null != heater && null != heater.getHeaterTempratorId()){
				for(HeaterTemprator heaterTemprator:heaterTempratorList){
					if(null != heaterTemprator){
						if(heaterTemprator.getId().equals(heater.getHeaterTempratorId())){
							heater.setHeaterTemprator(heaterTemprator);
							break;
						}
					}
				}
			}
			for(Ep ep:epList){
				if(heater.getEpId().equals(ep.getId())){
					if(heater.getHeaterType().intValue() == Heater.HEATER_TYPE_CITAO){
						ep.setCitaoHeater(heater);
//						System.out.println(heater.getEpId()+"," + heater.getRunState()  + "," + heater.getAlarmState() + "," + heater.getComunication());
					}else if(heater.getHeaterType().intValue() == Heater.HEATER_TYPE_CIZHOU){
						ep.setCizhouHeater(heater);
					}else if(heater.getHeaterType().intValue() == Heater.HEATER_TYPE_HUIDOU_LEFT){
						ep.setHuidouHeaterForLeft(heater);
					}else if(heater.getHeaterType().intValue() == Heater.HEATER_TYPE_HUIDOU_RIGHT){
						ep.setHuidouHeaterForRight(heater);
					}
				}
			}
		}
		for(Rapper rapper:rapperList){
			for(Ep ep:epList){
				if(rapper.getEpId().equals(ep.getId())){
					if(rapper.getRapperType().intValue() == Rapper.RAPPERTYPE_ANODE){
						ep.setAnodeRapper(rapper);
					}else if(rapper.getRapperType().intValue() == Rapper.RAPPERTYPE_CATCHODE){
						ep.setCathodeRapper(rapper);
					}
				}
			}
		}
	}
}
