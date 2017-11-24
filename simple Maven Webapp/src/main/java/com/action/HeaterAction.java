package com.action;

import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import base.action.BaseAction;
import base.dao.BaseDao;

import com.dao.HeaterDao;
import com.dao.HeaterTempratorDao;
import com.json.HeaterJson;
import com.manager.EpManager;
import com.manager.HeaterManager;
import com.manager.HeaterTempratorManager;
import com.manager.LowDeviceManager;
import com.pojo.Ep;
import com.pojo.Heater;
import com.pojo.HeaterTemprator;
import com.pojo.LowDevice;

@SuppressWarnings("serial")
@Controller
@Scope("prototype")
public class HeaterAction extends BaseAction implements Serializable {

	@Resource
	private EpManager epManager;
	@Resource
	private HeaterManager heaterManager;
	@Resource
	private HeaterDao heaterDao;
	@Resource
	private HeaterTempratorManager heaterTempratorManager;
	@Resource
	private HeaterTempratorDao heaterTempratorDao;
	@Resource
	private LowDeviceManager lowDeviceManager;

	private Heater heater;
	private List<Heater> heaterList;
	private List<HeaterTemprator> htList;
	private List<Ep> epList;
	private List<LowDevice> lowDeviceList;

	public String listHeater() {
		return "list";
	}

	public String addOrEditHeater() {
		epList = epManager.findAll();
		lowDeviceList = lowDeviceManager.findAll();
		htList = heaterTempratorManager.findAllSortByProperty("epId", BaseDao.QUERY_ASC);
		if (null != heater && null != heater.getId())
			heater = heaterManager.findById(heater.getId());
		return "addOrEdit";
	}

	public String saveOrUpdateHeater() {
		heaterManager.saveOrUpdate(heater);
		return "list";
	}

	/**
	 * 改变加热的运行方式
	 * 
	 * @author 夏江勇 2016年12月4日 上午11:53:33
	 * 
	 */
	public void updateHeaterRunWay() {
		String epName = this.getRequest().getParameter("epName");
		String heaterTypeString = this.getRequest().getParameter("heaterType");
		String heaterRunWayString = this.getRequest().getParameter("heaterWay");
		if (null != heaterRunWayString) {
			int heaterType = -1;
			if (null != heaterTypeString) {
				if (heaterTypeString.equals("cizhou") || heaterTypeString.equals("0")) {
					heaterType = Heater.HEATER_TYPE_CIZHOU;
				} else if (heaterTypeString.equals("citao")|| heaterTypeString.equals("1")) {
					heaterType = Heater.HEATER_TYPE_CITAO;
				} else if (heaterTypeString.equals("leftHopper")|| heaterTypeString.equals("2")) {
					heaterType = Heater.HEATER_TYPE_HUIDOU_LEFT;
				} else if (heaterTypeString.equals("rightHopper")|| heaterTypeString.equals("3")) {
					heaterType = Heater.HEATER_TYPE_HUIDOU_RIGHT;
				}
			}

			String hql = " from Heater h where h.name = ? and h.heaterType = ? ";
			List<Heater> heaterList = heaterDao.find(hql, epName, heaterType);
			if (null != heaterList && heaterList.size() > 0) {
				Heater resultHeater = heaterList.get(0);
				resultHeater.setRunType(Integer.parseInt(heaterRunWayString));
				heaterManager.update(resultHeater);
			}
		}
		
		this.writeResponseStrTextHtml("success");
	}

