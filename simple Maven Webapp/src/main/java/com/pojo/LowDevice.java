package com.pojo;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

/**
 * LowDevice entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "low_device", catalog = "esp")
public class LowDevice extends base.pojo.BasePojo implements java.io.Serializable {

	// Fields

	private Integer id;
	private String name;
	private Integer runState;

	private String runStateString;
	
	private List<Hopper> hopperList;
	private List<Rapper> rapperList;
	private List<Heater> heaterList;
	// Constructors

	/** default constructor */
	public LowDevice() {
	}

	/** full constructor */
	public LowDevice(String name, Integer runState) {
		this.name = name;
		this.runState = runState;
	}

	// Property accessors
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

	@Column(name = "name" ,length=200)
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
		if(null != runState && runState == 1){
			changeAllListState(LowAlarm.ALARM_COMMUNICATION_INTERUPT);
		}else if(null != runState && runState == 0){
			changeAllListState(LowAlarm.ALARM_NORMAL);
		}
		this.runState = runState;
	}
	private void changeAllListState(Integer alarmState){
		if(null != alarmState){
			int runState = alarmState == 1?-1:0;
			if(null != this.getRapperList()){
				for(Rapper rapper:this.getRapperList()){
					rapper.setRunState(runState);
				}
			}
			if(null != this.getHeaterList()){
				for(Heater heater:this.getHeaterList()){
					heater.setRunState(runState);
				}
			}
			if(null != this.getHopperList()){
				for(Hopper hopper:this.getHopperList()){
					hopper.setRunState(runState);
				}
			}
		}
	}
	/**********************************************************************************************/
	@Transient
	public String getRunStateString() {
		if(null != this.getRunState()){
			if(this.getRunState() == 1){
				runStateString = "通讯中断";
			}else if(this.getRunState() == 0){
				runStateString = "正常";
			}
		}else{
			runStateString = "--";
		}
		return runStateString;
	}

	public void setRunStateString(String runStateString) {
		this.runStateString = runStateString;
	}
	@Transient
	public List<Hopper> getHopperList() {
		return hopperList;
	}

	public void setHopperList(List<Hopper> hopperList) {
		this.hopperList = hopperList;
	}
	@Transient
	public List<Rapper> getRapperList() {
		return rapperList;
	}

	public void setRapperList(List<Rapper> rapperList) {
		this.rapperList = rapperList;
	}
	@Transient
	public List<Heater> getHeaterList() {
		return heaterList;
	}

	public void setHeaterList(List<Heater> heaterList) {
		this.heaterList = heaterList;
	}

}