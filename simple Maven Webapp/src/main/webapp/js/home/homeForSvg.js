$(document).ready(function() {
    $("#homeSvgDiv").svg({
	onLoad : function() {
	    var svg = $("#homeSvgDiv").svg('get');
	    svg.load('SVG/home.svg', {
		addTo : true,
		changeSize : false
	    });
	},
	settings : {}
    });
    setTimeout(initText, 500);
//    setInterval(freshData, 1000);
    setTimeout(freshData, 1000);
});
function freshData(){
    var url = $("#ctx").val() + "/getEpFreshData.do";
    $.get(url,function(resultData){
	freshDataByJSON(resultData);
    });
}
function freshDataByJSON(resultJSONData){
    for(var i=0;i<resultJSONData.length;i++){
	var s = resultJSONData[i];
	freshSVGByJSON(s);
    }
}
function freshSVGByJSON(oneEPJsonData){
    for(var i=0;i<EspArray.length;i++){
	if(oneEPJsonData.name == EspArray[i].num){
	    EspArray[i].deviceState = oneEPJsonData.epState;
	    var tempSvg = EspArray[i].svgObj;
	    tempSvg.setDeviceState(oneEPJsonData.epState);
	    tempSvg.setRappingState(oneEPJsonData.rapperState);
	    tempSvg.setDeviceSetState(oneEPJsonData.epWayString);
	    return;
	}
	
    }
}
function initText() {
    $("text").attr("stroke", "none");
    $("text").each(function(tempText) {
	var fill = $(this).attr("fill");
	if (fill != undefined && fill == "#FF0000") {

	} else {
	    $(this).attr("fill", "black");
	}
    });

    initFixedText();
    initBoiler(4);
    initDynamicText_HighVoltageStartStop();
    initDynamicTextRunModel();
    initDynamicTextRappingWay();
    initDynamicTextResetBtn();
    initDynamicTextControlWay();
    initDynamicText();
    initDynamicTextfRappingWayState();
    /** 实例化图片 */
    initImage();
    initRappingImage();
    initRunningBgColor();
    initRappingBgColor();

    initElement();

    // var text_for_id_101 = $("#text_for_id_101");
    // alert(text_for_id_101.attr("transform"));
    // text_for_id_101.attr("transform","matrix(1,0,0,1,88.499,-115.245)");
}

var outage_image = "image/svg/blank.gif";// 停运标志
var normal_image = "image/svg/yellow.gif";// 正常运行标志
var fault_image = "image/svg/blank.gif";// 故障标志

var outage_bgColor = "#31E843";// 停运方框颜色
var normal_bgColor = "#FF0000";// 正常运行方框颜色
var fault_bgColor = " 	#FFEC8B";// 故障方框颜色
var noComunication_bgColor = " 	#CCCCCC";// 通讯故障方框颜色

var rapping_image = "image/svg/black.gif";
var rapping_normal_bgColor = "#FF0000";// 运行
var rapping_outRange_bgColor = "#31E843";// 停运
var rapping_fault_bgColor = " 	#FFEC8B";// 故障
/**
 * 实例化运行图片
 */
function initImage() {
    var arr = new Array("25","28","30","32","17","20","24","9","12","14","16","1","4","6","8");
    for(var i=0;i<arr.length;i++){
	$("#image_id_" + arr[i]).attr("xlink:href", normal_image);
    }

}
/**
 * 实例化振打图片
 */
function initRappingImage() {
    var arr = new Array("26","27","29","31","18","19","21","23","10","11","13","15","2","3","5","7");
    for(var i=0;i<arr.length;i++){
	$("#image_id_" + arr[i]).attr("xlink:href", rapping_image);
    }

}
/**
 * 实例化运行背景颜色
 */
function initRunningBgColor() {
    var arr = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16");
    for (var i = 0; i < arr.length; i++) {
	 $("#rect_running_bg_id_" + arr[i]).attr("fill", normal_bgColor);
    }
    
}
/**
 * 实例化振打运行背景颜色
 */
