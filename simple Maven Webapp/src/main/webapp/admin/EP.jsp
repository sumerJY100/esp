<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/commonHead.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<jsp:include page="/common/commonJsAndCss.jsp"></jsp:include>

<!-- ingrid.js -->
<script type="text/javascript" src="js/ingrid/js/jquery.ingrid.js"></script>
<script type="text/javascript" src="admin/js/ep.js"></script>
<link rel="stylesheet" href="js/ingrid/css/ingrid.css" type="text/css" media="screen" />


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
			<!-- 			<input type="text" style="clear:both"/> -->
			<font style="clear:both;">EP</font> <input id="addEpBtn" type="button" style="float:right" value="添加" />
		</div>
		<input type="button" id="testBtn" value="test" />
		<div style="padding-top:20px;">
			<table style="width:80%;" id="epTable">
				<thead>

					<tr>
						<th>编号</th>
						<th>名称</th>
						<th>状态</th>
						<th>通讯</th>
						<th>故障</th>
						<th>一次电流</th>
						<th>一次电压</th>
						<th>二次电流</th>
						<th>二次电压</th>
						<th>火花率</th>
						<th>位置</th>
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
