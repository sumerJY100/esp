var calEfficient_1 = new CalEfficient();
var calEfficient_2 = new CalEfficient();
$(document).ready(function() {

	var svg = $("#CalculateSvgDiv").svg({
		onLoad : drawIntro
	});

});
function drawIntro(svg) {
	// drawTitle(svg);
	// 多依奇公式计算
	draw2(svg, 100, 50);
	draw(svg, 100, 50);

}
/**
 * 绘制标题
 * 
 * @param svg
 */
function drawTitle(svg) {
	var title = "多依奇公式计算";
	var titleLocationX = 500;
	var titleLocationY = 50;
	var titleSvg = svg.text(titleLocationX, titleLocationY, title, electricFieldTitleSettings);
}
/**
 * 除尘效率计算1
 * 
 * @param svg
 */
function draw(svg, x, y) {

	var efficientForLevelObj = new drawData(svg, x + 240, y + 175, "分级除尘效率(η)", "74.589", 5);
	x = x + 120;
	y = y + 200;
	var efficientObj = new drawData(svg, x + 240, y + 125, "除尘效率(η)", "99.583", 5);
	// var formulaObj = new Formula1Obj(svg,
	// parseFloat($(efficientObj.rectSvg).attr("x")),
	// parseFloat($(efficientObj.rectSvg).attr("y")));

	var m2m3sObj = new drawData(svg, x + 120, y + 50, "比集尘面积", "100", 1, true);
	var k1Obj = new drawData(svg, x, y + 250, "气烟除尘器系数(k)", "0.003425", "", true, -20);
	var u2PeakObj = new drawData(svg, x - 120, y + 350, "平均电压", "80", "kv", true);
	var i2AvgObj = new drawData(svg, x - 120, y + 400, "异极间距", "200", "mm", true);
	var EAvgObj = new drawData(svg, x, y + 300, "电场强度(E)", "4", "kv/cm", true);
	var kcObj = new drawData(svg, x + 120, y + 230, "修正系数(kc)", "1.0", "", true);
	var msObj = new drawData(svg, x + 120, y + 400, "趋近速度(ω)", "0.0548", 2, true);
	EAvgObj.addChildData(u2PeakObj);
	EAvgObj.addChildData(i2AvgObj);

	msObj.addChildData(k1Obj);
	msObj.addChildData(EAvgObj);
	efficientObj.addChildData(kcObj);
	efficientObj.addChildData(msObj);
	efficientObj.addChildData(m2m3sObj);

	efficientForLevelObj.addChildData(efficientObj);
	// 绘制
	paintData(efficientForLevelObj, x + 360, y + 125, svg);
	// 公式
	var formulaObj = new Formula1Obj(svg, parseFloat($(efficientObj.rectSvg).attr("x")), parseFloat($(efficientObj.rectSvg).attr("y")));
	var formulaObj3 = new Formula3Obj(svg, parseFloat($(msObj.rectSvg).attr('x')), parseFloat($(msObj.rectSvg).attr("y")));
	var m2m3sSvg = m2m3sObj.valueSvg;
	var msSvg = msObj.valueSvg;
	var efficientSvg = efficientObj.valueSvg;

	// 除尘效率计算
	var btnText = "计算";
	var btnSvg = svg.text(x + 240 + 50, y + 125 + 40, btnText, contentWordSettings);
	$(btnSvg).bind("click", function() {
		var m2m3s = parseFloat($(m2m3sSvg).html());
		var ms = parseFloat($(msSvg).html());
		var kc = parseFloat($(kcObj.valueSvg).html());
		var efficientValue = Math.round((1 - Math.pow(Math.E, m2m3s * ms * kc * (-1))) * 100 * 1000) / 1000;
		$(efficientSvg).html(efficientValue);
	});

	// 趋近速度计算
	var $msRectSvg = $(msObj.rectSvg);
	var calBtnLocationX = parseFloat($msRectSvg.attr("x"));
	var calBtnLocationY = parseFloat($msRectSvg.attr("y"));
	var btnText2 = "计算";
	var btnSvg2 = svg.text(calBtnLocationX + 50, calBtnLocationY + 40 + 15, btnText2, contentWordSettings);
	$(btnSvg2).bind("click", function() {
		var k1 = parseFloat($(k1Obj.valueSvg).html());
		var eAvg = parseFloat($(EAvgObj.valueSvg).html());
		var tempValue = k1 * Math.pow(eAvg, 2);
		$(msObj.valueSvg).html(tempValue);
	});

	// 电场强度计算
	var btnSvg3 = svg.text(parseFloat($(EAvgObj.rectSvg).attr("x")) + 50, parseFloat($(EAvgObj.rectSvg).attr("y")) + 55, "计算", contentWordSettings);
	$(btnSvg3).bind("click", function() {
		var u = parseFloat($(u2PeakObj.valueSvg).html());
		var distance = parseFloat($(i2AvgObj.valueSvg).html());
		var result = u / (distance / 10);
		$(EAvgObj.valueSvg).html(result);
	});
	// 分级除尘效率计算
	var btnSvg4 = svg.text(parseFloat($(efficientForLevelObj.rectSvg).attr("x")) + 50, parseFloat($(efficientForLevelObj.rectSvg).attr("y")) + 55, "计算", contentWordSettings);
	$(btnSvg4).bind("click", function() {
		var m2m3s = parseFloat($(m2m3sSvg).html()) / 4;
		var ms = parseFloat($(msSvg).html());
		var kc = parseFloat($(kcObj.valueSvg).html());
		var efficientValue = Math.round((1 - Math.pow(Math.E, m2m3s * ms * kc * (-1))) * 100 * 1000) / 1000;
		$(efficientForLevelObj.valueSvg).html(efficientValue);
	});
	var btnSvg5 = svg.text(parseFloat($(efficientForLevelObj.rectSvg).attr("x")) + 120, parseFloat($(efficientForLevelObj.rectSvg).attr("y")) + 25, "重新计算", contentWordSettings);
	$(btnSvg5).bind("click", function() {
		$(btnSvg3).click();
		$(btnSvg2).click();
		$(btnSvg).click();
		$(btnSvg4).click();
	});
}
function draw2(svg, x, y) {
	var efficientObj = new drawData(svg, x + 240, y + 125, "除尘效率(η)", "99.583", 5);
	var m2m3sObj = new drawData(svg, x + 120, y + 50, "比集尘面积", "100", 1, true);
	var k1Obj = new drawData(svg, x, y + 250, "气烟除尘器系数(k)", "0.003425", "", true, -20);
	var u2PeakObj = new drawData(svg, x - 120, y + 350, "平均电压", "80", "kv", true);
	var i2AvgObj = new drawData(svg, x - 120, y + 400, "异极间距", "200", "mm", true);
	var EAvgObj = new drawData(svg, x, y + 300, "电场强度(E)", "4", "kv/cm", true);
	var kcObj = new drawData(svg, x + 120, y + 230, "修正系数(kc)", "1.0", "", true);
	var msObj = new drawData(svg, x + 120, y + 400, "趋近速度(ω)", "0.0548", 2, true);

	
	k1Obj.addChildData(EAvgObj);
	k1Obj.addChildData(msObj);

	EAvgObj.addChildData(i2AvgObj);
	EAvgObj.addChildData(u2PeakObj);

	msObj.addChildData(efficientObj);
	msObj.addChildData(m2m3sObj);
	msObj.addChildData(kcObj);

	paintData(k1Obj, x + 360, y + 55, svg);
	var formulaObj = new Formula1Obj(svg, parseFloat($(msObj.rectSvg).attr("x")), parseFloat($(msObj.rectSvg).attr("y")));//多依奇公式
	var formulaObj2 = new Formula3Obj(svg, parseFloat($(k1Obj.rectSvg).attr("x")), parseFloat($(k1Obj.rectSvg).attr("y")));//电场强度计算公式
	
	//计算趋近速度，通过除尘效率、比集尘面积、修正系数
	var btnSvg1 = svg.text(parseFloat($(msObj.rectSvg).attr("x")) + 50, parseFloat($(msObj.rectSvg).attr("y")) + 55, "计算", contentWordSettings);
	$(btnSvg1).bind("click", function() {
		var m2m3s = parseFloat($(m2m3sObj.valueSvg).html()) ;
		var effic = parseFloat($(efficientObj.valueSvg).html());
		var kc = parseFloat($(kcObj.valueSvg).html());
		var result = (Math.log(1-effic/100))/(m2m3s*kc) * (-1);
		$(msObj.valueSvg).html(Math.round(result * 100000) / 100000);
	});
	var btnSvg2 = svg.text(parseFloat($(k1Obj.rectSvg).attr("x")) + 50, parseFloat($(k1Obj.rectSvg).attr("y")) + 55, "计算", contentWordSettings);
	$(btnSvg2).bind("click", function() {
		var E = parseFloat($(EAvgObj.valueSvg).html()) ;
		var ms = parseFloat($(msObj.valueSvg).html());

		var result = ms / Math.pow(E, 2); 
		$(k1Obj.valueSvg).html(Math.round(result * 10000000) / 10000000);
	});
}
/** **********************************CalEfficient对象******** */
function CalEfficient() {
	this.inputDustSvg = null;
	this.outputDustSvg = null;
	this.efficientSvg = null;
	this.calculateEfficient = function() {
		// alert($(this.inputDustSvg).attr("value"));
		var inputValue = parseFloat($(this.inputDustSvg).html());
		var outputValue = parseFloat($(this.outputDustSvg).html());
		var efficient = (inputValue * 1000 - outputValue) / (inputValue * 1000) * 100;
		$(this.efficientSvg).html((parseInt(efficient * 100)) / 100);
	};
	this.calculateOutputDustDesity = function() {
		var inputValue = parseFloat($(this.inputDustSvg).html());
		var efficient = parseFloat($(this.efficientSvg).html());
		var outputDustDestiny = inputValue * 1000 * (100 - efficient) / 100;
		$(this.outputDustSvg).html(Math.round(parseInt(outputDustDestiny * 100) / 10) / 10);
	};
}
/**
 * 绘制带箭头的直线，通过rectData两个对象
 * 
 * @param svg
 * @param sourceObj
 * @param targetObj
 */
