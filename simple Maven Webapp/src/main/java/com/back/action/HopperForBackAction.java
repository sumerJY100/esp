package com.back.action;

import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import base.action.BaseAction;

import com.manager.HopperManager;
import com.pojo.Hopper;

@SuppressWarnings("serial")
@Controller
@Scope("prototype")
public class HopperForBackAction extends BaseAction {
	@Resource
	private HopperManager hopperManager;

	private Hopper hopper;

	public void update() {
		hopper = hopperManager.updatePojoSetNullValueFromDb(hopper);

		JSONObject jsonObj = JSONObject.fromObject(hopper);
		this.writeResponseJSON(jsonObj.toString());
	}

	public void getAllEp() {
		List<Hopper> hopperList = hopperManager.findAll();
		// epManager.setLowDeviceToEp(epList);
		JSONArray jsonArray = JSONArray.fromObject(hopperList);
		this.writeResponseJSON(jsonArray);
	}

	public Hopper getHopper() {
		return hopper;
	}

	public void setHopper(Hopper hopper) {
		this.hopper = hopper;
	}

}
