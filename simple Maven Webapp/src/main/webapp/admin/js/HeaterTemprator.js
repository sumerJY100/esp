$(document).ready(function() {
	$("#addEpBtn").bind("click", function() {
		window.location = $("#ctx").val() + "/addOrEditHeaterTemprator.do";
	});
	var windowWidth = $(window).width();
	var each_colWidth = (windowWidth - 200) / 12;
	var epGird_colWidths = [ 60, each_colWidth, each_colWidth,each_colWidth, each_colWidth, each_colWidth, each_colWidth, each_colWidth, each_colWidth, 50, 50 ];
	var epGrid;
	/**
	 * 实例化告警表格
	 * 
	 * @returns
	 */
	function initAlaramTable() {
		var tempUrl = ctx + '/getHeaterTempratorListTable.do?tempNum = ' + Math.random();
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
			var currentEpId = $(r.find("td:eq(0)")).find("div").html();
			var $t = $(r.find("td:eq(5)"));
			changeTemp($t, currentEpId);
			var $name = $(r.find("td:eq(6)"));
			changeTempLower($name, currentEpId);
			var $alarm = $(r.find("td:eq(7)"));
			changeTempUpper($alarm, currentEpId);
		});
	}
	function changeTemp($alarm, currentEpId) {
		$alarm.bind("click", function() {
			var returnValue = window.prompt("请输入温度");
			if (returnValue && returnValue.length > 0) {
				var sendData = {
					"heaterTemprator.id" : currentEpId,
					"heaterTemprator.temprator" : returnValue
				};
				updateHeater(sendData, $alarm, returnValue);
			}
		});
	}
	function changeTempUpper($alarm, currentEpId) {
		$alarm.bind("click", function() {
			var returnValue = window.prompt("请输入温度上限");
			if (returnValue && returnValue.length > 0) {
				var sendData = {
						"heaterTemprator.id" : currentEpId,
						"heaterTemprator.tempratorUpper" : returnValue
				};
				updateHeater(sendData, $alarm, returnValue);
			}
		});
	}
	function changeTempLower($alarm, currentEpId) {
		$alarm.bind("click", function() {
			var returnValue = window.prompt("请输入温度下限");
			if (returnValue && returnValue.length > 0) {
				var sendData = {
						"heaterTemprator.id" : currentEpId,
						"heaterTemprator.tempratorLower" : returnValue
				};
				updateHeater(sendData, $alarm, returnValue);
			}
		});
	}
	function updateHeater(sendData, $td, targetValue, bgColor) {
		var url = ctx + "/back/heaterTempratorUpdate.do";
		$.getJSON(url, sendData, function(json) {
			$td.find("div").html(targetValue);
		});
	}
	$(function() {
		initAlaramTable();
		window.setTimeout(intTableClickFunction,1000);
	});
	
});