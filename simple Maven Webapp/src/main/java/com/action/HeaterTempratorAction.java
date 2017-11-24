package com.action;

import java.io.Serializable;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import base.action.BaseAction;

import com.manager.EpManager;
import com.manager.HeaterTempratorManager;
import com.manager.LowDeviceManager;
import com.pojo.Ep;
import com.pojo.HeaterTemprator;
import com.pojo.LowDevice;

@SuppressWarnings("serial")
@Controller
@Scope("prototype")
public class HeaterTempratorAction extends BaseAction implements Serializable {

	@Resource
	private HeaterTempratorManager heaterTempratorManager;
	@Resource
	private EpManager epManager;
	@Resource
	private LowDeviceManager lowDeviceManager;
	
	private List<Ep> epList;
	private List<LowDevice> lowDeviceList;
	private HeaterTemprator heaterTemprator;

	public String heaterTempratorList(){
		return "list";
	}
	public String addOrEditHeaterTemprator(){
		lowDeviceList = lowDeviceManager.findAll();
		epList = epManager.findAllOrderByLocation();
		epList.add(null);
		if(null != heaterTemprator && null != heaterTemprator.getId()){
			heaterTemprator = heaterTempratorManager.findById(heaterTemprator.getId());
		}
		return "addOrEidtHeaterTemprator";
	}
	public String saveOrUpdateHeaterTemprator(){
		if(null != this.heaterTemprator ){
			if(null != this.heaterTemprator.getId()){
				heaterTempratorManager.updatePojoSetNullValueFromDb(this.heaterTemprator);
			}else{
				heaterTempratorManager.save(this.heaterTemprator);
			}
		}
		return "list";
	}
	public String delHeaterTemprator(){
		if(null != this.heaterTemprator && null != this.heaterTemprator.getId())
			heaterTempratorManager.delById(this.heaterTemprator.getId());
		return "list";
	}
	/**
	 * 查询所有的温度数据，以表格的形式展示
	 */
	public void getHeaterTempratorListTable(){
		this.writeResponseStrTextHtml(heaterTempratorManager.getListDataForTable());
	}
	
	
	
	
	
	/***************************************************************************************/
	public HeaterTemprator getHeaterTemprator() {
		return heaterTemprator;
	}

	public void setHeaterTemprator(HeaterTemprator heaterTemprator) {
		this.heaterTemprator = heaterTemprator;
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
