package com.pojo.air;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * QuestionnaireManager entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "questionnaire_manager", catalog = "questionnaire")
public class QuestionnaireManager extends base.pojo.BasePojo implements java.io.Serializable {

	// Fields

	private Integer id;
	private String managerName;
	private String managerPassword;

	// Constructors

	/** default constructor */
	public QuestionnaireManager() {
	}

	/** full constructor */
	public QuestionnaireManager(String managerName, String managerPassword) {
		this.managerName = managerName;
		this.managerPassword = managerPassword;
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

	@Column(name = "manager_name", length = 50)
	public String getManagerName() {
		return this.managerName;
	}

	public void setManagerName(String managerName) {
		this.managerName = managerName;
	}

	@Column(name = "manager_password", length = 50)
	public String getManagerPassword() {
		return this.managerPassword;
	}

	public void setManagerPassword(String managerPassword) {
		this.managerPassword = managerPassword;
	}

}