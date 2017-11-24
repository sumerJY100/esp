<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/commonHead.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<jsp:include page="/common/commonJsAndCss.jsp"></jsp:include>
<script type="text/javascript" src="js/Highcharts-3.0.5/js/highcharts.js"></script>
<script type="text/javascript" src="js/ingrid/js/jquery.ingrid.js"></script>
<link rel="stylesheet" href="js/ingrid/css/ingrid.css" type="text/css" media="screen" />
<style type="text/css">
.paramTable {
	border-right: 1px solid black;
	border-top: 1px solid black;
}

.paramTable td,th {
	border-left: 1px solid black;
	border-bottom: 1px solid black;
	height: 30px;
}
.modeNameTd{
	font-weight:bold;
}
</style>
<script type="text/javascript">
    $(document).ready(function() {
	
    });
</script>
</head>

<body>
	<center>
		<jsp:include page="common/header.jsp"></jsp:include>
		<jsp:include page="common/commonMenu.jsp"></jsp:include>
		
		<table cellpadding=0 cellspacing=0 style="width:95%;height:500px;margin-top:30px;">
			<thead>
				<tr style="height:50px;">
					<th style="width:250px;">门限设置</th>
					<th style="width:250px;">控制开关</th>
					<th style="width:250px;">模式切换</th>
					<th style="width:250px;">说明</th>
				</tr>
			</thead>
			<tr>
				<td style="text-align:center;vertical-align:middle">
					上&nbsp;&nbsp;&nbsp;限:<input type="text"  style="width:50px;"/>MW		<br/>
					中上限:<input type="text"   style="width:50px;" />MW<br/>
					中下限:<input type="text"   style="width:50px;"/>MW<br/>
					下&nbsp;&nbsp;&nbsp;限:<input type="text"   style="width:50px;"/>MW<br/>
				</td>
				<td style="text-align:center">
					<input type="button" value="锅炉负荷控制开关" id="boilerLoadControllerBtn"/>
				</td>
				<td style="text-align:center;">
					<input type="button" value="模式一"/><br/>
					<input type="button" value="模式二"/><br/>
					<input type="button" value="模式三"/><br/>
					<input type="button" value="模式四"/><br/>
					<input type="button" value="模式五"/><br/>
				</td>
				<td style="text-align:right;vertical-align: bottom">
					模式一:	200MW	≤ 锅炉负荷		<br/>
					模式二:	200MW	≤ 锅炉负荷≤	300MW		<br/>
					模式三:	200MW	≤ 锅炉负荷≤	300MW		<br/>
					模式四:	200MW	≤ 锅炉负荷≤	300MW		<br/>
					模式五:			   锅炉负荷≤	300MW		<br/>
				</td>
			</tr>
		</table>
		<jsp:include page="common/alarmFotter.jsp"></jsp:include>
	</center>
</body>
</html>