function initRappingBgColor() {
    var arr = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16");
    for (var i = 0; i < arr.length; i++) {
	 $("#rect_rapping_bgColor_id_" + arr[i]).attr("fill", rapping_normal_bgColor);
    }
    
}
function initDynamicText_HighVoltageStartStop() {
    var arr = new Array("90", "96", "110", "113", "61", "67", "81", "84", "32", "38", "52", "55", "1", "9", "22", "26");
    for (var i = 0; i < arr.length; i++) {
	$("#text_for_id_" + arr[i]).html("高压启停");
    }

}
function initDynamicTextRunModel() {
    var arr = new Array("94", "100", "107", "115", "65", "71", "78", "86", "36", "42", "49", "57", "7", "12", "19", "28");
    for (var i = 0; i < arr.length; i++) {
	$("#text_for_id_" + arr[i]).html("自动模式");
    }

}
function initDynamicTextRappingWay() {
    var arr = new Array("99", "106", "116", "117", "70", "77", "87", "88", "41", "48", "58", "59", "11_2", "18", "29", "30");
    for (var i = 0; i < arr.length; i++) {
	$("#text_for_id_" + arr[i]).html("阳打");
    }

}
var resetBtnBgColor = "#999999";
var resetBtnBorderColor = "#000000";
function initDynamicTextResetBtn() {
    //    
    var arr = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16");
    for (var i = 0; i < arr.length; i++) {
	$("#resetText_id_" + arr[i]).html("复位");
    }

    $("[id^='resetText_id_']").attr("stroke", "none");
    $("[id^='resetText_id_']").attr("fill", "none");
    $("[id^='resetRect_id_']").attr("fill", "none").attr("stroke", "none");
}
function initDynamicTextControlWay() {
    var arr1 = new Array("2", "6", "5", "11", "8", "7", "4", "3", "1", "10", "9", "12");
    var arr2 = new Array("105", "47", "76", "17");
    for (var i = 0; i < arr1.length; i++) {
	$("#control_way_state_id_" + arr1[i]).css("font-size", "10").html("一次电流限制");
    }
    for (var i = 0; i < arr2.length; i++) {
	$("#text_for_id_" + arr2[i]).css("font-size", "10").html("一次电流限制");
    }

}
function initDynamicText() {

}
function initDynamicTextfRappingWayState() {
    var arr = new Array("97","103","111","112","68","74","82","83","39","45","53","54","10","15","23","25");
    for(var i=0;i<arr.length;i++){
	 $("#text_for_id_" + arr[i]).html("阳打控制");
    }

}
function initUnUsed() {
    $("#text_for_id_2").html("");
    $("#text_for_id_3").html("");
    $("#text_for_id_4").html("");
    $("#text_for_id_5").html("");
    $("#text_for_id_6").html("");

    $("#text_for_id_10").html("");

    $("#text_for_id_15").html("");
    $("#text_for_id_16").html("");
    $("#text_for_id_17").html("");
    $("#text_for_id_20").html("");

    $("#text_for_id_23").html("");
    $("#text_for_id_24").html("");
    $("#text_for_id_25").html("");

    $("#text_for_id_31").html("");

    $("#text_for_id_33").html("");
    $("#text_for_id_34").html("");
    $("#text_for_id_35").html("");
    $("#text_for_id_37").html("");

    $("#text_for_id_39").html("");
    $("#text_for_id_43").html("");
    $("#text_for_id_45").html("");
    $("#text_for_id_46").html("");
    $("#text_for_id_47").html("");
    $("#text_for_id_50").html("");

    $("#text_for_id_53").html("");
    $("#text_for_id_54").html("");

    $("#text_for_id_60").html("");

    $("#text_for_id_62").html("");
    $("#text_for_id_63").html("");
    $("#text_for_id_64").html("");

    $("#text_for_id_68").html("");

    $("#text_for_id_74").html("");
    $("#text_for_id_75").html("");
    $("#text_for_id_76").html("");

    $("#text_for_id_82").html("");
    $("#text_for_id_83").html("");
    $("#text_for_id_91").html("");
    $("#text_for_id_92").html("");
    $("#text_for_id_93").html("");

    $("#text_for_id_97").html("");

    $("#text_for_id_103").html("");
    $("#text_for_id_104").html("");
    $("#text_for_id_105").html("");

    $("#text_for_id_111").html("");
    $("#text_for_id_112").html("B侧一室高压控制柜4");

}
function initFixedText() {

    $("#text_for_id_95").css("font-size", "10").html("A侧一室高压控制柜1");
    $("#text_for_id_101").css("font-size", "10").html("A侧一室高压控制柜2");
    positionTransform($("#text_for_id_101"), 10, 0);
    $("#text_for_id_101").css("font-size", "10").html("A侧一室高压控制柜2");
    $("#text_for_id_108").css("font-size", "10").html("A侧一室高压控制柜3");
    positionTransform($("#text_for_id_108"), 10, 0);
    $("#text_for_id_118").css("font-size", "10").html("A侧一室高压控制柜4");

    $("#text_for_id_66").css("font-size", "10").html("A侧二室高压控制柜1");
    $("#text_for_id_72").css("font-size", "10").html("A侧二室高压控制柜2");
    $("#text_for_id_79").css("font-size", "10").html("A侧二室高压控制柜3");
    $("#text_for_id_89").css("font-size", "10").html("A侧二室高压控制柜4");

    $("#text_for_id_37").css("font-size", "10").html("B侧一室高压控制柜1");
    $("#text_for_id_43").css("font-size", "10").html("B侧一室高压控制柜2");
    positionTransform($("#text_for_id_43"), 15, -1);
    $("#text_for_id_50").css("font-size", "10").html("B侧一室高压控制柜3");
    positionTransform($("#text_for_id_50"), 8, 0);
    $("#text_for_id_60").css("font-size", "10").html("B侧一室高压控制柜4");
    positionTransform($("#text_for_id_60"), 8, 0);

    $("#text_for_id_8").css("font-size", "10").html("B侧二室高压控制柜1");
    $("#text_for_id_13").css("font-size", "10").html("B侧二室高压控制柜2");
    $("#text_for_id_20").css("font-size", "10").html("B侧二室高压控制柜3");
    $("#text_for_id_31").css("font-size", "10").html("B侧二室高压控制柜4");

}

