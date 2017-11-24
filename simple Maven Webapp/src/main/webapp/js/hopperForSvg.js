$(document).ready(function() {
    /**
     * var svg = $("#hopper").svg({ onLoad : function() { var svg =
     * $("#hopper").svg('get'); svg.load('SVG/hopper.svg', { addTo : true,
     * changeSize : false }); }, settings : {} });
     */
    // $("#hopper").svg();
    $("#hopper").svg({
	loadURL : 'SVG/hopper.svg'
    });

    // $("#gradient").svg();
    // $("#gradient").svg({loadURL:"SVG/hopper.svg"});
    // var svg = $("#gradient").svg("get");
    // svg.circle(130, 75, 50, {fill: 'none', stroke: 'red', strokeWidth: 3});
    // alert(svg);

    $('#btnTest').click(function(e) {
	// alert($("#text_ForId_1").html("测试"));
	// alert($("#test_eclipse").attr("fill"));
	$("#test_eclipse").attr("fill", "url(#radialGradient)");
    });
    setTimeout(init, 1000);
    setTimeout(initText, 1000);

});
function initText() {
    $("text").attr("stroke", "none");
    initBoiler(4);

    $("#text_ForId_84").html("电场一");
    $("#text_ForId_85").html("电场二");
    $("#text_ForId_86").html("电场三");
    $("#text_ForId_87").html("电场四");

    // var svg = $("#hopper").svg("get");
    // var g = svg.group();
    // svg.rect( 50, 50, 300, 100,
    // {fill: '$00f0f0', stroke: 'black',
    // strokeWidth: 5});
}

/**
 * 实例化几号锅炉
 */
