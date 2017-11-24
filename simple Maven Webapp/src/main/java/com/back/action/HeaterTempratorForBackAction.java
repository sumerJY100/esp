package com.back.action;

import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import base.action.BaseAction;

import com.manager.HeaterTempratorManager;
import com.pojo.HeaterTemprator;

@SuppressWarnings("serial")
@Controller
@Scope("prototype")
public class HeaterTempratorForBackAction extends BaseAction {
	@Resource
	private HeaterTempratorManager heaterTempratorManager;

	private HeaterTemprator heaterTemprator;

	public void update() {
		heaterTemprator = heaterTempratorManager.updatePojoSetNullValueFromDb(heaterTemprator);

		JSONObject jsonObj = JSONObject.fromObject(heaterTemprator);
		this.writeResponseJSON(jsonObj.toString());
	}

	public void getAllEp() {
		List<HeaterTemprator> heaterTempratorList = heaterTempratorManager.findAll();
		// epManager.setLowDeviceToEp(epList);
		JSONArray jsonArray = JSONArray.fromObject(heaterTempratorList);
		this.writeResponseJSON(jsonArray);
	}

	public HeaterTemprator getHeaterTemprator() {
		return heaterTemprator;
	}

	public void setHeaterTemprator(HeaterTemprator heaterTemprator) {
		this.heaterTemprator = heaterTemprator;
	}

}