function initBoiler(boilerNum) {
    $("#text_for_id_98").html(boilerNum + "A11");
    $("#text_for_id_102").html(boilerNum + "A12");
    $("#text_for_id_109").html(boilerNum + "A13");
    $("#text_for_id_114").html(boilerNum + "A14");

    $("#text_for_id_69").html(boilerNum + "A21");
    $("#text_for_id_73").html(boilerNum + "A22");
    $("#text_for_id_80").html(boilerNum + "A23");
    $("#text_for_id_85").html(boilerNum + "A24");

    $("#text_for_id_40").html(boilerNum + "B11");
    $("#text_for_id_44").html(boilerNum + "B12");
    $("#text_for_id_51").html(boilerNum + "B13");
    $("#text_for_id_56").html(boilerNum + "B14");

    $("#text_for_id_11_1").html(boilerNum + "B21");
    $("#text_for_id_14").html(boilerNum + "B22");
    $("#text_for_id_21").html(boilerNum + "B23");
    $("#text_for_id_27").html(boilerNum + "B24");
}
/**
 * 
 * @param element
 *                SVG的jquery对象
 * @param horizontal_change_value
 *                水平改变量
 * @param vertical_change_value
 *                垂直该变量
 */
function positionTransform(element, horizontal_change_value, vertical_change_value) {
    var arr = decompositionTransform(element.attr("transform"));
    arr[4] = parseFloat(arr[4]) + horizontal_change_value;
    arr[5] = parseFloat(arr[5]) + vertical_change_value;
    var maxtrixNewValue = "matrix(";
    for (var i = 0; i < arr.length; i++) {
	if (i > 0)
	    maxtrixNewValue += ",";
	maxtrixNewValue += arr[i];
    }
    maxtrixNewValue += ")";
    element.attr("transform", maxtrixNewValue);
}
/**
 * 分解matrixValue
 * 
 * @param transformValue
 * @returns
 */
