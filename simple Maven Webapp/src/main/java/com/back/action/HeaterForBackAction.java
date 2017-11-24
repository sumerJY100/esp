package com.back.action;

import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import base.action.BaseAction;

import com.manager.HeaterManager;
import com.pojo.Heater;

@SuppressWarnings("serial")
@Controller
@Scope("prototype")
public class HeaterForBackAction extends BaseAction {
	@Resource
	private HeaterManager heaterManager;

	private Heater heater;

	public void update() {
		heater = heaterManager.updatePojoSetNullValueFromDb(heater);

		JSONObject jsonObj = JSONObject.fromObject(heater);
		this.writeResponseJSON(jsonObj.toString());
	}

	public void getAllEp() {
		List<Heater> heaterList = heaterManager.findAll();
		// epManager.setLowDeviceToEp(epList);
		JSONArray jsonArray = JSONArray.fromObject(heaterList);
		this.writeResponseJSON(jsonArray);
	}

	public Heater getHeater() {
		return heater;
	}

	public void setHeater(Heater heater) {
		this.heater = heater;
	}

}