function initBoiler(boilerNum) {
    $("#text_ForId_61").html(boilerNum + "号炉A侧");
    $("#text_ForId_20").html(boilerNum + "号炉B侧");

}
var hopperGroupArray, A11, A12, A13, A14, A21, A22, A23, A24, B11, B12, B13, B14, B21, B22, B23, B24;
function init() {

    A11 = new HopperGroup("A11", new Hopper("出口泵", "15", 
	    				new HopperSVG($("#text_ForId_57"), $("#text_ForId_53"), 
	    					new HopperLevelRectSvg($("#leftLine_id_1"), $("#rightLine_id_1"),$("#bottomLine_id_1"), $("#pathFilled_id_1")))), 
	    			new Hopper("副2泵", "99", 
	    				new HopperSVG($("#text_ForId_58"), $("#text_ForId_54"), 
	    					new HopperLevelRectSvg($("#leftLine_id_2"),$("#rightLine_id_2"), $("#bottomLine_id_2"), $("#pathFilled_id_2")))), 
	    			$("#text_ForId_62"));
    A21 = new HopperGroup("A21", new Hopper("副1泵", "30", 
	    				new HopperSVG($("#text_ForId_59"), $("#text_ForId_55"), 
	    					new HopperLevelRectSvg($("#leftLine_id_3"), $("#rightLine_id_3"),$("#bottomLine_id_3"), $("#pathFilled_id_3")))), 
	    			new Hopper("主泵", "75", 
	    				new HopperSVG($("#text_ForId_60"), $("#text_ForId_56"), 
	    					new HopperLevelRectSvg($("#leftLine_id_4"),$("#rightLine_id_4"), $("#bottomLine_id_4"), $("#pathFilled_id_4")))), 
	    		$("#text_ForId_63"));
    A12 = new HopperGroup("A12", new Hopper("出口泵", "30", new HopperSVG($("#text_ForId_78"), $("#text_ForId_74"), new HopperLevelRectSvg($("#leftLine_id_5"), $("#rightLine_id_5"),
	    $("#bottomLine_id_5"), $("#pathFilled_id_5")))), new Hopper("副2泵", "75", new HopperSVG($("#text_ForId_79"), $("#text_ForId_75"), new HopperLevelRectSvg($("#leftLine_id_6"),
	    $("#rightLine_id_6"), $("#bottomLine_id_6"), $("#pathFilled_id_6")))), $("#text_ForId_82"));
    A22 = new HopperGroup("A22", new Hopper("副1泵", "28", new HopperSVG($("#text_ForId_80"), $("#text_ForId_76"), new HopperLevelRectSvg($("#leftLine_id_7"), $("#rightLine_id_7"),
	    $("#bottomLine_id_7"), $("#pathFilled_id_7")))), new Hopper("主泵", "99", new HopperSVG($("#text_ForId_81"), $("#text_ForId_77"), new HopperLevelRectSvg($("#leftLine_id_8"),
	    $("#rightLine_id_8"), $("#bottomLine_id_8"), $("#pathFilled_id_8")))), $("#text_ForId_83"));
    A13 = new HopperGroup("A13", new Hopper("出口泵", "40", new HopperSVG($("#text_ForId_68"), $("#text_ForId_64"), 
	    new HopperLevelRectSvg($("#leftLine_id_9"), $("#rightLine_id_9"),$("#bottomLine_id_9"), $("#pathFilled_id_9")))), 
	    new Hopper("副6泵", "20", new HopperSVG($("#text_ForId_69"),
	    $("#text_ForId_65"), 
	    new HopperLevelRectSvg($("#leftLine_id_10"), $("#rightLine_id_10"),$("#bottomLine_id_10"), $("#pathFilled_id_10")))),  
	    $("#text_ForId_72"));
    A23 = new HopperGroup("A23", new Hopper("副5泵", "21", new HopperSVG($("#text_ForId_70"), $("#text_ForId_66"), 
	    new HopperLevelRectSvg($("#leftLine_id_11"), $("#rightLine_id_11"),$("#bottomLine_id_11"), $("#pathFilled_id_11")))),  
	    new Hopper("副4泵", "35", new HopperSVG($("#text_ForId_71"),
	    $("#text_ForId_67"), 
	    new HopperLevelRectSvg($("#leftLine_id_12"), $("#rightLine_id_12"),$("#bottomLine_id_12"), $("#pathFilled_id_12")))), 
	    $("#text_ForId_73"));
    A14 = new HopperGroup("A14", new Hopper("出口泵", "99", new HopperSVG($("#text_ForId_47"), $("#text_ForId_43"), 
	    new HopperLevelRectSvg($("#leftLine_id_13"), $("#rightLine_id_13"),$("#bottomLine_id_13"), $("#pathFilled_id_13")))), new Hopper("副6泵", "30", new HopperSVG($("#text_ForId_48"),
	    $("#text_ForId_44"), new HopperLevelRectSvg($("#leftLine_id_14"), $("#rightLine_id_14"),$("#bottomLine_id_14"), $("#pathFilled_id_14")))), $("#text_ForId_51"));
    A24 = new HopperGroup("A24", new Hopper("副5泵", "80", new HopperSVG($("#text_ForId_49"), $("#text_ForId_45"), 
	    new HopperLevelRectSvg($("#leftLine_id_15"), $("#rightLine_id_15"),$("#bottomLine_id_15"), $("#pathFilled_id_15")))), new Hopper("副4泵", "20", new HopperSVG($("#text_ForId_50"),
	    $("#text_ForId_46"), 
	    new HopperLevelRectSvg($("#leftLine_id_16"), $("#rightLine_id_16"),$("#bottomLine_id_16"), $("#pathFilled_id_16")))), $("#text_ForId_52"));
    B11 = new HopperGroup("B11", new Hopper("出口泵", "20", new HopperSVG($("#text_ForId_16"), $("#text_ForId_12"), 
	    new HopperLevelRectSvg($("#leftLine_id_17"), $("#rightLine_id_17"),$("#bottomLine_id_17"), $("#pathFilled_id_17")))), new Hopper("副2泵", "40", new HopperSVG($("#text_ForId_17"),
	    $("#text_ForId_13"), new HopperLevelRectSvg($("#leftLine_id_18"), $("#rightLine_id_18"),$("#bottomLine_id_18"), $("#pathFilled_id_18")))), $("#text_ForId_21"));
    B21 = new HopperGroup("B21", new Hopper("副1泵", "20", new HopperSVG($("#text_ForId_18"), $("#text_ForId_14"), 
	    new HopperLevelRectSvg($("#leftLine_id_19"), $("#rightLine_id_19"),$("#bottomLine_id_19"), $("#pathFilled_id_19")))), new Hopper("主泵", "20", new HopperSVG($("#text_ForId_19"),
	    $("#text_ForId_15"), new HopperLevelRectSvg($("#leftLine_id_20"), $("#rightLine_id_20"),$("#bottomLine_id_20"), $("#pathFilled_id_20")))), $("#text_ForId_22"));
    B12 = new HopperGroup("B12", new Hopper("出口泵", "20", new HopperSVG($("#text_ForId_37"), $("#text_ForId_33"), 
	    new HopperLevelRectSvg($("#leftLine_id_21"), $("#rightLine_id_21"),$("#bottomLine_id_21"), $("#pathFilled_id_21")))), new Hopper("副2泵", "85", new HopperSVG($("#text_ForId_38"),
	    $("#text_ForId_34"), 
	    new HopperLevelRectSvg($("#leftLine_id_22"), $("#rightLine_id_22"),$("#bottomLine_id_22"), $("#pathFilled_id_22")))), $("#text_ForId_41"));
    B22 = new HopperGroup("B22", new Hopper("副1泵", "99", new HopperSVG($("#text_ForId_39"), $("#text_ForId_35"), 
	    new HopperLevelRectSvg($("#leftLine_id_23"), $("#rightLine_id_23"),$("#bottomLine_id_23"), $("#pathFilled_id_23")))), new Hopper("主泵", "60", new HopperSVG($("#text_ForId_40"),
	    $("#text_ForId_36"),
	    new HopperLevelRectSvg($("#leftLine_id_24"), $("#rightLine_id_24"),$("#bottomLine_id_24"), $("#pathFilled_id_24")))), $("#text_ForId_42"));
    B13 = new HopperGroup("B13", new Hopper("副3泵", "99", new HopperSVG($("#text_ForId_27"), $("#text_ForId_23"), 
	    new HopperLevelRectSvg($("#leftLine_id_25"), $("#rightLine_id_25"),$("#bottomLine_id_25"), $("#pathFilled_id_25")))), new Hopper("副2泵", "20", new HopperSVG($("#text_ForId_28"),
	    $("#text_ForId_24"), 
	    new HopperLevelRectSvg($("#leftLine_id_26"), $("#rightLine_id_26"),$("#bottomLine_id_26"), $("#pathFilled_id_26")))), $("#text_ForId_31"));
    B23 = new HopperGroup("B23", new Hopper("副1泵", "20", new HopperSVG($("#text_ForId_29"), $("#text_ForId_25"), 
	    new HopperLevelRectSvg($("#leftLine_id_27"), $("#rightLine_id_27"),$("#bottomLine_id_27"), $("#pathFilled_id_27")))), new Hopper("主泵", "80", new HopperSVG($("#text_ForId_30"),
	    $("#text_ForId_26"), 
	    new HopperLevelRectSvg($("#leftLine_id_28"), $("#rightLine_id_28"),$("#bottomLine_id_28"), $("#pathFilled_id_28")))), $("#text_ForId_32"));
    B14 = new HopperGroup("B14", new Hopper("副3泵", "79", new HopperSVG($("#text_ForId_5"), $("#text_ForId_1"), 
	    new HopperLevelRectSvg($("#leftLine_id_29"), $("#rightLine_id_29"),$("#bottomLine_id_29"), $("#pathFilled_id_29")))), new Hopper("副2泵", "35", new HopperSVG($("#text_ForId_6"), $("#text_ForId_2"),
		    new HopperLevelRectSvg($("#leftLine_id_30"), $("#rightLine_id_30"),$("#bottomLine_id_30"), $("#pathFilled_id_30")))), $("#text_ForId_9"));
    B24 = new HopperGroup("B24", new Hopper("副1泵", "20", new HopperSVG($("#text_ForId_7"), $("#text_ForId_3"), 
	    new HopperLevelRectSvg($("#leftLine_id_31"), $("#rightLine_id_31"),$("#bottomLine_id_31"), $("#pathFilled_id_31")))), new Hopper("主泵", "20", new HopperSVG($("#text_ForId_8"), $("#text_ForId_4"),
		    new HopperLevelRectSvg($("#leftLine_id_32"), $("#rightLine_id_32"),$("#bottomLine_id_32"), $("#pathFilled_id_32")))),$("#text_ForId_10"));

    hopperGroupArray = [ A11, A12, A13, A14, A21, A22, A23, A24, B11, B12, B13, B14, B21, B22, B23, B24 ];
    for (var i = 0; i < hopperGroupArray.length; i++) {
	hopperGroupArray[i].initSvg();
    }
   // A11.changeHopperLevel(15,30);
   // A21.changeHopperLevel(55,55);
}
function HopperGroup(groupName, leftHopper, rightHopper, groupNameTextSvg) {
    this.groupName = groupName;
    this.leftHopper = leftHopper;
    this.rightHopper = rightHopper;
    this.groupNameTextSvg = groupNameTextSvg;
}
HopperGroup.prototype.initSvg = function() {
    this.groupNameTextSvg.html(this.groupName);
    this.leftHopper.initSvg();
    this.rightHopper.initSvg();
};
/**
 * 料位改变
 * 
 * @param hopperLevel
 */
