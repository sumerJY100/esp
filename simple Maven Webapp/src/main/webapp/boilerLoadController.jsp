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
	height: 10px;
}

.modeNameTd {
	font-weight: bold;
}
</style>
<script type="text/javascript">
    $(document).ready(function() {
	var I2SettingUpperLimiter = 1700;
	var I2SettingLowwerLimiter = 0;
	var U2SettingUpperLimiter = 70;
	var U2SettingLowerLimiter = 0;
	var SparkSettingUpperLimiter = 40;
	var SparkSetttingLowwerLimiter = 0;
	$("#attrTr ,#attrTrForSecondLevel").children().each(function(i) {
	    $(this).css("font-size", "12").css("font-weight", "bold").css("text-align", "center");
	});

	$("[id^=setValue]").bind("click", {
	    upperLimit : 600,
	    lowwerLimmit : 200
	}, showInputWindow);

	function ESPForMode() {
	    ESPForMode.prototype.name = "";
	    ESPForMode.prototype.mode1 = new ESPMode(1700, 70, 40);
	    ESPForMode.prototype.mode2 = new ESPMode(1700, 70, 40);
	    ESPForMode.prototype.mode3 = new ESPMode(1700, 70, 40);
	    ESPForMode.prototype.mode4 = new ESPMode(1700, 70, 40);
	    ESPForMode.prototype.mode5 = new ESPMode(1700, 70, 40);
	}
	function ESPMode(I2, U2, Spark) {
	    this.I2SettingValue = I2;
	    this.U2SettingValue = U2;
	    this.SparkSettingValue = Spark;
	}

	var titles = new Array('1A11', '1A12', '1A13', '1A14', '1A15', '1A21', '1A22', '1A23', '1A24', '1A25', '1B11', '1B12', '1B13', '1B14', '1B15', '1B21', '1B22', '1B23', '1B24', '1B25');
	var ESPForModeArray = new Array(20);
	for (var i = 0; i < 20; i++) {
	    var tempEspForMode = new ESPForMode();
	    tempEspForMode.name = titles[i];
	    ESPForModeArray[i] = tempEspForMode;
	}
	function showInputWindow(event) {
	    var $input = $(this);
	    // 	    var epId = $input.attr("id").split("_")[2];
	    // 	    var attrName = $input.attr("id").split("_")[1];
	    var tipString = "请输入设定值(上限" + event.data.upperLimit + ",下限:" + event.data.lowwerLimmit + "):";
	    var returnValue = window.prompt(tipString, $input.val());
	    if (null != returnValue) {
		// 		var url = ctx + "/saveOrUpdateEp.do?ep.id=" + epId + "&ep." + attrName + "=" + returnValue;
		// 		$.get(url, function() {
		// 		    $input.val(returnValue);
		// 		});

		$input.val(returnValue);
	    }
	}
	function addNewTdInMode($tr, espMode) {
	    var $newTd = $("<td></td>");
	    $newTd.css("text-align", "center");
	    var $I2Input = $("<input type='text' id='' value='"+espMode.I2SettingValue+"'/>");
	    $I2Input.css("width", "35px").css("text-align", "center").css("font-size", "12");
	    $I2Input.bind("click", {
		upperLimit : I2SettingUpperLimiter,
		lowwerLimmit : I2SettingLowwerLimiter
	    }, showInputWindow);
	    $newTd.append($I2Input);
	    $newTd.append("/");
	    var $U2Input = $("<input type='text' id='' value='"+espMode.U2SettingValue+"'/>");
	    $U2Input.css("width", "25px").css("text-align", "center").css("font-size", "12");
	    $U2Input.bind("click", {
		upperLimit : U2SettingUpperLimiter,
		lowwerLimmit : U2SettingLowerLimiter
	    }, showInputWindow);
	    $newTd.append($U2Input);
	    $newTd.append("/");
	    var $SparkInput = $("<input type='text' id='' value='"+espMode.SparkSettingValue+"'/>");
	    $SparkInput.css("width", "25px").css("text-align", "center").css("font-size", "12");
	    $SparkInput.bind("click", {
		upperLimit : SparkSettingUpperLimiter,
		lowwerLimmit : SparkSetttingLowwerLimiter
	    }, showInputWindow);
	    $newTd.append($SparkInput);
	    $tr.append($newTd);
	}
	//实例化表格
	var $firstModeSetTr = $("#firstModeSetTr");
	var $secondModeSetTr = $("#secondModeSetTr");
	var $thirdModeSetTr = $("#thirdModeSetTr");
	var $forthModeSetTr = $("#forthModeSetTr");
	var $fifthModeSetTr = $("#fifthModeSetTr");
	var $secondLevelfirstModeSetTr = $("#firstModeSetTrForSecondLevel");
	var $secondLevelsecondModeSetTr = $("#secondModeSetTrForSecondLevel");
	var $secondLevelthirdModeSetTr = $("#thirdModeSetTrForSecondLevel");
	var $secondLevelforthModeSetTr = $("#forthModeSetTrForSecondLevel");
	var $secondLevelfifthModeSetTr = $("#fifthModeSetTrForSecondLevel");
	var $secondLevelnameTr = $("#nameTrForSecondLevel");
	var $nameTr = $("#nameTr");
	for (var i = 0; i < 10; i++) {
	    $nameTr.children(":eq(" + (i + 1) + ")").html(ESPForModeArray[i].name);
	    addNewTdInMode($firstModeSetTr, ESPForModeArray[i].mode1);
	    addNewTdInMode($secondModeSetTr, ESPForModeArray[i].mode2);
	    addNewTdInMode($thirdModeSetTr, ESPForModeArray[i].mode3);
	    addNewTdInMode($forthModeSetTr, ESPForModeArray[i].mode4);
	    addNewTdInMode($fifthModeSetTr, ESPForModeArray[i].mode5);
	}
	for (var i = 10; i < 20; i++) {
	    $secondLevelnameTr.children(":eq(" + (i - 10 + 1) + ")").html(ESPForModeArray[i].name);
	    addNewTdInMode($secondLevelfirstModeSetTr, ESPForModeArray[i].mode1);
	    addNewTdInMode($secondLevelsecondModeSetTr, ESPForModeArray[i].mode2);
	    addNewTdInMode($secondLevelthirdModeSetTr, ESPForModeArray[i].mode3);
	    addNewTdInMode($secondLevelforthModeSetTr, ESPForModeArray[i].mode4);
	    addNewTdInMode($secondLevelfifthModeSetTr, ESPForModeArray[i].mode5);
	}

    });
