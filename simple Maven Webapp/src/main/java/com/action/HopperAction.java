package com.action;

import java.io.Serializable;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import base.action.BaseAction;

import com.manager.EpManager;
import com.manager.HopperManager;
import com.manager.LowAlarmManager;
import com.manager.LowDeviceManager;
import com.pojo.Ep;
import com.pojo.Hopper;
import com.pojo.LowDevice;

@SuppressWarnings("serial")
@Controller
@Scope("prototype")
public class HopperAction extends BaseAction implements Serializable {

	@Resource
	private LowAlarmManager lowAlarmManager;
	@Resource
	private EpManager epManager;
	@Resource
	private HopperManager hopperManager;
	@Resource
	private LowDeviceManager lowDeviceManager;
	
	private Hopper hopper;
	private List<Ep> epList;
	private List<LowDevice> lowDeviceList;
	public String hopperList(){
		return "list";
	}
	public String addOrEditHopper(){
		lowDeviceList = lowDeviceManager.findAll();
		epList = epManager.findAllOrderByLocation();
		if(null != hopper && null != hopper.getId())
			hopper = hopperManager.findById(hopper.getId());
		return "addOrEditHopper";
	}
	public String saveOrUpdateHopper(){
		if(null != hopper){
			if(null != hopper.getId()){
				hopperManager.updatePojoSetNullValueFromDb(hopper);
			}else{
				hopperManager.save(hopper);
			}
		}
		return "list";
	}
	public String delHopper(){
		if(null != hopper && null != hopper.getId())
			hopperManager.delById(hopper.getId());
		return "list";
	}
	public void getHopperListForTable(){
		this.writeResponseStrTextHtml(hopperManager.getHopperListForTable());
	}
	/**
	 * 查询数据
	 * @author 夏江勇
	 *	2016年12月3日 下午4:25:18
	 *
	 */
	public void getHopperJSONData(){
		this.writeResponseJSON(hopperManager.getHopperJSONData());
	}
	/***********************************************************************************************************/
	public Hopper getHopper() {
		return hopper;
	}
	public void setHopper(Hopper hopper) {
		this.hopper = hopper;
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