HopperGroup.prototype.changeHopperLevel = function(leftHopperLevel, rightHopperLevel) {
    // if (leftHopperLevel){
    this.leftHopper.changeHopperLevel(leftHopperLevel);
    // }
    // if (rightHopperLevel)
    this.rightHopper.changeHopperLevel(rightHopperLevel);
};
HopperGroup.prototype.updateHopperData = function(epName, leftHopperName, leftHopperLevel, rightHopperName, rightHopperLevel) {
    this.groupNameTextSvg.html(epName);
    this.changeHopperLevelName(leftHopperName,rightHopperName);
    this.changeHopperLevel(leftHopperLevel, rightHopperLevel);
};
HopperGroup.prototype.changeHopperLevelName = function(leftHopperName,rightHopperName){
    this.leftHopper.hopperSvg.hopperNameTextSvg.html(leftHopperName);
    this.rightHopper.hopperSvg.hopperNameTextSvg.html(rightHopperName);
};
/**
 * @param hopperName
 *                名称
 * @param hopperLevel
 *                料位数据
 * @param hopperSvg
 *                SVG对象
 */
function Hopper(hopperName, hopperLevel, hopperSvg) {
    this.hopperName = hopperName;
    this.hopperLevel = hopperLevel;
    this.hopperSvg = hopperSvg;
}
Hopper.prototype.initSvg = function() {
    this.hopperSvg.initSvg(this);
};
Hopper.prototype.changeHopperLevel = function(hopperLevel) {
    this.hopperLevel = hopperLevel;
    
    this.hopperSvg.changeHopperLevel(this);
};
/**
 * @param hopperNameTextSvg
 *                名称文本对象
 * @param hopperLevelTextSvg
 *                料位数据文本对象
 * @param hopperLevelRectSvg
 *                料位图形对象
 */
