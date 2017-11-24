$(document).ready(
		function() {
			$("#addEpBtn").bind("click", function() {
				window.location = $("#ctx").val() + "/addOrEditRapper.do";
			});
			$("#anodeQueryBtn").bind("click", function() {
				var param = {
					"rapper.rapperType" : 0
				};
				epGrid.g.load(param, intTableClickFunction);
			});
			$("#cathodeQueryBtn").bind("click", function() {
				var param = {
					"rapper.rapperType" : 1
				};
				epGrid.g.load(param, intTableClickFunction);
			});

			var windowWidth = $(window).width();
			var each_colWidth = (windowWidth - 200) / 14;
			var epGird_colWidths = [ 60, each_colWidth, each_colWidth, each_colWidth, each_colWidth, each_colWidth, each_colWidth, each_colWidth, each_colWidth, each_colWidth, each_colWidth,
					each_colWidth, 50, 50 ];
			var epGrid;
			/**
			 * 实例化告警表格
			 * 
			 * @returns
			 */
			function initEpTable() {
				var tempUrl = ctx + '/getListRapperData.do?tempNum = ' + Math.random();

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
					var $t = $(r.find("td:eq(3)"));
					changeRapper($t, currentEpId, "请输入运行状态：0停运；1运行", "runState");
					var $name = $(r.find("td:eq(4)"));
					changeRapper($name, currentEpId, "请输入告警状态：0正常；1告警", "alarmState");

					var $alarm = $(r.find("td:eq(6)"));
					changeRapper($alarm, currentEpId, "请输入运行方式：0停运；1连续；2周期:", "runWay");
					var $beginTime = $(r.find("td:eq(7)"));
					changeRapper($beginTime, currentEpId, "请输入开始时间:", "beginTime");
					var $runTimeTd = $(r.find("td:eq(8)"));
					changeRapper($runTimeTd, currentEpId, "请输入运行时间:", "runTime");
					var $waitTimeTd = $(r.find("td:eq(9)"));
					changeRapper($waitTimeTd, currentEpId, "请输入等待时间:", "waitTime");
				});
			}

			function changeRapper($td, rapeprId, tipString, changeProperty) {
				$td.bind("click", function() {
					var returnValue = window.prompt(tipString);
					if (returnValue && returnValue.length > 0) {
						var tempStr = "var sendData = {'rapper.id':" + rapeprId + ",'rapper." + changeProperty + "':" + returnValue + "};";
						eval(tempStr);
						updateHeater(sendData, $td, returnValue);
					}
				});
			}

			function updateHeater(sendData, $td, targetValue, bgColor) {
				var url = ctx + "/back/rapperUpdate.do";
				$.getJSON(url, sendData, function(json) {
					$td.find("div").html(targetValue);
				});
			}
			$(function() {
				initEpTable();
				window.setTimeout(intTableClickFunction, 1000);
			});

		});