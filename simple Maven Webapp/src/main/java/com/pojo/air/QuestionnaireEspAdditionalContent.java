package com.pojo.air;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * QuestionnaireEspAdditionalContent entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "questionnaire_esp_additional_content", catalog = "questionnaire")
public class QuestionnaireEspAdditionalContent extends base.pojo.BasePojo implements java.io.Serializable {

	// Fields

	private Integer id;
	private Integer questionnaireEspTableId;
	private String additionalColumnName;
	private String additionalColumnCotent;
	private Integer additionalColumnLocation;

	// Constructors

	/** default constructor */
	public QuestionnaireEspAdditionalContent() {
	}

	/** full constructor */
	public QuestionnaireEspAdditionalContent(Integer questionnaireEspTableId, String additionalColumnName, String additionalColumnCotent,
			Integer additionalColumnLocation) {
		this.questionnaireEspTableId = questionnaireEspTableId;
		this.additionalColumnName = additionalColumnName;
		this.additionalColumnCotent = additionalColumnCotent;
		this.additionalColumnLocation = additionalColumnLocation;
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

	@Column(name = "questionnaire_esp_table_id")
	public Integer getQuestionnaireEspTableId() {
		return this.questionnaireEspTableId;
	}

	public void setQuestionnaireEspTableId(Integer questionnaireEspTableId) {
		this.questionnaireEspTableId = questionnaireEspTableId;
	}

	@Column(name = "additional_column_name", length = 200)
	public String getAdditionalColumnName() {
		return this.additionalColumnName;
	}

	public void setAdditionalColumnName(String additionalColumnName) {
		this.additionalColumnName = additionalColumnName;
	}

	@Column(name = "additional_column_cotent", length = 2000)
	public String getAdditionalColumnCotent() {
		return this.additionalColumnCotent;
	}

	public void setAdditionalColumnCotent(String additionalColumnCotent) {
		this.additionalColumnCotent = additionalColumnCotent;
	}

	@Column(name = "additional_column_location")
	public Integer getAdditionalColumnLocation() {
		return this.additionalColumnLocation;
	}

	public void setAdditionalColumnLocation(Integer additionalColumnLocation) {
		this.additionalColumnLocation = additionalColumnLocation;
	}

}