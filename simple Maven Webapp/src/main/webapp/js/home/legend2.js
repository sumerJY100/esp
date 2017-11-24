$(document).ready(function() {
    function ElectricField() {
	ElectricField.prototype.title = "";
    }
    var electricFieldNames = new Array("1A11", "1A12", "1A13", "1A14", "1A15", "1B11", "1B12", "1B13", "1B14", "1B15", "2A11", "2A12", "2A13", "2A14", "2A15", "2B11", "2B12", "2B13", "2B14", "2B15");

    var electricFields = new Array(20);
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

    var communicationInterruptLocationX = 450;
    var stoppingLocationX = 550;
    var runningLocationX = 650;
    var errorRunningLocationX = 750;
    var errorStoppingLocationX = 850;
    var epLocationY = 50;
    var rapperForAnodeLocationY = 130;
    var rapperForCathodeLocationY = 210;
    var heater1LocationY = 290;
    var heater2LocationY = 370;
    var heater3LocationY = 450;
    /** ***************************************画图************************************************************* */
    $("#homeSvgDiv").svg({
	onLoad : drawIntro
    });

    function drawIntro(svg) {
	// 绘制矩形框
	// drawEpRect(svg);
	// for (var i = 0; i < ElectricFieldsArr.length; i++) {
	// var currentElectricFieldLocationX =
	// parseInt($(ElectricFieldsArr[i]).attr("x"));
	// var currentElectricFieldLocationY =
	// parseInt($(ElectricFieldsArr[i]).attr("y"));
	// 绘制title、ep运行状态
	drawAllRunWayText(svg);
	drawLines(svg);
	drawEpRunState(svg);
	drawRapperForAnodeRunState(svg);
	drawRapperForCathodeRunState(svg);
	drawHeaterForPorcelainShaftState(svg);
	drawHeaterForInsulatorState(svg);
	drawHeaterForAshbucketState(svg);
	// ep运行数据
	/**
	 * drawEpRunValue(svg, currentElectricFieldLocationX,
	 * currentElectricFieldLocationY); // 阳极振打 drawRapperForAnode(svg,
	 * currentElectricFieldLocationX, currentElectricFieldLocationY); //
	 * 阴极振打 drawRapperForCathode(svg, currentElectricFieldLocationX,
	 * currentElectricFieldLocationY); // 瓷套加热 drawHeaterForInsulator(svg,
	 * currentElectricFieldLocationX, currentElectricFieldLocationY); //
	 * 瓷轴加热 drawHeaterForPorcelainShaft(svg, currentElectricFieldLocationX,
	 * currentElectricFieldLocationY); // 灰斗加热 drawHeaterForAshbucket(svg,
	 * currentElectricFieldLocationX, currentElectricFieldLocationY); //
	 * 进口烟温 drawInletFlueGasTemperature(svg); // 出口烟温
	 * drawExitFlueGasTemperature(svg); // 出口粉尘
	 * drawExitFluGasDustLoading(svg); // 锅炉负荷 drawBoilerLoad(svg);
	 */
	// }
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

    function drawEpRunState(svg) {
	svg.text(communicationInterruptLocationX - 150, epLocationY + 50, "电源运行状态", electricFieldTitleSettings);
	drawEpRunStateLegend(svg, communicationInterruptLocationX, epLocationY, "black", "#F0F0F0");
	drawEpRunStateLegend(svg, stoppingLocationX, epLocationY, "black", "#7CFC00");
	drawEpRunStateLegend(svg, runningLocationX, epLocationY, "yellow", "red");
	drawEpRunStateLegend(svg, errorRunningLocationX, epLocationY, "red", "yellow");
	drawEpRunStateLegend(svg, errorStoppingLocationX, epLocationY, "black", "yellow");
    }
    function drawRapperForAnodeRunState(svg) {
	svg.text(communicationInterruptLocationX - 150, rapperForAnodeLocationY + 45, "阳极振打状态", electricFieldTitleSettings);
	drawRapperForAnode(svg, communicationInterruptLocationX, rapperForAnodeLocationY, "black", "#F0F0F0");
	drawRapperForAnode(svg, stoppingLocationX, rapperForAnodeLocationY, "black", "#7CFC00");
	drawRapperForAnode(svg, runningLocationX, rapperForAnodeLocationY, "black", "red");
	drawRapperForAnode(svg, errorRunningLocationX, rapperForAnodeLocationY, "red", "yellow");
	drawRapperForAnode(svg, errorStoppingLocationX, rapperForAnodeLocationY, "black", "yellow");
    }
    function drawRapperForCathodeRunState(svg) {
	svg.text(communicationInterruptLocationX - 150, rapperForCathodeLocationY + 45, "阴极振打状态", electricFieldTitleSettings);
	drawRapperForCathode(svg, communicationInterruptLocationX, rapperForCathodeLocationY, "black", "#F0F0F0");
	drawRapperForCathode(svg, stoppingLocationX, rapperForCathodeLocationY, "black", "#7CFC00");
	drawRapperForCathode(svg, runningLocationX, rapperForCathodeLocationY, "black", "red");
	drawRapperForCathode(svg, errorRunningLocationX, rapperForCathodeLocationY, "red", "yellow");
	drawRapperForCathode(svg, errorStoppingLocationX, rapperForCathodeLocationY, "black", "yellow");
    }
    function drawHeaterForPorcelainShaftState(svg) {
	svg.text(communicationInterruptLocationX - 150, heater1LocationY + 45, "瓷轴加热状态", electricFieldTitleSettings);
	drawHeaterForPorcelainShaft(svg, communicationInterruptLocationX, heater1LocationY, "black", "#F0F0F0");
	drawHeaterForPorcelainShaft(svg, stoppingLocationX, heater1LocationY, "black", "#7cfc00");
	drawHeaterForPorcelainShaft(svg, runningLocationX, heater1LocationY, "black", "red");
	drawHeaterForPorcelainShaft(svg, errorRunningLocationX, heater1LocationY, "red", "yellow");
	drawHeaterForPorcelainShaft(svg, errorStoppingLocationX, heater1LocationY, "black", "yellow");
    }
    function drawHeaterForInsulatorState(svg) {
	svg.text(communicationInterruptLocationX - 150, heater2LocationY + 45, "瓷套加热状态", electricFieldTitleSettings);
	drawHeaterForInsulator(svg, communicationInterruptLocationX, heater2LocationY, "black", "#F0F0F0");
	drawHeaterForInsulator(svg, stoppingLocationX, heater2LocationY, "black", "#7cfc00");
	drawHeaterForInsulator(svg, runningLocationX, heater2LocationY, "black", "red");
	drawHeaterForInsulator(svg, errorRunningLocationX, heater2LocationY, "red", "yellow");
	drawHeaterForInsulator(svg, errorStoppingLocationX, heater2LocationY, "black", "yellow");
    }
    function drawHeaterForAshbucketState(svg) {
	svg.text(communicationInterruptLocationX - 150, heater3LocationY + 45, "灰斗加热状态", electricFieldTitleSettings);
	drawHeaterForAshbucket(svg, communicationInterruptLocationX, heater3LocationY, "black", "#F0F0F0");
	drawHeaterForAshbucket(svg, stoppingLocationX, heater3LocationY, "black", "#7cfc00");
	drawHeaterForAshbucket(svg, runningLocationX, heater3LocationY, "black", "red");
	drawHeaterForAshbucket(svg, errorRunningLocationX, heater3LocationY, "red", "yellow");
	drawHeaterForAshbucket(svg, errorStoppingLocationX, heater3LocationY, "black", "yellow");
    }
    function drawAllRunWayText(svg) {
	var titleLocationY = 50;
	svg.text(communicationInterruptLocationX, titleLocationY, "通讯中断", electricFieldTitleSettings);
	svg.text(stoppingLocationX, titleLocationY, "停运中", electricFieldTitleSettings);
	svg.text(runningLocationX, titleLocationY, "运行中", electricFieldTitleSettings);
	svg.text(errorRunningLocationX - 20, titleLocationY, "故障(运行中)", electricFieldTitleSettings);
	svg.text(errorStoppingLocationX - 20, titleLocationY, "故障(停运中)", electricFieldTitleSettings);
    }
    function drawLines(svg){

	    
	    var locationLine1LocationX = communicationInterruptLocationX - 180;
	    var locationLine1LocationY = epLocationY - 20;
	    var locationLine1LocationEndX = errorStoppingLocationX + 100;
	    svg.line(locationLine1LocationX,locationLine1LocationY,locationLine1LocationEndX,locationLine1LocationY,{stroke:"black",strokeWidth:2});
	    var locationLine2LocationY = epLocationY + 10;
	    svg.line(locationLine1LocationX,locationLine2LocationY,locationLine1LocationEndX,locationLine2LocationY,{stroke:"black",strokeWidth:2});
	    var locationLine3LocationY = rapperForAnodeLocationY + 5;
	    svg.line(locationLine1LocationX,locationLine3LocationY,locationLine1LocationEndX,locationLine3LocationY,{stroke:"black",strokeWidth:2});
	    var locationLine4LocationY = rapperForCathodeLocationY;
	    svg.line(locationLine1LocationX,locationLine4LocationY,locationLine1LocationEndX,locationLine4LocationY,{stroke:"black",strokeWidth:2});
	    var locationLine5LocationY = heater1LocationY ;
	    svg.line(locationLine1LocationX,locationLine5LocationY,locationLine1LocationEndX,locationLine5LocationY,{stroke:"black",strokeWidth:2});
	    var locationLine6LocationY = heater2LocationY;
	    svg.line(locationLine1LocationX,locationLine6LocationY,locationLine1LocationEndX,locationLine6LocationY,{stroke:"black",strokeWidth:2});
	    var locationLine7LocationY = heater3LocationY;
	    svg.line(locationLine1LocationX,locationLine7LocationY,locationLine1LocationEndX,locationLine7LocationY,{stroke:"black",strokeWidth:2});
	    var locationLine8LocationY = heater3LocationY + 75;
	    svg.line(locationLine1LocationX,locationLine8LocationY,locationLine1LocationEndX,locationLine8LocationY,{stroke:"black",strokeWidth:2});
	    //竖线
	    svg.line(locationLine1LocationX,locationLine1LocationY,locationLine1LocationX,locationLine8LocationY,{stroke:"black",strokeWidth:2});
//	    var locationLine8LocationX  	
	    svg.line(locationLine1LocationEndX,locationLine1LocationY,locationLine1LocationEndX,locationLine8LocationY,{stroke:"black",strokeWidth:2});
	    var locationLine2LocationEndX = locationLine1LocationX + 150;
	    var line2 = svg.line(locationLine2LocationEndX,locationLine1LocationY,locationLine2LocationEndX,locationLine8LocationY,{stroke:"black",strokeWidth:1});
	    $(line2).attr("transform","translate(0.5 0.5)");
	    var locationLine3LocationEndX = locationLine1LocationX + 250;
	    var line3 = svg.line(locationLine3LocationEndX,locationLine1LocationY,locationLine3LocationEndX,locationLine8LocationY,{stroke:"black",strokeWidth:1});
	    $(line3).attr("transform","translate(0.5 0.5)");
	    var locationLine4LocationEndX = locationLine1LocationX + 350;
	    var line4 = svg.line(locationLine4LocationEndX,locationLine1LocationY,locationLine4LocationEndX,locationLine8LocationY,{stroke:"black",strokeWidth:1});
	    $(line4).attr("transform","translate(0.5 0.5)");
	    var locationLine5LocationEndX = locationLine1LocationX + 450;
	    var line5 = svg.line(locationLine5LocationEndX,locationLine1LocationY,locationLine5LocationEndX,locationLine8LocationY,{stroke:"black",strokeWidth:1});
	    $(line5).attr("transform","translate(0.5 0.5)");
	    var locationLine6LocationEndX = locationLine1LocationX + 550;
	    var line6 = svg.line(locationLine6LocationEndX,locationLine1LocationY,locationLine6LocationEndX,locationLine8LocationY,{stroke:"black",strokeWidth:1});
	    $(line6).attr("transform","translate(0.5 0.5)");
    }
    /**
     * 绘制ep title，runState
     */
    function drawEpRunStateLegend(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, runColor, runWayColor) {
	// var currentElectricFieldLocationX = 300;
	// var currentElectricFieldLocationY = 50;
	// var title = "通讯中断";
	// var titleLocationX = parseInt(0 + currentElectricFieldLocationX);
	// var titleLocationY = parseInt(100 + currentElectricFieldLocationY);
	// svg.text(titleLocationX, titleLocationY, title,
	// electricFieldTitleSettings);
	// 运行状态
	var epRunStateLocationX = 5 + currentElectricFieldLocationX;
	var epRunStateLocationY = 25 + currentElectricFieldLocationY;
	var epRunStateFieldSettings = {
	    fill : runWayColor,
	    stroke : "#000000"
	};
	svg.rect(epRunStateLocationX, epRunStateLocationY, epRunStateLocationWidth, epRunStateLocationHeight, epRunStateFieldSettings);

	var point1 = new Array((20 + currentElectricFieldLocationX), (30 + currentElectricFieldLocationY));
	var point2 = new Array((40 + currentElectricFieldLocationX), (30 + currentElectricFieldLocationY));
	var point3 = new Array((30 + currentElectricFieldLocationX), (45 + currentElectricFieldLocationY));
	var point4 = new Array((38 + currentElectricFieldLocationX), (45 + currentElectricFieldLocationY));
	var point5 = new Array((15 + currentElectricFieldLocationX), (70 + currentElectricFieldLocationY));
	var point6 = new Array((20 + currentElectricFieldLocationX), (50 + currentElectricFieldLocationY));
	var point7 = new Array((10 + currentElectricFieldLocationX), (50 + currentElectricFieldLocationY));
	var point8 = new Array((20 + currentElectricFieldLocationX), (30 + currentElectricFieldLocationY));
	var epRunStatePath = new Array(point1, point2, point3, point4, point5, point6, point7, point8);
	var epRunStateSettings = {
	    fill : runColor,
	    stroke : "#000000"
	};
	svg.polyline(epRunStatePath, epRunStateSettings);

    }

    /**
     * 阳极振打
     */
    function drawRapperForAnode(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, runColor, runWayColor) {
	var epRunStateFieldSettings = {
	    fill : runWayColor,
	    stroke : "#000000"
	};
	var rapperForAnodeRect = svg.rect(5 + currentElectricFieldLocationX, 15 + currentElectricFieldLocationY, 35, 30, epRunStateFieldSettings);
	var rapperForAnodeRectLocationX = parseFloat($(rapperForAnodeRect).attr("x"));
	var rapperForAnodeRectLocationY = parseFloat($(rapperForAnodeRect).attr("y"));
	// alert($(rapperForAnodeRect).attr("x") + "," +
	// currentElectricFieldLocationX);
	var rapperPath = getRapperCurvePath(svg, rapperForAnodeRectLocationX, rapperForAnodeRectLocationY);
	var rapperPathSvg = svg.path(rapperPath, {
	    fill : runColor,
	    stroke : "black"
	});
	var rapperPathText = svg.text(1 + rapperForAnodeRectLocationX, 5 + rapperForAnodeRectLocationY + 22, "阳", {
	    fontSize : "9px"
	});
	$(rapperForAnodeRect).attr("transform", "scale(1.1,1.5) translate(-" + rapperForAnodeRectLocationX * 0.1 / 1.1 + ",-" + rapperForAnodeRectLocationY * 0.5 / 1.5 + ")");
	$(rapperPathSvg).attr("transform", "scale(1.1,1.5) translate(-" + rapperForAnodeRectLocationX * 0.1 / 1.1 + ",-" + rapperForAnodeRectLocationY * 0.5 / 1.5 + ")");
	$(rapperPathText).attr("transform", "scale(1.1,1.5) translate(-" + rapperForAnodeRectLocationX * 0.1 / 1.1 + ",-" + rapperForAnodeRectLocationY * 0.5 / 1.5 + ")");

    }

    /**
     * 阴极振打
     */
    function drawRapperForCathode(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, runColor, runWayColor) {
	var epRunStateFieldSettings = {
	    fill : runWayColor,
	    stroke : "#000000"
	};
	var rapperForCathodeRect = svg.rect(5 + currentElectricFieldLocationX, 15 + currentElectricFieldLocationY, 35, 30, epRunStateFieldSettings);

	var rapperForCathodeRectLocationX = parseFloat($(rapperForCathodeRect).attr("x"));
	var rapperForCathodeRectLocationY = parseFloat($(rapperForCathodeRect).attr("y"));
	var rapperPath = getRapperCurvePath(svg, rapperForCathodeRectLocationX, rapperForCathodeRectLocationY);
	var rapperPathSvg = svg.path(rapperPath, {
	    fill : runColor,
	    stroke : "black"
	});
	var rapperPathText = svg.text(1 + rapperForCathodeRectLocationX, 5 + rapperForCathodeRectLocationY + 22, "阴", {
	    fontSize : "9px"
	});
	$(rapperForCathodeRect).attr("transform", "scale(1.1,1.5) translate(-" + rapperForCathodeRectLocationX * 0.1 / 1.1 + ",-" + rapperForCathodeRectLocationY * 0.5 / 1.5 + ")");
	$(rapperPathSvg).attr("transform", "scale(1.1,1.5) translate(-" + rapperForCathodeRectLocationX * 0.1 / 1.1 + ",-" + rapperForCathodeRectLocationY * 0.5 / 1.5 + ")");
	$(rapperPathText).attr("transform", "scale(1.1,1.5) translate(-" + rapperForCathodeRectLocationX * 0.1 / 1.1 + ",-" + rapperForCathodeRectLocationY * 0.5 / 1.5 + ")");
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
    function drawHeaterForInsulator(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, runColor, runWayColor) {
	var epRunStateFieldSettings = {
		    fill : runWayColor,
		    stroke : "#000000"
		};
	var insulatorRect = svg.rect(5 + currentElectricFieldLocationX, 13 + currentElectricFieldLocationY, 35, 30, epRunStateFieldSettings);

	var insulatorRectLocationX = parseFloat($(insulatorRect).attr("x"));
	var insulatorRectLocationY = parseFloat($(insulatorRect).attr("y"));

	var insulatorPath = createHeatePath(svg, insulatorRectLocationX, insulatorRectLocationY);
	var rapperPathSvg = svg.path(insulatorPath, {
	    fill : "none",
	    stroke : runColor,
	    strokeWidth : "2.5px"
	});
	$(insulatorRect).attr("transform", "scale(1.1,1.5) translate(-" + insulatorRectLocationX * 0.1 / 1.1 + ",-" + insulatorRectLocationY * 0.5 / 1.5 + ")");
	$(rapperPathSvg).attr("transform", "scale(1.1,1.5) translate(-" + insulatorRectLocationX * 0.1 / 1.1 + ",-" + insulatorRectLocationY * 0.5 / 1.5 + ")");
    }
    /**
     * 瓷轴加热
     */
    function drawHeaterForPorcelainShaft(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, runColor, runWayColor) {
	var epRunStateFieldSettings = {
	    fill : runWayColor,
	    stroke : "#000000"
	};
	var porcelainShaftRect = svg.rect(5 + currentElectricFieldLocationX, 15 + currentElectricFieldLocationY, 35, 30, epRunStateFieldSettings);
	var insulatorRectLocationX = parseFloat($(porcelainShaftRect).attr("x"));
	var insulatorRectLocationY = parseFloat($(porcelainShaftRect).attr("y"));

	var insulatorPath = createHeatePath2(svg, insulatorRectLocationX, insulatorRectLocationY);
	var rapperPathSvg = svg.path(insulatorPath, {
	    fill : "none",
	    stroke : runColor,
	    strokeWidth : "2.5px"
	});
	$(porcelainShaftRect).attr("transform", "scale(1.1,1.5) translate(-" + insulatorRectLocationX * 0.1 / 1.1 + ",-" + insulatorRectLocationY * 0.5 / 1.5 + ")");
	$(rapperPathSvg).attr("transform", "scale(1.1,1.5) translate(-" + insulatorRectLocationX * 0.1 / 1.1 + ",-" + insulatorRectLocationY * 0.5 / 1.5 + ")");
//	$(rapperPathText).attr("transform", "scale(1.1,2) translate(-" + rapperForAnodeRectLocationX * 0.1 / 1.1 + ",-" + rapperForAnodeRectLocationY * 1 / 2 + ")");

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
    function drawHeaterForAshbucket(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, runColor, runWayColor) {
	var epRunStateFieldSettings = {
		    fill : runWayColor,
		    stroke : "#000000"
		};
	var ashBucketRect = svg.rect(5 + currentElectricFieldLocationX, 13 + currentElectricFieldLocationY, 35, 30, epRunStateFieldSettings);
	var insulatorRectLocationX = parseFloat($(ashBucketRect).attr("x"));
	var insulatorRectLocationY = parseFloat($(ashBucketRect).attr("y"));

	var insulatorPath = createAshBucketHeatePath(svg, insulatorRectLocationX, insulatorRectLocationY);
	var rapperPathSvg = svg.path(insulatorPath, {
	    fill : "none",
	    stroke : runColor,
	    strokeWidth : "2.5px"
	});
	$(ashBucketRect).attr("transform", "scale(1.1,1.5) translate(-" + insulatorRectLocationX * 0.1 / 1.1 + ",-" + insulatorRectLocationY * 0.5 / 1.5 + ")");
	$(rapperPathSvg).attr("transform", "scale(1.1,1.5) translate(-" + insulatorRectLocationX * 0.1 / 1.1 + ",-" + insulatorRectLocationY * 0.5 / 1.5 + ")");
    }
    function createAshBucketHeatePath(svg, insulatorRectLocationX, insulatorRectLocationY) {
	var insulatorPath = svg.createPath();
	insulatorPath.moveTo((3 + insulatorRectLocationX), (25 + insulatorRectLocationY));
	insulatorPath.line((11 + insulatorRectLocationX), (5 + insulatorRectLocationY));
	insulatorPath.line((11 + insulatorRectLocationX), (25 + insulatorRectLocationY));
	insulatorPath.line((19 + insulatorRectLocationX), (5 + insulatorRectLocationY));
	insulatorPath.line((19 + insulatorRectLocationX), (25 + insulatorRectLocationY));
	insulatorPath.line((27 + insulatorRectLocationX), (5 + insulatorRectLocationY));
	insulatorPath.line((27 + insulatorRectLocationX), (25 + insulatorRectLocationY));
	insulatorPath.line((35 + insulatorRectLocationX), (5 + insulatorRectLocationY));
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
	    fontFamily : "Verdana",
	    fill : "#000000",
	    fontSize : "13px",
	    fontWeight : "bold"
	};
	svg.text(flueGaseTempratureLocationX, firstFlusGasArrowMarkLocationY, "000.0", tempSettings);
	svg.text(flueGaseTempratureLocationX, secondFlusGasArrowMarkLocationY, "000.0", tempSettings);
	svg.text(flueGaseTempratureLocationX, thirdFlusGasArrowMarkLocationY, "000.0", tempSettings);
	svg.text(flueGaseTempratureLocationX, forthFlusGasArrowMarkLocationY, "000.0", tempSettings);
	var tempSettings2 = {
	    fontFamily : "宋体",
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
	    fontFamily : "Verdana",
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
	    fontFamily : "Verdana",
	    fill : "#000000",
	    fontSize : "15px",
	    fontWeight : "bold"
	};
	svg.text(blLocationX, blLocationY, "锅炉负荷:", tempSettings1);

	svg.text(blLocationX + 70, blLocationY, "300", tempSettings2);
	svg.text(blLocationX + 110, blLocationY, "MW", tempSettings2);
    }
});