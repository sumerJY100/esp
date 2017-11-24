<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/commonHead.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<jsp:include page="/common/commonJsAndCss.jsp"></jsp:include>
<!-- highchart.js -->
<script type="text/javascript" src="js/Highstock-2.0.3/js/highstock.js"></script>
<!-- <script type="text/javascript" src="js/Highcharts-3.0.5/js/highcharts.js"></script> -->
<script type="text/javascript" src="historyCurve/historyCurveTempData.js"></script>
<!-- ingrid.js -->
<script type="text/javascript" src="js/ingrid/js/jquery.ingrid.js"></script>
<script type="text/javascript" src="js/My97DatePicker/My97DatePicker/WdatePicker.js"></script>

<script type="text/javascript" src="historyCurve/historyCurve2.js"></script>
<link rel="stylesheet" href="js/ingrid/css/ingrid.css" type="text/css" media="screen" />


<style type="text/css">
.controllerForcer {
	font-size: 2;
	color: red;
}
</style>
<script type="text/javascript">
    $(function() {
	$("#queryHistoryReportBtn").bind("click", function() {
	    var epId = $("#epId").val();
	    var attrName = $("#attrSelect").val();
	    var beginTime = $("#queryHistoryTimePickerInputForBegin").val();
	    var endTime = $("#queryHistoryTimePickerInputForEnd").val();
	    var newSeriesName = $("#epId").children(":selected").html() + "-" + $("#attrSelect").children(":selected").html();
	    var series = chart.series;
	    for (var i = 0; i < series.length; i++) {
		if (series[i].name == newSeriesName) {
		    alert("数据存在");
		    break;
		    return;
		}

	    }
	    var url = ctx + "/getQueryDataFromEpHistory.do";
	    var sendData = {
		epId : epId,
		queryPropertyName : attrName,
		queryBeginTime : beginTime,
		queryEndTime : endTime
	    };
	    $.get(url, sendData, function(returnData) {
		chart.addSeries({
		    name : newSeriesName,
		    data : returnData
		});
	    });
	});
	
    });
</script>
</head>

<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<jsp:include page="/common/commonMenu.jsp"></jsp:include>
	<center>

		<div id="queryDiv" style="min-width:700px;height:50px;width:1127px;padding-top:30px;">
			&nbsp;&nbsp;&nbsp;
			<s:select list="#request.epList" listKey="id" listValue="name" id="epId" style="font-size:18px;height:25px;width:80px;text-align:center;"></s:select>
			&nbsp;&nbsp;&nbsp;
			<s:select list="#{'primaryVoltage':'一次电压','primaryCurrent':'一次电流','secondVoltage':'二次电压','secondCurrent':'二次电流'} " style="font-size:18px;height:25px;font-weight:bold;text-align:center;width:120px;" listKey="key" listValue="value" id="attrSelect"></s:select>
			&nbsp;&nbsp;&nbsp; 
			<input id="queryHistoryTimePickerInputForBegin" class="Wdate" type="text" style="font-size:18px;height:25px;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})">
			结束时间:
			<input id="queryHistoryTimePickerInputForEnd" class="Wdate" type="text" style="font-size:18px;height:25px;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})">
			<font id="queryHistoryReportBtn" color=black style="cursor:pointer;font-weight:bold">&nbsp;查询</font>
		</div>
		<div id="containerDiv" style="min-width:700px;height:550px;width:1127px;"></div>


		<jsp:include page="/common/alarmFotter.jsp"></jsp:include>
	</center>
</body>
</html>
