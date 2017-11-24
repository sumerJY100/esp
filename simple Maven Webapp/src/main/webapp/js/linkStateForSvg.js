$(document).ready(function() {
    $("#linkStateSvg").svg({
	onLoad : function() {
	    var svg = $("#linkStateSvg").svg('get');
	    svg.load('SVG/sysStateForOne.svg', {
		addTo : true,
		changeSize : false
	    });
	},
	settings : {}
    });
     setTimeout(initSvgObj, 1000);
//    window.setTimeout(function() {
//	$("image").remove();
//	initSvg();
//    }, 2000);
});
var linkGroupsArray,A11_3, A12_3, A13_3, A14_3, A21_3, A22_3, A23_3, A24_3, B11_3, B12_3, B13_3, B14_3, B21_3, B22_3, B23_3, B24_3,
A11_4, A12_4, A13_4, A14_4, A21_4, A22_4, A23_4, A24_4, B11_4, B12_4, B13_4, B14_4, B21_4, B22_4, B23_4, B24_4;
function initSvgObj(){
    $("[id^='text']").attr("stroke","none");
    A11_3 = new LinkState("3A11","IP11",0,new LinkStateSvg($("#text_id_63"),$("#text_id_39"),$("#rect_id_29"),$("#line_id_19")));
    A12_3 = new LinkState("3A12","IP12",0,new LinkStateSvg($("#text_id_64"),$("#text_id_40"),$("#rect_id_31"),$("#line_id_21")));
    A13_3 = new LinkState("3A13","IP13",0,new LinkStateSvg($("#text_id_61"),$("#text_id_37"),$("#rect_id_25"),$("#line_id_23")));
    A14_3 = new LinkState("3A14","IP14",0,new LinkStateSvg($("#text_id_62"),$("#text_id_38"),$("#rect_id_27"),$("#line_id_25")));
    A21_3 = new LinkState("3A21","IP15",0,new LinkStateSvg($("#text_id_59"),$("#text_id_35"),$("#rect_id_21"),$("#line_id_27")));
    A22_3 = new LinkState("3A22","IP16",0,new LinkStateSvg($("#text_id_60"),$("#text_id_36"),$("#rect_id_23"),$("#line_id_29")));
    A23_3 = new LinkState("3A23","IP17",0,new LinkStateSvg($("#text_id_57"),$("#text_id_33"),$("#rect_id_17"),$("#line_id_31")));
    A24_3 = new LinkState("3A24","IP18",0,new LinkStateSvg($("#text_id_58"),$("#text_id_34"),$("#rect_id_19"),$("#line_id_17")));
    
    B11_3 = new LinkState("3B11","IP21",0,new LinkStateSvg($("#text_id_47"),$("#text_id_55"),$("#rect_id_30"),$("#line_id_20")));
    B12_3 = new LinkState("3B12","IP22",0,new LinkStateSvg($("#text_id_48"),$("#text_id_56"),$("#rect_id_32"),$("#line_id_22")));
    B13_3 = new LinkState("3B13","IP23",0,new LinkStateSvg($("#text_id_45"),$("#text_id_53"),$("#rect_id_26"),$("#line_id_24")));
    B14_3 = new LinkState("3B14","IP24",0,new LinkStateSvg($("#text_id_46"),$("#text_id_54"),$("#rect_id_28"),$("#line_id_26")));
    B21_3 = new LinkState("3B21","IP25",0,new LinkStateSvg($("#text_id_43"),$("#text_id_51"),$("#rect_id_22"),$("#line_id_28")));
    B22_3 = new LinkState("3B22","IP26",0,new LinkStateSvg($("#text_id_44"),$("#text_id_52"),$("#rect_id_24"),$("#line_id_30")));
    B23_3 = new LinkState("3B23","IP27",0,new LinkStateSvg($("#text_id_41"),$("#text_id_49"),$("#rect_id_18"),$("#line_id_32")));
    B24_3 = new LinkState("3B24","IP28",0,new LinkStateSvg($("#text_id_42"),$("#text_id_50"),$("#rect_id_20"),$("#line_id_18")));
  /**  
    A11_4 = new LinkState("4A11","IP31",0,new LinkStateSvg($("#text_id_31"),$("#text_id_7"),$("#rect_id_13"),$("#line_id_3")));
    A12_4 = new LinkState("4A12","IP32",0,new LinkStateSvg($("#text_id_32"),$("#text_id_8"),$("#rect_id_15"),$("#line_id_5")));
    A13_4 = new LinkState("4A13","IP33",0,new LinkStateSvg($("#text_id_29"),$("#text_id_5"),$("#rect_id_9"),$("#line_id_7")));
    A14_4 = new LinkState("4A14","IP34",0,new LinkStateSvg($("#text_id_30"),$("#text_id_6"),$("#rect_id_11"),$("#line_id_9")));
    A21_4 = new LinkState("4A21","IP35",0,new LinkStateSvg($("#text_id_27"),$("#text_id_3"),$("#rect_id_5"),$("#line_id_11")));
    A22_4 = new LinkState("4A22","IP36",0,new LinkStateSvg($("#text_id_28"),$("#text_id_4"),$("#rect_id_7"),$("#line_id_13")));
    A23_4 = new LinkState("4A23","IP37",0,new LinkStateSvg($("#text_id_25"),$("#text_id_1"),$("#rect_id_1"),$("#line_id_15")));
    A24_4 = new LinkState("4A24","IP38",0,new LinkStateSvg($("#text_id_26"),$("#text_id_2"),$("#rect_id_3"),$("#line_id_1")));
    
    B11_4 = new LinkState("4B11","IP41",0,new LinkStateSvg($("#text_id_15"),$("#text_id_23"),$("#rect_id_14"),$("#line_id_4")));
    B12_4 = new LinkState("4B12","IP42",0,new LinkStateSvg($("#text_id_16"),$("#text_id_24"),$("#rect_id_16"),$("#line_id_6")));
    B13_4 = new LinkState("4B13","IP43",0,new LinkStateSvg($("#text_id_13"),$("#text_id_21"),$("#rect_id_10"),$("#line_id_8")));
    B14_4 = new LinkState("4B14","IP44",0,new LinkStateSvg($("#text_id_14"),$("#text_id_22"),$("#rect_id_12"),$("#line_id_10")));
    B21_4 = new LinkState("4B21","IP45",0,new LinkStateSvg($("#text_id_11"),$("#text_id_19"),$("#rect_id_6"),$("#line_id_12")));
    B22_4 = new LinkState("4B22","IP46",0,new LinkStateSvg($("#text_id_12"),$("#text_id_20"),$("#rect_id_8"),$("#line_id_14")));
    B23_4 = new LinkState("4B23","IP47",0,new LinkStateSvg($("#text_id_9"),$("#text_id_17"),$("#rect_id_2"),$("#line_id_16")));
    B24_4 = new LinkState("4B24","IP48",0,new LinkStateSvg($("#text_id_10"),$("#text_id_18"),$("#rect_id_4"),$("#line_id_2")));
    */
    linkGroupsArray = [A11_3, A12_3, A13_3, A14_3, A21_3, A22_3, A23_3, A24_3, B11_3, B12_3, B13_3, B14_3, B21_3, B22_3, B23_3, B24_3];
//                       A11_4, A12_4, A13_4, A14_4, A21_4, A22_4, A23_4, A24_4, B11_4, B12_4, B13_4, B14_4, B21_4, B22_4, B23_4, B24_4];
    for(var i=0;i<linkGroupsArray.length;i++){
	linkGroupsArray[i].initSvg();
    }
}
function LinkState(unitNum,linkText,linkState,linkStateSvg){
    this.unitNum = unitNum;
    this.linkText = linkText;
    this.linkState = linkState;
    this.linkStateSvg = linkStateSvg;
}
LinkState.prototype.initSvg = function(){
  this.linkStateSvg.initUnitNum(this);
  this.linkStateSvg.initLinkText(this);
  this.linkStateSvg.setLinkState(this);
};
LinkState.prototype.freshData = function(epName,linkState){
    this.unitNum = epName;
    this.linkText = "";
    this.linkState = linkState;
    this.initSvg();
};
function LinkStateSvg(unitNumText,linkText,linkStateRect,linkStateLine){
    this.unitNumText = unitNumText;
    this.linkText = linkText;
    this.linkStateRect = linkStateRect;
    this.linkStateLine = linkStateLine;
};
LinkStateSvg.prototype.initUnitNum = function(linkState){
    this.unitNumText.html(linkState.unitNum);
};
LinkStateSvg.prototype.initLinkText = function(linkState){
    this.linkText.html(linkState.linkText);
};
LinkStateSvg.prototype.setLinkState = function(linkState){
    switch(parseInt(linkState.linkState)){
    case 1:this.linkStateRect.attr("fill","#F0F8FF");this.linkStateLine.attr("fill","#F0F8FF");break;
    case 0:this.linkStateRect.attr("fill","#ff0000");this.linkStateLine.attr("fill","#ff0000");break;
	default: alert("数据错误!");
    }
};