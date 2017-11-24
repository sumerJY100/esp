package com.pojo.air;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * QuestionnaireEspTable entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "questionnaire_esp_table", catalog = "questionnaire")
public class QuestionnaireEspTable extends base.pojo.BasePojo implements java.io.Serializable {

	// Fields

	private Integer id;
	private String powerPlantName;
	private String aircrew;
	private Timestamp submitTime;
	private Integer questionnaireUserId;
	private Timestamp checkTime;
	private Integer questionnaireManagerId;

	// Constructors

	/** default constructor */
	public QuestionnaireEspTable() {
	}

	/** full constructor */
	public QuestionnaireEspTable(String powerPlantName, String aircrew, Timestamp submitTime, Integer questionnaireUserId, Timestamp checkTime,
			Integer questionnaireManagerId) {
		this.powerPlantName = powerPlantName;
		this.aircrew = aircrew;
		this.submitTime = submitTime;
		this.questionnaireUserId = questionnaireUserId;
		this.checkTime = checkTime;
		this.questionnaireManagerId = questionnaireManagerId;
	}

	// Property accessors
	@Override
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", nullable = false)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "power_plant_name", length = 100)
	public String getPowerPlantName() {
		return this.powerPlantName;
	}

	public void setPowerPlantName(String powerPlantName) {
		this.powerPlantName = powerPlantName;
	}

	@Column(name = "aircrew", length = 50)
	public String getAircrew() {
		return this.aircrew;
	}

	public void setAircrew(String aircrew) {
		this.aircrew = aircrew;
	}

	@Column(name = "submit_time", length = 19)
	public Timestamp getSubmitTime() {
		return this.submitTime;
	}

	public void setSubmitTime(Timestamp submitTime) {
		this.submitTime = submitTime;
	}

	@Column(name = "questionnaire_user_id")
	public Integer getQuestionnaireUserId() {
		return this.questionnaireUserId;
	}

	public void setQuestionnaireUserId(Integer questionnaireUserId) {
		this.questionnaireUserId = questionnaireUserId;
	}

	@Column(name = "check_time", length = 19)
	public Timestamp getCheckTime() {
		return this.checkTime;
	}

	public void setCheckTime(Timestamp checkTime) {
		this.checkTime = checkTime;
	}

	@Column(name = "questionnaire_manager_id")
	public Integer getQuestionnaireManagerId() {
		return this.questionnaireManagerId;
	}

	public void setQuestionnaireManagerId(Integer questionnaireManagerId) {
		this.questionnaireManagerId = questionnaireManagerId;
	}

}