package com.pojo;

import java.lang.reflect.Method;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

import base.pojo.BasePojo;

/**
 * LowAlarm entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "low_alarm", catalog = "esp")
public class LowAlarm extends base.pojo.BasePojo implements java.io.Serializable {

	/** 加热 */
	public static final Integer DEVICE_TYPE_HEATER = 1;
	/** 振打 */
	public static final Integer DEVICE_TYPE_RAPPER = 2;
	/** 料位 */
	public static final Integer DEVICE_TYPE_HOPPER = 3;
	/**低压设备*/
	public static final Integer DEVICE_TYPE_LOW_DEVICE = 4;
	/**低压温度设备*/
	public static final Integer DEVICE_HEATER_TEMPRATOR = 5;

	/** 通讯中断 */
	public static final Integer ALARM_COMMUNICATION_INTERUPT = 1;
	/** 告警 */
	public static final Integer ALARM_ERROR = 2;
	/**正常*/
	public static final Integer ALARM_NORMAL = 0;
	// Fields
	public static final List<Method> getMethodForListTable = new ArrayList<Method>();
	static {
		String[] attrsArr = new String[] { "id", "epName", "alarmTimeString", "unAlarmTimeString", "alarmStatString", "alarmTypeString" };
		for (int i = 0; i < attrsArr.length; i++) {
			String getMethodName = "get" + BasePojo.setFirstCharacterUppercase(attrsArr[i]);
			try {
				Method getMethod = LowAlarm.class.getMethod(getMethodName);
				getMethodForListTable.add(getMethod);
			} catch (NoSuchMethodException e) {
				e.printStackTrace();
			} catch (SecurityException e) {
				e.printStackTrace();
			}
		}
	}
	private Integer id;
	private Date alarmTime;
	private Integer epDeviceId;
	private Integer alarmState;
	private Integer alarmType;
	private Date unAlarmTime;
	private String epName;
	private Integer deviceType;
	private Integer deviceId;

	private String alarmStatString;
	private String alarmTypeString;
	private String alarmTimeString;
	private String unAlarmTimeString;

	
	private Ep ep;
	private BasePojo lowDevice;//低压设备地址
	// Constructors

	/** default constructor */
	public LowAlarm() {
	}

	/** full constructor */
	public LowAlarm(Timestamp alarmTime, Integer epDeviceId, Integer alarmState, Integer alarmType, Timestamp unAlarmTime) {
		this.alarmTime = alarmTime;
		this.epDeviceId = epDeviceId;
		this.alarmState = alarmState;
		this.alarmType = alarmType;
		this.unAlarmTime = unAlarmTime;
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

	@Column(name = "alarm_time", length = 19)
	public Date getAlarmTime() {
		return this.alarmTime;
	}

	public void setAlarmTime(Date alarmTime) {
		this.alarmTime = alarmTime;
	}

	@Column(name = "ep_device_id")
	public Integer getEpDeviceId() {
		return this.epDeviceId;
	}

	public void setEpDeviceId(Integer epDeviceId) {
		this.epDeviceId = epDeviceId;
	}

	@Column(name = "alarm_state")
	public Integer getAlarmState() {
		return this.alarmState;
	}

	public void setAlarmState(Integer alarmState) {
		this.alarmState = alarmState;
	}

	@Column(name = "alarm_type")
	public Integer getAlarmType() {
		return this.alarmType;
	}

	public void setAlarmType(Integer alarmType) {
		this.alarmType = alarmType;
	}

	@Column(name = "un_alarm_time", length = 19)
	public Date getUnAlarmTime() {
		return this.unAlarmTime;
	}

	public void setUnAlarmTime(Date unAlarmTime) {
		this.unAlarmTime = unAlarmTime;
	}

	@Column(name = "ep_name", length = 200)
	public String getEpName() {
		String resultEpName = epName;
//		if(this.getAlarmType() == LowAlarm.DEVICE_TYPE_LOW_DEVICE){
			if(this.getDeviceId() != null){
				if(null != this.getLowDevice()){
					if(this.getLowDevice() instanceof LowDevice){
						resultEpName = ((LowDevice)this.getLowDevice()).getName();
					}else if(this.getLowDevice() instanceof Hopper){
						Hopper tempHopper = (Hopper) this.getLowDevice();
						resultEpName = epName + "-料位-" + tempHopper.getName();
					}else if(this.getLowDevice() instanceof Rapper){
						Rapper tempRapper = (Rapper)this.getLowDevice();
						resultEpName = epName + "-"+tempRapper.getRapperTypeString()+"振打-" + tempRapper.getName();
					}else if(this.getLowDevice() instanceof Heater){
						Heater tempHeater = (Heater)this.getLowDevice();
						resultEpName = epName + "-" + tempHeater.getHeaterTypeString() + "-" + tempHeater.getName();
					}else if(this.getLowDevice() instanceof HeaterTemprator){
						HeaterTemprator tempHeaterTemprator = (HeaterTemprator) this.getLowDevice();
						resultEpName = epName + "-" + tempHeaterTemprator.getTempratorTypeString() + "-" + tempHeaterTemprator.getName();
					}
					
				}
			}
//		}
		return resultEpName;
	}

	public void setEpName(String epName) {
		this.epName = epName;
	}

	@Column(name = "device_type")
	public Integer getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(Integer deviceType) {
		this.deviceType = deviceType;
	}

	@Column(name = "device_id")
	public Integer getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(Integer deviceId) {
		this.deviceId = deviceId;
	}

	/******************************************************************************************************************/

	@Transient
	public String getAlarmStatString() {
		if(null == this.getAlarmState() || this.getAlarmState() == 1){
			this.alarmStatString = "告警";
		}else{
			this.alarmStatString = "已接警";
		}
		return alarmStatString;
	}

	public void setAlarmStatString(String alarmStatString) {
		this.alarmStatString = alarmStatString;
	}

	@Transient
	public String getAlarmTypeString() {
		if(null != this.getAlarmType()){
			switch(this.getAlarmType()){
			case 1:alarmTypeString = "通讯中断";break;
			case 2:alarmTypeString = "告警";break;
			default :alarmTypeString="--";
			}
		}
		return alarmTypeString;
	}

	public void setAlarmTypeString(String alarmTypeString) {
		this.alarmTypeString = alarmTypeString;
	}

	@Transient
	public String getAlarmTimeString() {
		if (null != this.getAlarmTime()) {
			alarmTimeString = BasePojo.YYYYMMDDHHmmss.format(this.getAlarmTime());
		}
		return alarmTimeString;
	}

	public void setAlarmTimeString(String alarmTimeString) {
		this.alarmTimeString = alarmTimeString;
	}

	@Transient
	public String getUnAlarmTimeString() {
		if(null == this.getAlarmState() || this.getAlarmState() == 1){
			this.unAlarmTimeString = "--";
		}else if(null != this.getAlarmState() && this.getAlarmState() == 0){
			if (null != this.getUnAlarmTime()) {
				unAlarmTimeString = BasePojo.YYYYMMDDHHmmss.format(this.getUnAlarmTime());
			}
		}
		return unAlarmTimeString;
	}

	public void setUnAlarmTimeString(String unAlarmTimeString) {
		this.unAlarmTimeString = unAlarmTimeString;
	}
	@Transient
	public Ep getEp() {
		return ep;
	}

	public void setEp(Ep ep) {
		this.ep = ep;
	}
	@Transient
	public BasePojo getLowDevice() {
		return lowDevice;
	}

	public void setLowDevice(BasePojo lowDevice) {
		this.lowDevice = lowDevice;
	}

}