package com.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Transient;

import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * Ep entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "ep", catalog = "esp")
public class Ep extends base.pojo.BasePojo implements java.io.Serializable {

	// Fields
	public static final Integer EP_RUN_STATE_NO_COMMUNICATION = 1;
	public static final Integer EP_RUN_STATE_NORMAL = 0;
	public static final Integer EP_RUN_STATE_RUN = 1;
	public static final Integer EP_RUN_STATE_ALARM = 2;

	private Integer id;
	private String name;
	private Float primaryCurrentReading;
	private Float primaryVoltageReading;
	private Float secondCurrentReading;
	private Float secondVoltageReading;
	private Integer sparkReading;
	private Float secondCurrentSet;
	private Float secondVoltageSet;
	private Integer sparkSet;
	private Integer runState;
	private Integer runWay;
	private Integer alarmState;
	private Integer alarmType;
	private Integer operate;
	private Integer alarmReset;
	private String none;
	private Integer firstCurrntSet;
	private Integer sparkSensitivitySet;
	private Integer conductionAngleSet;
	private Integer secondVoltagePeakReading;
	private Integer ordinalPosition;
	private Integer PrimaryCurrentSet;
	private Integer communicationFlag;

	private Heater heater;
	private Heater huidouHeaterForLeft;
	private Heater huidouHeaterForRight;
	private Heater cizhouHeater;
	private Heater citaoHeater;
	private Rapper anodeRapper;
	private Rapper cathodeRapper;
	private String runWayString;

	// Constructors

	/** default constructor */
	public Ep() {
	}

	/** full constructor */
	public Ep(String name, Float primaryCurrent, Float primaryVoltage, Float secondCurrent, Float secondVoltage, Integer spark, Float secondCurrentSet, Float secondVoltageSet, Integer sparkSet,
			Integer runState, Integer alarmState, Integer alarmType, Integer operate, Integer alarmReset, String none) {
		this.name = name;
		this.primaryCurrentReading = primaryCurrent;
		this.primaryVoltageReading = primaryVoltage;
		this.secondCurrentReading = secondCurrent;
		this.secondVoltageReading = secondVoltage;
		this.sparkReading = spark;
		this.secondCurrentSet = secondCurrentSet;
		this.secondVoltageSet = secondVoltageSet;
		this.sparkSet = sparkSet;
		this.runState = runState;
		this.alarmState = alarmState;
		this.alarmType = alarmType;
		this.operate = operate;
		this.alarmReset = alarmReset;
		this.none = none;
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

	@Column(name = "name", length = 200)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "primary_current_reading", precision = 12, scale = 0)
	public Float getPrimaryCurrentReading() {
		return this.primaryCurrentReading;
	}

	public void setPrimaryCurrentReading(Float primaryCurrentReading) {
		this.primaryCurrentReading = primaryCurrentReading;
	}

	@Column(name = "primary_voltage_reading", precision = 12, scale = 0)
	public Float getPrimaryVoltageReading() {
		return this.primaryVoltageReading;
	}

	public void setPrimaryVoltageReading(Float primaryVoltageReading) {
		this.primaryVoltageReading = primaryVoltageReading;
	}

	@Column(name = "second_current_reading", precision = 12, scale = 0)
	public Float getSecondCurrentReading() {
		
		return this.secondCurrentReading;
	}

	public void setSecondCurrentReading(Float secondCurrentReading) {
		this.secondCurrentReading = secondCurrentReading;
	}

	@Column(name = "second_voltage_reading", precision = 12, scale = 0)
	public Float getSecondVoltageReading() {
		return this.secondVoltageReading;
	}

	public void setSecondVoltageReading(Float secondVoltageReading) {
		this.secondVoltageReading = secondVoltageReading;
	}

	@Column(name = "spark_reading")
	public Integer getSparkReading() {
		return this.sparkReading;
	}

	public void setSparkReading(Integer sparkReading) {
		this.sparkReading = sparkReading;
	}

	@Column(name = "second_current_set", precision = 12, scale = 0)
	public Float getSecondCurrentSet() {
		return this.secondCurrentSet;
	}

	public void setSecondCurrentSet(Float secondCurrentSet) {
		this.secondCurrentSet = secondCurrentSet;
	}

	@Column(name = "second_voltage_set", precision = 12, scale = 0)
	public Float getSecondVoltageSet() {
		return this.secondVoltageSet;
	}

	public void setSecondVoltageSet(Float secondVoltageSet) {
		this.secondVoltageSet = secondVoltageSet;
	}

	@Column(name = "spark_set")
	public Integer getSparkSet() {
		return this.sparkSet;
	}

	public void setSparkSet(Integer sparkSet) {
		this.sparkSet = sparkSet;
	}

	@Column(name = "run_state")
	public Integer getRunState() {
		return this.runState;
	}