function drawArrowByRectData(svg, sourceObj, targetObj) {
	var sourceRect = sourceObj.rectSvg;
	var targetRect = targetObj.rectSvg;
	var sourceLocationX = parseFloat($(sourceRect).attr("x"));
	var sourceLocationY = parseFloat($(sourceRect).attr("y"));
	var targetLocationX = parseFloat($(targetRect).attr("x"));
	var targetLocationY = parseFloat($(targetRect).attr("y"));
	var x1 = sourceLocationX + 100;
	var y1 = sourceLocationY + 20;
	var x2 = targetLocationX;
	var y2 = targetLocationY + 20;
	drawArrow(svg, x1, y1, x2, y2);
}
/**
 * 绘制带箭头的直线，通过两个rectData矩形框的基准坐标,录入的坐标进行了便宜，X轴向左便宜15，Y轴向上偏移15
 * 
 * @param svg
 * @param sourceLocationX
 * @param sourceLocationY
 * @param targetLocationX
 * @param targetLocationY
 */
function drawArrowBySourceLocation(svg, sourceLocationX, sourceLocationY, targetLocationX, targetLocationY) {

	var x1 = sourceLocationX - 15 + 100;
	var y1 = sourceLocationY - 15 + 20;
	var x2 = targetLocationX - 15;
	var y2 = targetLocationY - 15 + 20;
	drawArrow(svg, x1, y1, x2, y2);
}
/**
 * 绘制带箭头的直线
 * 
 * @param svg
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 */
function drawArrow(svg, x1, y1, x2, y2) {
	svg.line(x1, y1, x2, y2, {
		stroke : "black",
		fill : "none",
		strokeWidth : "0.5px"
	});
	var width = x2 - x1;
	var height = y2 - y1;
	var angle = Math.atan(height / width) / ((Math.PI * 2) / 360);
	var arrowSideRoadLength = 11.55;
	var leftAngle = angle - 10;
	var targetSideLengthY = arrowSideRoadLength * Math.sin(angleToRadians(leftAngle));
	var targetSideLengthX = arrowSideRoadLength * Math.cos(angleToRadians(leftAngle));
	var targetX = x2 - targetSideLengthX;
	var targetY = y2 - targetSideLengthY;
	if (width < 0) {
		targetX = x2 + targetSideLengthX;
		targetY = y2 + targetSideLengthY;
	}
	svg.line(targetX, targetY, x2, y2, {
		stroke : "red",
		fill : "none",
		strokeWidth : "1px"
	});
	var leftAngle2 = angle + 10;
	var targetSideLengthY2 = arrowSideRoadLength * Math.sin(angleToRadians(leftAngle2));
	var targetSideLengthX2 = arrowSideRoadLength * Math.cos(angleToRadians(leftAngle2));
	var targetX2 = x2 - targetSideLengthX2;
	var targetY2 = y2 - targetSideLengthY2;
	if (width < 0) {
		targetX2 = x2 + targetSideLengthX2;
		targetY2 = y2 + targetSideLengthY2;
	}
	svg.line(targetX2, targetY2, x2, y2, {
		stroke : "red",
		fill : "none",
		strokeWidth : "1px"
	});
}
/**
 * 绘制一个数据框
 * 
 * @param svg
 * @param locationX
 * @param locationY
 * @param unit
 *            数据单位
 * @param isEdit
 *            是否可以修改参数
 * @returns
 */
