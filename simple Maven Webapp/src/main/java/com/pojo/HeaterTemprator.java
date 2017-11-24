package com.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

/**
 * HeaterTemprator entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "heater_temprator", catalog = "esp")
public class HeaterTemprator extends base.pojo.BasePojo implements java.io.Serializable {

	// Fields

	public static final Integer TEMPRATOR_TYPE_CIZHOU = 0;
	public static final Integer TEMPRATOR_TYPE_CITAO = 1;
	public static final Integer TEMPRATOR_TYPE_LEFT_HOPPER = 2;
	public static final Integer TEMPRATOR_TYPE_RIGHT_CITAO = 3;
	
	private Integer id;
	private Integer epId;
	private Integer temprator;
	private Integer tempratorUpper;
	private Integer tempratorLower;
	private String name;
	private Integer tempratorType;
	private Integer lowDeviceId;

	private String tempratorTypeString;
	private Integer communication;
	private Ep ep;
	private LowDevice lowDevice;

	// Constructors

	/** default constructor */
	public HeaterTemprator() {
	}

	/** full constructor */
	public HeaterTemprator(Integer epId, Integer temprator, Integer tempratorUpper, Integer tempratorLower) {
		this.epId = epId;
		this.temprator = temprator;
		this.tempratorUpper = tempratorUpper;
		this.tempratorLower = tempratorLower;
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

	@Column(name = "ep_id")
	public Integer getEpId() {
		return this.epId;
	}

	public void setEpId(Integer epId) {
		this.epId = epId;
	}

	@Column(name = "temprator")
	public Integer getTemprator() {
		return this.temprator;
	}

	public void setTemprator(Integer temprator) {
		this.temprator = temprator;
	}

	@Column(name = "temprator_upper")
	public Integer getTempratorUpper() {
		return this.tempratorUpper;
	}

	public void setTempratorUpper(Integer tempratorUpper) {
		this.tempratorUpper = tempratorUpper;
	}

	@Column(name = "temprator_lower")
	public Integer getTempratorLower() {
		return this.tempratorLower;
	}

	public void setTempratorLower(Integer tempratorLower) {
		this.tempratorLower = tempratorLower;
	}

	@Column(name = "name", length = 200)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "temprator_type")
	public Integer getTempratorType() {
		return tempratorType;
	}

	public void setTempratorType(Integer tempratorType) {
		this.tempratorType = tempratorType;
	}

	@Column(name = "low_device_id")
	public Integer getLowDeviceId() {
		return lowDeviceId;
	}

	public void setLowDeviceId(Integer lowDeviceId) {
		this.lowDeviceId = lowDeviceId;
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
	public String getTempratorTypeString() {
		if (null != this.getTempratorType()) {
			switch (this.getTempratorType()) {
			case 0:
				tempratorTypeString = "瓷套";
				break;
			case 1:
				tempratorTypeString = "瓷轴";
				break;
			case 2:
				tempratorTypeString = "灰斗";
				break;
			default:
				tempratorTypeString = "--";
			}
		} else {
			tempratorTypeString = "--";
		}
		return tempratorTypeString;
	}

	public void setTempratorTypeString(String tempratorTypeString) {
		this.tempratorTypeString = tempratorTypeString;
	}

	@Transient
	public LowDevice getLowDevice() {
		return lowDevice;
	}

	public void setLowDevice(LowDevice lowDevice) {
		this.lowDevice = lowDevice;
	}

	@Column(name = "communication")
	public Integer getCommunication() {
//		if(null != this.getLowDevice())
//			return this.getLowDevice().getRunState();
		return communication;
	}

	public void setCommunication(Integer communication) {
//		if(null != this.getLowDevice())
//			this.communication = this.getLowDevice().getRunState();
		this.communication = communication;
	}

}