<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/commonHead.jsp"%>
<style type="text/css">
a {
	text-decoration: none;
}

a:link,a:visiteid {
	color: #FF0000;
	text-decoration: none;
}

a:hover,a:active {
	color: #000000;
	text-decoration: none;
}

.menu_table {
	font-family: verdana, arial, sans-serif;
	font-size: 14px;
	color: #333333;
	border-width: 1px;
	border-color: #999999;
	border-collapse: collapse;
}

.menu_table th {
	background: #b5cfd2 url('image/cell_blue.jpg');
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color: #999999;
}

.menu_table td {
	background: #D9FFFF url('cell-grey.jpg');
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color: #999999;
}
</style>


<jsp:include page="/common/header.jsp"></jsp:include>
<center>
	<div style="height:30px;text-align:right;width:80%;">
		${user.name }&nbsp;&nbsp;&nbsp;&nbsp;<a href="${ctx }/editUserPwd.do">修改密码</a> &nbsp;&nbsp;&nbsp;<a
			href="${ctx }/quit.do">退出</a>
	</div>

	<table class='menu_table'    style="width:80%" cellSpacing=0 cellPadding=0>
		<tr>
			<th style="height:30px;"><a href="${ctx }/adminTaskIndex.do">首页</a></th>
			<th style=""><a href="${ctx }/managerUser.do">用户管理</a></th>
			<th style=""><a href="${ctx }/managerDepartment.do">部门管理</a></th>
			<th><a href="${ctx }/showAdminTaskList.do?requestType=running">进行中的任务</a></th>
			<th><a href="${ctx }/showAdminTaskList.do?requestType=waitingConfirm">等待确认的任务</a></th>
			<th><a href="${ctx }/showAdminTaskList.do?requestType=waitingAssesspt">等待验收的任务</a></th>
			<th><a href="${ctx }/showAdminTaskList.do?requestType=finished">已完成的任务</a></th>
			
		</tr>
	</table>
</center>