function decompositionTransform(transformValue) {
    var matrixValue = transformValue.substr(7, transformValue.length - 2);
    var arr = matrixValue.split(",");
    return arr;
}
var EspArray, A11, A12, A13, A14, A21, A22, A23, A24, B11, B12, B13, B14, B21, B22, B23, B24;
function initElement() {
    A11 = new EspGroup("1A11","4A11", 1, 0, "一次电流限制", new SvgObj($("#text_for_id_98"), $("#image_id_25"), $("#rect_running_bg_id_13"), $("#control_way_state_id_2"), $("#text_for_id_90"), $("#image_id_26"),
	    $("#rect_rapping_bgColor_id_13"), $("#text_for_id_99")));
    A12 = new EspGroup("1A12","4A12", 1, 0, "一次电流限制", new SvgObj($("#text_for_id_102"), $("#image_id_28"), $("#rect_running_bg_id_14"), $("#text_for_id_105"), $("#text_for_id_96"), $("#image_id_27"),
	    $("#rect_rapping_bgColor_id_14"), $("#text_for_id_106")));
    A13 = new EspGroup("1A13","4A13", 1, 0, "一次电流限制", new SvgObj($("#text_for_id_109"), $("#image_id_30"), $("#rect_running_bg_id_15"), $("#control_way_state_id_6"), $("#text_for_id_110"),
	    $("#image_id_29"), $("#rect_rapping_bgColor_id_15"), $("#text_for_id_116")));
    A14 = new EspGroup("1A14","4A14", 1, 0, "一次电流限制", new SvgObj($("#text_for_id_114"), $("#image_id_32"), $("#rect_running_bg_id_16"), $("#control_way_state_id_5"), $("#text_for_id_113"),
	    $("#image_id_31"), $("#rect_rapping_bgColor_id_16"), $("#text_for_id_117")));

    A21 = new EspGroup("1A21","4A21", 1, 0, "一次电流限制", new SvgObj($("#text_for_id_69"), $("#image_id_17"), $("#rect_running_bg_id_9"), $("#control_way_state_id_11"), $("#text_for_id_61"), $("#image_id_18"),
	    $("#rect_rapping_bgColor_id_9"), $("#text_for_id_70")));
    A22 = new EspGroup("1A22","4A22", 1, 0, "一次电流限制", new SvgObj($("#text_for_id_73"), $("#image_id_20"), $("#rect_running_bg_id_10"), $("#text_for_id_47"), $("#text_for_id_67"), $("#image_id_19"),
	    $("#rect_rapping_bgColor_id_10"), $("#text_for_id_77")));
    A23 = new EspGroup("1A23","4A23", 1, 0, "一次电流限制", new SvgObj($("#text_for_id_80"), $("#image_id_22"), $("#rect_running_bg_id_11"), $("#control_way_state_id_8"), $("#text_for_id_81"), $("#image_id_21"),
	    $("#rect_rapping_bgColor_id_11"), $("#text_for_id_87")));
    A24 = new EspGroup("1A24","4A24", 1, 0, "一次电流限制", new SvgObj($("#text_for_id_85"), $("#image_id_24"), $("#rect_running_bg_id_12"), $("#control_way_state_id_7"), $("#text_for_id_84"), $("#image_id_23"),
	    $("#rect_rapping_bgColor_id_12"), $("#text_for_id_88")));

    B11 = new EspGroup("1B11","4B11", 1, 0, "一次电流限制", new SvgObj($("#text_for_id_40"), $("#image_id_9"), $("#rect_running_bg_id_5"), $("#control_way_state_id_4"), $("#text_for_id_32"), $("#image_id_10"),
	    $("#rect_rapping_bgColor_id_5"), $("#text_for_id_41")));
    B12 = new EspGroup("1B12","4B12", 1, 0, "一次电流限制", new SvgObj($("#text_for_id_44"), $("#image_id_12"), $("#rect_running_bg_id_6"), $("#text_for_id_76"), $("#text_for_id_38"), $("#image_id_11"),
	    $("#rect_rapping_bgColor_id_6"), $("#text_for_id_48")));
    B13 = new EspGroup("1B13","4B13", 1, 0, "一次电流限制", new SvgObj($("#text_for_id_51"), $("#image_id_14"), $("#rect_running_bg_id_7"), $("#control_way_state_id_3"), $("#text_for_id_52"), $("#image_id_13"),
	    $("#rect_rapping_bgColor_id_7"), $("#text_for_id_58")));
    B14 = new EspGroup("1B14","4B14", 1, 0, "一次电流限制", new SvgObj($("#text_for_id_56"), $("#image_id_16"), $("#rect_running_bg_id_8"), $("#control_way_state_id_1"), $("#text_for_id_55"), $("#image_id_15"),
	    $("#rect_rapping_bgColor_id_8"), $("#text_for_id_59")));

    B21 = new EspGroup("1B21","4B21", 1, 0, "一次电流限制", new SvgObj($("#text_for_id_11_1"), $("#image_id_1"), $("#rect_running_bg_id_1"), $("#control_way_state_id_10"), $("#text_for_id_1"), $("#image_id_2"),
	    $("#rect_rapping_bgColor_id_1"), $("#text_for_id_11_2")));
    B22 = new EspGroup("1B22","4B22", 1, 0, "一次电流限制", new SvgObj($("#text_for_id_14"), $("#image_id_4"), $("#rect_running_bg_id_2"), $("#text_for_id_17"), $("#text_for_id_9"), $("#image_id_3"),
	    $("#rect_rapping_bgColor_id_2"), $("#text_for_id_18")));
    B23 = new EspGroup("1B23","4B23", 1, 0, "一次电流限制", new SvgObj($("#text_for_id_21"), $("#image_id_6"), $("#rect_running_bg_id_3"), $("#control_way_state_id_9"), $("#text_for_id_22"), $("#image_id_5"),
	    $("#rect_rapping_bgColor_id_3"), $("#text_for_id_29")));
    B24 = new EspGroup("1B24","4B24", 1, 0, "一次电流限制", new SvgObj($("#text_for_id_27"), $("#image_id_8"), $("#rect_running_bg_id_4"), $("#control_way_state_id_12"), $("#text_for_id_26"), $("#image_id_7"),
	    $("#rect_rapping_bgColor_id_4"), $("#text_for_id_30")));

    EspArray = [ A11, A12, A13, A14, A21, A22, A23, A24, B11, B12, B13, B14, B21, B22, B23, B24 ];
    for (var i = 0; i < EspArray.length; i++) {
	EspArray[i].initEle();
    }
    updateSvgLocation();

    // $("svg").attr("viewBox","700,900");
}
/**
 * 更新SVG对象的位置
 */
