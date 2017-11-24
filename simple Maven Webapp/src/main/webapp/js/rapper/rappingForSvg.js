$(document).ready(function() {
    $("#rappingSvgDiv").svg({
	onLoad : function() {
	    var svg = $("#rappingSvgDiv").svg('get');
	    svg.load('SVG/rappingControl.svg', {
		addTo : true,
		changeSize : false
	    });
	},
	settings : {}
    });
    // setTimeout(initText, 1000);
    window.setTimeout(function() {
//	$("image").remove();
	initSvg();
    }, 500);
});
var RappingGroupsArray, A11, A12, A13, A14, A21, A22, A23, A24, B11, B12, B13, B14, B21, B22, B23, B24;
function initSvg() {
    $("#title_text_id_1").html("3号炉振打监控");
    $("#title_text_id_2").html("4号炉");
    A11 = new RappingGroup("A11", "0","1","0","1", new RappingSvgGroup($("#unitNum_text_id_14"), $("#resetBtn_text_id_15"),
	    $("#rapping_state_rect_id_7"), $("#anodeRapping_text_id_1"),
	    $("#rappingControlWay_rect_id_25"), $("#rappingControlWay_rect_id_26"),$("#rappingControlWay_rect_id_27"), $("#rappingControlWay_rect_id_28"), 
	    $("#rappingControlWay_text_id_25"),$("#rappingControlWay_text_id_28"), $("#rappingControlWay_text_id_29"), $("#rappingControlWay_text_id_31"), 
	    $("#rapping_state_rect_id_8"), $("#cathodeRapping_text_id_1"),
	    $("#rappingControlWay_rect_id_29"), $("#rappingControlWay_rect_id_30"), $("#rappingControlWay_rect_id_31"), $("#rappingControlWay_rect_id_32"), 
	    $("#rappingControlWay_text_id_26"),$("#rappingControlWay_text_id_27"), $("#rappingControlWay_text_id_30"), $("#rappingControlWay_text_id_32")));
    A12 = new RappingGroup("A12", "0","1","0","1", new RappingSvgGroup($("#unitNum_text_id_15"), $("#resetBtn_text_id_16"), $("#rapping_state_rect_id_5"), $("#anodeRapping_text_id_2"),
	    $("#rappingControlWay_rect_id_17"), $("#rappingControlWay_rect_id_18"), $("#rappingControlWay_rect_id_19"), $("#rappingControlWay_rect_id_20"), $("#rappingControlWay_text_id_17"),
	    $("#rappingControlWay_text_id_20"), $("#rappingControlWay_text_id_21"), $("#rappingControlWay_text_id_23"), $("#rapping_state_rect_id_6"), $("#cathodeRapping_text_id_2"),
	    $("#rappingControlWay_rect_id_21"), $("#rappingControlWay_rect_id_22"), $("#rappingControlWay_rect_id_23"), $("#rappingControlWay_rect_id_24"), $("#rappingControlWay_text_id_18"),
	    $("#rappingControlWay_text_id_19"), $("#rappingControlWay_text_id_22"), $("#rappingControlWay_text_id_24")));
    A13 = new RappingGroup("A13", "0","1","0","1", new RappingSvgGroup($("#unitNum_text_id_16"), $("#resetBtn_text_id_7"), $("#rapping_state_rect_id_3"), $("#anodeRapping_text_id_3"),
	    $("#rappingControlWay_rect_id_9"), $("#rappingControlWay_rect_id_10"), $("#rappingControlWay_rect_id_11"), $("#rappingControlWay_rect_id_12"), $("#rappingControlWay_text_id_9"),
	    $("#rappingControlWay_text_id_12"), $("#rappingControlWay_text_id_13"), $("#rappingControlWay_text_id_15"), $("#rapping_state_rect_id_4"), $("#cathodeRapping_text_id_3"),
	    $("#rappingControlWay_rect_id_13"), $("#rappingControlWay_rect_id_14"), $("#rappingControlWay_rect_id_15"), $("#rappingControlWay_rect_id_16"), $("#rappingControlWay_text_id_10"),
	    $("#rappingControlWay_text_id_11"), $("#rappingControlWay_text_id_14"), $("#rappingControlWay_text_id_16")));
    A14 = new RappingGroup("A14", "0","1","0","1", new RappingSvgGroup($("#unitNum_text_id_1"), $("#resetBtn_text_id_6"),
	    $("#rapping_state_rect_id_1"), $("#anodeRapping_text_id_4"),
	    $("#rappingControlWay_rect_id_1"), $("#rappingControlWay_rect_id_2"), $("#rappingControlWay_rect_id_3"), $("#rappingControlWay_rect_id_4"), $("#rappingControlWay_text_id_1"),
	    $("#rappingControlWay_text_id_4"), $("#rappingControlWay_text_id_5"), $("#rappingControlWay_text_id_7"), $("#rapping_state_rect_id_2"), $("#cathodeRapping_text_id_4"),
	    $("#rappingControlWay_rect_id_5"), $("#rappingControlWay_rect_id_6"), $("#rappingControlWay_rect_id_7"), $("#rappingControlWay_rect_id_8"), $("#rappingControlWay_text_id_2"),
	    $("#rappingControlWay_text_id_3"), $("#rappingControlWay_text_id_6"), $("#rappingControlWay_text_id_8")));
    A21 = new RappingGroup("A21", "0","1","0","1", new RappingSvgGroup($("#unitNum_text_id_10"), $("#resetBtn_text_id_9"), $("#rapping_state_rect_id_15"), $("#anodeRapping_text_id_5"),
	    $("#rappingControlWay_rect_id_113"), $("#rappingControlWay_rect_id_114"), $("#rappingControlWay_rect_id_115"), $("#rappingControlWay_rect_id_116"), $("#rappingControlWay_text_id_113"),
	    $("#rappingControlWay_text_id_116"), $("#rappingControlWay_text_id_117"), $("#rappingControlWay_text_id_119"), $("#rapping_state_rect_id_16"), $("#cathodeRapping_text_id_5"),
	    $("#rappingControlWay_rect_id_117"), $("#rappingControlWay_rect_id_118"), $("#rappingControlWay_rect_id_119"), $("#rappingControlWay_rect_id_120"), $("#rappingControlWay_text_id_114"),
	    $("#rappingControlWay_text_id_115"), $("#rappingControlWay_text_id_118"), $("#rappingControlWay_text_id_120")));
    A22 = new RappingGroup("A22", "0","1","0","1", new RappingSvgGroup($("#unitNum_text_id_11"), $("#resetBtn_text_id_8"), $("#rapping_state_rect_id_13"), $("#anodeRapping_text_id_6"),
	    $("#rappingControlWay_rect_id_49"), $("#rappingControlWay_rect_id_50"), $("#rappingControlWay_rect_id_51"), $("#rappingControlWay_rect_id_52"), $("#rappingControlWay_text_id_49"),
	    $("#rappingControlWay_text_id_52"), $("#rappingControlWay_text_id_53"), $("#rappingControlWay_text_id_55"), $("#rapping_state_rect_id_14"), $("#cathodeRapping_text_id_6"),
	    $("#rappingControlWay_rect_id_53"), $("#rappingControlWay_rect_id_54"), $("#rappingControlWay_rect_id_55"), $("#rappingControlWay_rect_id_56"), $("#rappingControlWay_text_id_50"),
	    $("#rappingControlWay_text_id_51"), $("#rappingControlWay_text_id_54"), $("#rappingControlWay_text_id_56")));
    A23 = new RappingGroup("A23", "0","1","0","1", new RappingSvgGroup($("#unitNum_text_id_12"), $("#resetBtn_text_id_5"), $("#rapping_state_rect_id_11"), $("#anodeRapping_text_id_7"),
	    $("#rappingControlWay_rect_id_41"), $("#rappingControlWay_rect_id_42"), $("#rappingControlWay_rect_id_43"), $("#rappingControlWay_rect_id_44"), $("#rappingControlWay_text_id_41"),
	    $("#rappingControlWay_text_id_44"), $("#rappingControlWay_text_id_45"), $("#rappingControlWay_text_id_47"), $("#rapping_state_rect_id_12"), $("#cathodeRapping_text_id_7"),
	    $("#rappingControlWay_rect_id_45"), $("#rappingControlWay_rect_id_46"), $("#rappingControlWay_rect_id_47"), $("#rappingControlWay_rect_id_48"), $("#rappingControlWay_text_id_42"),
	    $("#rappingControlWay_text_id_43"), $("#rappingControlWay_text_id_46"), $("#rappingControlWay_text_id_48")));
    A24 = new RappingGroup("A24", "0","1","0","1", new RappingSvgGroup($("#unitNum_text_id_13"), $("#resetBtn_text_id_4"), $("#rapping_state_rect_id_9"), $("#anodeRapping_text_id_8"),
	    $("#rappingControlWay_rect_id_33"), $("#rappingControlWay_rect_id_34"), $("#rappingControlWay_rect_id_35"), $("#rappingControlWay_rect_id_36"), $("#rappingControlWay_text_id_33"),
	    $("#rappingControlWay_text_id_36"), $("#rappingControlWay_text_id_37"), $("#rappingControlWay_text_id_39"), $("#rapping_state_rect_id_10"), $("#cathodeRapping_text_id_8"),
	    $("#rappingControlWay_rect_id_37"), $("#rappingControlWay_rect_id_38"), $("#rappingControlWay_rect_id_39"), $("#rappingControlWay_rect_id_40"), $("#rappingControlWay_text_id_34"),
	    $("#rappingControlWay_text_id_35"), $("#rappingControlWay_text_id_38"), $("#rappingControlWay_text_id_40")));
    B11 = new RappingGroup("B11", "0","1","0","1", new RappingSvgGroup($("#unitNum_text_id_6"), $("#resetBtn_text_id_10"), $("#rapping_state_rect_id_23"), $("#anodeRapping_text_id_9"),
	    $("#rappingControlWay_rect_id_73"), $("#rappingControlWay_rect_id_74"), $("#rappingControlWay_rect_id_75"), $("#rappingControlWay_rect_id_76"), $("#rappingControlWay_text_id_73"),
	    $("#rappingControlWay_text_id_76"), $("#rappingControlWay_text_id_77"), $("#rappingControlWay_text_id_79"), $("#rapping_state_rect_id_24"), $("#cathodeRapping_text_id_9"),
	    $("#rappingControlWay_rect_id_77"), $("#rappingControlWay_rect_id_78"), $("#rappingControlWay_rect_id_79"), $("#rappingControlWay_rect_id_80"), $("#rappingControlWay_text_id_74"),
	    $("#rappingControlWay_text_id_75"), $("#rappingControlWay_text_id_78"), $("#rappingControlWay_text_id_80")));
    B12 = new RappingGroup("B12", "0","1","0","1", new RappingSvgGroup($("#unitNum_text_id_7"), $("#resetBtn_text_id_3"), 
	    $("#rapping_state_rect_id_21"), $("#anodeRapping_text_id_10"),
	    $("#rappingControlWay_rect_id_65"), $("#rappingControlWay_rect_id_66"), $("#rappingControlWay_rect_id_67"), $("#rappingControlWay_rect_id_68"), $("#rappingControlWay_text_id_65"),
	    $("#rappingControlWay_text_id_68"), $("#rappingControlWay_text_id_69"), $("#rappingControlWay_text_id_71"), $("#rapping_state_rect_id_22"), $("#cathodeRapping_text_id_10"),
	    $("#rappingControlWay_rect_id_69"), $("#rappingControlWay_rect_id_70"), $("#rappingControlWay_rect_id_71"), $("#rappingControlWay_rect_id_72"), $("#rappingControlWay_text_id_66"),
	    $("#rappingControlWay_text_id_67"), $("#rappingControlWay_text_id_70"), $("#rappingControlWay_text_id_72")));
    B13 = new RappingGroup("B13", "0","1","0","1", new RappingSvgGroup($("#unitNum_text_id_8"), $("#resetBtn_text_id_2"), 
	    $("#rapping_state_rect_id_19"), $("#anodeRapping_text_id_11"),
	    $("#rappingControlWay_rect_id_121"), $("#rappingControlWay_rect_id_122"), 
	    $("#rappingControlWay_rect_id_123"), $("#rappingControlWay_rect_id_124"), $("#rappingControlWay_text_id_121"),$("#rappingControlWay_text_id_124"), 
	    $("#rappingControlWay_text_id_125"), $("#rappingControlWay_text_id_127"), $("#rapping_state_rect_id_20"), $("#cathodeRapping_text_id_11"),
	    $("#rappingControlWay_rect_id_125"), $("#rappingControlWay_rect_id_126"),
	    $("#rappingControlWay_rect_id_127"), $("#rappingControlWay_rect_id_128"), $("#rappingControlWay_text_id_122"),
	    $("#rappingControlWay_text_id_123"), $("#rappingControlWay_text_id_126"), $("#rappingControlWay_text_id_128")));
    B14 = new RappingGroup("B14", "0","1","0","1", new RappingSvgGroup($("#unitNum_text_id_9"), $("#resetBtn_text_id_1"), 
	    $("#rapping_state_rect_id_17"), $("#anodeRapping_text_id_12"),
	    $("#rappingControlWay_rect_id_57"), $("#rappingControlWay_rect_id_58"), $("#rappingControlWay_rect_id_59"), $("#rappingControlWay_rect_id_60"),
	    $("#rappingControlWay_text_id_57"), $("#rappingControlWay_text_id_60"), $("#rappingControlWay_text_id_61"),$("#rappingControlWay_text_id_63"),
	    $("#rapping_state_rect_id_18"), $("#cathodeRapping_text_id_12"), 
	    $("#rappingControlWay_rect_id_61"), $("#rappingControlWay_rect_id_62"), $("#rappingControlWay_rect_id_63"), $("#rappingControlWay_rect_id_64"), 
	    $("#rappingControlWay_text_id_58"), $("#rappingControlWay_text_id_59"), $("#rappingControlWay_text_id_62"),$("#rappingControlWay_text_id_64")));
    B21 = new RappingGroup("B21", "0","1","0","1", new RappingSvgGroup($("#unitNum_text_id_2"), $("#resetBtn_text_id_14"), $("#rapping_state_rect_id_31"), $("#anodeRapping_text_id_13"),
	    $("#rappingControlWay_rect_id_105"), $("#rappingControlWay_rect_id_106"), $("#rappingControlWay_rect_id_107"), $("#rappingControlWay_rect_id_108"), $("#rappingControlWay_text_id_105"),
	    $("#rappingControlWay_text_id_108"), $("#rappingControlWay_text_id_109"), $("#rappingControlWay_text_id_111"), $("#rapping_state_rect_id_32"), $("#cathodeRapping_text_id_13"),
	    $("#rappingControlWay_rect_id_109"), $("#rappingControlWay_rect_id_110"), $("#rappingControlWay_rect_id_111"), $("#rappingControlWay_rect_id_112"), $("#rappingControlWay_text_id_106"),
	    $("#rappingControlWay_text_id_107"), $("#rappingControlWay_text_id_110"), $("#rappingControlWay_text_id_112")));
    B22 = new RappingGroup("B22", "0","1","0","1", new RappingSvgGroup($("#unitNum_text_id_3"), $("#resetBtn_text_id_13"), $("#rapping_state_rect_id_29"), $("#anodeRapping_text_id_14"),
	    $("#rappingControlWay_rect_id_97"), $("#rappingControlWay_rect_id_98"), $("#rappingControlWay_rect_id_99"), $("#rappingControlWay_rect_id_100"), $("#rappingControlWay_text_id_97"),
	    $("#rappingControlWay_text_id_100"), $("#rappingControlWay_text_id_101"), $("#rappingControlWay_text_id_103"), $("#rapping_state_rect_id_30"), $("#cathodeRapping_text_id_14"),
	    $("#rappingControlWay_rect_id_101"), $("#rappingControlWay_rect_id_102"), $("#rappingControlWay_rect_id_103"), $("#rappingControlWay_rect_id_104"), $("#rappingControlWay_text_id_98"),
	    $("#rappingControlWay_text_id_99"), $("#rappingControlWay_text_id_102"), $("#rappingControlWay_text_id_104")));
    B23 = new RappingGroup("B23", "0","1","0","1", new RappingSvgGroup($("#unitNum_text_id_4"), $("#resetBtn_text_id_12"), $("#rapping_state_rect_id_27"), $("#anodeRapping_text_id_15"),
	    $("#rappingControlWay_rect_id_89"), $("#rappingControlWay_rect_id_90"), $("#rappingControlWay_rect_id_91"), $("#rappingControlWay_rect_id_92"), $("#rappingControlWay_text_id_89"),
	    $("#rappingControlWay_text_id_92"), $("#rappingControlWay_text_id_93"), $("#rappingControlWay_text_id_95"), $("#rapping_state_rect_id_28"), $("#cathodeRapping_text_id_15"),
	    $("#rappingControlWay_rect_id_93"), $("#rappingControlWay_rect_id_94"), $("#rappingControlWay_rect_id_95"), $("#rappingControlWay_rect_id_96"), $("#rappingControlWay_text_id_90"),
	    $("#rappingControlWay_text_id_91"), $("#rappingControlWay_text_id_94"), $("#rappingControlWay_text_id_96")));
    B24 = new RappingGroup("B24", "0","1","0","1", new RappingSvgGroup($("#unitNum_text_id_5"), $("#resetBtn_text_id_11"), $("#rapping_state_rect_id_25"), $("#anodeRapping_text_id_16"),
	    $("#rappingControlWay_rect_id_81"), $("#rappingControlWay_rect_id_82"), $("#rappingControlWay_rect_id_83"), $("#rappingControlWay_rect_id_84"), $("#rappingControlWay_text_id_81"),
	    $("#rappingControlWay_text_id_84"), $("#rappingControlWay_text_id_85"), $("#rappingControlWay_text_id_87"), $("#rapping_state_rect_id_26"), $("#cathodeRapping_text_id_16"),
	    $("#rappingControlWay_rect_id_85"), $("#rappingControlWay_rect_id_86"), $("#rappingControlWay_rect_id_87"), $("#rappingControlWay_rect_id_88"), $("#rappingControlWay_text_id_82"),
	    $("#rappingControlWay_text_id_83"), $("#rappingControlWay_text_id_86"), $("#rappingControlWay_text_id_88")));
    RappingGroupsArray = [ A11, A12, A13, A14, A21, A22, A23, A24, B11, B12, B13, B14, B21, B22, B23, B24 ];
    
    for(var i=0;i<RappingGroupsArray.length;i++){
	RappingGroupsArray[i].initEle();
    }
}

