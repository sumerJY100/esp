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
<script type="text/javascript" src="js/report/historyReport/historyReport.js"></script>
<script type="text/javascript" src="js/My97DatePicker/My97DatePicker/WdatePicker.js"></script>
<style type="text/css">
.controllerForcer {
	font-size: 2;
	color: red;
}

#container td,th {
	border: 1px solid black;
}

#container table {
	border-spacing: 0;
	border-collapse: collapse;
}
</style>
<script type="text/javascript">
    $(function() {
	initTable();

	$("td").has("table").css("border", "0px");
	$("#queryHistoryReportBtn").bind("click", function() {
	    var timePickerValue = $("#queryHistoryTimePickerInput").val();
	    if (timePickerValue.trim().length > 0) {
		var url = ctx + "/findAllEpForHistoryReport.do";
		$.get(url, function(epList) {
		    var map = new Map();
		    for (var i = 0; i < epList.length; i++) {
			var getEpHistoryDataUrl = ctx + "/findEpOneDayHistoryForHistoryReport.do?queryDay=" + timePickerValue + "&epId=" + epList[i].id;
			map.put(epList[i].id, epArr[i]);
			$.get(getEpHistoryDataUrl, function(epHistoryData) {
			    //遍历数据
			    var epHistoryTable = map.get(epHistoryData.epId);
			    freshDataByEpHistoryJson(epHistoryTable, epHistoryData.epHistoryList);
			});
		    }
		});
	    }
	});
	function freshDataByEpHistoryJson(historyTable, epHistoryListJson) {
	    for (var i = 0; i < epHistoryListJson.length; i++) {
		historyTable.i1Array[i] = epHistoryListJson[i].primaryCurrent;
		historyTable.u1Array[i] = epHistoryListJson[i].primaryVoltage;
		historyTable.u2Array[i] = epHistoryListJson[i].secondCurrent;
		historyTable.i2Array[i] = epHistoryListJson[i].secondVoltage;
	    }
	    initOneHistoryTable(historyTable);
	}
    });
</script>
</head>

<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<jsp:include page="/common/commonMenu.jsp"></jsp:include>
	<center>
		<!-- 		<div id="returnToRealReport" style="position:absolute;top:100px;right:150px;border:1px solid black;cursor:pointer;">实时报表</div> -->
		<div id="returnToRealReport" style="top:70px;right:60px;" class="jumpBtn">实时报表</div>
		<div id="queryDiv" style="position:absolute;top:70px;right:150px;border:0px solid black;cursor:pointer;">
			<input id="queryHistoryTimePickerInput" class="Wdate" type="text" style="font-size:18px;height:25px;" onClick="WdatePicker()">
			<font id="queryHistoryReportBtn" color=black style="font-weight:bold;border:0px solid black;">&nbsp;查询</font>
		</div>
		<div id="container" style="width:1127px;">
			<table style="border-bottom:1px solid black;width:100%;">
				<tr>

					<th style="height:60px;border:0px;">历史报表</th>
				</tr>
			</table>
			<div style="height:550px;overflow:auto; ">
				<table id="historyTable">

				</table>
			</div>
		</div>


		<jsp:include page="/common/alarmFotter.jsp"></jsp:include>
	</center>
</body>
</html>