function updateSvgLocation() {

}
/**
 * 高压起停
 */
function startOrStopFunction() {
    var espGroup = findEspGroupByStartOrStopRect($(this));
    if (espGroup.deviceState == 1) {
	var b = window.confirm("确认关闭?");
	if (b)
	    espGroup.startOrStopDevice(0);
    } else if (espGroup.deviceState == 0) {
	var b = window.confirm("确认开启?");
	if (b)
	    espGroup.startOrStopDevice(1);
    } else  {
	alert("系统故障!请选择复位！");
    }
}
function findEspGroupByStartOrStopRect($sasRect) {
    var espGroup = null;
    for (var i = 0; i < EspArray.length; i++) {
	var tempId = EspArray[i].svgObj.startOrStopBtn.attr("id");
	if (tempId == $sasRect.attr("id")) {
	    espGroup = EspArray[i];
	    break;
	}
    }
    return espGroup;
}
/**
 * @param unitNum
 *                机组编号
 * @param deviceState
 *                设备状态：正常运行(1)，停运(0)，故障(-1)
 * @param rappingState
 *                振打状态：振打(1)，停运(0)，故障(-1)
 * @param deviceSetState
 *                设备设置状态
 * @param svgObj
 *                关联可操作对象
 */
function EspGroup(num,unitNum, deviceState, rappingState, deviceSetState, svgObj) {
    this.num = num;
    this.unitNum = unitNum;
    this.deviceState = deviceState;
    this.rappingState = rappingState;
    this.deviceSetState = deviceSetState;
    this.svgObj = svgObj;
}
EspGroup.prototype.initEle = function() {
    this.svgObj.setUnitNum(this.unitNum);
    this.svgObj.setDeviceState(this.deviceState);
    this.svgObj.setRappingState(this.rappingState);
    this.svgObj.setDeviceSetState(this.deviceSetState);
    this.svgObj.startOrStopBtn.bind("click", startOrStopFunction).css("cursor", "pointer");
};
EspGroup.prototype.startOrStopDevice = function(deviceState) {
    this.deviceState = deviceState;
    this.svgObj.setDeviceState(this.deviceState);
};

