var calEfficient_1 = new CalEfficient();
var calEfficient_2 = new CalEfficient();
$(document).ready(function() {

	var svg = $("#CalculateSvgDiv").svg({
		onLoad : drawIntro
	});

});
function drawIntro(svg) {
	drawTitle(svg);

	// 多依奇公式计算
	draw(svg, 100, 50);

	// 通过进口与出口浓度计算除尘效率
	calculateEfficient(svg, 600, 100);
	// 通过进口与除尘效率计算 出口浓度
	calculateOutputDesity(svg, 600, 300);
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
	// x = 100,y = 50
	var kgm3Obj = new drawData(svg, x, y + 70, "入口烟气量", "45036.5", 8, true);
	var inputDestinyObj = new drawData(svg, x, y + 130, "烟气进口浓度", "27.8", 3, true);
	var kgm3Svg = kgm3Obj.valueSvg;
	var inputDestinySvg = inputDestinyObj.valueSvg;
	var kgm3RectSvg = kgm3Obj.rectSvg;
	// $(kgm3RectSvg).attr('fill',"#c8b2ad")
	x = x + 120;
	y = y + 0;
	var v1Obj = new drawData(svg, x, y + 80, "烟气流量", "450", 6, true);
	var v2Obj = new drawData(svg, x, y + 140, "烟气流量", "450", "m3/h", true);
	// 画箭头
	drawArrowByRectData(svg, kgm3Obj, v1Obj);
	drawArrowByRectData(svg, inputDestinyObj, v1Obj);

	var v1Svg = v1Obj.valueSvg;
	var btnText1 = "计算";
	var btnSvg1 = svg.text(x + 50, y + 80 + 40, btnText1, contentWordSettings);
	$(btnSvg1).bind("click", function() {
		var kgm3Value = parseFloat($(kgm3Svg).html());
		var inputDestinyValue = parseFloat($(inputDestinySvg).html());
		var v2Value = Math.round(((kgm3Value * 1000) / inputDestinyValue))
		var v1Value = Math.round(v2Value / 3600);
		$(v1Svg).html(v1Value);
		$(v2Obj.valueSvg).html(v2Value);
	});
	// var x = x;
	// var y = y;
	var s1Obj = new drawData(svg, x, y, "收尘极面积", "45544", 9, true);
	var t1Obj = new drawData(svg, x, y + 200, "温度", "140", 7, true);
	var s1Svg = s1Obj.valueSvg;
	var t1Svg = t1Obj.valueSvg;

	var m2m3sObj = new drawData(svg, x + 120, y + 50, "比集尘面积", "100", 1, true);
	drawArrowByRectData(svg, s1Obj, m2m3sObj);
	drawArrowByRectData(svg, t1Obj, m2m3sObj);
	drawArrowByRectData(svg, v1Obj, m2m3sObj);
	var msObj = new drawData(svg, x + 120, y + 400, "趋近速度(ω)", "0.0548", 2, true);
	var formulaObj2 = new Formula2Obj(svg,parseFloat($(msObj.rectSvg).attr('x')),parseFloat($(msObj.rectSvg).attr("y")));
	var kcObj = new drawData(svg, x + 120, y + 230, "修正系数(kc)", "0.5", "", true);
	var efficientObj = new drawData(svg, x + 240, y + 125, "除尘效率(η)", "90", 5);
	var formulaObj = new Formula1Obj(svg, parseFloat($(efficientObj.rectSvg).attr("x")), parseFloat($(efficientObj.rectSvg).attr("y")));
	var m2m3sSvg = m2m3sObj.valueSvg;
	var msSvg = msObj.valueSvg;
	var efficientSvg = efficientObj.valueSvg;

	var btnText0 = "计算";
	var btnSvg0 = svg.text(x + 120 + 50, y + 50 + 40, btnText0, contentWordSettings);
	$(btnSvg0).bind("click", function() {
		var s1Value = parseFloat($(s1Svg).html());
		var v1Value = parseFloat($(v1Svg).html());
		var m2m3s3Value = Math.round(s1Value / v1Value * 1000) / 1000;
		$(m2m3sSvg).html(m2m3s3Value);
	});

	var btnText = "计算";
	var btnSvg = svg.text(x + 240 + 50, y + 125 + 40, btnText, contentWordSettings);
	$(btnSvg).bind("click", function() {
		var m2m3s = parseFloat($(m2m3sSvg).html());
		var ms = parseFloat($(msSvg).html());
		var kc = parseFloat($(kcObj.valueSvg).html());
		var efficientValue = Math.round((1 - Math.pow(Math.E, m2m3s * ms * kc * (-1))) * 100 * 1000) / 1000;
		$(efficientSvg).html(efficientValue);
	});
	drawArrowByRectData(svg, m2m3sObj, efficientObj);
	drawArrowByRectData(svg, msObj, efficientObj);
	drawArrowByRectData(svg, kcObj, efficientObj);

	var k1Obj = new drawData(svg, x, y + 250, "气烟除尘器系数(k1)", "0.4", "", true, -20);

	var u2AvgObj = new drawData(svg, x, y + 300, "平均电压", "60", "kv", true);
	var u2PeakObj = new drawData(svg, x, y + 350, "峰值电压", "80", "kv", true);
	var i2AvgObj = new drawData(svg, x, y + 400, "平均电流", "1000", "mA", true);
	var s1Obj2 = new drawData(svg, x, y + 450, "收尘极面积", "45544", "m2", true);

	drawArrowByRectData(svg, k1Obj, msObj);
	drawArrowByRectData(svg, u2AvgObj, msObj);
	drawArrowByRectData(svg, u2PeakObj, msObj);
	drawArrowByRectData(svg, i2AvgObj, msObj);
	drawArrowByRectData(svg, s1Obj2, msObj);

	var $msRectSvg = $(msObj.rectSvg);
	var calBtnLocationX = parseFloat($msRectSvg.attr("x"));
	var calBtnLocationY = parseFloat($msRectSvg.attr("y"));
	var btnText2 = "计算";
	var btnSvg2 = svg.text(calBtnLocationX + 50, calBtnLocationY + 40 + 15, btnText2, contentWordSettings);
	$(btnSvg2).bind("click", function() {
		var k1 = parseFloat($(k1Obj.valueSvg).html());
		var u2Avg = parseFloat($(u2AvgObj.valueSvg).html());
		var u2Peak = parseFloat($(u2PeakObj.valueSvg).html());
		var i2Avg = parseFloat($(i2AvgObj.valueSvg).html());
		var s1Temp = parseFloat($(s1Obj2.valueSvg).html());

		var tempValue = k1 / s1Temp * Math.sqrt(u2Avg * u2Peak * i2Avg);
		tempValue = Math.round(tempValue * 1000) / 1000;
		$(msObj.valueSvg).html(tempValue);
	});
}