function drawData(svg, locationX, locationY, name, value, unit, isEdit, offsetX, offsetY) {
//	svg.line(200,105,300,105,{stroke:"black",strokeWidth:"1px"});
	this.offsetX = 0;
	this.offsetY = 0;
	this.isEdit = isEdit;
	this.value = value;
	if (offsetX) {
		this.offsetX = offsetX;
	}
	if (offsetY) {
		this.offsetY = offsetY;
	}

	this.rectSvg = null;
	this.valueSvg = null;
	this.title = name;
	this.value = value;
	this.unit = unit;
	this.childData = new Array();
	this.parentNode = null;
	this.location = 0;
	this.childDataLocation = 0;
	this.addChildData = function(newData) {
		var location = this.childData.length;
		this.childData[location] = newData;
		newData.parentNode = this;
		newData.location = location;
		this.childDataLocation = location;
	};
	this.getPreNode = function() {
		var parentNode = this.parentNode;
		if (this.location > 0) {
			return parentNode.childData[this.location - 1];
		} else {
			return null;
		}
	};
	this.getPreNodeBottomRectLocationY = function() {
		var preNode = this.getPreNode();
		var locationY = 0;
		if (preNode) {
			locationY = parseFloat($(preNode.rectSvg).attr("y"));
			
			var preChildNodes = preNode.childData;
			if (preChildNodes.length <= 1) {
				locationY = locationY + 40;
			} else if (preChildNodes.length > 1) {
				var count = preChildNodes.length;
				var totalHeight = count * 40 + (count - 1) * 26;
				var bottomLocationY = (locationY + 20) + totalHeight / 2;
				locationY = bottomLocationY;
			} else {
				// do nothing
			}
		} else {
			// do nothing;
		}
//		alert(locationY);
		return locationY;
	};
	this.getCurrentNodeRectLocationY = function() {
		var preNodeBottomRectLocationY = this.getPreNodeBottomRectLocationY();
		var childCounts = this.childData.length;
		if(childCounts <= 1){
			return preNodeBottomRectLocationY + 26;
		}else{
			var topChildDataRectLocationY = preNodeBottomRectLocationY + 26 ;
			var childHeight = childCounts * 40 + (childCounts - 1) * 26;
			var locationY = topChildDataRectLocationY + childHeight / 2 - 20;
			return locationY;
		}
	
	};
}
function paintData(headNode, x, y, svg) {
	var childNode = headNode.childData;
	var location_x = x;
	var location_y = y;
//	alert(headNode.getPreNode());
	if (headNode.parentNode != null && headNode.getPreNode() != null) {
//		alert(headNode.getCurrentNodeRectLocationY());
		location_y =  headNode.getCurrentNodeRectLocationY();
	}
	// 绘制节点
	var rectSvg = svg.rect(location_x - 15, location_y - 15, 100, 40, eachElectricValueRectSettings);
	headNode.rectSvg = rectSvg;
	var titleSvg = svg.text(location_x + 0, location_y, headNode.title, contentWordSettings);
	var valueSvg = svg.text(location_x - 11, location_y + 18, headNode.value, contentValueSettings);
	headNode.valueSvg = valueSvg;
	drawUnit(headNode.unit, svg, location_x + 38, location_y + 18);
	if (headNode.isEdit) {
		$(headNode.valueSvg).bind("click", function() {
			var returnValue = window.prompt("请输入数据", $(this).html());
			if (returnValue) {
				$(headNode.valueSvg).html(returnValue);
			}
		});
	}
	if (null == childNode || childNode.length == 0) {
		// 根据坐标绘制当前节点
	} else {
		var childLocationX = location_x - 130;
		var count = childNode.length;
		var totalHeight = count * 40 + (count - 1) * 26;
		var topLocationY = (location_y + 20) - totalHeight / 2;
		for (var i = 0; i < childNode.length; i++) {
			paintData(childNode[i], childLocationX, topLocationY + 66 * i, svg);
//			alert(topLocationY + 66 * i);
			drawArrowByRectData(svg, childNode[i], headNode);
		}
	}

}

