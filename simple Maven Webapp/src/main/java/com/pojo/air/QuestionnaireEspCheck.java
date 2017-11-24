package com.pojo.air;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * QuestionnaireEspCheck entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "questionnaire_esp_check", catalog = "questionnaire")
public class QuestionnaireEspCheck extends base.pojo.BasePojo implements java.io.Serializable {

	// Fields

	private Integer id;
	private Integer questionnaireEspTableId;
	private Integer questionnaireManagerId;
	private Timestamp reviewTime;
	private Integer reviewLevelId;
	private String reviewCommont;
	private Integer questionAwardId;
	private Short getAward;
	private Timestamp getAwardTime;

	// Constructors

	/** default constructor */
	public QuestionnaireEspCheck() {
	}

	/** full constructor */
	public QuestionnaireEspCheck(Integer questionnaireEspTableId, Integer questionnaireManagerId, Timestamp reviewTime, Integer reviewLevelId,
			String reviewCommont, Integer questionAwardId, Short getAward, Timestamp getAwardTime) {
		this.questionnaireEspTableId = questionnaireEspTableId;
		this.questionnaireManagerId = questionnaireManagerId;
		this.reviewTime = reviewTime;
		this.reviewLevelId = reviewLevelId;
		this.reviewCommont = reviewCommont;
		this.questionAwardId = questionAwardId;
		this.getAward = getAward;
		this.getAwardTime = getAwardTime;
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

	@Column(name = "questionnaire_manager_id")
	public Integer getQuestionnaireManagerId() {
		return this.questionnaireManagerId;
	}

	public void setQuestionnaireManagerId(Integer questionnaireManagerId) {
		this.questionnaireManagerId = questionnaireManagerId;
	}

	@Column(name = "review_time", length = 19)
	public Timestamp getReviewTime() {
		return this.reviewTime;
	}

	public void setReviewTime(Timestamp reviewTime) {
		this.reviewTime = reviewTime;
	}

	@Column(name = "review_level_id")
	public Integer getReviewLevelId() {
		return this.reviewLevelId;
	}

	public void setReviewLevelId(Integer reviewLevelId) {
		this.reviewLevelId = reviewLevelId;
	}

	@Column(name = "review_commont", length = 200)
	public String getReviewCommont() {
		return this.reviewCommont;
	}

	public void setReviewCommont(String reviewCommont) {
		this.reviewCommont = reviewCommont;
	}

	@Column(name = "question_award_id")
	public Integer getQuestionAwardId() {
		return this.questionAwardId;
	}

	public void setQuestionAwardId(Integer questionAwardId) {
		this.questionAwardId = questionAwardId;
	}

	@Column(name = "get_award")
	public Short getGetAward() {
		return this.getAward;
	}

	public void setGetAward(Short getAward) {
		this.getAward = getAward;
	}

	@Column(name = "get_award_time", length = 19)
	public Timestamp getGetAwardTime() {
		return this.getAwardTime;
	}

	public void setGetAwardTime(Timestamp getAwardTime) {
		this.getAwardTime = getAwardTime;
	}

}