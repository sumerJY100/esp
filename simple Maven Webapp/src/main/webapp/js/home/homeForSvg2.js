var electricFields = new Array(20);
$(document).ready(function() {
	function ElectricField() {
		ElectricField.prototype.title = "";
		ElectricField.prototype.epId = "";
		ElectricField.prototype.ep = {};
		ElectricField.prototype.epRunStateSvg = null;
		ElectricField.prototype.epRunDataSvg = null;
		ElectricField.prototype.rapperForAnodeSvg = null;
		ElectricField.prototype.rapperForCathodeSvg = null;
		ElectricField.prototype.heaterForCiZhouSvg = null;
		ElectricField.prototype.heaterForCiTaoSvg = null;
		ElectricField.prototype.heaterForHopper = null;
	}

	for (var i = 0; i < 20; i++) {
		var tempElectricField = new ElectricField();
		tempElectricField.title = electricFieldNames[i];
		electricFields[i] = tempElectricField;
	}

	var marginTopForElectricField = 10;
	var marginLeftForElectricField = 120;
	var marginIntervalBetweenDirtCatcher = 20;

	var eachElectricFieldWidth = 220;
	var eachElectricFieldHeight = 140;
	var eachElectricFieldRx = 5;
	var eachElectricFieldRy = 5;
	var electricFieldTitleSettings = {
		fontFamily : "sans-serif",
		fill : "#000000",
		fontSize : "15px",
		fontWeight : "bolder"
	};
	var eachElectricFiedSettings = {
		fill : "#d5d5d5",
		stroke : "#333333"
	};
	var electricFieldTextSettings = {
		fontFamily : "sans-serif",
		fontSize : "12px",
		fontWeight : "light"
	};
	var electricFieldValueSettings = {
		fontFamily : "sans-serif",
		fill : "#000000",
		fontSize : "13px",
		fontWeight : "bold",
		stroke : "",
		strokeWidth : "1px"
	};
	var electricFieldValueUnitSettings = {
		fontFamily : "sans-serif",
		fill : "#000000",
		fontSize : "13px",
		fontWeight : "bold"
	};
	var eachElectricValueRectSettings = {
		fill : "#FFFFFF"
	};
	// 电源运行状态
	var epRunStateLocationWidth = 40;
	var epRunStateLocationHeight = 50;
	var epRunStateFieldSettings = {
		fill : "#F0F0F0",
		stroke : "#000000"
	};
	var epRunStateSettings = {
		fill : "black",
		stroke : "#000000"
	};

	var ElectricFieldsArr = new Array(20);
	/** ***************************************画图************************************************************* */
	$("#homeSvgDiv").svg({
		onLoad : drawIntro
	});

	function drawIntro(svg) {
		// 绘制矩形框
		drawEpRect(svg);
		for (var i = 0; i < ElectricFieldsArr.length; i++) {
			var currentElectricFieldLocationX = parseInt($(ElectricFieldsArr[i]).attr("x"));
			var currentElectricFieldLocationY = parseInt($(ElectricFieldsArr[i]).attr("y"));
			// 绘制title、ep运行状态
			drawEpRunState(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, i);
			// ep运行数据
			drawEpRunValue(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, i);
			// 阳极振打
			drawRapperForAnode(svg, currentElectricFieldLocationX, currentElectricFieldLocationY,i);
			// 阴极振打
			drawRapperForCathode(svg, currentElectricFieldLocationX, currentElectricFieldLocationY,i);
			// 瓷套加热
			drawHeaterForInsulator(svg, currentElectricFieldLocationX, currentElectricFieldLocationY,i);
			// 瓷轴加热
			drawHeaterForPorcelainShaft(svg, currentElectricFieldLocationX, currentElectricFieldLocationY,i);
			// 灰斗加热
			drawHeaterForAshbucket(svg, currentElectricFieldLocationX, currentElectricFieldLocationY,i);
			// 进口烟温
			drawInletFlueGasTemperature(svg);
			// 出口烟温
			drawExitFlueGasTemperature(svg);
			// 出口粉尘
			drawExitFluGasDustLoading(svg);
			// 锅炉负荷
			drawBoilerLoad(svg);
		}

	}
	/**
	 * 绘制矩形
	 */
	function drawEpRect(svg) {
		var arrayIndex = 0;
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 5; j++) {
				var x = marginLeftForElectricField + j * eachElectricFieldWidth;
				var y = marginTopForElectricField + i * eachElectricFieldHeight;
				if (i > 1)
					y = y + marginIntervalBetweenDirtCatcher;
				var currentElectricFieldId = "electricField_id_" + (i + 1) + "_" + (j + 1);
				$.extend(eachElectricFiedSettings, {
					id : currentElectricFieldId
				});
				var tempRect = svg.rect(x, y, eachElectricFieldWidth, eachElectricFieldHeight, eachElectricFieldRx, eachElectricFieldRy, eachElectricFiedSettings);
				ElectricFieldsArr[arrayIndex] = tempRect;
				arrayIndex++;
			}
		}
	}
	/**
	 * 绘制ep title，runState
	 */
	function drawEpRunState(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, location) {
		var title = electricFields[location].title;
		var titleLocationX = parseInt(8 + currentElectricFieldLocationX);
		var titleLocationY = parseInt(20 + currentElectricFieldLocationY);
		var titleSvg = svg.text(titleLocationX, titleLocationY, title, electricFieldTitleSettings);
		// 运行状态
		var epRunStateLocationX = 5 + currentElectricFieldLocationX;
		var epRunStateLocationY = 25 + currentElectricFieldLocationY;
		var runStateRectSvg = svg.rect(epRunStateLocationX, epRunStateLocationY, epRunStateLocationWidth, epRunStateLocationHeight, epRunStateFieldSettings);

		var point1 = new Array((20 + currentElectricFieldLocationX), (30 + currentElectricFieldLocationY));
		var point2 = new Array((40 + currentElectricFieldLocationX), (30 + currentElectricFieldLocationY));
		var point3 = new Array((30 + currentElectricFieldLocationX), (45 + currentElectricFieldLocationY));
		var point4 = new Array((38 + currentElectricFieldLocationX), (45 + currentElectricFieldLocationY));
		var point5 = new Array((15 + currentElectricFieldLocationX), (70 + currentElectricFieldLocationY));
		var point6 = new Array((20 + currentElectricFieldLocationX), (50 + currentElectricFieldLocationY));
		var point7 = new Array((10 + currentElectricFieldLocationX), (50 + currentElectricFieldLocationY));
		var point8 = new Array((20 + currentElectricFieldLocationX), (30 + currentElectricFieldLocationY));
		var epRunStatePath = new Array(point1, point2, point3, point4, point5, point6, point7, point8);
		var runStateLineSvg = svg.polyline(epRunStatePath, epRunStateSettings);

		// var epRunStateSvgObject =
		// {"titleSvg":titleSvg,"runStateRectSvg":runStateRectSvg,"runStateLineSvg":runStateLineSvg};
		var epRunStateSvgObject = new EpRunStateSvgObject();
		epRunStateSvgObject.titleSvg = titleSvg;
		epRunStateSvgObject.runStateRectSvg = runStateRectSvg;
		epRunStateSvgObject.runSateLineSvg = runStateLineSvg;
		electricFields[location].epRunStateSvg = epRunStateSvgObject;

		// electricFields[location].epRunStateSvg.update(0,0,0);

		// $(titleSvg).bind("click",{"runState":0,"alarmState":0,"communication":0,"obj":electricFields[location].epRunStateSvg},electricFields[location].epRunStateSvg.update);
	}
	/**
	 * 绘制EP value
	 */
	function drawEpRunValue(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, location) {
		svg.rect(70 + currentElectricFieldLocationX, 11 + currentElectricFieldLocationY, 40, 18, eachElectricValueRectSettings);
		svg.rect(70 + currentElectricFieldLocationX, 36 + currentElectricFieldLocationY, 40, 18, eachElectricValueRectSettings);
		svg.rect(130 + currentElectricFieldLocationX, 11 + currentElectricFieldLocationY, 60, 18, eachElectricValueRectSettings);
		svg.rect(130 + currentElectricFieldLocationX, 36 + currentElectricFieldLocationY, 60, 18, eachElectricValueRectSettings);
		svg.rect(95 + currentElectricFieldLocationX, 61 + currentElectricFieldLocationY, 60, 18, eachElectricValueRectSettings);

		var U1TextLocationX = 50 + currentElectricFieldLocationX;
		var U1TextLocationY = 25 + currentElectricFieldLocationY;
		var I1TextLocationX = 54 + currentElectricFieldLocationX;
		var I1TextLocationY = 50 + currentElectricFieldLocationY;
		var U2TextLocationX = 110 + currentElectricFieldLocationX;
		var U2TextLocationY = 25 + currentElectricFieldLocationY;
		var I2TextLocationX = 114 + currentElectricFieldLocationX;
		var I2TextLocationY = 50 + currentElectricFieldLocationY;
		var SparkTextLocationX = 50 + currentElectricFieldLocationX;
		var SparkTextLocationY = 75 + currentElectricFieldLocationY;
		svg.text(U1TextLocationX, U1TextLocationY, "U1:", electricFieldTextSettings);
		svg.text(I1TextLocationX, I1TextLocationY, "I1:", electricFieldTextSettings);
		svg.text(U2TextLocationX, U2TextLocationY, "U2:", electricFieldTextSettings);
		svg.text(I2TextLocationX, I2TextLocationY, "I2:", electricFieldTextSettings);
		svg.text(SparkTextLocationX, SparkTextLocationY, "SPARK:", electricFieldTextSettings);

		var U1ValueUnitLocationX = 98 + currentElectricFieldLocationX;
		var U1ValueUnitLocationY = 25 + currentElectricFieldLocationY;
		var I1ValueUnitLocationX = 98 + currentElectricFieldLocationX;
		var I1ValueUnitLocationY = 50 + currentElectricFieldLocationY;
		var U2ValueUnitLocationX = 168 + currentElectricFieldLocationX;
		var U2ValueUnitLocationY = 25 + currentElectricFieldLocationY;
		var I2ValueUnitLocationX = 168 + currentElectricFieldLocationX;
		var I2ValueUnitLocationY = 50 + currentElectricFieldLocationY;
		var SparkValueUnitLocationX = 125 + currentElectricFieldLocationX;
		var SparkValueUnitLocationY = 75 + currentElectricFieldLocationY;
		svg.text(U1ValueUnitLocationX, U1ValueUnitLocationY, "V", electricFieldValueUnitSettings);
		svg.text(I1ValueUnitLocationX, I1ValueUnitLocationY, "A", electricFieldValueUnitSettings);
		svg.text(U2ValueUnitLocationX, U2ValueUnitLocationY, "kV", electricFieldValueUnitSettings);
		svg.text(I2ValueUnitLocationX, I2ValueUnitLocationY, "mA", electricFieldValueUnitSettings);
		svg.text(SparkValueUnitLocationX, SparkValueUnitLocationY, "spm", electricFieldValueUnitSettings);

		var U1ValueLocationX = 72 + currentElectricFieldLocationX;
		var U1ValueLocationY = 25 + currentElectricFieldLocationY;
		var I1ValueLocationX = 72 + currentElectricFieldLocationX;
		var I1ValueLocationY = 50 + currentElectricFieldLocationY;
		var U2ValueLocationX = 132 + currentElectricFieldLocationX;
		var U2ValueLocationY = 25 + currentElectricFieldLocationY;
		var I2ValueLocationX = 132 + currentElectricFieldLocationX;
		var I2ValueLocationY = 50 + currentElectricFieldLocationY;
		var SparkValueLocationX = 95 + currentElectricFieldLocationX;
		var SparkValueLocationY = 75 + currentElectricFieldLocationY;
		var u1Svg = svg.text(U1ValueLocationX, U1ValueLocationY, "400", electricFieldValueSettings);
		var i1Svg = svg.text(I1ValueLocationX, I1ValueLocationY, "300", electricFieldValueSettings);
		var u2Svg = svg.text(U2ValueLocationX, U2ValueLocationY, "70.0", electricFieldValueSettings);
		var i2Svg = svg.text(I2ValueLocationX, I2ValueLocationY, "1200", electricFieldValueSettings);
		var spmSvg = svg.text(SparkValueLocationX, SparkValueLocationY, "100", electricFieldValueSettings);

		var epRunDataSvgObject = new EpRunDataSvgObject();

		epRunDataSvgObject.u1Svg = u1Svg;
		epRunDataSvgObject.i1Svg = i1Svg;
		epRunDataSvgObject.u2Svg = u2Svg;
		epRunDataSvgObject.i2Svg = i2Svg;
		epRunDataSvgObject.spmSvg = spmSvg;
		electricFields[location].epRunDataSvg = epRunDataSvgObject;

	}
	/**
	 * 阳极振打
	 */
	function drawRapperForAnode(svg, currentElectricFieldLocationX, currentElectricFieldLocationY,location) {
		var rapperForAnodeRect = svg.rect(5 + currentElectricFieldLocationX, 95 + currentElectricFieldLocationY, 35, 30, epRunStateFieldSettings);
		var rapperForAnodeRectLocationX = parseFloat($(rapperForAnodeRect).attr("x"));
		var rapperForAnodeRectLocationY = parseFloat($(rapperForAnodeRect).attr("y"));

		var rapperPath = getRapperCurvePath(svg, rapperForAnodeRectLocationX, rapperForAnodeRectLocationY);
		var lineSvg = svg.path(rapperPath, {
			fill : true,
			stroke : "black"
		});

		svg.text(1 + rapperForAnodeRectLocationX, 5 + rapperForAnodeRectLocationY + 22, "阳", {
			fontSize : "9px"
		});

		var lowDevice = new LowDevice();
		lowDevice.rectSvg = rapperForAnodeRect;
		lowDevice.lineSvg = lineSvg;
		electricFields[location].rapperForAnodeSvg = lowDevice;
	}

	/**
	 * 阴极振打
	 */
	function drawRapperForCathode(svg, currentElectricFieldLocationX, currentElectricFieldLocationY,location) {
		var rapperForCathodeRect = svg.rect(47 + currentElectricFieldLocationX, 95 + currentElectricFieldLocationY, 35, 30, epRunStateFieldSettings);

		var rapperForCathodeRectLocationX = parseFloat($(rapperForCathodeRect).attr("x"));
		var rapperForCathodeRectLocationY = parseFloat($(rapperForCathodeRect).attr("y"));
		var rapperPath = getRapperCurvePath(svg, rapperForCathodeRectLocationX, rapperForCathodeRectLocationY);
		var lineSvg = svg.path(rapperPath, {
			fill : true,
			stroke : "black"
		});
		svg.text(1 + rapperForCathodeRectLocationX, 5 + rapperForCathodeRectLocationY + 22, "阴", {
			fontSize : "9px"
		});
		var lowDevice = new LowDevice();
		lowDevice.rectSvg = rapperForCathodeRect;
		lowDevice.lineSvg = lineSvg;
		electricFields[location].rapperForCathodeSvg = lowDevice;
	}
	function getRapperCurvePath(svg, rapperForCathodeRectLocationX, rapperForCathodeRectLocationY) {
		var rapperPath = svg.createPath();
		rapperPath.move(5 + rapperForCathodeRectLocationX, 13 + rapperForCathodeRectLocationY, true);
		// rapperPath.line(15 + rapperForCathodeRectLocationX,10 +
		// rapperForCathodeRectLocationY);
		var point1 = new Array(5 + rapperForCathodeRectLocationX, 13 + rapperForCathodeRectLocationY);
		var point2 = new Array(16 + rapperForCathodeRectLocationX, 11 + rapperForCathodeRectLocationY);
		var point3 = new Array(17 + rapperForCathodeRectLocationX, 5 + rapperForCathodeRectLocationY);
		var pointsArray = new Array(point1, point2, point3);
		rapperPath.curveC(pointsArray);
		rapperPath.line((25 + rapperForCathodeRectLocationX), (5 + rapperForCathodeRectLocationY));
		rapperPath.line((20 + rapperForCathodeRectLocationX), (12 + rapperForCathodeRectLocationY));
		rapperPath.line((28 + rapperForCathodeRectLocationX), (17 + rapperForCathodeRectLocationY));
		rapperPath.line((28 + rapperForCathodeRectLocationX), (25 + rapperForCathodeRectLocationY));
		rapperPath.line((15 + rapperForCathodeRectLocationX), (15 + rapperForCathodeRectLocationY));
		rapperPath.line((13 + rapperForCathodeRectLocationX), (22 + rapperForCathodeRectLocationY));
		rapperPath.close();
		return rapperPath;
	}
	/**
	 * 瓷套加热
	 */
	function drawHeaterForInsulator(svg, currentElectricFieldLocationX, currentElectricFieldLocationY,location) {
		var insulatorRect = svg.rect(89 + currentElectricFieldLocationX, 95 + currentElectricFieldLocationY, 35, 30, epRunStateFieldSettings);

		var insulatorRectLocationX = parseFloat($(insulatorRect).attr("x"));
		var insulatorRectLocationY = parseFloat($(insulatorRect).attr("y"));

		var insulatorPath = createHeatePath(svg, insulatorRectLocationX, insulatorRectLocationY);
		var lineSvg = svg.path(insulatorPath, {
			fill : "none",
			stroke : "black",
			strokeWidth : "2.5px"
		});
		var lowDevice = new LowDevice();
		lowDevice.rectSvg = insulatorRect;
		lowDevice.lineSvg = lineSvg;
		electricFields[location].heaterForCiTaoSvg = lowDevice;
	}
	/**
	 * 瓷轴加热
	 */
	function drawHeaterForPorcelainShaft(svg, currentElectricFieldLocationX, currentElectricFieldLocationY,location) {
		var porcelainShaftRect = svg.rect(131 + currentElectricFieldLocationX, 95 + currentElectricFieldLocationY, 35, 30, epRunStateFieldSettings);
		var insulatorRectLocationX = parseFloat($(porcelainShaftRect).attr("x"));
		var insulatorRectLocationY = parseFloat($(porcelainShaftRect).attr("y"));

		var insulatorPath = createHeatePath2(svg, insulatorRectLocationX, insulatorRectLocationY);
		var lineSvg = svg.path(insulatorPath, {
			fill : "none",
			stroke : "black",
			strokeWidth : "2.5px"
		});
		var lowDevice = new LowDevice();
		lowDevice.rectSvg = porcelainShaftRect;
		lowDevice.lineSvg = lineSvg;
		electricFields[location].heaterForCiZhouSvg = lowDevice;
	}
	function createHeatePath(svg, insulatorRectLocationX, insulatorRectLocationY) {
		var insulatorPath = svg.createPath();
		insulatorPath.moveTo((8 + insulatorRectLocationX), (5 + insulatorRectLocationY));
		insulatorPath.line((28 + insulatorRectLocationX), (5 + insulatorRectLocationY));
		insulatorPath.line((28 + insulatorRectLocationX), (10 + insulatorRectLocationY));
		insulatorPath.line((8 + insulatorRectLocationX), (10 + insulatorRectLocationY));
		insulatorPath.line((8 + insulatorRectLocationX), (15 + insulatorRectLocationY));
		insulatorPath.line((28 + insulatorRectLocationX), (15 + insulatorRectLocationY));
		insulatorPath.line((28 + insulatorRectLocationX), (20 + insulatorRectLocationY));
		insulatorPath.line((8 + insulatorRectLocationX), (20 + insulatorRectLocationY));
		insulatorPath.line((8 + insulatorRectLocationX), (25 + insulatorRectLocationY));
		insulatorPath.line((28 + insulatorRectLocationX), (25 + insulatorRectLocationY));
		return insulatorPath;
	}
	function createHeatePath2(svg, insulatorRectLocationX, insulatorRectLocationY) {
		var insulatorPath = svg.createPath();
		insulatorPath.moveTo((5 + insulatorRectLocationX), (25 + insulatorRectLocationY));
		insulatorPath.line((5 + insulatorRectLocationX), (5 + insulatorRectLocationY));
		insulatorPath.line((10 + insulatorRectLocationX), (5 + insulatorRectLocationY));
		insulatorPath.line((10 + insulatorRectLocationX), (5 + insulatorRectLocationY));
		insulatorPath.line((10 + insulatorRectLocationX), (25 + insulatorRectLocationY));
		insulatorPath.line((15 + insulatorRectLocationX), (25 + insulatorRectLocationY));
		insulatorPath.line((15 + insulatorRectLocationX), (5 + insulatorRectLocationY));
		insulatorPath.line((20 + insulatorRectLocationX), (5 + insulatorRectLocationY));
		insulatorPath.line((20 + insulatorRectLocationX), (25 + insulatorRectLocationY));
		insulatorPath.line((25 + insulatorRectLocationX), (25 + insulatorRectLocationY));
		insulatorPath.line((25 + insulatorRectLocationX), (5 + insulatorRectLocationY));
		insulatorPath.line((30 + insulatorRectLocationX), (5 + insulatorRectLocationY));
		insulatorPath.line((30 + insulatorRectLocationX), (25 + insulatorRectLocationY));
		return insulatorPath;
	}
	/**
	 * 灰斗加热
	 */
	function drawHeaterForAshbucket(svg, currentElectricFieldLocationX, currentElectricFieldLocationY,location) {
		var ashBucketRectForLeft = svg.rect(173 + currentElectricFieldLocationX, 95 + currentElectricFieldLocationY, 16, 30, epRunStateFieldSettings);
		var insulatorRectLocationXForLeft = parseFloat($(ashBucketRectForLeft).attr("x"));
		var insulatorRectLocationYForLeft = parseFloat($(ashBucketRectForLeft).attr("y"));
		var ashBucketRectForRight = svg.rect(173 + currentElectricFieldLocationX + 22, 95 + currentElectricFieldLocationY, 16, 30, epRunStateFieldSettings);
		var insulatorRectLocationXForRight = parseFloat($(ashBucketRectForRight).attr("x"));
		var insulatorRectLocationYForRight = parseFloat($(ashBucketRectForRight).attr("y"));

		var insulatorPathForLeft = createAshBucketHeatePath(svg, insulatorRectLocationXForLeft, insulatorRectLocationYForLeft);
		var lineSvgForLeft = svg.path(insulatorPathForLeft, {
			fill : "none",
			stroke : "black",
			strokeWidth : "1.5px"
		});
		var insulatorPathForRight = createAshBucketHeatePath(svg, insulatorRectLocationXForRight, insulatorRectLocationYForRight);
		var lineSvgForRight = svg.path(insulatorPathForRight, {
		    fill : "none",
		    stroke : "black",
		    strokeWidth : "1.5px"
		});
		var lowDeviceForLeft = new LowDevice();
		lowDeviceForLeft.rectSvg = ashBucketRectForLeft;
		lowDeviceForLeft.lineSvg = lineSvgForLeft;
		var lowDeviceForRight = new LowDevice();
		lowDeviceForRight.rectSvg = ashBucketRectForRight;
		lowDeviceForRight.lineSvg = lineSvgForRight;
		electricFields[location].heaterForLeftHopper = lowDeviceForLeft;
		electricFields[location].heaterForRightHopper = lowDeviceForRight;
	}
	function createAshBucketHeatePath(svg, insulatorRectLocationX, insulatorRectLocationY) {
		var insulatorPath = svg.createPath();
		insulatorPath.moveTo((3 + insulatorRectLocationX), (25 + insulatorRectLocationY));
		insulatorPath.line((6 + insulatorRectLocationX), (5 + insulatorRectLocationY));
		insulatorPath.line((6 + insulatorRectLocationX), (25 + insulatorRectLocationY));
		insulatorPath.line((9 + insulatorRectLocationX), (5 + insulatorRectLocationY));
		insulatorPath.line((9 + insulatorRectLocationX), (25 + insulatorRectLocationY));
		insulatorPath.line((11 + insulatorRectLocationX), (5 + insulatorRectLocationY));
		insulatorPath.line((11 + insulatorRectLocationX), (25 + insulatorRectLocationY));
		insulatorPath.line((14 + insulatorRectLocationX), (5 + insulatorRectLocationY));
		return insulatorPath;
	}
	// 进口烟温
	function drawInletFlueGasTemperature(svg) {
		// 30为喇叭口宽度，40为箭头宽度
		var markLocationX = marginLeftForElectricField - 30 - 40;
		// 绘制箭头
		drawFlusGasArrowMark(svg, markLocationX);
		// 绘制喇叭口
		drawEspInlethornMouse(svg);
		// 绘制进口温度
		var flueGaseTempratureLocationX = markLocationX - 20;
		drawInletFlueGasTemperatureText(svg, flueGaseTempratureLocationX);
	}
	// 出口烟温
	function drawExitFlueGasTemperature(svg) {
		var markLocationX = marginLeftForElectricField + eachElectricFieldWidth * 5 + 50;
		drawFlusGasArrowMark(svg, markLocationX);
		drawEspExithornMouse(svg);
		// 绘制出口温度
		var flueGaseTempratureLocationX = markLocationX - 20;
		drawInletFlueGasTemperatureText(svg, flueGaseTempratureLocationX);
	}
	// 烟气方向箭头
	function drawFlusGasArrowMark(svg, markLocationX) {
		var firstFlusGasArrowMarkLocationY = marginTopForElectricField + eachElectricFieldHeight / 2;
		var secondFlusGasArrowMarkLocationY = firstFlusGasArrowMarkLocationY + eachElectricFieldHeight;
		var thirdFlusGasArrowMarkLocationY = secondFlusGasArrowMarkLocationY + eachElectricFieldHeight + marginIntervalBetweenDirtCatcher;
		var forthFlusGasArrowMarkLocationY = thirdFlusGasArrowMarkLocationY + eachElectricFieldHeight;
		var firstFlusGasArrowMark = drawFlusGasArrowMarkPath(svg, markLocationX, firstFlusGasArrowMarkLocationY);
		var flusGasArrowMarkSettings = {
			stroke : "black",
			fill : "none"
		};
		svg.path(firstFlusGasArrowMark, flusGasArrowMarkSettings);
		var secondFlusGasArrowMark = drawFlusGasArrowMarkPath(svg, markLocationX, secondFlusGasArrowMarkLocationY);
		svg.path(secondFlusGasArrowMark, flusGasArrowMarkSettings);
		var thirdFlusGasArrowMark = drawFlusGasArrowMarkPath(svg, markLocationX, thirdFlusGasArrowMarkLocationY);
		svg.path(thirdFlusGasArrowMark, flusGasArrowMarkSettings);
		var forthFlusGasArrowMark = drawFlusGasArrowMarkPath(svg, markLocationX, forthFlusGasArrowMarkLocationY);
		svg.path(forthFlusGasArrowMark, flusGasArrowMarkSettings);
	}
	function drawFlusGasArrowMarkPath(svg, markLocationX, markLocationY) {
		var flusGasPath = svg.createPath();
		flusGasPath.moveTo(markLocationX, markLocationY);
		flusGasPath.line(30 + markLocationX, markLocationY);
		flusGasPath.line(30 + markLocationX, markLocationY - 10);
		flusGasPath.line(40 + markLocationX, markLocationY + 2.5);
		flusGasPath.line(30 + markLocationX, markLocationY + 15);
		flusGasPath.line(30 + markLocationX, markLocationY + 5);
		flusGasPath.line(markLocationX, markLocationY + 5);
		return flusGasPath;
	}
	// 电除尘进口喇叭口
	function drawEspInlethornMouse(svg) {
		var firstEspInletHornMousePathLocationY = marginTopForElectricField;
		var secondEspInletHornMousePathLocationY = firstEspInletHornMousePathLocationY + eachElectricFieldHeight;
		var thirdEspInletHornMousePathLocationY = secondEspInletHornMousePathLocationY + eachElectricFieldHeight + marginIntervalBetweenDirtCatcher;
		var forthEspInletHornMousePathLocationY = thirdEspInletHornMousePathLocationY + eachElectricFieldHeight;
		var firstEspInletHornMousePath = drawEspInlethornMousePath(svg, firstEspInletHornMousePathLocationY);
		var secondEspInletHornMousePath = drawEspInlethornMousePath(svg, secondEspInletHornMousePathLocationY);
		var thirdEspInletHornMousePath = drawEspInlethornMousePath(svg, thirdEspInletHornMousePathLocationY);
		var forthEspInletHornMousePath = drawEspInlethornMousePath(svg, forthEspInletHornMousePathLocationY);
		var espInletHornMouthSettings = {
			stroke : "black",
			fill : "none"
		};
		svg.path(firstEspInletHornMousePath, espInletHornMouthSettings);
		svg.path(secondEspInletHornMousePath, espInletHornMouthSettings);
		svg.path(thirdEspInletHornMousePath, espInletHornMouthSettings);
		svg.path(forthEspInletHornMousePath, espInletHornMouthSettings);

	}
	function drawEspInlethornMousePath(svg, espInletHornMousePathLocationY) {
		var espInletHornMousePath = svg.createPath();
		espInletHornMousePath.moveTo(marginLeftForElectricField - 30, espInletHornMousePathLocationY + 30);
		espInletHornMousePath.line(marginLeftForElectricField, espInletHornMousePathLocationY);
		espInletHornMousePath.line(marginLeftForElectricField, espInletHornMousePathLocationY + eachElectricFieldHeight);
		espInletHornMousePath.line(marginLeftForElectricField - 30, espInletHornMousePathLocationY + eachElectricFieldHeight - 30);
		espInletHornMousePath.close();
		return espInletHornMousePath;
	}
	// 电除尘器出口喇叭口
	function drawEspExithornMouse(svg) {
		var firstEspExitHornMousePathLocationY = marginTopForElectricField;
		var secondEspExitHornMousePathLocationY = firstEspExitHornMousePathLocationY + eachElectricFieldHeight;
		var thirdEspExitHornMousePathLocationY = secondEspExitHornMousePathLocationY + eachElectricFieldHeight + marginIntervalBetweenDirtCatcher;
		var forthEspExitHornMousePathLocationY = thirdEspExitHornMousePathLocationY + eachElectricFieldHeight;
		var firstEspExitHornMousePath = drawEspExithornMousePath(svg, firstEspExitHornMousePathLocationY);
		var secondEspExitHornMousePath = drawEspExithornMousePath(svg, secondEspExitHornMousePathLocationY);
		var thirdEspExitHornMousePath = drawEspExithornMousePath(svg, thirdEspExitHornMousePathLocationY);
		var forthEspExitHornMousePath = drawEspExithornMousePath(svg, forthEspExitHornMousePathLocationY);
		var espExitHornMouthSettings = {
			stroke : "black",
			fill : "none"
		};
		svg.path(firstEspExitHornMousePath, espExitHornMouthSettings);
		svg.path(secondEspExitHornMousePath, espExitHornMouthSettings);
		svg.path(thirdEspExitHornMousePath, espExitHornMouthSettings);
		svg.path(forthEspExitHornMousePath, espExitHornMouthSettings);
	}
	function drawEspExithornMousePath(svg, expExitHornMousePathLocationY) {
		var expExitHornMousePathLocationX = marginLeftForElectricField + eachElectricFieldWidth * 5;
		var espExitHornMousePath = svg.createPath();
		espExitHornMousePath.moveTo(expExitHornMousePathLocationX, expExitHornMousePathLocationY);
		espExitHornMousePath.line(expExitHornMousePathLocationX + 30, expExitHornMousePathLocationY + 30);
		espExitHornMousePath.line(expExitHornMousePathLocationX + 30, expExitHornMousePathLocationY + eachElectricFieldHeight - 30);
		espExitHornMousePath.line(expExitHornMousePathLocationX, expExitHornMousePathLocationY + eachElectricFieldHeight);
		espExitHornMousePath.close();
		return espExitHornMousePath;
	}
	function drawInletFlueGasTemperatureText(svg, flueGaseTempratureLocationX) {
		var firstFlusGasArrowMarkLocationY = marginTopForElectricField + eachElectricFieldHeight / 2 - 10;
		var secondFlusGasArrowMarkLocationY = firstFlusGasArrowMarkLocationY + eachElectricFieldHeight;
		var thirdFlusGasArrowMarkLocationY = secondFlusGasArrowMarkLocationY + eachElectricFieldHeight + marginIntervalBetweenDirtCatcher;
		var forthFlusGasArrowMarkLocationY = thirdFlusGasArrowMarkLocationY + eachElectricFieldHeight;
		// var firstFlusGasArrowMark = drawFlusGasArrowMarkPath(svg,
		// markLocationX, firstFlusGasArrowMarkLocationY);

		var tempSettings = {
			fontFamily : "serif",
			fill : "#000000",
			fontSize : "13px",
			fontWeight : "bold"
		};
		svg.text(flueGaseTempratureLocationX, firstFlusGasArrowMarkLocationY, "000.0", tempSettings);
		svg.text(flueGaseTempratureLocationX, secondFlusGasArrowMarkLocationY, "000.0", tempSettings);
		svg.text(flueGaseTempratureLocationX, thirdFlusGasArrowMarkLocationY, "000.0", tempSettings);
		svg.text(flueGaseTempratureLocationX, forthFlusGasArrowMarkLocationY, "000.0", tempSettings);
		var tempSettings2 = {
			fontFamily : "serif",
			fill : "#000000",
			fontSize : "13px",
			fontWeight : "bold"
		};
		svg.text(flueGaseTempratureLocationX + 38, firstFlusGasArrowMarkLocationY, "℃", tempSettings2);
		svg.text(flueGaseTempratureLocationX + 38, secondFlusGasArrowMarkLocationY, "℃", tempSettings2);
		svg.text(flueGaseTempratureLocationX + 38, thirdFlusGasArrowMarkLocationY, "℃", tempSettings2);
		svg.text(flueGaseTempratureLocationX + 38, forthFlusGasArrowMarkLocationY, "℃", tempSettings2);

	}

	// 出口粉尘
	function drawExitFluGasDustLoading(svg) {
		var exitFlueGasDustLocationX = marginLeftForElectricField + eachElectricFieldWidth * 5 + 30;
		var firstExitFlueGasDustLocationY = marginTopForElectricField + eachElectricFieldHeight / 2 + 30;
		var secondExitFlueGasDustLocationY = firstExitFlueGasDustLocationY + eachElectricFieldHeight;
		var thirdExitFlueGasDustLocationY = secondExitFlueGasDustLocationY + eachElectricFieldHeight + marginIntervalBetweenDirtCatcher;
		var forthExitFlueGasDustLocationY = thirdExitFlueGasDustLocationY + eachElectricFieldHeight;
		var tempSettings = {
			fontFamily : "serif",
			fill : "#000000",
			fontSize : "13px",
			fontWeight : "bold"
		};
		svg.text(exitFlueGasDustLocationX, firstExitFlueGasDustLocationY, "000.0", tempSettings);
		svg.text(exitFlueGasDustLocationX, secondExitFlueGasDustLocationY, "000.0", tempSettings);
		svg.text(exitFlueGasDustLocationX, thirdExitFlueGasDustLocationY, "000.0", tempSettings);
		svg.text(exitFlueGasDustLocationX, forthExitFlueGasDustLocationY, "000.0", tempSettings);

		svg.text(exitFlueGasDustLocationX + 38, firstExitFlueGasDustLocationY, "g/m³", tempSettings);
		svg.text(exitFlueGasDustLocationX + 38, secondExitFlueGasDustLocationY, "g/m³", tempSettings);
		svg.text(exitFlueGasDustLocationX + 38, thirdExitFlueGasDustLocationY, "g/m³", tempSettings);
		svg.text(exitFlueGasDustLocationX + 38, forthExitFlueGasDustLocationY, "g/m³", tempSettings);

	}

	// 锅炉负荷
	function drawBoilerLoad(svg) {
		var blLocationX = marginLeftForElectricField + eachElectricFieldWidth * 5 + 30;
		var blLocationY = 30;
		var tempSettings1 = {
			fontFamily : "宋体",
			fill : "#000000",
			fontSize : "15px"
		};
		var tempSettings2 = {
			fontFamily : "serif",
			// stroke:"black",
			// strokeWidth:"0.5px",
			fill : "black",
			fontSize : "13px",
			fontWeight : "bold"
		};
		svg.text(blLocationX, blLocationY, "锅炉负荷:", tempSettings1);

		svg.text(blLocationX + 70, blLocationY, "300", tempSettings2);
		svg.text(blLocationX + 110, blLocationY, "MW", tempSettings2);
	}
	
	
	
	$("#resetBtn").bind("click",function(){
	    var url = ctx + "/back/resetAllAlarm.do";
	    $.get(url,function(data){});
	    
	})
});