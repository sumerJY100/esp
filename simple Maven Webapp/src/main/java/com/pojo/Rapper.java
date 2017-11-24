package com.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Transient;

import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * Rapper entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "rapper", catalog = "esp")
public class Rapper extends base.pojo.BasePojo implements java.io.Serializable {

	// Fields
	public static final Integer RAPPERTYPE_ANODE = 0;
	public static final Integer RAPPERTYPE_CATCHODE = 1;
	
	
	private Integer id;
	private Integer epId;
	private String name;
	private Integer runState;
	private Integer alarmState;
	private Integer comunication;
	private Integer operate;
	private Integer runType;
	private String note;
	private Integer rapperType;
	private Integer lowDeviceId;
	private Integer beginTime;
	private Integer runTime;
	private Integer waitTime;
	private Integer runWay;
	// Constructors

	private Ep ep;
	private LowDevice lowDevice;
	
	private String rapperTypeString;
	/** default constructor */
	public Rapper() {
	}

	/** full constructor */
	public Rapper(String name, Integer runState, Integer alarmState, Integer comunication, Integer operate, Integer runType, String note) {
		this.name = name;
		this.runState = runState;
		this.alarmState = alarmState;
		this.comunication = comunication;
		this.operate = operate;
		this.runType = runType;
		this.note = note;
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
	@Column(name="ep_id")
	public Integer getEpId() {
		return epId;
	}

	public void setEpId(Integer epId) {
		this.epId = epId;
	}
	@Column(name="rapper_type")
	public Integer getRapperType() {
		return rapperType;
	}

	public void setRapperType(Integer rapperType) {
		this.rapperType = rapperType;
	}

	@Column(name = "name", length = 200)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
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

	@Column(name = "comunication")
	public Integer getComunication() {
		return this.comunication;
	}

	public void setComunication(Integer comunication) {
		if(null != comunication){
//			if(comunication == 1){
//				this.setAlarmState(1);
//				this.setRunState(-1);
//				this.setRunType(-1);
//			}
//			}else if(comunication == 0){
//				this.setAlarmState(0);
//				this.setRunState(0);
//				this.setRunType(0);
//			}
		}
		this.comunication = comunication;
	}

	@Column(name = "operate")
	public Integer getOperate() {
		return this.operate;
	}

	public void setOperate(Integer operate) {
		this.operate = operate;
	}

	@Column(name = "run_type")
	public Integer getRunType() {
		return this.runType;
	}

	public void setRunType(Integer runType) {
		this.runType = runType;
	}

	@Column(name = "note", length = 200)
	public String getNote() {
		return this.note;
	}

	public void setNote(String note) {
		this.note = note;
	}
	@Column(name="low_device_id")
	public Integer getLowDeviceId() {
		return lowDeviceId;
	}

	public void setLowDeviceId(Integer lowDeviceId) {
		this.lowDeviceId = lowDeviceId;
	}
/***************************************************************************************************/
	@Transient
	public Ep getEp() {
		return ep;
	}

	public void setEp(Ep ep) {
		this.ep = ep;
	}
	@Transient
	public LowDevice getLowDevice() {
		return lowDevice;
	}

	public void setLowDevice(LowDevice lowDevice) {
		this.lowDevice = lowDevice;
	}
	@Transient
	public String getRapperTypeString() {
		if(null != this.getRapperType()){
			rapperTypeString = this.getRapperType() == 1?"阳极":"阴极";
		}
		return rapperTypeString;
	}

	public void setRapperTypeString(String rapperTypeString) {
		this.rapperTypeString = rapperTypeString;
	}
	@Column(name = "beginTime")
	public Integer getBeginTime() {
		return beginTime;
	}

	public void setBeginTime(Integer beginTime) {
		this.beginTime = beginTime;
	}
	@Column(name = "runTime")
	public Integer getRunTime() {
		return runTime;
	}

	public void setRunTime(Integer runTime) {
		this.runTime = runTime;
	}
	@Column(name = "waitTime")
	public Integer getWaitTime() {
		return waitTime;
	}

	public void setWaitTime(Integer waitTime) {
		this.waitTime = waitTime;
	}
	@Column(name = "runWay")
	public Integer getRunWay() {
		return runWay;
	}

	public void setRunWay(Integer runWay) {
		this.runWay = runWay;
	}

	@Override
	public boolean equals(Object obj){
		boolean result = false;
		if(null != obj && obj instanceof Rapper){
			Rapper newRapper = (Rapper) obj;
			if(newRapper.getId().equals(this.getId())){
				result = true;
			}
		}
		return result;
	}
	@Override
	public int hashCode(){
		return this.getId();
	}
}