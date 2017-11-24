<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<title>燃煤电站电除尘显示控制优化软件</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<script type="text/javascript" src="js/jquery-1.6.4.js"></script>
<script type="text/javascript" src="js/jquery.url.js"></script>
<!-- <script  type="text/javascript" src="js/My97DatePicker/My97DatePicker/WdatePicker.js"></script> -->

<style>
<!--
.jumpBtn {
	position: fixed;
	top: 70px;
	border: 1px solid black;
	cursor: pointer;
	font-size: 15;
	font-weight: bold;
	border-style: outset;
	border-width: 2px;
	background: #D2E8EA;
	padding: 3 3 3 3;
	color: black;
}

.jumpBtn:hover {
	border-style: inset;
	color: #ffffff;
	background: #00A6E9;
}
-->
</style>
<script type="text/javascript">
	var electricFieldNames = new Array(20);
	electricFieldNames[0] = "1A11";
	electricFieldNames[1] = "1A12";
	electricFieldNames[2] = "1A13";
	electricFieldNames[3] = "1A14";
	electricFieldNames[4] = "1A15";
	electricFieldNames[5] = "1A21";
	electricFieldNames[6] = "1A22";
	electricFieldNames[7] = "1A23";
	electricFieldNames[8] = "1A24";
	electricFieldNames[9] = "1A25";
	electricFieldNames[10] = "1B11";
	electricFieldNames[11] = "1B12";
	electricFieldNames[12] = "1B13";
	electricFieldNames[13] = "1B14";
	electricFieldNames[14] = "1B15";
	electricFieldNames[15] = "1B21";
	electricFieldNames[16] = "1B22";
	electricFieldNames[17] = "1B23";
	electricFieldNames[18] = "1B24";
	electricFieldNames[19] = "1B25";
	function Map() {
		var struct = function(key, value) {
			this.key = key;
			this.value = value;
		};

		var put = function(key, value) {
			for (var i = 0; i < this.arr.length; i++) {
				if (this.arr[i].key === key) {
					this.arr[i].value = value;
					return;
				}
			}
			this.arr[this.arr.length] = new struct(key, value);
		};

		var get = function(key) {
			for (var i = 0; i < this.arr.length; i++) {
				if (this.arr[i].key === key) {
					return this.arr[i].value;
				}
			}
			return null;
		};

		var remove = function(key) {
			var v;
			for (var i = 0; i < this.arr.length; i++) {
				v = this.arr.pop();
				if (v.key === key) {
					continue;
				}
				this.arr.unshift(v);
			}
		};

		var size = function() {
			return this.arr.length;
		};

		var isEmpty = function() {
			return this.arr.length <= 0;
		};
		this.arr = new Array();
		this.get = get;
		this.put = put;
		this.remove = remove;
		this.size = size;
		this.isEmpty = isEmpty;
	}
	$(document).ready(function() {
		//灰斗加热
		$("#returnHeater3Jsp").bind("click", function() {
			window.location = $("#ctx").val() + "/hopperHeater2.jsp?pageMenuIndex=3";
		});
		$("#returnHeater2Jsp").bind("click", function() {
			window.location = $("#ctx").val() + "/heater2.jsp?pageMenuIndex=3";
		});
		//图表展示一二次电流电压
		$("#returnPicJsp").bind("click", function() {
			window.location = $("#ctx").val() + "/home2.jsp?pageMenuIndex=1";
		});
		//图形
		$("#returnChartJsp").bind("click", function() {
			window.location = $("#ctx").val() + "/home3.jsp?pageMenuIndex=1";
		});
		//图例
		$("#legendJsp").bind("click", function() {
			window.location = $("#ctx").val() + "/legend2.jsp?pageMenuIndex=1";
		});
		//参数设置
		$("#returnParamSetJsp").bind("click", function() {
			window.location = $("#ctx").val() + "/paramSet.jsp?pageMenuIndex=2";
		});
		//锅炉负荷参数设置
		$("#returnBEJsp").bind("click", function() {
			window.location = $("#ctx").val() + "/boilerLoadController.jsp?pageMenuIndex=2";
		});
		//历史报表
		$("#returnTohistoryReport").bind("click", function() {
			window.location = $("#ctx").val() + "/report/historyReport/historyReport.jsp?pageMenuIndex=8";
		});
		//实时报表
		$("#returnToRealReport").bind("click", function() {
			window.location = $("#ctx").val() + "/realTimeReporting.do?pageMenuIndex=8";
		});
	});
</script>
