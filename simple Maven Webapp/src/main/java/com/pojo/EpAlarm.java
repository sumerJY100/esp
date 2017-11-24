package com.pojo;

import java.lang.reflect.Method;
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
 * EpAlarm entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "ep_alarm", catalog = "esp")
public class EpAlarm extends base.pojo.BasePojo implements java.io.Serializable {
	/**通讯中断*/
	public static final Integer ALARM_TYPE_COMMUNICATION_INTERRUPT = 1;
	/**一次电压低告警*/
	public static final Integer ALARM_TYPE_PRIMARY_VOLTAGE_LOW_W = 2;
	/**一次电压低跳闸*/
	public static final Integer ALARM_TYPE_PRIMARY_VOLTAGE_LOW_T = 3;
	/**二次电压低报警*/
	public static final Integer ALARM_TYPE_Second_VOLTAGE_LOW_W = 4;
	/**二次电压低跳闸*/
	public static final Integer ALARM_TYPE_Second_VOLTAGE_LOW_T = 5;
	/**控制器温度高报警*/
	public static final Integer ALARM_TYPE_T_R_TEMPRATOR_HIGH_W = 6;
	/**控制器温度高跳闸*/
	public static final Integer ALARM_TYPE_T_R_TEMPRATOR_HIGH_T = 7;
	/**冷却液液位低报警**/
	public static final Integer ALARM_TYPE_CHECK_OIL_LOW_W = 8;
	/**冷却液液位低跳闸**/
	public static final Integer ALARM_TYPE_CHECK_OIL_LOW_T = 9;
	/**冷却风扇跳闸**/
	public static final Integer ALARM_TYPE_FAN_ALARM_T = 10;
	/**控制器温度高报警**/
	public static final Integer ALARM_TYPE_CONTROLLER_TEM_HIGH_W = 11;
	/**控制器温度高跳闸**/
	public static final Integer ALARM_TYPE_CONTROLLER_TEM_HIGH_T = 12;
	/**控制器温度低报警**/
	public static final Integer ALARM_TYPE_CONTROLLER_TEM_LOW_W = 13;
	/**控制器温度低跳闸**/
	public static final Integer ALARM_TYPE_CONTROLLER_TEM_LOW_T = 14;
	/**变频单元跳闸**/
	public static final Integer ALARM_TYPE_CONTROLLER_T = 15;
	/**DC_LINK ERROR跳闸**/
	public static final Integer ALARM_TYPE_DC_LINK_T = 16;
	// Fields
	public static final List<Method> getMethodForListTable = new ArrayList<Method>();
	static {
		String[] attrsArr = new String[]{"id","epName","alarmTimeString","unAlarmTimeString","alarmStatString","alarmTypeString"};
		for(int i=0;i<attrsArr.length;i++){
			String getMethodName = "get" + BasePojo.setFirstCharacterUppercase(attrsArr[i]);
			try {
				Method getMethod = EpAlarm.class.getMethod(getMethodName);
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
	
	private String alarmStatString;
	private String alarmTypeString;
	private String alarmTimeString;
	private String unAlarmTimeString;
	// Constructors

	/** default constructor */
	public EpAlarm() {
	}

	/** full constructor */
	public EpAlarm(Date alarmTime, Integer epDeviceId, Integer alarmState, Integer alarmType, Date unAlarmTime) {
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
	@Column(name="ep_name" ,length=200)
	public String getEpName() {
		return epName;
	}

	public void setEpName(String epName) {
		this.epName = epName;
	}
/******************************************************************************************************************/
	
	@Transient
	public String getAlarmStatString() {
		if(null != this.getAlarmState() || this.getAlarmState() == 0){
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
			case 2:alarmTypeString = "一次电压低告警";break;
			case 3:alarmTypeString = "一次电压低跳闸";break;
			case 4:alarmTypeString = "二次电压低报警";break;
			case 5:alarmTypeString = "二次电压低跳闸";break;
			case 6:alarmTypeString = "冷却液温度高报警";break;
			case 7:alarmTypeString = "冷却液温度高跳闸";break;
			case 8:alarmTypeString = "冷却液液位低报警";break;
			case 9:alarmTypeString = "冷却液液位低跳闸";break;
			case 10:alarmTypeString = "冷却风扇跳闸";break;
			case 11:alarmTypeString = "控制器温度高报警";break;
			case 12:alarmTypeString = "控制器温度高跳闸";break;
			case 13:alarmTypeString = "控制器温度低报警";break;
			case 14:alarmTypeString = "控制器温度低跳闸";break;
			case 15:alarmTypeString = "变频单元跳闸";break;
			case 16:alarmTypeString = "DC LINK ERROR跳闸";break;
			default:alarmTypeString ="--";
			}
		}else{
			alarmTypeString = "--";
		}
		return alarmTypeString;
	}

	public void setAlarmTypeString(String alarmTypeString) {
		this.alarmTypeString = alarmTypeString;
	}
	@Transient
	public String getAlarmTimeString() {
		if(null != this.getAlarmTime()){
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
			unAlarmTimeString = "--";
		}else if(null != this.getAlarmState() && this.getAlarmState() == 0){
			if(null != this.getUnAlarmTime()){
				unAlarmTimeString = BasePojo.YYYYMMDDHHmmss.format(this.getUnAlarmTime());
			}
		}
		return unAlarmTimeString;
	}

	public void setUnAlarmTimeString(String unAlarmTimeString) {
		this.unAlarmTimeString = unAlarmTimeString;
	}

}