function RappingGroup(unitNum, anodeRappingState, anodeRappingWay,catchodeRappingState,catchodeRappingWay, rappingSvgGroup) {
    this.unitNum = unitNum;
    this.anodeRappingState = anodeRappingState;
    this.anodeRappingWay = anodeRappingWay;
    this.catchodeRappingState = catchodeRappingState;
    this.catchodeRappingWay = catchodeRappingWay;
    this.rappingSvgGroup = rappingSvgGroup;
}
RappingGroup.prototype.freshRunState = function(epName,anodeRunState,cathodeRunState){
    this.anodeRappingState = anodeRunState;
    this.catchodeRappingState = cathodeRunState;
    this.rappingSvgGroup.freshRunState(epName,anodeRunState,cathodeRunState);
};
RappingGroup.prototype.freshRunMode = function(epId,anodeRapperId,cathodeRapperId,anodeRunMode,cathodeRunMode){
    this.anodeRappingWay = anodeRunMode;
    this.catchodeRappingWay = cathodeRunMode;
    this.rappingSvgGroup.freshRunMode(epId,anodeRapperId,cathodeRapperId,anodeRunMode,cathodeRunMode);
};
RappingGroup.prototype.initEle = function(){
    this.rappingSvgGroup.initUnitNum(this);
    this.rappingSvgGroup.initRestBtn();
    this.rappingSvgGroup.initAnodeRapping(this);
    this.rappingSvgGroup.initCatchodeRapping(this);
    this.rappingSvgGroup.initAnodeRappigWay(this);
    this.rappingSvgGroup.initCatchodeRappingWay(this);
};
function RappingSvgGroup(unitNumObj, reSetBtn, anodeRappingRect, anodeRappingText, anodeRappingWayForAuto, anodeRappingWayForCycle, anodeRappingWayForContinuous, anodeRappingWayForStop,
	anodeRappingWayForAutoText, anodeRappingWayForCycleText, anodeRappingWayForContinuousText, anodeRappingWayForStopText, catchodeRappingRect, catchodeRappingText, catchodeRappingWayForAuto,
	catchodeRappingWayForCycle, catchodeRappingWayForContinuous, catchodeRappingWayForStop, catchodeRappingWayForAutoText, catchodeRappingWayForCycleText, catchodeRappingWayForContinuousText,
	catchodeRappingWayForStopText) {
    this.unitNumObj = unitNumObj;
    this.reSetBtn = reSetBtn;

    this.anodeRappingRect = anodeRappingRect;
    this.anodeRappingText = anodeRappingText;
    
    this.anodeRappingWayForAuto = anodeRappingWayForAuto;
    this.anodeRappingWayForCycle = anodeRappingWayForCycle;
    this.anodeRappingWayForContinuous = anodeRappingWayForContinuous;
    this.anodeRappingWayForStop = anodeRappingWayForStop;
    this.anodeRappingWayForAutoText = anodeRappingWayForAutoText;
    this.anodeRappingWayForCycleText = anodeRappingWayForCycleText;
    this.anodeRappingWayForContinuousText = anodeRappingWayForContinuousText;
    this.anodeRappingWayForStopText = anodeRappingWayForStopText;

    this.catchodeRappingRect = catchodeRappingRect;
    this.catchodeRappingText = catchodeRappingText;
    
    this.catchodeRappingWayForAuto = catchodeRappingWayForAuto;
    this.catchodeRappingWayForCycle = catchodeRappingWayForCycle;
    this.catchodeRappingWayForContinuous = catchodeRappingWayForContinuous;
    this.catchodeRappingWayForStop = catchodeRappingWayForStop;
    this.catchodeRappingWayForAutoText = catchodeRappingWayForAutoText;
    this.catchodeRappingWayForCycleText = catchodeRappingWayForCycleText;
    this.catchodeRappingWayForContinuousText = catchodeRappingWayForContinuousText;
    this.catchodeRappingWayForStopText = catchodeRappingWayForStopText;
};
RappingSvgGroup.prototype.initUnitNum = function(rappingGroup){
    this.unitNumObj.html(rappingGroup.unitNum);
};
RappingSvgGroup.prototype.initRestBtn = function(){
    this.reSetBtn.html("复位");
};
/**
 * 更新振打状态
 * @param epName
 * @param anodeRunState
 * @param cathodeRunState
 */
