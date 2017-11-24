package com.action;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import base.action.BaseAction;

import com.json.EpJson;
import com.json.EpReadingsForEpParamsSetJson;
import com.json.EpSetAndReadingsForEpParamSetJson;
import com.manager.EpHistoryManager;
import com.manager.EpManager;
import com.pojo.Ep;
import com.pojo.pojoEnum.EPLocationOperationEnum;

@SuppressWarnings("serial")
@Controller
@Scope("prototype")
public class EpowerAction extends BaseAction implements Serializable {

	@Resource
	private EpManager epManager;
	@Resource
	private EpHistoryManager epHistoryManager;

	private Ep ep;
	private List<Ep> epList;
	/**
	 * 跳转历史曲线页面
	 * @return
	 */
	public String historyCurve(){
		epList = epManager.findAllOrderByLocation();
		return "historyCurve";
	}
	public String historyCurve2(){
		epList = epManager.findAllOrderByLocation();
		return "historyCurve";
	}
	/**
	 * 查询历史数据并返回JSON
	 */
	public void getQueryDataFromEpHistory(){
		String epIdString = this.getRequest().getParameter("epId");
		Integer epId = null;
		if(null != epIdString){
			epId = Integer.parseInt(epIdString);
		}
		String propertyName = epHistoryManager.findQueryPropertyName(this.getRequest().getParameter("queryPropertyName"));
		Date queryBeginTime = epHistoryManager.getQueryTime(this.getRequest().getParameter("queryBeginTime"));
		Date queryEndTime = epHistoryManager.getQueryTime(this.getRequest().getParameter("getQueryEndTime"));
		List<List<Object>> list = epHistoryManager.findDataByPropertyTypeAndQueryTimeToJsonData(epId,propertyName,queryBeginTime,queryEndTime);
		
			JSONArray jsonArray = JSONArray.fromObject(list);
			this.writeResponseJSON(jsonArray.toString());
	}
	public void getNoDataFromEP(){
		String data = "{'data':[[1161043200000,74.29],[1161129600000,74.53],[1161216000000,78.99]]}";
		Map<String,List<Double[]>> map = new HashMap<String,List<Double[]>>();
		List<Double[]> list = new ArrayList<Double[]>();
		list.add(new Double[]{1161043200000d,74.29});
		list.add(new Double[]{1161129600000d,74.29});
		map.put("data", list);
		JSONObject jsonArray = JSONObject.fromObject(map);
		this.writeResponseJSON(jsonArray.toString());

	}
	public String addOrEidtEp(){
		if(null != ep && null != ep.getId())
			ep = epManager.findById(ep.getId());
		return "addOrEdit";
	}
	public String saveOrUpdateEp(){
		
		epManager.saveOrUpdate(ep);
		return "list";
	}
	
	public String delEp(){
		if(null != ep && null != ep.getId()){
			epManager.delById(ep.getId());
			epManager.changeEpLocation(ep, EPLocationOperationEnum.EP_DEL);
		}
		return "list";
	}
	public String listEp(){
		return "list";
	}
	/**
	 * Ep列表，返回表格数据
	 */
	public void getListEpData(){
		HttpServletResponse response = this.getResponse();
		try{
			response.setContentType("text/html");
			response.getWriter().write(epManager.getListEpDataForTable());
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	/**
	 * 获取连接状态
	 */
	public void getFreshLinkState(){
		List<Ep> epList = epManager.findAllOrderByLocation();
		JSONArray array = JSONArray.fromObject(epList);

		this.writeResponseJSON(array.toString());
	}
	public void getEpFreshData(){
		Map<String,EpJson> map = epManager.getLatestDataToEpJson();
		List<EpJson> list = new ArrayList<EpJson>();
		Set<String> keySet = map.keySet();
		for(String key:keySet){
			list.add(map.get(key));
		}
		JSONArray jsonArray = JSONArray.fromObject(list);
//		System.out.println(jsonArray.toString());
		this.writeResponseJSON(jsonArray.toString());
	}
	public String changeEpLocationUp(){
		if(null != ep && null != ep.getId()){
			ep = epManager.findById(ep.getId());
			epManager.changeEpLocation(ep, EPLocationOperationEnum.EP_UPWARDS);
		}
		return "list";
	}
	public String changeEpLocationDown(){
		if(null != ep && null != ep.getId()){
			ep = epManager.findById(ep.getId());
			epManager.changeEpLocation(ep, EPLocationOperationEnum.EP_DOWNWARDS);
		}
		return "list";
	}
	/**
	 * 参数设置页面，参数设置与读数
	 */
	public void getEpSetAndReadingsForParamSet(){
		List<EpSetAndReadingsForEpParamSetJson> list = epManager.getEpSetAndReadingsForEpParamSetJson();
		JSONArray jsonArray = JSONArray.fromObject(list);
		this.writeResponseJSON(jsonArray.toString());
	}
	/**
	 * 参数设置页面，实时读数
	 */
	public void getEpRealTimeValuesForParamSet(){
		List<EpReadingsForEpParamsSetJson> list = epManager.getEpReadingsForEpParamsSetJson();
		JSONArray jsonArray = JSONArray.fromObject(list);
		this.writeResponseJSON(jsonArray.toString());
	}
	public void setEp(Ep ep) {
		this.ep = ep;
	}
	public Ep getEp() {
		return ep;
	}
	public List<Ep> getEpList() {
		return epList;
	}
	public void setEpList(List<Ep> epList) {
		this.epList = epList;
	}
	
}
