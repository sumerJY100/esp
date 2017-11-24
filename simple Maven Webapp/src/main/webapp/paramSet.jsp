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
.table {
	border-collapse: collapse;
	border-spacing: 0;
	/* 	border:1px solid black; */
}

.table td,.table th {
	padding: 0;
	border: 1px solid black;
}
</style>
<script type="text/javascript">
    $(document).ready(function() {
	$("td table tr").each(function(i, trObj) {
	    $(trObj).children().eq(0).css({
		"padding-left" : "10px",
		"background-color" : "#ffffff"
	    });
	    $(trObj).children().eq(0).css("width", "150px");
	    $(trObj).children().eq(9).css({
		"border-left" : "3px solid #000000"
	    });
	});

	initTableDataAndFunction();
// 	setInterval(freshTableReading,3000);
	function initTableDataAndFunction() {
	    initTableSet();
	    initTableReading();
	      
	}
	function freshTableReading(){
	    initTableSet();
	    initTableReading();
	}
	
	var nameArr = new Array();
	var idArr = new Array();
	var primaryCurrentSetArr = new Array();
	var secondCurrentSetArr = new Array();
	var secondVoltageSetArr = new Array();
	var sparkSetArr = new Array();
	var sparkSensitivitySetArr = new Array();
	var conductionAngleSetArr = new Array();
	function initTableSet() {
	    var url = ctx + "/getEpSetAndReadingsForParamSet.do";
	    $.get(url, function(setData) {
		for (var i = 0; i < setData.length; i++) {
		    nameArr[i] = setData[i].name;
		    idArr[i] = setData[i].id;
		    primaryCurrentSetArr[i] = setData[i].primaryCurentSet;
		    secondCurrentSetArr[i] = setData[i].secondaryCurrentSet;
		    secondVoltageSetArr[i] = setData[i].secondaryVoltageSet;
		    sparkSetArr[i] = setData[i].sparkSet;
		    sparkSensitivitySetArr[i] = setData[i].sparkSensitivitySet;
		    conductionAngleSetArr[i] = setData[i].conductionAngleSet;
		}
		setTrDataByInput("firstCurrentSetTr", primaryCurrentSetArr, nameArr, idArr, "primaryCurrentSet");
		setTrDataByInput("secondCurrentSetTr", secondCurrentSetArr, nameArr, idArr, "secondCurrentSet");
		setTrDataByInput("secondVoltagetSetTr", secondVoltageSetArr, nameArr, idArr, "secondVoltageSet");
		setTrDataByInput("sparkSetTr", sparkSetArr, nameArr, idArr, "sparkSet");
		setTrDataByInput("sparkSensitivitySetTr", sparkSensitivitySetArr, nameArr, idArr, "sparkSensitivitySet");
		setTrDataByInput("conductionAngleSetTr", conductionAngleSetArr, nameArr, idArr, "conductionAngleSet");
	    });
	}
	function setTrDataByInput(trId, dataArr, nameArr, idArr, attrName) {
	    var $tr = $("#" + trId);
	    var tdChild = $tr.children();
	    for (var i = 1; i < tdChild.length; i++) {
		$(tdChild[i]).css("text-align", "center");
		var $input = $("<input style='width:40px;height:30px;text-align:center;' readonly='readonly' type='text' id='ep_"+attrName+"_"+idArr[i-1]+"' value='"+dataArr[i-1]+"'/>");
		$input.bind("click", showInputWindow);
		$(tdChild[i]).append($input);
	    }
	}
	function showInputWindow() {
	    var $input = $(this);
	    var epId = $input.attr("id").split("_")[2];
	    var attrName = $input.attr("id").split("_")[1];
	    var returnValue = window.prompt("请输入设定值", $input.val());
	    if (null != returnValue) {
		var url = ctx + "/saveOrUpdateEp.do?ep.id=" + epId + "&ep." + attrName + "=" + returnValue;
		$.get(url, function() {
		    $input.val(returnValue);
		});
	    }
	}
	var primaryCurrentReadingArr = new Array();
	var primaryVoltageReadingArr = new Array();
	var secondCurrentReadingArr = new Array();
	var secondVoltageReadingArr = new Array();
	var secondVoltagePeakReadingArr = new Array();
	var sparkReadingArr = new Array();
	function initTableReading() {
	    var url = ctx + "/getEpRealTimeValuesForParamSet.do";
	    $.get(url, function(readData) {
		for (var i = 0; i < readData.length; i++) {
		    primaryCurrentReadingArr[i] = readData[i].primaryCurrent;
		    primaryVoltageReadingArr[i] = readData[i].primaryVoltage;
		    secondCurrentReadingArr[i] = readData[i].secondaryCurrent;
		    secondVoltageReadingArr[i] = readData[i].secondaryVoltage;
		    secondVoltagePeakReadingArr[i] = readData[i].secondaryVolatgePeak;
		    sparkReadingArr[i] = readData[i].spark;
		}
		setTrDataByText("firstVoltageReadingTr", primaryCurrentReadingArr, nameArr, idArr);
		setTrDataByText("firstCurrentReadingTr", primaryVoltageReadingArr, nameArr, idArr);
		setTrDataByText("secondVoltageReadingTr", secondCurrentReadingArr, nameArr, idArr);
		setTrDataByText("secondVoltagePeakReadingTr", secondVoltageReadingArr, nameArr, idArr);
		setTrDataByText("secondCurentReadingTr", secondVoltagePeakReadingArr, nameArr, idArr);
		setTrDataByText("sparkReadingTr", sparkReadingArr, nameArr, idArr);
	    });
	}
	function setTrDataByText(trId, dataArr, nameArr, idArr) {
	    var $tr = $("#" + trId);
	    var tdChild = $tr.children();
	    for (var i = 1; i < tdChild.length; i++) {
		$(tdChild[i]).css("text-align", "center");
		$(tdChild[i]).append(dataArr[i - 1]);
	    }
	}
    });