/**
 * @param type
 */
// 1 表示 比集尘面积 m2/m3/s
// 2 表示 速度 m/s
// 3 表示 浓度 g/m3
// 4 表示浓度 mg/m3
// 5 表示百分比 %
// 6 表示 烟气量 m3/h
// 7 表示 温度
// 8 表示 kg/m3
// 9 表示 m2
function drawUnit(type, svg, x, y) {
	if (type == 1 || type == "m2/m3/s") {
		var unit = "(m/m/s)";
		var titleUnitSvg = svg.text(x, y, unit, contentWordSettings);
		var unit2 = "2";
		var titleUnitSvg = svg.text(x + 14, y - 6, unit2, contentWordUpperSettings);
		var unit3 = "3";
		var titleUnitSvg = svg.text(x + 31, y - 6, unit3, contentWordUpperSettings);
	} else if (type == 2 || type == "m/s") {
		var unit = "(m/s)";
		var titleUnitSvg = svg.text(x, y, unit, contentWordSettings);
	} else if (type == 3) {
		var unit = "(g/m)";
		var titleUnitSvg = svg.text(x, y, unit, contentWordSettings);
		var unit2 = "3";
		var titleUnitSvg = svg.text(x + 25, y - 6, unit2, contentWordUpperSettings);
	} else if (type == 4 || type == "mg/m3") {
		var unit = "(mg/m)";
		var titleUnitSvg = svg.text(x, y, unit, contentWordSettings);
		var unit2 = "3";
		var titleUnitSvg = svg.text(x + 36, y - 6, unit2, contentWordUpperSettings);
	} else if (type == 5 || type == "%") {
		var unit = "(%)";
		var titleUnitSvg = svg.text(x, y, unit, contentWordSettings);
	} else if (type == 6 || type == "m3/s") {
		var unit = "(m/s)";
		var titleUnitSvg = svg.text(x, y, unit, contentWordSettings);
		var unit2 = "3";
		var titleUnitSvg = svg.text(x + 14, y - 6, unit2, contentWordUpperSettings);
	} else if (type == 7 || type == "℃") {
		var unit = "(℃)";
		var titleUnitSvg = svg.text(x, y, unit, contentWordSettings);
	} else if (type == 8 || type == "kg/h") {
		var unit = "(kg/h)";
		var titleUnitSvg = svg.text(x, y, unit, contentWordSettings);
	} else if (type == 9 || type == "m2") {
		var unit = "(m)";
		var titleUnitSvg = svg.text(x, y, unit, contentWordSettings);
		var unit2 = "2";
		var titleUnitSvg = svg.text(x + 14, y - 6, unit2, contentWordUpperSettings);
	} else {
		if (new String(type).length > 0) {
			var unit = "(" + type + ")";
			var titleUnitSvg = svg.text(x, y, unit, contentWordSettings);
		}
	}
}
/** ************************************************************样式定义**************************************************************************** */
// 标题样式
var electricFieldTitleSettings = {
	fontFamily : "sans-serif",
	fill : "#000000",
	fontSize : "15px",
	fontWeight : "bolder"
};
// 普通输入数据与显示数据
var contentWordSettings = {
	fontFamily : "sans-serif",
	fill : "#000000",
	fontSize : "12px",
	fontWeight : "normal"
};
// 上标
var contentWordUpperSettings = {
	fontFamily : "sans-serif",
	fill : "#000000",
	fontSize : "6px",
	fontWeight : "normal"
};
// 数值样式
var contentValueSettings = {
	fontFamily : "sans-serif",
	fill : "#0000ff",
	fontSize : "12px",
	fontWeight : "normal"
};
var eachElectricValueRectSettings = {
	fill : "#FFFFFF",
	stroke : "black"
};
/**
 * 公式中使用的样式
 */