RappingSvgGroup.prototype.freshRunState = function(epName,anodeRunState,cathodeRunState){
    this.unitNumObj.html(epName);
    freshRapperState(this.anodeRappingRect,anodeRunState);
    freshRapperState(this.catchodeRappingRect,cathodeRunState);
};
RappingSvgGroup.prototype.freshRunMode = function(epId,anodeRapperId,cathodeRapperId,anodeRunMode,cathodeRunMode){
    this.updateRappermodeId(epId,anodeRapperId,cathodeRapperId);
    freshRapperMode(this,anodeRunMode,0);
    freshRapperMode(this,cathodeRunMode,1);
};
/**
 * 更新振打模式“name”
 * @param epId
 */
RappingSvgGroup.prototype.updateRappermodeId = function(epId,anodeRapperId,cathodeRapperId){
    this.anodeRappingWayForAutoText.attr("name","anodeRappingWayForAuto_1_"+epId+"_" + anodeRapperId);
    this.anodeRappingWayForCycleText.attr("name","anodeRappingWayForAuto_2_"+epId+"_" + anodeRapperId);
    this.anodeRappingWayForContinuousText.attr("name","anodeRappingWayForAuto_3_"+epId+"_" + anodeRapperId);
    this.anodeRappingWayForStopText.attr("name","anodeRappingWayForAuto_0_"+epId+"_" + anodeRapperId);
    
    this.catchodeRappingWayForAutoText.attr('name',"cathodeRappingWayForAuto_1_" + epId+"_" + cathodeRapperId);
    this.catchodeRappingWayForCycleText.attr('name',"cathodeRappingWayForAuto_2_" + epId+"_" + cathodeRapperId);
    this.catchodeRappingWayForContinuousText.attr('name',"cathodeRappingWayForAuto_3_" + epId+"_" + cathodeRapperId);
    this.catchodeRappingWayForStopText.attr('name',"cathodeRappingWayForAuto_0_" + epId+"_" + cathodeRapperId);
    
};
/**
 * 阳极振打状态
 * @param rappingGroup
 */
