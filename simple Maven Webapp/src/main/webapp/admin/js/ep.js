$(document).ready(function() {
	var windowWidth = $(window).width();
	var each_colWidth = (windowWidth - 200) / 15;
	var epGird_colWidths = [ 60, each_colWidth, each_colWidth, each_colWidth, each_colWidth, each_colWidth, each_colWidth, each_colWidth, each_colWidth, 50, 50, 50, 50 ];

	var epGrid = null;
	initAlaramTable();

	window.setTimeout(testFun, 1000);

	$("#addEpBtn").bind("click", function() {
		window.location = $("#ctx").val() + "/addOrEidtEp.do";
	});

	/**
	 * 实例化告警表格
	 * 
	 * @returns
	 */
	function initAlaramTable() {
		var tempUrl = ctx + '/getListEpData.do?tempNum = ' + Math.random();
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

	function testFun() {
		epGrid.g.getRows(function(r) {
			var $t = $(r.find("td:eq(2)"));
			var currentEpId = $(r.find("td:eq(0)")).find("div").html();
			changeEpRunState($t, currentEpId);
			var $name = $(r.find("td:eq(1)"));
			changeEpName($name, currentEpId);

			var $alarm = $(r.find("td:eq(4)"));
			changeEpAlarm($alarm, currentEpId);
		});
	}
	function changeEpAlarm($alarm, currentEpId) {
		checkAlarmState($alarm, $alarm.find("div").html());
		$alarm.bind("click", function() {
			var returnValue = window.prompt("告警状态，1为告警，0为正常", "");
			if (returnValue) {
				if (returnValue.length > 0) {
					var sendData = {
						"ep.id" : currentEpId,
						"ep.alarmState" : returnValue
					};
					updateEp(sendData, $alarm, returnValue);
					checkAlarmState($alarm, returnValue);
				}
			}
		});
	}
	function changeEpName($name, currentEpId) {
		$name.bind("click", function() {
			var returnValue = window.prompt("请输入名称", "");
			if (returnValue) {
				if (returnValue.length > 0) {
					var sendData = {
						"ep.id" : currentEpId,
						"ep.name" : returnValue
					};
					updateEp(sendData, $name, returnValue);
				}
			}
		});
	}
	function changeEpRunState($t, currentEpId) {
		var currentEpRunState = $t.find("div").html();
		checkRunState($t, currentEpRunState);
		$t.bind("click", function() {
			var returnValue = window.prompt("请输入指定状态：通讯中断【-1】，运行【1】，停止【0】", "");
			if (returnValue) {
				if (returnValue == "0" || returnValue == "-1" || returnValue == "1") {
					var communication = 1;
					if (returnValue != -1) {
						communication = 0;
					} else {
						communication = 1;
					}
					var sendData = {
						"ep.id" : currentEpId,
						"ep.runState" : returnValue,
						"ep.communicationFlag" : communication
					};
					updateEp(sendData, $t, returnValue);
					checkRunState($t, returnValue);
					$($t.next()).find("div").html(communication);
				}
			}

		});
	}
	function updateEp(sendData, $t, targetValue) {
		var url = ctx + "/back/epUpdate.do";
		$.getJSON(url, sendData, function(json) {
			$t.find("div").html(targetValue);
		});
	}

	function checkRunState($td, runState) {
		if (runState == -1) {
			$td.css("background", "#cccccc");
		} else if (runState == 0) {
			$td.css("background", "#00ff00");
		} else if (runState == 1) {
			$td.css("background", "red");
		}
	}
	function checkAlarmState($td, alarmState) {
		if (alarmState == 0) {
			$td.css("background", "#00ff00");
		} else if (alarmState == 1) {
			$td.css("background", "red");
		}
	}
	// });
});