$(document).ready(function() {
	$("#addEpBtn").bind("click", function() {
		window.location = $("#ctx").val() + "/addOrEditLowDevice.do";
	});

	var windowWidth = $(window).width();
	var each_colWidth = (windowWidth - 200) / 5;
	var epGird_colWidths = [ 60, each_colWidth, each_colWidth, each_colWidth, each_colWidth ];
	var epGrid;
	/**
	 * 实例化告警表格
	 * 
	 * @returns
	 */
	function initAlaramTable() {
		var tempUrl = ctx + '/getLowDeviceTable.do?tempNum = ' + Math.random();
		epGrid = $("#epTable").ingrid({
			url : tempUrl,
			height : 500,
			sorting : false,
			initialLoad : true,
			rowClasses : [ 'grid-row-style1', 'grid-row-style1', 'grid-row-style2', 'grid-row-style1', 'grid-row-style1', 'grid-row-style3' ],
			paging : false,
			totalRecords : $("#counts").val(),
			colWidths : epGird_colWidths
		});
	}
	function intTableClickFunction() {
		epGrid.g.getRows(function(r) {
			var $t = $(r.find("td:eq(2)"));
			var currentEpId = $(r.find("td:eq(0)")).find("div").html();
			 changeLowDeviceState($t, currentEpId);
			var $name = $(r.find("td:eq(1)"));
			changeEpName($name, currentEpId);

			var $alarm = $(r.find("td:eq(4)"));
			// changeEpAlarm($alarm, currentEpId);
		});
	}
	function changeLowDeviceState($td,currentLowDeviceId){
		$td.bind("click",function(){
			var returnValue = window.prompt("通讯状态：0为正常；1为通讯中断", "");
			if(returnValue){
				if(returnValue.length > 0){
					var sendData = {
							"lowDevice.id":currentLowDeviceId,
							"lowDevice.runState":returnValue
					}
					updateLowDevice(sendData,$td,returnValue);
				}
			}
		});
	}
	function changeEpName($nameTd,currentLowDeviceId){
		$nameTd.bind("click", function() {
			var bgColor = $nameTd.css("background");
			$nameTd.css("background", "yellow");
			var returnValue = window.prompt("请输入名称", "");
			if (returnValue) {
				if (returnValue.length > 0) {
					var sendData = {
						"lowDevice.id" : currentLowDeviceId,
						"lowDevice.name" : returnValue
					};
					updateLowDevice(sendData, $nameTd, returnValue, bgColor);
					// alert(bgColor);
				}
			}
			window.setTimeout(function() {
				$nameTd.css("background", bgColor);
			}, 2000);
		});
	}
	function updateLowDevice(sendData, $td, targetValue, bgColor) {
		
		var url = ctx + "/back/lowDeviceUpdate.do";
		$.getJSON(url, sendData, function(json) {
			$td.find("div").html(targetValue);
		});
	}
	$(function() {
		initAlaramTable();
	});
	window.setTimeout(intTableClickFunction, 1000);
});