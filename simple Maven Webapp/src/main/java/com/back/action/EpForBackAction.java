package com.back.action;

import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import base.action.BaseAction;

import com.dao.EPDao;
import com.dao.HeaterDao;
import com.dao.RapperDao;
import com.manager.EpManager;
import com.manager.HeaterManager;
import com.manager.RapperManager;
import com.pojo.Ep;

@SuppressWarnings("serial")
@Controller
@Scope("prototype")
public class EpForBackAction extends BaseAction {
	@Resource
	private EpManager epManager;
	@Resource
	private RapperManager rapperManager;
	@Resource
	private HeaterManager heaterManager;
	
	
	@Resource
	private EPDao epDao;
	@Resource
	private RapperDao rapperDao;
	@Resource
	private HeaterDao heaterDao;
	private Ep ep;

	public void update() {
		ep = epManager.updatePojoSetNullValueFromDb(ep);
		
		JSONObject jsonObj = JSONObject.fromObject(ep);
		this.writeResponseJSON(jsonObj.toString());
	}

	public void getAllEp(){
		List<Ep> epList = epManager.findAll();
		epManager.setLowDeviceToEp(epList);
		JSONArray jsonArray = JSONArray.fromObject(epList);
		this.writeResponseJSON(jsonArray);
	}
	public Ep getEp() {
		return ep;
	}

	public void setEp(Ep ep) {
		this.ep = ep;
	}
	/**
	 * 重置所有告警信息
	 * @author 夏江勇
	 *	2016年12月5日 上午8:46:44
	 *
	 */
	public void resetAllAlarm(){
		String epHql = " update Ep set alarmState = ?";
		String rapperHql = " update Rapper set alarmState = ?";
		String heaterHql = " update Heater set alarmState = ?";
		
		epDao.updateByHql(epHql, 0);
		rapperDao.updateByHql(rapperHql, 0);
		heaterDao.updateByHql(heaterHql, 0);
		this.writeResponseStrTextHtml("success");
	}
}
