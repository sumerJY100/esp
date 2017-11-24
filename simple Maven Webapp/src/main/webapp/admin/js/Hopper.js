$(document).ready(function() {
	$("#addEpBtn").bind("click", function() {
		window.location = $("#ctx").val() + "/addOrEditHopper.do";
	});
	var windowWidth = $(window).width();
	var each_colWidth = (windowWidth - 200) / 12;
	var epGird_colWidths = [ 60, each_colWidth, each_colWidth, each_colWidth, each_colWidth, each_colWidth, each_colWidth, 50, 50 ];
	var epGrid;
	/**
	 * 实例化告警表格
	 * 
	 * @returns
	 */
	function initEpTable() {
		var tempUrl = ctx + '/getHopperListForTable.do?tempNum = ' + Math.random();
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
	$(function() {
		initEpTable();
	});
});