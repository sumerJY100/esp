package com.action;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import base.action.BaseAction;

import com.json.EpHistoryReportJson;
import com.manager.EpHistoryManager;
import com.manager.EpManager;
import com.pojo.Ep;
import com.pojo.EpHistory;

@SuppressWarnings("serial")
@Controller
@Scope("prototype")
public class EpHistoryAction extends BaseAction implements Serializable {

	@Resource
	private EpHistoryManager epHistoryManager;
	@Resource
	private EpManager epManager;
	
	private EpHistory epHistory;
	/**
	 * 查询所有的Ep，在历史报表页面
	 */
	public void findAllEpForHistoryReport(){
		List<Ep> epList = epManager.findAllOrderByLocation();
		JSONArray jsonArray = JSONArray.fromObject(epList);
		this.writeResponseJSON(jsonArray.toString());
	}
	public void findEpOneDayHistoryForHistoryReport(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Integer epId = Integer.parseInt(this.getRequest().getParameter("epId"));
		Date queryDate = null;
		try {
			queryDate = df.parse(this.getRequest().getParameter("queryDay"));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		EpHistoryReportJson json = epHistoryManager.findEpHistoryReoprtJson(epId,queryDate);
		JSONObject jsonObj = JSONObject.fromObject(json);
		this.writeResponseJSON(jsonObj.toString());
	}
	public EpHistory getEpHistory() {
		return epHistory;
	}
	public void setEpHistory(EpHistory epHistory) {
		this.epHistory = epHistory;
	}

	
	
}
