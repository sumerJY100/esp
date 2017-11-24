package com.pojo.air;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * QuestionnaireUser entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "questionnaire_user", catalog = "questionnaire")
public class QuestionnaireUser extends base.pojo.BasePojo implements java.io.Serializable {

	// Fields

	private Integer id;
	private String userName;
	private String userPassword;
	private String userPhone;
	private String userMailAddress;
	private Short userMailValidate;
	private Timestamp registerTime;
	private String userCommonet;
	private Timestamp userMailValidateTime;

	// Constructors

	/** default constructor */
	public QuestionnaireUser() {
	}

	/** minimal constructor */
	public QuestionnaireUser(String userName) {
		this.userName = userName;
	}

	/** full constructor */
	public QuestionnaireUser(String userName, String userPassword, String userPhone, String userMailAddress, Short userMailValidate, Timestamp registerTime,
			String userCommonet, Timestamp userMailValidateTime) {
		this.userName = userName;
		this.userPassword = userPassword;
		this.userPhone = userPhone;
		this.userMailAddress = userMailAddress;
		this.userMailValidate = userMailValidate;
		this.registerTime = registerTime;
		this.userCommonet = userCommonet;
		this.userMailValidateTime = userMailValidateTime;
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

	@Column(name = "user_name", nullable = false, length = 200)
	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Column(name = "user_password", length = 200)
	public String getUserPassword() {
		return this.userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	@Column(name = "user_phone", length = 50)
	public String getUserPhone() {
		return this.userPhone;
	}

	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}

	@Column(name = "user_mail_address", length = 50)
	public String getUserMailAddress() {
		return this.userMailAddress;
	}

	public void setUserMailAddress(String userMailAddress) {
		this.userMailAddress = userMailAddress;
	}

	@Column(name = "user_mail_validate")
	public Short getUserMailValidate() {
		return this.userMailValidate;
	}

	public void setUserMailValidate(Short userMailValidate) {
		this.userMailValidate = userMailValidate;
	}

	@Column(name = "register_time", length = 19)
	public Timestamp getRegisterTime() {
		return this.registerTime;
	}

	public void setRegisterTime(Timestamp registerTime) {
		this.registerTime = registerTime;
	}

	@Column(name = "user_commonet", length = 200)
	public String getUserCommonet() {
		return this.userCommonet;
	}

	public void setUserCommonet(String userCommonet) {
		this.userCommonet = userCommonet;
	}

	@Column(name = "user_mail_validate_time", length = 19)
	public Timestamp getUserMailValidateTime() {
		return this.userMailValidateTime;
	}

	public void setUserMailValidateTime(Timestamp userMailValidateTime) {
		this.userMailValidateTime = userMailValidateTime;
	}

}