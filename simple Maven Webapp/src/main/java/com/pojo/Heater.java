package com.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Transient;

import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * Heater entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "heater", catalog = "esp")
public class Heater extends base.pojo.BasePojo implements java.io.Serializable {

	public static final Integer HEATER_TYPE_CITAO = 0;
	public static final Integer HEATER_TYPE_CIZHOU = 1;
	public static final Integer HEATER_TYPE_HUIDOU_LEFT = 2;
	public static final Integer HEATER_TYPE_HUIDOU_RIGHT = 3;

	// Fields

	private Integer id;
	private Integer epId;
	private String name;
	private Integer runState;
	private Integer alarmState;
	private Integer comunication;
	private Integer operate;
	private Integer runType;
	private String note;
	private Integer heaterType;
	private Integer heaterTempratorId;
	private Integer lowDeviceId;

	private String heaterTypeString;
	private String runStateString;
	private String alarmStateString;
	private String runTypeString;
	private Ep ep;
	private HeaterTemprator heaterTemprator;
	private LowDevice lowDevice;

	// Constructors

	/** default constructor */
	public Heater() {
	}

	/** full constructor */
	public Heater(String name, Integer runState, Integer alarmState, Integer comunication, Integer operate, Integer runType, String note) {
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

	@Column(name = "ep_Id")
	public Integer getEpId() {
		return epId;
	}

	public void setEpId(Integer epId) {
		this.epId = epId;
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

	public void setComunication(Integer communication) {
//		if (null != communication && communication == 1) {
//			this.setAlarmState(1);
//			this.setRunState(-1);
//		}
		// else if (null != communication && communication == 0) {
		// this.setAlarmState(0);
		// this.setRunState(0);
		// }
		this.comunication = communication;
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

	@Column(name = "heater_type")
	public Integer getHeaterType() {
		return heaterType;
	}

	public void setHeaterType(Integer heaterType) {
		this.heaterType = heaterType;
	}

	@Column(name = "heater_temprator_id")
	public Integer getHeaterTempratorId() {
		return heaterTempratorId;
	}

	public void setHeaterTempratorId(Integer heaterTempratorId) {
		this.heaterTempratorId = heaterTempratorId;
	}

	@Column(name = "low_device_id")
	public Integer getLowDeviceId() {
		return lowDeviceId;
	}

	public void setLowDeviceId(Integer lowDeviceId) {
		this.lowDeviceId = lowDeviceId;
	}

	/*************************************************************************************************/
	@Transient
	public Ep getEp() {
		return ep;
	}

	public void setEp(Ep ep) {
		this.ep = ep;
	}

	@Transient
	public HeaterTemprator getHeaterTemprator() {
		return heaterTemprator;
	}

	public void setHeaterTemprator(HeaterTemprator heaterTemprator) {
		this.heaterTemprator = heaterTemprator;
	}

	@Transient
	public String getHeaterTypeString() {
		if (null != this.getHeaterType()) {
			switch (this.getHeaterType()) {
			case 0:
				heaterTypeString = "瓷套";
				break;
			case 1:
				heaterTypeString = "瓷轴";
				break;
			case 2:
				heaterTypeString = "左灰斗";
				break;
			case 3:
				heaterTypeString ="右灰斗";
				break;
			default:
				heaterTypeString = "--";
			}
		} else {
			heaterTypeString = "--";
		}
		return heaterTypeString;
	}

	@Transient
	public String getRunStateString() {
		if (null != this.getRunState()) {
			switch (this.getRunState()) {
			case 0:
				this.runStateString = "停运";
				break;
			case 1:
				this.runStateString = "运行";
				break;
			case 2:
				this.runStateString = "故障";
				break;
			case -1:
				this.runStateString = "未通讯";
				break;
			default:
				this.runStateString = "--";
			}
		} else {
			this.runStateString = "--";
		}
		return runStateString;
	}

	public void setRunStateString(String runStateString) {
		this.runStateString = runStateString;
	}

	@Transient
	public String getAlarmStateString() {
		if (null != this.getAlarmState()) {
			switch (this.getAlarmState()) {
			case 0:
				this.alarmStateString = "正常";
				break;
			case 1:
				this.alarmStateString = "故障";
				break;
			default:
				this.alarmStateString = "--";
			}
		} else {
			this.alarmStateString = "--";
		}
		return alarmStateString;
	}

	public void setAlarmStateString(String alarmStateString) {
		this.alarmStateString = alarmStateString;
	}

	@Transient
	public String getRunTypeString() {
		if (null != this.getRunType()) {
			switch (this.getRunType()) {
			case 0:
				this.runTypeString = "停止";
				break;
			case 1:
				this.runTypeString = "连续";
				break;
			case 2:
				this.runTypeString = "自动";
				break;
			case 3:
				this.runTypeString = "未通讯";
				break;
			default:
				this.runTypeString = "--";
			}
		} else {
			this.runTypeString = "--";
		}
		return runTypeString;
	}

	public void setRunTypeString(String runTypeString) {
		this.runTypeString = runTypeString;
	}

	public void setHeaterTypeString(String heaterTypeString) {
		this.heaterTypeString = heaterTypeString;
	}

	@Transient
	public LowDevice getLowDevice() {
		return lowDevice;
	}

	public void setLowDevice(LowDevice lowDevice) {
		this.lowDevice = lowDevice;
	}

}