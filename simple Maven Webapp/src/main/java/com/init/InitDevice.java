package com.init;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.manager.EpAlarmManager;
import com.manager.EpManager;
import com.manager.HeaterManager;
import com.manager.HopperManager;
import com.manager.LowAlarmManager;
import com.manager.LowDeviceManager;
import com.manager.RapperManager;
import com.pojo.Heater;
import com.pojo.Hopper;
import com.pojo.LowDevice;
import com.pojo.Rapper;

@SuppressWarnings("rawtypes")
@Component
public class InitDevice implements ApplicationListener{

	@Resource
	private EpManager epManager;
	@Resource
	private EpAlarmManager epAlarmManager;
	@Resource
	private LowAlarmManager lowAlarmManager;
	@Resource
	private HeaterManager heaterManager;
	@Resource
	private RapperManager rapperManager;
	@Resource
	private HopperManager hopperManager;
	@Resource
	private LowDeviceManager lowDeviceManager;
	/***
	 * 初始化，通讯中断
	 */
	
	@Override
	public void onApplicationEvent(ApplicationEvent arg0) {
		/**
		//高压设备
		List<Ep> epList = epManager.findAll();
		for(Ep ep:epList){
			ep.setCommunicationFlag(new Integer(1));
			epManager.update(ep);
			epAlarmManager.generatorEpCommunicationInterruptAlarm(ep);
		}
		//低压设备
		List<LowDevice> lowDeviceList = lowDeviceManager.findAllInList();
		for(LowDevice lowDevice:lowDeviceList){
			lowDevice.setRunState(LowAlarm.ALARM_COMMUNICATION_INTERUPT);
			lowAlarmManager.generatorCommunicationInterruptAlarm(lowDevice);
		}
		
		updateRapperHopperHeaterForLowDevice(lowDeviceList);
		
		*/
	}
	/**
	 * 更新Hopper，Heater，Rapper运行状态
	 * @param lowDeviceList
	 */
	private void updateRapperHopperHeaterForLowDevice(List<LowDevice> lowDeviceList) {
		if(null != lowDeviceList){
			if(lowDeviceList.size() > 0){
				for(LowDevice lowDevice:lowDeviceList){
					if(null != lowDevice){
						if(null != lowDevice.getRunState() && lowDevice.getRunState() == 1){
							List<Rapper> rapperList = lowDevice.getRapperList();
							List<Heater> heaterList = lowDevice.getHeaterList();
							List<Hopper> hopperList = lowDevice.getHopperList();
							
							for(Heater heater:heaterList){
								heater.setComunication(1);
								heaterManager.update(heater);
								lowAlarmManager.generatorCommunicationInterruptAlarm(heater);
							}
							
							for(Rapper rapper:rapperList){
								rapper.setComunication(1);
								rapperManager.update(rapper);
								lowAlarmManager.generatorCommunicationInterruptAlarm(rapper);
							}
							
							for(Hopper hopper:hopperList){
								hopper.setComunication(1);
								hopperManager.update(hopper);
								lowAlarmManager.generatorCommunicationInterruptAlarm(hopper);
							}
						}
					}
				}
			}
		}
	}

}
