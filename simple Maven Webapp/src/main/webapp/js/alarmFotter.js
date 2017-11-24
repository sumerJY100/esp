var windowWidth = $(window).width();
var each_colWidth = (windowWidth - 60) / 5 - 20;
var alarmGird_colWidths = [ 60, each_colWidth, each_colWidth, each_colWidth, each_colWidth, each_colWidth ];
var alarmGrid;
/**
 * 实例化告警表格
 * 
 * @returns
 */
function initAlaramTable() {
    var tempUrl = ctx + '/showLatestAlarmLog.do?tempNum = ' + Math.random();
    alarmGrid = $("#alarmTable").ingrid({
	url : tempUrl,
	height : 100,
	sorting : false,
	initialLoad : true,
	resizableCols:false,
	colClasses:['grid-custom-col','grid-custom-col','grid-custom-col','grid-custom-col','grid-custom-col','grid-custom-col'],
	rowClasses : [ 'grid-row-style1', 'grid-row-style1', 'grid-row-style2', 'grid-row-style1', 'grid-row-style1', 'grid-row-style3' ],
	paging : false,
	totalRecords : $("#counts").val(),
	colWidths : alarmGird_colWidths
    });
}
$(function() {
    initAlaramTable();
});