	/**
	 * 修改HeaterTemprator,通过epName与heaterType
	 * 
	 * @author 夏江勇 2016年12月4日 上午11:54:33
	 * 
	 */
	public void updateHeaterTempratorByEpName_HeaterType() {
		String epName = this.getRequest().getParameter("epName");
		String heaterTypeString = this.getRequest().getParameter("heaterType");
		String heaterTempratorValue = this.getRequest().getParameter("tempValue");
		String fieldString = this.getRequest().getParameter("fieldString");
		if (null != heaterTempratorValue) {
			int heaterType = -1;
			if (null != heaterTypeString) {
				if (heaterTypeString.equals("cizhou") || heaterTypeString.equals("1")) {
					heaterType = Heater.HEATER_TYPE_CIZHOU;
				} else if (heaterTypeString.equals("citao")|| heaterTypeString.equals("0")) {
					heaterType = Heater.HEATER_TYPE_CITAO;
				} else if (heaterTypeString.equals("leftHopper")|| heaterTypeString.equals("2")) {
					heaterType = Heater.HEATER_TYPE_HUIDOU_LEFT;
				} else if (heaterTypeString.equals("rightHopper")|| heaterTypeString.equals("3")) {
					heaterType = Heater.HEATER_TYPE_HUIDOU_RIGHT;
				}
			}

			String hql = " from Heater h where h.name = ? and h.heaterType = ? ";
			List<Heater> heaterList = heaterDao.find(hql, epName, heaterType);
			if (null != heaterList && heaterList.size() > 0) {
				Heater resultHeater = heaterList.get(0);
				if (null != resultHeater && null != resultHeater.getHeaterTempratorId()) {
					HeaterTemprator heaterTemprator = heaterTempratorManager.findById(resultHeater.getHeaterTempratorId());
					if (null != heaterTemprator) {
						String setMethodString = "set" + fieldString.substring(0, 1).toUpperCase() + fieldString.substring(1);
						String getMethodString = "get" + fieldString.substring(0, 1).toUpperCase() + fieldString.substring(1);
						try {
							Method setMethod = HeaterTemprator.class.getMethod(setMethodString, Integer.class);
							Method getMethod = HeaterTemprator.class.getMethod(getMethodString);
							setMethod.invoke(heaterTemprator, Integer.parseInt(heaterTempratorValue));
							heaterTempratorManager.update(heaterTemprator);
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			}
		}
		this.writeResponseStrTextHtml("success");
	}

	public String delHeater() {
		if (null != heater && null != heater.getId())
			heaterManager.delById(heater.getId());
		return "list";
	}

	public void getListHeaterData() {
		HttpServletResponse response = this.getResponse();
		try {
			response.setContentType("text/html");
			response.getWriter().write(heaterManager.getListHeaterDataForTable());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void getHeaterJSONData() {
		Map<String, HeaterJson> map = heaterManager.getLatestDataToHeaterJson();
		JSONArray jsonArray = JSONArray.fromObject(map);
		this.writeResponseJSON(jsonArray.toString());
	}

	public void getHeaterJson() {
		List<HeaterJson> jsonList = heaterManager.getHeaterJson();
		JSONArray jsonArray = JSONArray.fromObject(jsonList);
		this.writeResponseJSON(jsonArray.toString());
	}

	// 更形加热器操作
	public void updateHeaterMode() {
		if (null != this.heater) {
			heaterManager.updatePojoSetNullValueFromDb(heater);
		}
	}

	/************************************************************************************************/
	public Heater getHeater() {
		return heater;
	}

	public void setHeater(Heater heater) {
		this.heater = heater;
	}

	public List<Ep> getEpList() {
		return epList;
	}

	public void setEpList(List<Ep> epList) {
		this.epList = epList;
	}

	public List<HeaterTemprator> getHtList() {
		return htList;
	}

	public void setHtList(List<HeaterTemprator> htList) {
		this.htList = htList;
	}

	public List<Heater> getHeaterList() {
		return heaterList;
	}

	public void setHeaterList(List<Heater> heaterList) {
		this.heaterList = heaterList;
	}

	public List<LowDevice> getLowDeviceList() {
		return lowDeviceList;
	}

	public void setLowDeviceList(List<LowDevice> lowDeviceList) {
		this.lowDeviceList = lowDeviceList;
	}

}