/**
 * 计算除尘效率
 * 
 * @param svg
 * @param x
 * @param y
 */
function calculateEfficient(svg, x, y) {

	svg.rect(x - 20, y - 30, 240, 150, eachElectricValueRectSettings);
	svg.text(x + 120, y, "计算除尘效率");

	var inputDustDensityObj = new drawData(svg, x, y, "入口粉尘浓度", "20", 3, true);
	var outputDustDensityObj = new drawData(svg, x, y + 80, "出口粉尘浓度", "30", 4, true);
	var efficientObj = new drawData(svg, x + 120, y + 40, "除尘效率", "99.99", 5);
	var inputDustDensitySvg = inputDustDensityObj.valueSvg;
	var outputDustDensitySvg = outputDustDensityObj.valueSvg;
	var efficientSvg = efficientObj.valueSvg;

	drawArrow(svg, x - 15 + 100, y - 15 + 20, x - 15 + 120, y - 15 + 60);
	drawArrow(svg, x - 15 + 100, y - 15 + 80 + 20, x - 15 + 120, y - 15 + 60);

	calEfficient_1.inputDustSvg = inputDustDensitySvg;
	calEfficient_1.outputDustSvg = outputDustDensitySvg;
	calEfficient_1.efficientSvg = efficientSvg;

	var btnText = "计算";
	var btnSvg = svg.text(x + 170, y + 90, btnText, contentWordSettings);
	$(btnSvg).bind("click", function() {
		calEfficient_1.calculateEfficient();
	});
}
/**
 * 通过入口浓度与除尘效率计算出口浓度
 * 
 * @param svg
 * @param x
 * @param y
 */
