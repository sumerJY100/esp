<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/commonHead.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<jsp:include page="/common/commonJsAndCss.jsp"></jsp:include>

<!-- ingrid.js -->
<script type="text/javascript" src="js/ingrid/js/jquery.ingrid.js"></script>
<link rel="stylesheet" href="js/ingrid/css/ingrid.css" type="text/css" media="screen" />
<script type="text/javascript" src="admin/js/rapper.js"></script>

<style type="text/css">
.controllerForcer {
	font-size: 2;
	color: red;
}
</style>
<script type="text/javascript">
	
</script>
</head>

<body>
	<center>
		<jsp:include page="/common/header.jsp"></jsp:include>
		<jsp:include page="/common/commonMenu.jsp"></jsp:include>
		<div style="padding-top:15px;">
			<jsp:include page="/admin/common/commonMenu.jsp"></jsp:include>
		</div>
		<div style="padding-top:20px;">
			<div style="margin-top:20px;">
				<span><font style="clear:both">Rapper</font> </span>
				<input id="addEpBtn" type="button" style="float:right" value="添加" /> 
				<input type="button" value="阳极" id="anodeQueryBtn" /> <input
					type="button" value="阴极" id="cathodeQueryBtn" />
			</div>
			<table style="width:100%;" id="epTable">
				<thead>
					<tr>
						<th>编号</th>
						<th>名称</th>
						<th>类型</th>
						<th>运行状态</th>
						<th>告警状态</th>
						<th>通讯状态</th>
						<th>运行方式</th>
						<th>开始时间</th>
						<th>运行时间</th>
						<th>等待时间</th>
						<th>关联EPEP</th>
						<th>低压连接设备</th>

						<th>修改</th>
						<th>删除</th>
					</tr>
				<thead>
				<tbody>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>

				</tbody>
			</table>
		</div>

		<!-- 		<embed src="" height="300" width="100%" type="image/svg+xml" /> -->
		<!-- 		<div id="homeSvgDiv" style="height:300px;"></div> -->
		<jsp:include page="/common/alarmFotter.jsp"></jsp:include>
	</center>
</body>
</html>
