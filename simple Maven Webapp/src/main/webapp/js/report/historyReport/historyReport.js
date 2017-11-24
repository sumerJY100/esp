function initTable() {
    var $historyTable = $("#historyTable");
    $historyTable.attr("cellpadding", 0);
    $historyTable.attr("cellsapcing", 0);
    $historyTable.attr("width", "100%");
    var $firstTr = $("<tr></tr>");
    $firstTr.append($("<td></td>").append(initOneTimeTable()));
    $firstTr.append($("<td></td>").append(ep1A11.initHistoryTable));
    $firstTr.append($("<td></td>").append(ep1A12.initHistoryTable));
    $firstTr.append($("<td></td>").append(ep1A13.initHistoryTable));
    $firstTr.append($("<td></td>").append(ep1A14.initHistoryTable));

    var $secondTr = $("<tr></tr>");
    $secondTr.append($("<td></td>").append(initOneTimeTable()));
    $secondTr.append($("<td></td>").append(ep1A21.initHistoryTable));
    $secondTr.append($("<td></td>").append(ep1A22.initHistoryTable));
    $secondTr.append($("<td></td>").append(ep1A23.initHistoryTable));
    $secondTr.append($("<td></td>").append(ep1A24.initHistoryTable));

    var $thirdTr = $("<tr></tr>");
    $thirdTr.append($("<td></td>").append(initOneTimeTable()));
    $thirdTr.append($("<td></td>").append(ep1B11.initHistoryTable));
    $thirdTr.append($("<td></td>").append(ep1B12.initHistoryTable));
    $thirdTr.append($("<td></td>").append(ep1B13.initHistoryTable));
    $thirdTr.append($("<td></td>").append(ep1B14.initHistoryTable));

    var $fourthTr = $("<tr></tr>");
    $fourthTr.append($("<td></td>").append(initOneTimeTable()));
    $fourthTr.append($("<td></td>").append(ep1B21.initHistoryTable));
    $fourthTr.append($("<td></td>").append(ep1B22.initHistoryTable));
    $fourthTr.append($("<td></td>").append(ep1B23.initHistoryTable));
    $fourthTr.append($("<td></td>").append(ep1B24.initHistoryTable));

    $historyTable.append($firstTr);
    $historyTable.append($secondTr);
    $historyTable.append($thirdTr);
    $historyTable.append($fourthTr);

    epArr = new Array(ep1A11, ep1A12, ep1A13, ep1A14, ep1A21, ep1A22, ep1A23, ep1A24, ep1B11, ep1B12, ep1B13, ep1B14, ep1B21, ep1B22, ep1B23, ep1B24);
}
var ep1A11 = new HistoryTable("1A11");
var ep1A12 = new HistoryTable("1A12");
var ep1A13 = new HistoryTable("1A13");
var ep1A14 = new HistoryTable("1A14");

var ep1A21 = new HistoryTable("1A21");
var ep1A22 = new HistoryTable("1A22");
var ep1A23 = new HistoryTable("1A23");
var ep1A24 = new HistoryTable("1A24");

var ep1B11 = new HistoryTable("1B11");
var ep1B12 = new HistoryTable("1B12");
var ep1B13 = new HistoryTable("1B13");
var ep1B14 = new HistoryTable("1B14");

var ep1B21 = new HistoryTable("1B21");
var ep1B22 = new HistoryTable("1B22");
var ep1B23 = new HistoryTable("1B23");
var ep1B24 = new HistoryTable("1B24");
var epArr;

function HistoryTable(name) {
    this.name = name;
    this.u1Array = new Array();
    this.u2Array = new Array();
    this.i1Array = new Array();
    this.i2Array = new Array();
    for (var i = 0; i < 24; i++) {
	this.u1Array[i] = "&nbsp;";
	this.u2Array[i] = "&nbsp;";
	this.i1Array[i] = "&nbsp;";
	this.i2Array[i] = "&nbsp;";
    }

    this.initValue = function(jsonData) {
	var arrs = jsonData.data;
	for (var i = 0; i < arrs.length; i++) {
	    var oneData = arrs[i];
	    u1Array[i] = oneData[0];
	    u2Array[i] = oneData[1];
	    i1Array[i] = oneData[2];
	    i2Array[i] = oneData[3];
	}
    };
    this.domTable = $("<table id='table_" + this.name + "'></table>");
    this.initHistoryTable = initOneHistoryTable(this);
    this.freshData = function() {

    };
}

/**
 * 绘制一个历史报表的表格
 */
function initOneHistoryTable(historyTable) {
    if ($("#table_" + historyTable.name).length > 0) {
	for (var i = 0; i < 24; i++) {
	    $("#u1_" + historyTable.name + "_td_" + i).html(historyTable.u1Array[i]);
	    $("#u2_" + historyTable.name + "_td_" + i).html(historyTable.u2Array[i]);
	    $("#i1_" + historyTable.name + "_td_" + i).html(historyTable.i1Array[i]);
	    $("#i2_" + historyTable.name + "_td_" + i).html(historyTable.i2Array[i]);
	}
    } else {
	var $table = historyTable.domTable;
	$table.append("<tr><th colspan=4>" + historyTable.name + "</th></tr>");
	$table.append("<tr><th >I1</th><th >U1</th><th >I2</th><th >U2</th></tr>");
	for (var i = 0; i < 24; i++) {
	    $tr = $("<tr></tr>");
	    $tr.append("<td id='i1_" + historyTable.name + "_td_" + i + "' style='width:63px;text-align:center;'>&nbsp;" + historyTable.i1Array[i] + "</td>");
	    $tr.append("<td id='u1_" + historyTable.name + "_td_" + i + "' style='width:63px;text-align:center;'>&nbsp;" + historyTable.u1Array[i] + "</td>");
	    $tr.append("<td id='i2_" + historyTable.name + "_td_" + i + "' style='width:63px;text-align:center;'>&nbsp;" + historyTable.i2Array[i] + "</td>");
	    $tr.append("<td id='u2_" + historyTable.name + "_td_" + i + "' style='width:63px;text-align:center;'>&nbsp;" + historyTable.u2Array[i] + "</td>");
	    $table.append($tr);
	}
	$($table.children()[0]).children("tr:odd:not(:first)").each(function(i){
	    $(this).css("background","#D1EEEE");
	});
	$($table.children()[0]).children("tr:even:not(:first)").each(function(i){
	    $(this).css("background","#fffff0");
	});
    }
    return historyTable.domTable;
}
function initOneTimeTable() {
    var domTable = $("<table></table>");
    domTable.append("<tr><th rowspan=1>&nbsp;</th></tr>");
    domTable.append("<tr><th rowspan=1>时间</th></tr>");
    for (var i = 0; i < 24; i++) {
	var tempHour = i + "";
	if (tempHour.length == 1) {
	    tempHour = "0" + tempHour;
	}
	domTable.append("<tr style='background:#fffff0'><td style='width:50px;text-align:center;'>" + tempHour + ":00</td></tr>");
    }
//    domTable.children("tr").css("background","blue");
    $(domTable.children()[0]).children("tr:odd:not(:first)").each(function(i){
	$(this).css("background","#D1EEEE");
    });
    
    return domTable;
}