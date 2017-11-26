<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/commonHead.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<jsp:include page="/common/commonJsAndCss.jsp"></jsp:include>
<!-- highchart.js -->
<script type="text/javascript" src="js/Highcharts-3.0.10/js/highcharts.js"></script>
<!-- ingrid.js -->
<script type="text/javascript" src="js/ingrid/js/jquery.ingrid.js"></script>
<link rel="stylesheet" href="js/ingrid/css/ingrid.css" type="text/css" media="screen" />
<!-- svg.js -->
<script type="text/javascript" src="js/jquery.svg.js"></script>
<script type="text/javascript" src="js/home/home3.js"></script>
<!-- <script type="text/javascript" src="js/home/homeForSvg.js"></script> -->
<!-- DWR -->
<script type='text/javascript' src='dwr/engine.js'></script>
<script type='text/javascript' src='dwr/util.js'></script>
<script type='text/javascript' src='dwr/interface/voltageAndCurrent.js'></script>
<style type="text/css">
.controllerForcer {
	font-size: 2;
	color: red;
}
.barTd{
	border:1px solid black;
}
</style>
<script type="text/javascript">
    $(document).ready(function() {
	$("#freshChartBtn").bind("click",freshChartTemp);

    });
</script>
</head>

<body>
	<center>
		<jsp:include page="common/header.jsp"></jsp:include>
		<jsp:include page="common/commonMenu.jsp"></jsp:include>
		<div id="returnPicJsp" style="top:50px;left:10px;" class="jumpBtn">图形展示</div>
		<table style="width:90%;margin-top:10px;" cellpadding=0 cellspacing=0>
			<tr>
				<td style="text-align:center;" class="barTd">
					<span id="primaryCurrent_div" ></span>
				</td>
				<td style="text-align:center;" class="barTd">
					<span id="primaryVoltage_div" ></span>
				</td>
			</tr>
			<tr>
				<td style="text-align:center;" class="barTd">
					<span id="seconderyCurrent_div" style="width:45%;"></span>
				</td>
				<td style="text-align:center;" class="barTd">
					<span id="seconderyVoltage_div" style="width:45%"></span>
				</td>
			</tr>
		</table>
		<!-- 		<embed src="" height="300" width="100%" type="image/svg+xml" /> -->
		<!-- 		<div id="homeSvgDiv" style="height:300px;border:1px solid black;"></div> -->
		<jsp:include page="common/alarmFotter.jsp"></jsp:include>
	</center>
</body>
</html>
