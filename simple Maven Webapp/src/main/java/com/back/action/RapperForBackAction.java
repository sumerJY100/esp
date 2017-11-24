package com.back.action;

import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import base.action.BaseAction;

import com.manager.RapperManager;
import com.pojo.Rapper;

@SuppressWarnings("serial")
@Controller
@Scope("prototype")
public class RapperForBackAction extends BaseAction {
	@Resource
	private RapperManager rapperManager;

	private Rapper rapper;

	public void update() {
		rapper = rapperManager.updatePojoSetNullValueFromDb(rapper);
		/**
		System.out.println("rapper:" + rapper + "rapper.getRunWay:" + rapper.getRunWay());
		if (rapper.getRunWay() == 2) {
			Thread thread = RapperAction.RAPPERTHREAD_MAP.get(rapper);
			System.out.println(thread);
			
			if (null == thread) {
				thread = new Thread(new Runnable() {
					int index = 1;
					
					@Override
					public void run() {
						while (index < 10) {
							index++;
							if(null != rapper.getRunTime() && rapper.getRunTime() > 0){
								GregorianCalendar beingLevelC = new GregorianCalendar(2016, 1, 1, 0,0, 0);
								long beginLevelTime = beingLevelC.getTimeInMillis()/1000;
								int beginC = rapper.getBeginTime(); 
								int runTime = rapper.getRunTime();
								int waitTime = rapper.getWaitTime();
								GregorianCalendar currentTimeCalendar = new GregorianCalendar();
								currentTimeCalendar.setTime(new Date());
								long currentTime = currentTimeCalendar.getTimeInMillis()/1000;
								System.out.println(runTime + "," + waitTime);
								long restSeconds = (currentTime - beginLevelTime - beginC) % (runTime + waitTime);
								boolean needUpdateForDb = false;
								System.out.println("index:" + index + ",runState:" + rapper.getRunState() + ",    time:" + new Date() + ",  restSecond:" + restSeconds);
								if(restSeconds > runTime && rapper.getRunState() == 1){
									rapper.setRunState(0);
									needUpdateForDb = true;
								}else if(restSeconds < runTime && rapper.getRunState() == 0){
									rapper.setRunState(1);
									needUpdateForDb = true;
								}
								if(needUpdateForDb){
									rapperManager.update(rapper);
//									System.out.println();
								}
							}
//							rapperManager.update(rapper);
							try {
								Thread.sleep(1000);
							} catch (InterruptedException e) {
								e.printStackTrace();
							}
						}
					}
				});
				RapperAction.RAPPERTHREAD_MAP.put(rapper, thread);
				thread.start();
			} else {
				
			}
		}
		*/
		JSONObject jsonObj = JSONObject.fromObject(rapper);
		this.writeResponseJSON(jsonObj.toString());
	}

	public void getAllEp() {
		List<Rapper> rapperList = rapperManager.findAll();
		// epManager.setLowDeviceToEp(epList);
		JSONArray jsonArray = JSONArray.fromObject(rapperList);
		this.writeResponseJSON(jsonArray);
	}

	public Rapper getRapper() {
		return rapper;
	}

	public void setRapper(Rapper rapper) {
		this.rapper = rapper;
	}

}
