package com.pojo.air;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * QuestionnaireBoiler entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "questionnaire_boiler", catalog = "questionnaire")
public class QuestionnaireBoiler extends base.pojo.BasePojo implements java.io.Serializable {

	// Fields

	private Integer id;

	// Constructors

	/** default constructor */
	public QuestionnaireBoiler() {
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

}