RappingSvgGroup.prototype.initAnodeRapping = function(rappingGroup){
    this.anodeRappingText.html("阳极振打");
    freshRapperState(this.anodeRappingRect,rappingGroup.anodeRappingState);
};
/**
 * 振打运行状态
 */
function freshRapperState(svgObj,state){
    switch(parseInt(state)){
    	case -1:svgObj.attr("fill","#CCCCCC");break;	//通讯故障
	case 0:svgObj.attr("fill","#00ff00");break;	//停运
	case 1:svgObj.attr("fill","red");break;	//运行
	case 2:svgObj.attr("fill","yellow");break;	//故障
	default:alert("数据错误!" +"," + svgObj.attr("id") + ","+svgObj.attr('name'));
    }
}
/**
 * 阴极振打状态
 * @param rappingGroup
 */
RappingSvgGroup.prototype.initCatchodeRapping = function(rappingGroup){
    this.catchodeRappingText.html("阴极振打");
    freshRapperState(this.catchodeRappingRect,rappingGroup.anodeRappingState);
    
};
/**
 * 振打运行模式
 * anodeOrCathode,	0表示anode，1表示cathode
 */
function freshRapperMode(rappingSvgGroup,state,anodeOrCathode){
    var autoSvg = anodeOrCathode == 0?rappingSvgGroup.anodeRappingWayForAuto:rappingSvgGroup.catchodeRappingWayForAuto;
    var cycleSvg = anodeOrCathode == 0?rappingSvgGroup.anodeRappingWayForCycle:rappingSvgGroup.catchodeRappingWayForCycle;
    var continueSvg = anodeOrCathode == 0?rappingSvgGroup.anodeRappingWayForContinuous:rappingSvgGroup.catchodeRappingWayForContinuous;
    var stopSvg = anodeOrCathode == 0?rappingSvgGroup.anodeRappingWayForStop:rappingSvgGroup.catchodeRappingWayForStop;
    switch(parseInt(state)){
        case 1:
    		autoSvg.attr("fill","red");
        	cycleSvg.attr("fill","#00ff00");
        	continueSvg.attr("fill","#00ff00");
        	stopSvg.attr("fill","#00ff00");
        	break;
        case 2:
    		autoSvg.attr("fill","#00ff00");
        	cycleSvg.attr("fill","red");
        	continueSvg.attr("fill","#00ff00");
        	stopSvg.attr("fill","#00ff00");
        	break;
        case 3:
    		autoSvg.attr("fill","#00ff00");
        	cycleSvg.attr("fill","#00ff00");
        	continueSvg.attr("fill","red");
        	stopSvg.attr("fill","#00ff00");
        	break;
        case 0:
    		autoSvg.attr("fill","#00ff00");
        	cycleSvg.attr("fill","#00ff00");
        	continueSvg.attr("fill","#00ff00");
        	stopSvg.attr("fill","red");
        	break;
        case -1:
                autoSvg.attr("fill","#CCCCCC");
        	cycleSvg.attr("fill","#CCCCCC");
        	continueSvg.attr("fill","#CCCCCC");
        	stopSvg.attr("fill","#CCCCCC");
        	break;
        default:alert("数据错误" +state  +"," + anodeOrCathode);
    }
}

