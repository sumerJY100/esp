package com.manager;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import base.manager.BaseManager;

import com.dao.EPDao;
import com.dao.EpHistoryDao;
import com.json.EpHistoryReportJson;
import com.pojo.Ep;
import com.pojo.EpHistory;



@Service
public class EpHistoryManager extends BaseManager<EpHistory> {

	@Resource
	private EpHistoryDao epHistoryDao;
	@Resource
	private EPDao epDao;

	@Override
	public EpHistoryDao getBaseDao() {
		return epHistoryDao;
	}
	/**
	 * 查询最新数据
	 * @param ep
	 * @return
	 */
	public EpHistory findLatestData(Ep ep) {
		// TODO Auto-generated method stub
		return epHistoryDao.findLatestEntity();
	}
	public EpHistoryReportJson findEpHistoryReoprtJson(Integer epId, Date queryDate) {
		List<EpHistory> resultList = new ArrayList<EpHistory>();
		for(int i=0;i<24;i++){
			Calendar beginC = new GregorianCalendar();
			beginC.setTime(queryDate);
			beginC.set(Calendar.HOUR_OF_DAY, beginC.get(Calendar.HOUR_OF_DAY) + i);
			Date beginDate = beginC.getTime();
			
			Calendar c = new GregorianCalendar();
			c.setTime(queryDate);
			c.set(Calendar.MINUTE, 1);
			c.add(Calendar.HOUR_OF_DAY, c.get(Calendar.HOUR_OF_DAY) + i +1);
			Date endDate = c.getTime();
			List<EpHistory> list = epHistoryDao.findByEpIdAndBeginDateAnEndDate(epId,beginDate,endDate);
			EpHistory epHistory = null;
			if(null != list){
				if(list.size()>1){
					try {
						epHistory = EpHistory.getAvgValue(list);
					} catch (NoSuchMethodException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (SecurityException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (IllegalAccessException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (IllegalArgumentException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (InvocationTargetException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}else if(list.size() == 1){
					epHistory = list.get(0);
				}else{
					epHistory = new EpHistory();
				}
			}else{
				epHistory = new EpHistory();
			}
			resultList.add(epHistory);
		}
		Ep ep = epDao.findById(epId);
		EpHistoryReportJson json = new EpHistoryReportJson();
		json.setEpId(epId);
		json.setName(ep.getName());
		json.setEpHistoryList(resultList);
		return json;
	}
	public Date getQueryTime(String timeString) {
		Date date = null;
		if(null != timeString){
			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			try{
				date = sf.parse(timeString);
			}catch(Exception e){
				
			}finally{
				date = null;
			}
		}
		return date;
	}
	/**
	 * 获取历史曲线的属性值
	 * @param parameter
	 * @return
	 */
	public String findQueryPropertyName(String parameter) {
		String propertyName = null;
		if(null != parameter ){
			if(parameter.equals(EpHistory.PRIMARY_CURRENT)){
				parameter = EpHistory.PRIMARY_CURRENT;
			}else if(parameter.equals(EpHistory.PRIMARY_VOLTAGE)){
				parameter = EpHistory.PRIMARY_VOLTAGE;
			}else if(parameter.equals(EpHistory.SECOND_CURRENT)){
				parameter = EpHistory.SECOND_CURRENT;
			}else if(parameter.equals(EpHistory.SECOND_VOLTAGE)){
				parameter = EpHistory.SECOND_VOLTAGE;
			}
		}
		return propertyName;
	}
	public List<List<Object>> findDataByPropertyTypeAndQueryTimeToJsonData(Integer epId,String propertyName, Date queryBeginTime, Date queryEndTime) {
		List<List<Object>> list = new ArrayList<List<Object>>(); 
		boolean flag = true;
		if(flag){
		if(null != epId && null != propertyName && null != queryBeginTime && null != queryEndTime){
			List<EpHistory> epHistoryList = epHistoryDao.findDataByQueryTime(epId,queryBeginTime,queryEndTime);
			if(null != epHistoryList && epHistoryList.size() > 0){
				Method getMethod = EpHistory.getMethodMap.get(propertyName);
				for(EpHistory ep:epHistoryList){
					List<Object> tempList = new ArrayList<Object>();
					tempList.add(ep.getRecordTime().getTime());
					try {
						Object obj = getMethod.invoke(ep);
						if(null != obj){
							tempList.add(obj);
						}
					} catch (IllegalAccessException e) {
						e.printStackTrace();
					} catch (IllegalArgumentException e) {
						e.printStackTrace();
					} catch (InvocationTargetException e) {
						e.printStackTrace();
					}
					list.add(tempList);
				}
			}
		}
		}else{
			//[1161043200000,74.29],[1161129600000,74.53],[1161216000000,78.99]
			
			List<Object > tempList_1 = new ArrayList<Object>();
			tempList_1.add(1161043200000L);
			tempList_1.add(9);
			
			List<Object > tempList_2 = new ArrayList<Object>();
			tempList_2.add(1161129600000L);
			tempList_2.add(1.0);
			List<Object > tempList_3 = new ArrayList<Object>();
			tempList_3.add(1161216000000L);
			tempList_3.add(15);
			
			list.add(tempList_1);
			list.add(tempList_2);
			list.add(tempList_3);
		}
		return list;
	}

	

}