function HopperSVG(hopperNameTextSvg, hopperLevelTextSvg, hopperLevelRectSvg) {
    this.hopperNameTextSvg = hopperNameTextSvg;
    this.hopperLevelRectSvg = hopperLevelRectSvg;
    this.hopperLevelTextSvg = hopperLevelTextSvg;
}
HopperSVG.prototype.initSvg = function(hopper) {
    this.hopperNameTextSvg.html(hopper.hopperName);
    this.hopperLevelTextSvg.html(hopper.hopperLevel);
};
/**
 * 改变料位
 * 
 * @param hopper
 */
HopperSVG.prototype.changeHopperLevel = function(hopper) {
    this.hopperLevelTextSvg.attr("stroke", "#0f0f0f").html(hopper.hopperLevel);
    this.hopperLevelRectSvg.changeHopperLevel(hopper.hopperLevel);
};
/**
 * 料位数据SVG对象
 * 
 * @param leftLineSvg
 * @param rightLineSvg
 * @param bottomLineSvg
 * @param pathFilledSvg
 */
function HopperLevelRectSvg(leftLineSvg, rightLineSvg, bottomLineSvg, pathFilledSvg) {
    this.leftLineSvg = leftLineSvg;
    this.rightLineSvg = rightLineSvg;
    this.bottomLineSvg = bottomLineSvg;
    this.pathFilledSvg = pathFilledSvg;
}
/**
 * 料位改变
 * 
 * @param hopperLevel
 */
