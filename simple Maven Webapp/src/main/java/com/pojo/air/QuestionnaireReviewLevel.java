package com.pojo.air;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * QuestionnaireReviewLevel entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "questionnaire_review_level", catalog = "questionnaire")
public class QuestionnaireReviewLevel extends base.pojo.BasePojo implements java.io.Serializable {

	// Fields

	private Integer id;
	private String levelName;
	private Integer levelLocation;
	private String levelNote;

	// Constructors

	/** default constructor */
	public QuestionnaireReviewLevel() {
	}

	/** full constructor */
	public QuestionnaireReviewLevel(String levelName, Integer levelLocation, String levelNote) {
		this.levelName = levelName;
		this.levelLocation = levelLocation;
		this.levelNote = levelNote;
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

	@Column(name = "level_name", length = 50)
	public String getLevelName() {
		return this.levelName;
	}

	public void setLevelName(String levelName) {
		this.levelName = levelName;
	}

	@Column(name = "level_location")
	public Integer getLevelLocation() {
		return this.levelLocation;
	}

	public void setLevelLocation(Integer levelLocation) {
		this.levelLocation = levelLocation;
	}

	@Column(name = "level_note", length = 200)
	public String getLevelNote() {
		return this.levelNote;
	}

	public void setLevelNote(String levelNote) {
		this.levelNote = levelNote;
	}

}