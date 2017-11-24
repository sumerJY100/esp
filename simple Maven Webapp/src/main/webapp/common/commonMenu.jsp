<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/commonHead.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP 'commonMenu.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<style type="text/css">
a {
	color: #000000;
	text-decoration: none;
}

a:link,a:visiteid {
	color: #000000;
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
	background: #b5cfd2 url('image/cell_grey.jpg');
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
<script type="text/javascript">
	$(document).ready(function() {
		var currentMenuIndex = $.url.param("pageMenuIndex");

		var locationHref = window.location.href;
		$(".menu_table a").each(function(i) {
			if ((i+1) == currentMenuIndex) {
				$(this).css("color", "white");
				$($(this).parent()).css("background", "url('image/cell_blue1.jpg')");
			} else {
				$(this).css("color", "black");
				$($(this).parent()).css("background", "url('image/cell_grey.jpg')");
			}
			var tempHref = $(this).attr("href");
			if (locationHref.indexOf(tempHref) != -1) {
			} else {

			}
		});
	});
</script>
</head>

<body style="margin:0">
	<c:if test="${user == null }">
		<input type="hidden" value="${ctx }" id="ctx" />
		<script type="text/javascript">
			var ctx = $("#ctx").val();
		</script>
	</c:if>

	<center>

		<!-- 		<div style="height:30px;text-align:right;width:1126px;"> -->
		<!-- 			${user.name }&nbsp;&nbsp;&nbsp;&nbsp;<a href="${ctx }/editUserPwd.do">修改密码</a> &nbsp;&nbsp;&nbsp;<a -->
		<!-- 				href="${ctx }/quit.do">退出</a> -->
		<!-- 		</div> -->
		<!-- 		<table class="menu_table" style="width:1126px" cellSpacing=0 cellPadding=0> -->
		<!-- 			<tr> -->
		<!-- 				<th><a href="${ctx }/home.do">高压监控</a></th> -->
		<!-- 				<th><a href="${ctx }/paramSet.do">参数设置</a></th> -->
		<!-- 				<th><a href="${ctx }/heater.do">加热</a></th> -->
		<!-- 				<th><a href="${ctx }/rapping.do">振打监控</a></th> -->
		<!-- 				<th><a href="${ctx }/hopperLevel.do">灰斗料位</a></th> -->
		<!-- 				<th><a href="${ctx }/linkState.do">系统状态</a></th> -->
		<!-- 				<th><a href="${ctx }/alarmRecord.do">报警记录</a></th> -->
		<!-- 				<th><a href="${ctx }/realTimeReporting.do">实时报表</a></th> -->
		<!-- 				<th><a href="${ctx }/historyCurve2.do">历史曲线</a></th> -->
		<!-- 				<th><a href="${ctx }/optimizationTips.do">优化建议</a></th> -->

		<!-- 			</tr> -->
		<!-- 		</table> -->
		<table class="menu_table" style="width:1126px" cellSpacing=0 cellPadding=0>
			<tr>
				<th><a href="${ctx }/home2.jsp?pageMenuIndex=1">高压监控</a></th>
				<th><a href="${ctx }/paramSet.do?pageMenuIndex=2">参数设置</a></th>
				<th><a href="${ctx }/heater2.jsp?pageMenuIndex=3">加热监控</a></th>
				<th><a href="${ctx }/rapping2.jsp?pageMenuIndex=4">振打监控</a></th>
				<th><a href="${ctx }/hopperLevel2.jsp?pageMenuIndex=5">灰斗料位</a></th>
				<th><a href="${ctx }/linkState2.jsp?pageMenuIndex=6">系统状态</a></th>
				<th><a href="${ctx }/alarmRecord.do?pageMenuIndex=7">报警记录</a></th>
				<th><a href="${ctx }/realTimeReporting.do?pageMenuIndex=8">实时报表</a></th>
				<th><a href="${ctx }/historyCurve.do?pageMenuIndex=9">历史曲线</a></th>
				<th><a href="${ctx }/optimizationTips.do?pageMenuIndex=10">优化建议</a></th>

			</tr>
		</table>
		<!-- 		<div> -->
		<!-- 			<a href="${ctx }/home2.jsp">高压画面1</a>&nbsp;&nbsp;  -->
		<!-- 			<a href="${ctx }/home3.jsp">高压画面2</a>&nbsp;&nbsp;  -->
		<!-- 			<a href="${ctx }/boilerLoadController.jsp">负荷参数2</a>&nbsp;&nbsp; -->
		<!-- 			<a href="${ctx }/boilerLoadControllerSet.jsp">负荷控制</a>&nbsp;&nbsp;  -->
		<!-- 			<a href="${ctx }/rapping2.jsp">振打2</a>&nbsp;&nbsp;  -->
		<!-- 			<a href="${ctx }/heater2.jsp">瓷套加热2</a>&nbsp;&nbsp;  -->
		<!-- 			<a href="${ctx }/hopperHeater2.jsp">灰斗加热2</a>&nbsp;&nbsp;  -->
		<!-- 			<a href="${ctx }/hopperLevel2.jsp">灰斗料位2</a>&nbsp;&nbsp;  -->
		<!-- 			<a href="${ctx }/linkState2.jsp">系统状态2</a>&nbsp;&nbsp; -->
		<!-- 			<a href="${ctx }/historyCurve2.do">历史曲线2</a>&nbsp;&nbsp; -->
		<!-- 			<a href="${ctx }/legend2.jsp">图例2</a>&nbsp;&nbsp; -->
		<!-- 		</div> -->
	</center>
</body>
</html>
