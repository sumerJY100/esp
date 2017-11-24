package com.action;

import java.io.Serializable;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import base.action.BaseAction;

import com.manager.LowDeviceManager;
import com.pojo.LowDevice;

@SuppressWarnings("serial")
@Controller
@Scope("prototype")
public class LowDeviceAction extends BaseAction implements Serializable {

	@Resource
	private LowDeviceManager lowDeviceManager;
	
	private LowDevice lowDevice;
	private List<LowDevice> lowDeviceList;
	
	
	public String lowDeviceList(){
		return "list";
	}
	public String addOrEditLowDevice(){
		if(null != lowDevice && null !=lowDevice.getId() ){
			lowDevice = lowDeviceManager.findById(lowDevice.getId());
		}
		return "addOrEditLowDevice";
	}
	public String saveOrUpdateLowDevice(){
		if(null != lowDevice){
			if(null != lowDevice.getId()){
				lowDeviceManager.updatePojoSetNullValueFromDb(lowDevice);
			}else{
				lowDeviceManager.save(lowDevice);
			}
		}
		return "list";
	}
	public String delLowDevice(){
		if(null != lowDevice && null != lowDevice.getId()){
			lowDeviceManager.delById(lowDevice.getId());
		}
		return "list";
	}
	public void getLowDeviceTable(){
		this.writeResponseStrTextHtml(lowDeviceManager.getLowDeviceTable());
	}
	/********************************************************************************/
	public LowDevice getLowDevice() {
		return lowDevice;
	}
	public void setLowDevice(LowDevice lowDevice) {
		this.lowDevice = lowDevice;
	}
	public List<LowDevice> getLowDeviceList() {
		return lowDeviceList;
	}
	public void setLowDeviceList(List<LowDevice> lowDeviceList) {
		this.lowDeviceList = lowDeviceList;
	}
	
	
	
}