var contentSettings = {
	fontFamily : "sans-serif",
	fill : "#000000",
	fontSize : "20px",
	fontWeight : "normal"
};
/**
 * 公式中使用的样式
 */
var contentUpperSettings = {
	fontFamily : "sans-serif",
	fill : "#000000",
	fontSize : "12px",
	fontWeight : "normal"
};
/** ***************************************************工具类***************************************************** */
/**
 * 角度转换成弧度
 * 
 * @param angle
 * @returns {Number}
 */
function angleToRadians(angle) {
	return angle * (Math.PI * 2 / 360);
}
/**
 * 弧度转换成角度
 * 
 * @param radians
 * @returns {Number}
 */
function radiansToAngle(radians) {
	return radians / (Math.PI * 2 / 360);
}
/**
 * 多依奇公式
 */
function Formula1Obj(svg, x, y) {
	this.svg = svg;
	this.locationX = x;
	this.locationY = y - 35;

	svg.text(this.locationX + 5, this.locationY + 30, "η", contentSettings);
	svg.text(this.locationX + 18, this.locationY + 30, "=", contentSettings);
	svg.text(this.locationX + 33, this.locationY + 30, "1", contentSettings);
	svg.text(this.locationX + 48, this.locationY + 30, "-", contentSettings);
	svg.text(this.locationX + 60, this.locationY + 30, "e", contentSettings);

	svg.text(this.locationX + 70, this.locationY + 20, "-", contentUpperSettings);
	svg.text(this.locationX + 75, this.locationY + 20, "s▪", contentUpperSettings);
	svg.text(this.locationX + 85, this.locationY + 20, "ω▪", contentUpperSettings);
	svg.text(this.locationX + 98, this.locationY + 20, "kc", contentUpperSettings);
}
/**
 * 计算趋近速度
 */