</script>
</head>

<body>
	<center>
		<jsp:include page="common/header.jsp"></jsp:include>
		<jsp:include page="common/commonMenu.jsp"></jsp:include>
		<div id="returnBEJsp" style="top:50px;left:10px;" class="jumpBtn">负荷控制</div>
		<table style="width:100%;height:600px;">
			<tr>
				<td style="text-align:center;border:none">
					<center>
						<table class="table" style="height:290px;width:80%;">
							<tr id="nameTr">
								<th></th>
								<th>3A11</th>
								<th>3A12</th>
								<th>3A21</th>
								<th>3A22</th>
								<th>3A31</th>
								<th>3A32</th>
								<th>3A41</th>
								<th>3A42</th>
								<th>3B11</th>
								<th>3B12</th>
								<th>3B21</th>
								<th>3B22</th>
								<th>3B31</th>
								<th>3B32</th>
								<th>3B41</th>
								<th>3B42</th>
							</tr>


							<tr id="firstCurrentSetTr">
								<td>一次电流设置</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr id="secondCurrentSetTr">
								<td>二次脉冲电流设置</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr id="secondVoltagetSetTr">
								<td>二次电压峰值</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr id="sparkSetTr">
								<td>火花率设置</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr id="sparkSensitivitySetTr">
								<td>火花灵敏度</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr id="conductionAngleSetTr">
								<td>导通角设置</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</table>
					</center>
				</td>
			</tr>
			<tr>
				<td style="align:center;border:none;">
					<center>
						<table class="table" style="height:290px;width:80%;">
							<tr>
								<th>控制器读数</th>
								<th>3A11</th>
								<th>3A12</th>
								<th>3A21</th>
								<th>3A22</th>
								<th>3A31</th>
								<th>3A32</th>
								<th>3A41</th>
								<th>3A42</th>
								<th>3B11</th>
								<th>3B12</th>
								<th>3B21</th>
								<th>3B22</th>
								<th>3B31</th>
								<th>3B32</th>
								<th>3B41</th>
								<th>3B42</th>
							</tr>
							<tr id="firstVoltageReadingTr">
								<td>一次电压</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr id="firstCurrentReadingTr">
								<td>一次电流</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr id="secondVoltageReadingTr">
								<td>二次电压</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr id="secondVoltagePeakReadingTr">
								<td>二次电压峰值</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr id="secondCurentReadingTr">
								<td>二次电流</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>


							<tr id="sparkReadingTr">
								<td>火花率</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</table>
					</center>
				</td>
			</tr>
		</table>

		<jsp:include page="common/alarmFotter.jsp"></jsp:include>
	</center>
</body>
</html>
