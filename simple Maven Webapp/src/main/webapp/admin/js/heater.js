$(document).ready(
		function() {
			$("#addEpBtn").bind("click", function() {
				window.location = $("#ctx").val() + "/addOrEditHeater.do";
			});
			var windowWidth = $(window).width();
			var each_colWidth = (windowWidth - 200) / 15;
			var epGird_colWidths = [ 60, each_colWidth, each_colWidth, each_colWidth, each_colWidth, each_colWidth, each_colWidth, each_colWidth, each_colWidth, each_colWidth, each_colWidth,
					each_colWidth, 50, 50 ];
			var epGrid;
			/**
			 * 实例化告警表格
			 * 
			 * @returns
			 */
			function initEpTable() {
				var tempUrl = ctx + '/getListHeaterData.do?tempNum = ' + Math.random();
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
					changeEpRunState($t, currentEpId);
					var $name = $(r.find("td:eq(1)"));
					changeEpName($name, currentEpId);

					var $alarm = $(r.find("td:eq(3)"));
					changeEpAlarm($alarm, currentEpId);
				});
			}
			function changeEpAlarm($alarm, currentEpId) {
				$alarm.bind("click", function() {
					var returnValue = window.prompt("请输入告警状态：0正常；1告警");
					if (returnValue && returnValue.length > 0) {
						var sendData = {
							"heater.id" : currentEpId,
							"heater.alarmState" : returnValue
						};
						updateHeater(sendData, $alarm, returnValue);
					}
				});
			}
			function changeEpRunState($td, currentHeaterId) {
				$td.bind("click", function() {
					var returnValue = window.prompt("请输入加热状态：0停运；1加热");
					if (returnValue) {
						if (returnValue.length > 0) {
							var sendData = {
								"heater.id" : currentHeaterId,
								"heater.runState" : returnValue
							};
							updateHeater(sendData, $td, returnValue);
						}
					}
				});
			}
			function changeEpName($nameTd, currentHeaterId) {
				$nameTd.bind("click", function() {
					var bgColor = $nameTd.css("background");
					$nameTd.css("background", "yellow");
					var returnValue = window.prompt("请输入名称", "");
					if (returnValue) {
						if (returnValue.length > 0) {
							var sendData = {
								"heater.id" : currentHeaterId,
								"heater.name" : returnValue
							};
							updateHeater(sendData, $nameTd, returnValue, bgColor);
							// alert(bgColor);
						}
					}
					window.setTimeout(function() {
						$nameTd.css("background", bgColor);
					}, 2000);
				});
			}
			function updateHeater(sendData, $td, targetValue, bgColor) {
				var url = ctx + "/back/heaterUpdate.do";
				$.getJSON(url, sendData, function(json) {
					$td.find("div").html(targetValue);
				});
			}
			$(function() {
				initEpTable();
			});
			window.setTimeout(intTableClickFunction, 2000);
		});