HopperLevelRectSvg.prototype.changeHopperLevel = function(hopperLevel) {
    
    var leftLineTransform = this.leftLineSvg.attr("transform");
    var rightLineTransform = this.rightLineSvg.attr("transform");
    // 左侧线路的偏移量
    var leftLineOffset_x = parseFloat(decompositionTransform(leftLineTransform)[4]);
    var leftLineOffset_y = parseFloat(decompositionTransform(leftLineTransform)[5]);
    // 右侧线路的偏移量
    var rightLineOffset_x = parseFloat(decompositionTransform(rightLineTransform)[4]);
    var rightLineOffset_y = parseFloat(decompositionTransform(rightLineTransform)[5]);

    var x1 = parseFloat(this.leftLineSvg.attr("x1")) + leftLineOffset_x;
    var x2 = parseFloat(this.leftLineSvg.attr("x2")) + leftLineOffset_x;
    var y1 = parseFloat(this.leftLineSvg.attr("y1")) + leftLineOffset_y;
    var y2 = parseFloat(this.leftLineSvg.attr("y2")) + leftLineOffset_y;
    var x3 = parseFloat(this.rightLineSvg.attr("x1")) + rightLineOffset_x;
    var x4 = parseFloat(this.rightLineSvg.attr("x2")) + rightLineOffset_x;

    var array_x = [ x1, x2, x3, x4 ];
    var array_y = [ y1, y2 ];
    array_x.sort(DoubleSortRules);
    array_y.sort(DoubleSortRules);

    var hopperLevelHight = getHopperLevelHeight(array_x, array_y, hopperLevel);
    var angle = (y2 - y1) / (x2 - x1);
    var new_x1 = x2 - hopperLevelHight / angle;
    var new_x4 = x3 + hopperLevelHight / angle;
    var new_y1 = y2 - hopperLevelHight;
    this.pathFilledSvg.attr("transform", "");
    changeHopperLevelColor(this.pathFilledSvg, hopperLevel);
    
    // alert(this.pathFilledSvg.attr("d"));
    var newPathValue = "M" + new_x1 + " " + new_y1 + "L" + x2 + " " + y2 + "L" + x3 + " " + y2 + "L" + new_x4 + " " + new_y1 + "L" + new_x1 + " " + new_y1 + "Z";
    this.pathFilledSvg.attr("d", newPathValue);

    // var svg = $("#hopper").svg("get");
    // var g = svg.group();
    // svg.rect(50, 50, 300, 100, {
    // fill : '$00f0f0',
    // stroke : 'black',
    // strokeWidth : 5
    // });
};
function changeHopperLevelColor(svgObj, level) {
    var color = "#CCCCCC";
    if (level < 30) {
	color = "#CCCCCC";
    } else if (level >= 30 && level <= 50) {
	color = "#999999";
    } else if (level >= 50 && level <= 70) {
	color = "#666666";
    } else if (level >= 70 && level <= 85) {
	color = "#333333";
    } else if (level >= 85 && level <= 100) {
	color = "#000000";
    }
    svgObj.attr("fill", color);
}
function DoubleSortRules(a, b) {
    return a - b;
}
/**
 * 分解matrixValue
 * 
 * @param transformValue
 * @returns
 */
function decompositionTransform(transformValue) {
    var matrixValue = transformValue.trim().substring(7, transformValue.trim().length - 1);
    var arr = matrixValue.split(",");
    return arr;
}
function getHopperLevelHeight(array_x, array_y, percentage) {
    var newHeight;
    var olderUpperEdge = parseFloat(array_x[3]) - parseFloat(array_x[0]);
    var lowwerEdge = parseFloat(array_x[2]) - parseFloat(array_x[1]);
    var olderHeight = parseFloat(array_y[1]) - parseFloat(array_y[0]);
    var heightAndEdgeAngle = olderHeight / (parseFloat(array_x[1]) - parseFloat(array_x[0]));
    var olderArea = (lowwerEdge + olderUpperEdge) * olderHeight / 2;

    var a = 2 / heightAndEdgeAngle;
    var b = 2 * lowwerEdge;
    var c = 2 * olderArea * percentage / 100 * (-1);
    newHeight = (b * -1 + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
    return newHeight;
}