	public void setRunState(Integer runState) {
		this.runState = runState;
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

	@Column(name = "operate")
	public Integer getOperate() {
		return this.operate;
	}

	public void setOperate(Integer operate) {
		this.operate = operate;
	}

	@Column(name = "alarm_reset")
	public Integer getAlarmReset() {
		return this.alarmReset;
	}

	public void setAlarmReset(Integer alarmReset) {
		this.alarmReset = alarmReset;
	}

	@Column(name = "none", length = 200)
	public String getNone() {
		return this.none;
	}

	public void setNone(String none) {
		this.none = none;
	}

	@Column(name = "run_way")
	public Integer getRunWay() {
		return runWay;
	}

	public void setRunWay(Integer runWay) {
		this.runWay = runWay;
	}

	@Column(name = "first_current_set")
	public Integer getFirstCurrntSet() {
		return firstCurrntSet;
	}

	public void setFirstCurrntSet(Integer firstCurrntSet) {
		this.firstCurrntSet = firstCurrntSet;
	}

	@Column(name = "spark_sensitivity_set")
	public Integer getSparkSensitivitySet() {
		return sparkSensitivitySet;
	}

	public void setSparkSensitivitySet(Integer sparkSensitivitySet) {
		this.sparkSensitivitySet = sparkSensitivitySet;
	}

	@Column(name = "conduction_Angle_set")
	public Integer getConductionAngleSet() {
		return conductionAngleSet;
	}

	public void setConductionAngleSet(Integer conductionAngleSet) {
		this.conductionAngleSet = conductionAngleSet;
	}

	@Column(name = "second_voltage_peak_reading")
	public Integer getSecondVoltagePeakReading() {
		return secondVoltagePeakReading;
	}

	public void setSecondVoltagePeakReading(Integer secondVoltagePeakReading) {
		this.secondVoltagePeakReading = secondVoltagePeakReading;
	}

	@Column(name = "ordinal_position")
	public Integer getOrdinalPosition() {
		return ordinalPosition;
	}

	public void setOrdinalPosition(Integer ordinalPosition) {
		this.ordinalPosition = ordinalPosition;
	}

	@Column(name = "primary_current_set")
	public Integer getPrimaryCurrentSet() {
		return PrimaryCurrentSet;
	}

	public void setPrimaryCurrentSet(Integer primaryCurrentSet) {
		PrimaryCurrentSet = primaryCurrentSet;
	}

	@Column(name = "communication_flag")
	public Integer getCommunicationFlag() {
		return communicationFlag;
	}

	public void setCommunicationFlag(Integer communicationFlag) {
		// if(null != communicationFlag && communicationFlag.intValue() == 1){
		// this.setAlarmState(1);
		// this.setRunState(Ep.EP_RUN_STATE_NO_COMMUNICATION);
		// this.setAlarmType(EpAlarm.ALARM_TYPE_COMMUNICATION_INTERRUPT);
		// }else if(null != communicationFlag && communicationFlag.intValue() ==
		// 0){
		// this.setRunState(Ep.EP_RUN_STATE_NORMAL);
		// this.setAlarmState(0);
		// this.setAlarmType(0);
		// }else if(null == communicationFlag){
		// this.setAlarmState(1);
		// this.setRunState(Ep.EP_RUN_STATE_NO_COMMUNICATION);
		// this.setAlarmType(EpAlarm.ALARM_TYPE_COMMUNICATION_INTERRUPT);
		// }
		this.communicationFlag = communicationFlag;
	}

	/*************************************************************************************************************************/

	@Transient
	public Rapper getAnodeRapper() {
		return anodeRapper;
	}
	
	
	@Transient
	public Heater getCizhouHeater() {
		return cizhouHeater;
	}
	@Transient
	public Heater getHuidouHeaterForLeft() {
		return huidouHeaterForLeft;
	}

	public void setHuidouHeaterForLeft(Heater huidouHeaterForLeft) {
		this.huidouHeaterForLeft = huidouHeaterForLeft;
	}
	@Transient
	public Heater getHuidouHeaterForRight() {
		return huidouHeaterForRight;
	}

	public void setHuidouHeaterForRight(Heater huidouHeaterForRight) {
		this.huidouHeaterForRight = huidouHeaterForRight;
	}

	public void setCizhouHeater(Heater cizhouHeater) {
		this.cizhouHeater = cizhouHeater;
	}
	@Transient
	public Heater getCitaoHeater() {
		return citaoHeater;
	}

	public void setCitaoHeater(Heater citaoHeater) {
		this.citaoHeater = citaoHeater;
	}

	public void setAnodeRapper(Rapper anodeRapper) {
		this.anodeRapper = anodeRapper;
	}

	@Transient
	public Rapper getCathodeRapper() {
		return cathodeRapper;
	}

	public void setCathodeRapper(Rapper cathodeRapper) {
		this.cathodeRapper = cathodeRapper;
	}
	@Transient
	public Heater getHeater() {
		return heater;
	}

	public void setHeater(Heater heater) {
		this.heater = heater;
	}

	@Transient
	public String getRunWayString() {
		if (null != this.getRunWay()) {
			switch (this.getRunWay()) {
			case 0:
				this.setRunWayString("Off");
				break;
			case 1:
				this.setRunWayString("火化率控制");
				break;
			case 2:
				this.setRunWayString("二次电流限制");
				break;
			case 3:
				this.setRunWayString("二次电压限制");
				break;
			case 4:
				this.setRunWayString("降功率振打");
				break;
			case 5:
				this.setRunWayString("浊度控制");
				break;
			default:
				this.setRunWayString("");
			}
		} else {
			this.setRunWayString(" ");
		}
		return runWayString;
	}

	public void setRunWayString(String runWayString) {
		this.runWayString = runWayString;
	}

}