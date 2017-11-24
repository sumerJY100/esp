package com.action;

import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import base.action.BaseAction;
import base.pojo.BasePojo;

import com.json.RapperJson;
import com.manager.EpManager;
import com.manager.LowDeviceManager;
import com.manager.RapperManager;
import com.pojo.Ep;
import com.pojo.LowDevice;
import com.pojo.Rapper;

@SuppressWarnings("serial")
@Controller
@Scope("prototype")
public class RapperAction extends BaseAction implements Serializable {

	public static final Map<Rapper, Thread> RAPPERTHREAD_MAP = new HashMap<Rapper, Thread>();

	@Resource
	private RapperManager rapperManager;
	@Resource
	private EpManager epManager;
	@Resource
	private LowDeviceManager lowDeviceManager;

	private Rapper rapper;
	private List<Rapper> rapperList;
	private List<Ep> epList;
	private List<LowDevice> lowDeviceList;

	public String listRapper() {
		return "list";
	}

	public String addOrEditRapper() {
		epList = epManager.findAll();
		lowDeviceList = lowDeviceManager.findAll();
		if (null != rapper && null != rapper.getId())
			rapper = rapperManager.findById(rapper.getId());
		return "addOrEditRapper";
	}

	public String saveOrUpdateRapper() {
		rapperManager.saveOrUpdate(rapper);
		return "list";
	}

	public String delRapper() {
		if (null != rapper && null != rapper.getId())
			rapperManager.delById(rapper.getId());
		return "list";
	}

	public void getListRapperData() {
		HttpServletResponse response = this.getResponse();
		try {
			response.setContentType("text/html");
			if (null != rapper && null != rapper.getRapperType()) {
				response.getWriter().write(rapperManager.getListRapperDataForTable(rapper.getRapperType()));
			} else {
				response.getWriter().write(rapperManager.getListRapperDataForTable());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void getRapperJSONData() {
		Map<String, RapperJson> map = rapperManager.getLatestDataToRapperJson();
		JSONArray jsonArray = JSONArray.fromObject(map);
		this.writeResponseJSON(jsonArray.toString());
	}

	public void getFreshRapperData() {
		List<RapperJson> rapperJsonList = rapperManager.getFreshRapperData();
		JSONArray jsonArray = JSONArray.fromObject(rapperJsonList);
		this.writeResponseJSON(jsonArray.toString());
	}

	public void updateRapperForNoReturn() {
		String epName = this.getRequest().getParameter("epName");
		if(null != epName){
			String field = this.getRequest().getParameter("field");
			String setValue = this.getRequest().getParameter("resultValue");
			String rapperType = this.getRequest().getParameter("rapperType");
			Rapper rapper = new Rapper();
			rapper.setName(epName);
			rapper.setRapperType(Integer.parseInt(rapperType));
			String setMethodName = "set" + field.substring(0, 1).toUpperCase() + field.substring(1);
			String getMethodName = "get" + field.substring(0, 1).toUpperCase() + field.substring(1);
			try{
				Method setMethod = Rapper.class.getMethod(setMethodName, Integer.class);
				Method getMethod = Rapper.class.getMethod(getMethodName);
				setMethod.invoke(rapper, Integer.parseInt(setValue));
				rapperManager.findRapperByEpNameAndRapperTypeAndUpdateValue(rapper,setMethod,getMethod);
				
				this.writeResponseStrTextHtml("成功");
			}catch(Exception e){
				e.printStackTrace();
			}
		}
		
		if (null != rapper && null != rapper.getId()) {
			Rapper oldRapper = rapperManager.findById(rapper.getId());
			BasePojo.setNotNullPropertyToAnotherPojo(oldRapper, rapper);
			rapperManager.update(rapper);
			if (rapper.getRapperType() == 2) {
				Thread thread = RAPPERTHREAD_MAP.get(rapper);
				if (null == thread) {
					thread = new Thread(new Runnable() {
						int index = 1;
						
						@Override
						public void run() {
							while(index < 100){
//								System.out.println(rapper);
								index ++;
								try {
									Thread.sleep(1000);
								} catch (InterruptedException e) {
									e.printStackTrace();
								}
							}
						}
					});
					RAPPERTHREAD_MAP.put(rapper, thread);
					thread.start();
				} else {

				}
			}
		}
	}

	public Rapper getRapper() {
		return rapper;
	}

	public void setRapper(Rapper rapper) {
		this.rapper = rapper;
	}

	public List<Rapper> getRapperList() {
		return rapperList;
	}

	public void setRapperList(List<Rapper> rapperList) {
		this.rapperList = rapperList;
	}

	public List<Ep> getEpList() {
		return epList;
	}

	public void setEpList(List<Ep> epList) {
		this.epList = epList;
	}

	public List<LowDevice> getLowDeviceList() {
		return lowDeviceList;
	}

	public void setLowDeviceList(List<LowDevice> lowDeviceList) {
		this.lowDeviceList = lowDeviceList;
	}

}
