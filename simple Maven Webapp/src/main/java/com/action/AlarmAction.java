package com.action;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import base.action.BaseAction;

import com.manager.AlarmManager;

@SuppressWarnings("serial")
@Controller
@Scope("prototype")
public class AlarmAction extends BaseAction{
	
	@Resource
	private AlarmManager alarmManager;
	
	/**
	 * 显示最近的告警记录
	 */
	public void showLatestAlarmLog(){
		HttpServletResponse response = this.getResponse();
		try {
			response.setContentType("text/html");
			response.getWriter().write(alarmManager.showLatestAlarmLog());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public void showAllAlarmLog(){
//		System.out.println("page:" + this.getRequest().getParameter("page"));
		HttpServletResponse response = this.getResponse();
		try {
			response.setContentType("text/html");
			response.getWriter().write(alarmManager.showAllAlarmLog());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