function Formula2Obj(svg, x, y) {
	this.svg = svg;
	this.locationX = x - 20;
	this.locationY = y - 35;

	svg.text(this.locationX, this.locationY + 30, "ω", contentSettings);
	svg.text(this.locationX + 18, this.locationY + 30, "=", contentSettings);
	svg.text(this.locationX + 33, this.locationY + 30, "k", contentSettings);
	svg.text(this.locationX + 43, this.locationY + 35, "1", contentUpperSettings);
	svg.text(this.locationX + 50, this.locationY + 35, "/", contentSettings);
	svg.text(this.locationX + 60, this.locationY + 35, "A", contentSettings);
	svg.text(this.locationX + 75, this.locationY + 30, "ln(", contentSettings);
	svg.text(this.locationX + 100, this.locationY + 30, "U", contentSettings);
	svg.text(this.locationX + 115, this.locationY + 30, "p", contentUpperSettings);
	svg.text(this.locationX + 123, this.locationY + 30, "U", contentSettings);
	svg.text(this.locationX + 136, this.locationY + 30, "av", contentUpperSettings);
	svg.text(this.locationX + 148, this.locationY + 30, "I", contentSettings);
	svg.text(this.locationX + 155, this.locationY + 30, "av", contentUpperSettings);

	svg.text(this.locationX + 165, this.locationY + 30, ")", contentSettings);

	// svg.text(this.locationX + 70, this.locationY + 20, "-",
	// contentUpperSettings);
	// svg.text(this.locationX + 75, this.locationY + 20, "s▪",
	// contentUpperSettings);
	// svg.text(this.locationX + 85, this.locationY + 20, "ω▪",
	// contentUpperSettings);
	// svg.text(this.locationX + 98, this.locationY + 20, "kc",
	// contentUpperSettings);
}
/**
 * 计算趋近速度
 */
function Formula3Obj(svg, x, y) {
	this.svg = svg;
	this.locationX = x + 10;
	this.locationY = y - 35;

	svg.text(this.locationX, this.locationY + 30, "ω", contentSettings);
	svg.text(this.locationX + 18, this.locationY + 30, "=", contentSettings);
	svg.text(this.locationX + 33, this.locationY + 30, "k", contentSettings);
	svg.text(this.locationX + 43, this.locationY + 30, "*", contentSettings);
	svg.text(this.locationX + 55, this.locationY + 30, "E", contentSettings);
	svg.text(this.locationX + 65, this.locationY + 20, "2", contentUpperSettings);

	// svg.text(this.locationX + 70, this.locationY + 20, "-",
	// contentUpperSettings);
	// svg.text(this.locationX + 75, this.locationY + 20, "s▪",
	// contentUpperSettings);
	// svg.text(this.locationX + 85, this.locationY + 20, "ω▪",
	// contentUpperSettings);
	// svg.text(this.locationX + 98, this.locationY + 20, "kc",
	// contentUpperSettings);
}