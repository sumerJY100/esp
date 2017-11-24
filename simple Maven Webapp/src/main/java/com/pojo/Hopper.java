package com.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

/**
 * Hopper entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "hopper", catalog = "esp")
public class Hopper extends base.pojo.BasePojo implements java.io.Serializable {

	// Fields

	private Integer id;
	private String name;
	private Integer epId;
	private Integer location;
	private Integer hopperLevel;
	private Integer alarmHopperLevel;
	private Integer comunication;
	private Integer lowDeviceId;
	private Integer runState;

	private Ep ep;
	private LowDevice lowDevice;

	// Constructors

	/** default constructor */
	public Hopper() {
	}

	/** full constructor */
	public Hopper(String name, Integer epId, Integer location, Integer hopperLevel, Integer alarmHopperLevel, Integer comunication) {
		this.name = name;
		this.epId = epId;
		this.location = location;
		this.hopperLevel = hopperLevel;
		this.alarmHopperLevel = alarmHopperLevel;
		this.comunication = comunication;
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

	@Column(name = "name", length = 200)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "ep_id")
	public Integer getEpId() {
		return this.epId;
	}

	public void setEpId(Integer epId) {
		this.epId = epId;
	}

	@Column(name = "location")
	public Integer getLocation() {
		return this.location;
	}

	public void setLocation(Integer location) {
		this.location = location;
	}

	@Column(name = "hopper_level")
	public Integer getHopperLevel() {
		return this.hopperLevel;
	}

	public void setHopperLevel(Integer hopperLevel) {
		this.hopperLevel = hopperLevel;
	}

	@Column(name = "alarm_hopper_level")
	public Integer getAlarmHopperLevel() {
		return this.alarmHopperLevel;
	}

	public void setAlarmHopperLevel(Integer alarmHopperLevel) {
		this.alarmHopperLevel = alarmHopperLevel;
	}

	@Column(name = "comunication")
	public Integer getComunication() {
		return this.comunication;
	}

	public void setComunication(Integer comunication) {
		if (null != comunication) {
			if (comunication == 1) {

			}
		}
		this.comunication = comunication;
	}

	@Column(name = "low_device_id")
	public Integer getLowDeviceId() {
		return lowDeviceId;
	}

	public void setLowDeviceId(Integer lowDeviceId) {
		this.lowDeviceId = lowDeviceId;
	}
	@Column(name="run_state")
	public Integer getRunState() {
		return runState;
	}

	public void setRunState(Integer runState) {
		this.runState = runState;
	}

	/****************************************************************************************/
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

}