function calculateOutputDesity(svg, x, y) {
	svg.rect(x - 20, y - 30, 240, 150, eachElectricValueRectSettings);
	svg.text(x + 90, y, "计算粉尘出口浓度");
	var inputDustDensityObj = new drawData(svg, x, y, "入口粉尘浓度", "20", 3, true);
	var outputDustDensityObj = new drawData(svg, x, y + 80, "出口粉尘浓度", "30", 4, false);
	var efficientObj = new drawData(svg, x + 120, y + 40, "除尘效率", "99.99", 5, true);

	var inputDustDensitySvg = inputDustDensityObj.valueSvg;
	var outputDustDensitySvg = outputDustDensityObj.valueSvg;
	var efficientSvg = efficientObj.valueSvg;

	drawArrow(svg, x - 15 + 50, y - 15 + 40, x - 15 + 50, y - 15 + 80);
	drawArrow(svg, x - 15 + 120, y - 15 + 60, x - 15 + 50, y - 15 + 80);

	calEfficient_2.inputDustSvg = inputDustDensitySvg;
	calEfficient_2.outputDustSvg = outputDustDensitySvg;
	calEfficient_2.efficientSvg = efficientSvg;

	var btnText = "计算";
	var btnSvg = svg.text(x + 170, y + 90, btnText, contentWordSettings);
	$(btnSvg).bind("click", function() {
		calEfficient_2.calculateOutputDustDesity();
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
	this.offsetX = 0;
	this.offsetY = 0;
	if (offsetX) {
		this.offsetX = offsetX;
	}
	if (offsetY) {
		this.offsetY = offsetY;
	}
	var rectSvg = svg.rect(locationX - 15, locationY - 15, 100, 40, eachElectricValueRectSettings);
	var title = name;
	var titleSvg = svg.text(locationX + this.offsetX, locationY + this.offsetY, title, contentWordSettings);
	drawUnit(unit, svg, locationX + 38, locationY + 18);

	var value = value;
	var valueSvg = svg.text(locationX - 11, locationY + 18, value, contentValueSettings);
	if (isEdit) {
		$(valueSvg).bind("click", function() {
			var returnValue = window.prompt("请输入数据", $(this).html());
			if (returnValue) {
				$(valueSvg).html(returnValue);
			}
		});
	}
	this.rectSvg = rectSvg;
	this.valueSvg = valueSvg;
	this.childData = new Array();

	this.addChildData = function(newData) {
		var location = childData.length;
		childData[location] = newData;
	};
	this.repaint = function() {

	};
	// return valueSvg;

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
	this.locationY = y - 40;

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
 *  计算趋近速度
 */
function Formula2Obj(svg, x, y) {
	this.svg = svg;
	this.locationX = x - 20;
	this.locationY = y - 40;

	svg.text(this.locationX , this.locationY + 30, "ω", contentSettings);
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
	
	
//	svg.text(this.locationX + 70, this.locationY + 20, "-", contentUpperSettings);
//	svg.text(this.locationX + 75, this.locationY + 20, "s▪", contentUpperSettings);
//	svg.text(this.locationX + 85, this.locationY + 20, "ω▪", contentUpperSettings);
//	svg.text(this.locationX + 98, this.locationY + 20, "kc", contentUpperSettings);
}