/**
 * 
 * @param unitNumObj
 *                编号对象
 * @param deviceStateImage
 *                设备状态图片
 * @param deviceStateRect
 *                设备状态背景框
 * @param deviceSetText
 *                设备参数设定状态
 * @param startOrStopBtn
 *                起停设备按钮
 * @param rappingStateImage
 *                振打状态图片
 * @param rappingStateRect
 *                振打状态背景框
 * @param rappingStateText
 *                振打状态文字对象
 */
function SvgObj(unitNumObj, deviceStateImage, deviceStateRect, deviceSetText, startOrStopBtn, rappingStateImage, rappingStateRect, rappingStateText) {
    this.unitNumObj = unitNumObj;
    this.deviceStateImage = deviceStateImage;
    this.deviceStateRect = deviceStateRect;
    this.deviceSetText = deviceSetText;
    this.startOrStopBtn = startOrStopBtn;
    this.rappingStateImage = rappingStateImage;
    this.rappingStateRect = rappingStateRect;
    this.rappingStateText = rappingStateText;
}
SvgObj.prototype.setUnitNum = function(unitNum) {
    this.unitNumObj.html(unitNum);
};

SvgObj.prototype.setDeviceState = function(deviceState) {
    
    switch (deviceState) {
    case 0:
	this.deviceStateImage.attr("xlink:href", outage_image);
	this.deviceStateRect.attr("fill", outage_bgColor);
	break;
    case -1:
	this.deviceStateImage.attr("xlink:href", fault_image);
	this.deviceStateRect.attr("fill", noComunication_bgColor);
	break;
    case 1:
	this.deviceStateImage.attr("xlink:href", normal_image);
	this.deviceStateRect.attr("fill", normal_bgColor);
	break;
    default:
	alert("error");
    }
};
var rapping_image = "image/svg/black.gif";
var rapping_normal_bgColor = "#FF0000";// 运行
var rapping_outRange_bgColor = "#31E843";// 停运
var rapping_fault_bgColor = " 	#FFEC8B";// 故障
var rapping_Communication_interruption_bgColor = "#CCCCCC";// 通讯故障
SvgObj.prototype.setRappingState = function(rappingState) {
    switch (rappingState) {
    case 0:
	this.rappingStateImage.attr("xlink:href", rapping_image);
	this.rappingStateRect.attr("fill", rapping_outRange_bgColor);
	this.rappingStateText.attr("fill", "black");
	break;
    case 2:
	this.rappingStateImage.attr("xlink:href", rapping_image);
	this.rappingStateRect.attr("fill", rapping_fault_bgColor);
	this.rappingStateText.attr("fill", "black");
	break;
    case 1:
	this.rappingStateImage.attr("xlink:href", rapping_image);
	this.rappingStateRect.attr("fill", rapping_normal_bgColor);
	this.rappingStateText.attr("fill", "red");
	break;
    case -1:
	this.rappingStateImage.attr("xlink:href", rapping_image);
	this.rappingStateRect.attr("fill", rapping_Communication_interruption_bgColor);
	this.rappingStateText.attr("fill", "black");
	break;
    default:
	alert("error" + rappingState);
    }
};
SvgObj.prototype.setDeviceSetState = function(deviceSetState) {
    this.deviceSetText.html(deviceSetState);
};