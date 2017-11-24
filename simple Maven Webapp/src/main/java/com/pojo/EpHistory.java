package com.pojo;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import base.pojo.BasePojo;

/**
 * EpHistory entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "ep_history", catalog = "esp")
public class EpHistory extends base.pojo.BasePojo implements java.io.Serializable {

	// Fields

	public static final String PRIMARY_CURRENT = "primaryCurrent";
	public static final String PRIMARY_VOLTAGE = "primaryVoltage";
	public static final String SECOND_CURRENT = "secondCurrent";
	public static final String SECOND_VOLTAGE = "secondVoltage";
	
	public static final Map<String,Method> getMethodMap = new HashMap<String ,Method>();
	static{
		String[] attrsArr = new String[]{PRIMARY_CURRENT,PRIMARY_VOLTAGE,SECOND_CURRENT,SECOND_VOLTAGE};
		for(int i=0;i<attrsArr.length;i++){
			String getMethodName = "get" + BasePojo.setFirstCharacterUppercase(attrsArr[i]);
			try {
				Method getMethod = EpHistory.class.getMethod(getMethodName);
				getMethodMap.put(attrsArr[i], getMethod);
			} catch (NoSuchMethodException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (SecurityException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	public static final String[] ATTIBUTE_ARR = new String[] { PRIMARY_CURRENT, PRIMARY_VOLTAGE, SECOND_CURRENT, SECOND_VOLTAGE };

	private Integer id;
	private Integer deviceId;
	private Float primaryCurrent;
	private Float primaryVoltage;
	private Float secondCurrent;
	private Float secondVoltage;
	private Date recordTime;

	// Constructors

	/** default constructor */
	public EpHistory() {
	}

	/** full constructor */
	public EpHistory(Integer deviceId, Float primaryCurrent, Float primaryVoltage, Float secondCurrent, Float secondVoltage, Timestamp recordTime) {
		this.deviceId = deviceId;
		this.primaryCurrent = primaryCurrent;
		this.primaryVoltage = primaryVoltage;
		this.secondCurrent = secondCurrent;
		this.secondVoltage = secondVoltage;
		this.recordTime = recordTime;
	}

	@Override
	@GenericGenerator(name = "generator", strategy = "increment")
	@Id
	@GeneratedValue(generator = "generator")
	@Column(name = "id", unique = true, nullable = false)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "deviceId")
	public Integer getDeviceId() {
		return this.deviceId;
	}

	public void setDeviceId(Integer deviceId) {
		this.deviceId = deviceId;
	}

	@Column(name = "primary_current", precision = 12, scale = 0)
	public Float getPrimaryCurrent() {
		return this.primaryCurrent;
	}

	public void setPrimaryCurrent(Float primaryCurrent) {
		this.primaryCurrent = primaryCurrent;
	}

	@Column(name = "primary_voltage", precision = 12, scale = 0)
	public Float getPrimaryVoltage() {
		return this.primaryVoltage;
	}

	public void setPrimaryVoltage(Float primaryVoltage) {
		this.primaryVoltage = primaryVoltage;
	}

	@Column(name = "second_current", precision = 12, scale = 0)
	public Float getSecondCurrent() {
		return this.secondCurrent;
	}

	public void setSecondCurrent(Float secondCurrent) {
		this.secondCurrent = secondCurrent;
	}

	@Column(name = "second_voltage", precision = 12, scale = 0)
	public Float getSecondVoltage() {
		return this.secondVoltage;
	}

	public void setSecondVoltage(Float secondVoltage) {
		this.secondVoltage = secondVoltage;
	}

	@Column(name = "record_time", length = 19)
	public Date getRecordTime() {
		return this.recordTime;
	}

	public void setRecordTime(Date recordTime) {
		this.recordTime = recordTime;
	}

	/**
	 * 求平均值
	 * 
	 * @param list
	 * @return
	 * @throws SecurityException 
	 * @throws NoSuchMethodException 
	 * @throws InvocationTargetException 
	 * @throws IllegalArgumentException 
	 * @throws IllegalAccessException 
	 */
	public static EpHistory getAvgValue(List<EpHistory> list) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		EpHistory ep = new EpHistory();
		if(null != list && list.size() > 1){
			Float[] valuesTotalArr = new Float[EpHistory.ATTIBUTE_ARR.length];
			Integer[] valuesCountArr = new Integer[EpHistory.ATTIBUTE_ARR.length];
			Map<String,Method> map = new HashMap<String,Method>();
			Map<String,Method> setMethodMap = new HashMap<String,Method>();
			
			for(int i=0;i<EpHistory.ATTIBUTE_ARR.length;i++){
				String attrName = EpHistory.ATTIBUTE_ARR[i];
				String getMethodName = "get" + attrName.substring(0, 1).toUpperCase() + attrName.substring(1);
				String setMethodName = "set" + attrName.substring(0, 1).toUpperCase() + attrName.substring(1);
				Method getMethod = EpHistory.class.getMethod(getMethodName);
				Method setMethod = EpHistory.class.getMethod(setMethodName);
				map.put(attrName, getMethod);
				setMethodMap.put(attrName, setMethod);
			}
			for(EpHistory tempEpH:list){
				for(int i=0;i<EpHistory.ATTIBUTE_ARR.length;i++){
					Method getMethod = map.get(EpHistory.ATTIBUTE_ARR[i]);
					Object returnObj = getMethod.invoke(tempEpH);
					if(null!=returnObj && (returnObj instanceof Float) && (Float)returnObj != 0){
						valuesTotalArr[i] = (null==valuesTotalArr[i]?0:valuesTotalArr[i]) + (Float)returnObj; 
						valuesCountArr[i] = (null==valuesCountArr[i]?0:valuesCountArr[i]) + 1;
					}
				}
			}
			for(int i=0;i<EpHistory.ATTIBUTE_ARR.length;i++){
				Method setMethod = setMethodMap.get(EpHistory.ATTIBUTE_ARR[i]);
				if(null != valuesTotalArr[i]){
					Float avgValue = valuesTotalArr[i]/valuesCountArr[i];
					setMethod.invoke(ep, avgValue);
				}
			}
		}else if(null != list && list.size() == 1){
			ep = list.get(0);
		}
		return ep;
	}

}