package com.pojo.air;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * QuestionnaireAward entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "questionnaire_award", catalog = "questionnaire")
public class QuestionnaireAward extends base.pojo.BasePojo implements java.io.Serializable {

	// Fields

	private Integer id;
	private String awardName;
	private String awardPic;
	private Short awardEffictiveness;
	private Timestamp addedTime;
	private Timestamp shelfTime;

	// Constructors

	/** default constructor */
	public QuestionnaireAward() {
	}

	/** full constructor */
	public QuestionnaireAward(String awardName, String awardPic, Short awardEffictiveness, Timestamp addedTime, Timestamp shelfTime) {
		this.awardName = awardName;
		this.awardPic = awardPic;
		this.awardEffictiveness = awardEffictiveness;
		this.addedTime = addedTime;
		this.shelfTime = shelfTime;
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

	@Column(name = "award_name", length = 50)
	public String getAwardName() {
		return this.awardName;
	}

	public void setAwardName(String awardName) {
		this.awardName = awardName;
	}

	@Column(name = "award_pic", length = 100)
	public String getAwardPic() {
		return this.awardPic;
	}

	public void setAwardPic(String awardPic) {
		this.awardPic = awardPic;
	}

	@Column(name = "award_effictiveness")
	public Short getAwardEffictiveness() {
		return this.awardEffictiveness;
	}

	public void setAwardEffictiveness(Short awardEffictiveness) {
		this.awardEffictiveness = awardEffictiveness;
	}

	@Column(name = "added_time", length = 19)
	public Timestamp getAddedTime() {
		return this.addedTime;
	}

	public void setAddedTime(Timestamp addedTime) {
		this.addedTime = addedTime;
	}

	@Column(name = "shelf_time", length = 19)
	public Timestamp getShelfTime() {
		return this.shelfTime;
	}

	public void setShelfTime(Timestamp shelfTime) {
		this.shelfTime = shelfTime;
	}

}