/**
 * 阳极振打模式
 * @param rappingGroup
 */
RappingSvgGroup.prototype.initAnodeRappigWay = function(rappingGroup){
    this.anodeRappingWayForAutoText.css("cursor","pointer").html("自动").bind("click",rapperRunModeChange);
    this.anodeRappingWayForCycleText.css("cursor","pointer").html("周期").bind("click",rapperRunModeChange);
    this.anodeRappingWayForContinuousText.css("cursor","pointer").html("连续").bind("click",rapperRunModeChange);
    this.anodeRappingWayForStopText.css("cursor","pointer").html("停止").bind("click",rapperRunModeChange);
    
    freshRapperMode(this,1,0);
    
};
/**
 * 阴极振打模式
 * @param rappingGroup
 */
RappingSvgGroup.prototype.initCatchodeRappingWay = function(rappingGroup){
    this.catchodeRappingWayForAutoText.css("cursor","pointer").html("自动").bind("click",rapperRunModeChange);
//    this.catchodeRappingWayForAutoText.attr("display","none");
    this.catchodeRappingWayForCycleText.css("cursor","pointer").html("周期").bind("click",rapperRunModeChange);
    this.catchodeRappingWayForContinuousText.css("cursor","pointer").html("连续").bind("click",rapperRunModeChange);
    this.catchodeRappingWayForStopText.css("cursor","pointer").html("停止").bind("click",rapperRunModeChange);
    
    freshRapperMode(this,1,1);
};
/**
 * 振打模式的改变
 * "cathodeRappingWayForAuto_1_" + epId +"_" + rapperId;
 */
function rapperRunModeChange(){
    var currentObjName = $(this).attr("name");
    var epId = currentObjName.split("_")[2];
    var rapperId = currentObjName.split("_")[3];
    var rapperMode = currentObjName.split("_")[1];
    var url = ctx + "/updateRapperForNoReturn.do?rapper.id=" + rapperId + "&rapper.runType=" + rapperMode;
    $.get(url,function(){
	
    });
}