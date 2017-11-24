<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/commonHead.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<jsp:include page="/common/commonJsAndCss.jsp"></jsp:include>
<!-- highchart.js -->
<script type="text/javascript" src="js/Highcharts-3.0.5/js/highcharts.js"></script>
<!-- ingrid.js -->
<script type="text/javascript" src="js/ingrid/js/jquery.ingrid.js"></script>
<link rel="stylesheet" href="js/ingrid/css/ingrid.css" type="text/css" media="screen" />
<!-- svg.js -->
<script type="text/javascript" src="js/jquery.svg.js"></script>
<!-- <script type="text/javascript" src="js/home/home.js"></script> -->
<!-- <script type="text/javascript" src="js/home/homeForSvg2Dynamic.js"></script> -->
<script type="text/javascript" src="calculate/js/calculate.js"></script>
<!-- DWR -->
<script type='text/javascript' src='dwr/engine.js'></script>
<script type='text/javascript' src='dwr/util.js'></script>
<script type='text/javascript' src='dwr/interface/voltageAndCurrent.js'></script>
<style type="text/css">
.controllerForcer {
	font-size: 2;
	color: red;
}
</style>
<script type="text/javascript">
    $(document).ready(function() {

	
    });
</script>
</head>

<body>
	<center>
		<jsp:include page="../common/header.jsp"></jsp:include>
		<jsp:include page="../common/commonMenu.jsp"></jsp:include>
<!-- 		<div id="returnChartJsp" style="top:50px;left:10px;" class="jumpBtn">图表展示</div> -->
<!-- 		<div id="legendJsp" style="top:600px;right:10px;" class="jumpBtn">图例</div> -->
<!-- 		<div id="returnTohistoryReport" class="jumpBtn">历史报表</div> -->
		<!-- 		<table style="width:100%"> -->
		<!-- 			<tr> -->
		<!-- 				<td style="text-align:center;"> -->
		<!-- 					<span id="primary_div" style="width:45%;"></span> -->
		<!-- 				</td> -->
		<!-- 				<td style="text-align:center;"> -->
		<!-- 					<span id="secondery_div" style="width:45%"></span> -->
		<!-- 				</td> -->
		<!-- 			</tr> -->
		<!-- 		</table> -->
		<!-- 		<embed src="" height="300" width="100%" type="image/svg+xml" /> -->
		<div id="CalculateSvgDiv" style="height:600px;border:0px solid black;"></div>

		<jsp:include page="../common/alarmFotter.jsp"></jsp:include>
	</center>
</body>
</html>
