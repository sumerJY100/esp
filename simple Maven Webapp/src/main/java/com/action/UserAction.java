package com.action;

import java.io.Serializable;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import base.action.BaseAction;

import com.manager.UserManager;
import com.opensymphony.xwork2.Action;
import com.pojo.User;

@SuppressWarnings("serial")
@Controller
@Scope("prototype")
public class UserAction extends BaseAction implements Serializable {

	@Resource
	private UserManager userManager;

	private User user;
	private List<User> userList;
	/**
	 * 登录，登录成功进入首页，失败返回登录页面
	 * @return
	 */
	public String login(){
//		User u = userManager.login(this.user);
		User u = this.user;
		if(null != u){
			if(u.getLoginName().equals("admin") && u.getLongPwd().equals("admin")){
//				System.out.println("u:" + u);
				getSession().put("user", u);
				return "success";
			}else{
				return "fail";
			}
		}else{
			this.getRequest().setAttribute("message", "用户名或者密码错误!");
			return "fail";
		}
	}
	/**
	 * 跳转到首页面
	 * @return
	 */
	public String showHome(){
		return "success";
	}
	public String showHome2(){
		return Action.SUCCESS;
	}
	/**
	 * 参数设置
	 * @return
	 */
	public String paramSet(){
		return "success";
	}
	/**
	 * 加热
	 * @return
	 */
	public String heater(){
		return "success";
	}
	/**
	 * 振打
	 * @return
	 */
	public String rapping(){
		return "success";
	}
	/**
	 * 料位计
	 * @return
	 */
	public String hopperLevel(){
		return "success";
	}
	/**
	 * 系统连接状态
	 * @return
	 */
	public String linkState(){
		return "success";
	}
	/**
	 * 告警日志
	 * @return
	 */
	public String alarmRecord(){
//		System.out.println("page location:" + this.getRequest().getParameter("page"));
		return "success";
	}
	/**
	 * 实时报表
	 * @return
	 */
	public String realTimeReporting(){
		return "success";
	}
	/**
	 * 历史报表
	 * @return
	 */
	public String historyReporting(){
		return "success";
	}
	/**
	 * 优化建议
	 * @return
	 */
	public String optimizationTips(){
		
		return "success";
	}
	/***********************************************************************************************************/
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public List<User> getUserList() {
		return userList;
	}
	public void setUserList(List<User> userList) {
		this.userList = userList;
	}

	
}
