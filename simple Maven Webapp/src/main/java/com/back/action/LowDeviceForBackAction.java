package com.back.action;

import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import base.action.BaseAction;

import com.manager.HeaterManager;
import com.manager.HeaterTempratorManager;
import com.manager.LowDeviceManager;
import com.manager.RapperManager;
import com.pojo.LowDevice;

@SuppressWarnings("serial")
@Controller
@Scope("prototype")
public class LowDeviceForBackAction extends BaseAction {
	@Resource
	private LowDeviceManager lowDeviceManager;
	@Resource
	private RapperManager rapperManager;
	@Resource
	private HeaterManager heaterManager;
	@Resource
	private HeaterTempratorManager heaterTempratorManager;
	
	private LowDevice lowDevice;

	public void update() {
		Integer communication = lowDevice.getRunState();
		lowDevice = lowDeviceManager.updatePojoSetNullValueFromDb(lowDevice);
		//更新rapper，heater，heateTemprator
		if(null != communication){
			rapperManager.updateCommunicationByLowDevice(lowDevice);
			heaterManager.updateCommunicationByLowDevice(lowDevice);
			heaterTempratorManager.updateCommunicationByLowDevice(lowDevice);
		}
		JSONObject jsonObj = JSONObject.fromObject(lowDevice);
		this.writeResponseJSON(jsonObj.toString());
	}

	public void getAllEp() {
		List<LowDevice> lowDeviceList = lowDeviceManager.findAll();
		// epManager.setLowDeviceToEp(epList);
		JSONArray jsonArray = JSONArray.fromObject(lowDeviceList);
		this.writeResponseJSON(jsonArray);
	}

	public void freshAllLowDevice(){
		List<LowDevice> lowDeviceList = lowDeviceManager.findAll();
		JSONArray jsonArray = JSONArray.fromObject(lowDeviceList);
		this.writeResponseJSON(jsonArray);
	}
	public LowDevice getLowDevice() {
		return lowDevice;
	}

	public void setLowDevice(LowDevice lowDevice) {
		this.lowDevice = lowDevice;
	}

}