</script>
</head>

<body>
	<center>
		<jsp:include page="common/header.jsp"></jsp:include>
		<jsp:include page="common/commonMenu.jsp"></jsp:include>
		<div id="returnParamSetJsp" style="top:50px;left:10px;" class="jumpBtn">参数设置</div>
		<table style="width:100%;height:600px;border:0px;" class="paramTable" cellpadding=0 cellspacing=0>
			<tr style="">
				<td style="border:0px;text-align:center;">
					<center>
						<table cellpadding=0 cellspacing=0 style="width:80%;border-top:1px solid black;border-right:1px solid black">
							<tr style="">
								<th style="width:30%;">门限设置</th>
								<th style="width:15%;">控制开关</th>
								<th style="width:35%;">模式切换</th>
								<th style="width:20%;">说明</th>
							</tr>
							<tr>
								<td style="text-align:center;vertical-align:middle">
									上&nbsp;&nbsp;&nbsp;限:
									<input type="text" style="width:50px;" id="setValueUpper" />
									MW <br /> 中上限:
									<input type="text" style="width:50px;" id="setValueMiddleUpper" />
									MW<br /> 中下限:
									<input type="text" style="width:50px;" id="setValueMiddelLower" />
									MW<br /> 下&nbsp;&nbsp;&nbsp;限:
									<input type="text" style="width:50px;" id="setValueLower" />
									MW<br />
								</td>
								<td style="text-align:center">
									运行中 <br /> <br />
									<input type="button" value="负荷控制开关" id="boilerLoadControllerBtn" />
								</td>
								<td style="text-align:center;font-size:12">
									<input type="button" value="模式一" />
									<!-- 								<br /> -->
									<input type="button" value="模式二" />
									<!-- 								<br /> -->
									<input type="button" value="模式三" />
									<!-- 									<br /> -->
									<input type="button" value="模式四" />
									<!-- 								<br /> -->
									<input type="button" value="模式五" />
									<!-- 									<br /> -->
								</td>
								<td style="text-align:right;vertical-align: bottom;font-size:12">
									模式一: 200MW ≤ 锅炉负荷&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> 模式二: 200MW ≤ 锅炉负荷≤ 300MW <br /> 模式三: 200MW ≤ 锅炉负荷≤ 300MW <br /> 模式四: 200MW ≤ 锅炉负荷≤ 300MW <br /> 模式五: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 锅炉负荷≤ 300MW <br />
								</td>
							</tr>
						</table>
					</center>
				</td>
			</tr>
			<tr>
				<td style="text-align:center;border:none">
					<center>
						<table class="paramTable" style="height:200px;width:80%;" cellpadding=0 cellspacing=0>

							<tr id="attrTr">
								<td></td>
								<td>&nbsp;I2&nbsp;/&nbsp;U2&nbsp;/火花率</td>
								<td>&nbsp;I2&nbsp;/&nbsp;U2&nbsp;/火花率</td>
								<td>&nbsp;I2&nbsp;/&nbsp;U2&nbsp;/火花率</td>
								<td>&nbsp;I2&nbsp;/&nbsp;U2&nbsp;/火花率</td>
								<td>&nbsp;I2&nbsp;/&nbsp;U2&nbsp;/火花率</td>
								<td>&nbsp;I2&nbsp;/&nbsp;U2&nbsp;/火花率</td>
								<td>&nbsp;I2&nbsp;/&nbsp;U2&nbsp;/火花率</td>
								<td>&nbsp;I2&nbsp;/&nbsp;U2&nbsp;/火花率</td>
								<td>&nbsp;I2&nbsp;/&nbsp;U2&nbsp;/火花率</td>
								<td>&nbsp;I2&nbsp;/&nbsp;U2&nbsp;/火花率</td>
							</tr>
							<tr id="nameTr" style="height:15px">
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
							</tr>
							<tr id="firstModeSetTr">
								<td class="modeNameTd">模式一</td>
							</tr>
							<tr id="secondModeSetTr">
								<td class="modeNameTd">模式二</td>
							</tr>
							<tr id="thirdModeSetTr">
								<td class="modeNameTd">模式三</td>
							</tr>
							<tr id="forthModeSetTr">
								<td class="modeNameTd">模式四</td>
							</tr>
							<tr id="fifthModeSetTr">
								<td class="modeNameTd">模式五</td>
							</tr>

						</table>
					</center>
				</td>
			</tr>
			<tr>
				<td style="align:center;border:none;">
					<center>
						<table class="paramTable" style="height:200px;width:80%;" cellpadding=0 cellspacing=0>
							<tr id="nameTrForSecondLevel" style="height:10px">
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
							</tr>


							<tr id="firstModeSetTrForSecondLevel">
								<td class="modeNameTd">模式一</td>
							</tr>
							<tr id="secondModeSetTrForSecondLevel">
								<td class="modeNameTd">模式二</td>
							</tr>
							<tr id="thirdModeSetTrForSecondLevel">
								<td class="modeNameTd">模式三</td>
							</tr>
							<tr id="forthModeSetTrForSecondLevel">
								<td class="modeNameTd">模式四</td>
							</tr>
							<tr id="fifthModeSetTrForSecondLevel">
								<td class="modeNameTd">模式五</td>
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
