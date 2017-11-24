package com.action;

import java.io.Serializable;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import base.action.BaseAction;

import com.manager.EpManager;

@SuppressWarnings("serial")
@Controller
@Scope("prototype")
public class LowAlarmAction extends BaseAction implements Serializable {

	@Resource
	private EpManager epManager;

	

	
}
