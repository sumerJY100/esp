package com.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * UserTable entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "user_table", catalog = "esp")
public class User extends base.pojo.BasePojo implements java.io.Serializable {

	// Fields

	private Integer id;
	private String num;
	private String name;
	private String loginName;
	private String longPwd;
	private Integer state;

	// Constructors

	/** default constructor */
	public User() {
	}

	/** full constructor */
	public User(String num, String name, String loginName, String longPwd, Integer state) {
		this.num = num;
		this.name = name;
		this.loginName = loginName;
		this.longPwd = longPwd;
		this.state = state;
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

	@Column(name = "num", length = 20)
	public String getNum() {
		return this.num;
	}

	public void setNum(String num) {
		this.num = num;
	}

	@Column(name = "name", length = 50)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "login_name", length = 50)
	public String getLoginName() {
		return this.loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	@Column(name = "long_pwd", length = 50)
	public String getLongPwd() {
		return this.longPwd;
	}

	public void setLongPwd(String longPwd) {
		this.longPwd = longPwd;
	}

	@Column(name = "state")
	public Integer getState() {
		return this.state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

}