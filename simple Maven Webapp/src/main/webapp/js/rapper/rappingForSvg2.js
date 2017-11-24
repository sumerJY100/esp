$(document).ready(
        function() {
            // $("#rappingSvgDiv").svg({
            // onLoad : function() {
            // var svg = $("#rappingSvgDiv").svg('get');
            // svg.load('SVG/rappingControl.svg', {
            // addTo : true,
            // changeSize : false
            // });
            // },
            // settings : {}
            // });
            // setTimeout(initText, 1000);
            function ElectricField() {
                ElectricField.prototype.title = "";
            }
            // var electricFieldNames = new Array("1A11", "1A12", "1A13",
            // "1A14", "1A15", "1B11", "1B12", "1B13", "1B14", "1B15", "2A11",
            // "2A12", "2A13", "2A14", "2A15", "2B11", "2B12", "2B13", "2B14",
            // "2B15");

            var electricFields = new Array(20);
            for (var i = 0; i < 20; i++) {
                var tempElectricField = new ElectricField();
                tempElectricField.title = electricFieldNames[i];
                electricFields[i] = tempElectricField;
            }
            var marginTopForElectricField = 10;
            var marginLeftForElectricField = 180;
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
                stroke : "#000000",
                strokeWidth : 1
            };
            var epRunStateSettings = {
                fill : "Red",
                stroke : "#000000"
            };

            var ElectricFieldsArr = new Array(20);
            /** ***************************************画图************************************************************* */
            $("#rappingSvgDiv").svg({
                onLoad : drawIntro
            });
            function drawIntro(svg) {
                // 绘制矩形框
                drawEpRect(svg);
                for (var i = 0; i < ElectricFieldsArr.length; i++) {
                    var currentElectricFieldLocationX = parseInt($(ElectricFieldsArr[i]).attr("x"));
                    var currentElectricFieldLocationY = parseInt($(ElectricFieldsArr[i]).attr("y"));
                    // 绘制title、ep运行状态
                    drawRapperRunState(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, i);
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
                        var tempRect = svg.rect(x, y, eachElectricFieldWidth, eachElectricFieldHeight, eachElectricFieldRx, eachElectricFieldRy,
                                eachElectricFiedSettings);
                        ElectricFieldsArr[arrayIndex] = tempRect;
                        arrayIndex++;
                    }
                }
            }
            function drawRapperRunState(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, i, epName) {
                // 电场名称
                drawEpName(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, i);
                // 阳极振打框
                drawRapperRunStateRect(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, -5, "阳 极", i,0);
                // 阳极振打方式
                drawRapperRunWay(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, -5, i, 0);
                // 阳极振打周期参数,rapperType阳极为0

                drawRapperRunParam(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, -5, i, 0);
                // 分割线
                drawSeperatorLine(svg, currentElectricFieldLocationX, currentElectricFieldLocationY);
                // 阴极振打框
                drawRapperRunStateRect(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, 65, "阴 极", i,1);
                // 阴极振打方式
                drawRapperRunWay(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, 65, i,1);
                // 阴极振打周期参数，rapperType阴极为1
                drawRapperRunParam(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, 65, i, 1);
            }
            // 电场名称
            function drawEpName(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, location) {
                var title = electricFields[location].title;
                var titleLocationX = parseInt(8 + currentElectricFieldLocationX);
                var titleLocationY = parseInt(12 + currentElectricFieldLocationY);
                svg.text(titleLocationX, titleLocationY, title, electricFieldTitleSettings);
            }
            // 阳极振打框

            function drawRapperRunStateRect(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, rY, nameStr, locatoin,rapperType) {
                var rapperTypeStr = "anode";
                if (rapperType == 0) {
                    rapperTypeStr = "anode";
                } else if (rapperType == 1) {
                    rapperTypeStr = "cathode";
                }
                var rapperForCathodeRect = svg.rect(10 + currentElectricFieldLocationX, 20 + rY + currentElectricFieldLocationY, 35, 30,
                        epRunStateFieldSettings);
                var runStateSvgId= rapperTypeStr + "_runState_" + electricFields[locatoin].title;
                $(rapperForCathodeRect).attr("transform", "translate(0.5,0.5)").attr("id",runStateSvgId);
                var rapperForCathodeRectLocationX = parseFloat($(rapperForCathodeRect).attr("x"));
                var rapperForCathodeRectLocationY = parseFloat($(rapperForCathodeRect).attr("y"));

                var rapperPath = getRapperCurvePath(svg, rapperForCathodeRectLocationX, rapperForCathodeRectLocationY);
                svg.path(rapperPath, {
                    fill : true,
                    stroke : "black"
                });
                svg.text(1 + rapperForCathodeRectLocationX, 25 + rapperForCathodeRectLocationY + 22, nameStr, {
                    fontSize : "12px"
                });
            }
            // 阳极振打方式
            // rapperType 0表示阳极，1表示阴极
            function drawRapperRunWay(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, rY, location, rapperType) {
                var autoWayRectX = 50 + currentElectricFieldLocationX;
                var wayRectY = 10 + currentElectricFieldLocationY + rY;
                var wayRectWidth = 50;
                var wayRectHeight = 20;
                var autoRectSvg = svg.rect(autoWayRectX, wayRectY, wayRectWidth, wayRectHeight, epRunStateFieldSettings);
                var runWayRect = 55 + autoWayRectX;
                var runRectSvg = svg.rect(runWayRect, wayRectY, wayRectWidth, wayRectHeight, epRunStateFieldSettings);
                var stopWayRect = 55 + runWayRect;
                var stopRectSvg = svg.rect(stopWayRect, wayRectY, wayRectWidth, wayRectHeight, epRunStateFieldSettings);
                $(autoRectSvg).attr("transform", "translate(0.5,0.5)").attr("cursor", "pointer");
                $(runRectSvg).attr("transform", "translate(0.5,0.5)");
                $(stopRectSvg).attr("transform", "translate(0.5,0.5)");

                var autoTextSvg = svg.text(parseFloat($(autoRectSvg).attr('x')) + 20, parseFloat($(autoRectSvg).attr("y")) + 15, "周期",
                        electricFieldTextSettings);
                var runningTextSvg = svg.text(parseFloat($(runRectSvg).attr('x')) + 20, parseFloat($(runRectSvg).attr("y")) + 15, "连续",
                        electricFieldTextSettings);
                var stoppingTextSvg = svg.text(parseFloat($(stopRectSvg).attr('x')) + 20, parseFloat($(stopRectSvg).attr("y")) + 15, "停止",
                        electricFieldTextSettings);
                $(autoTextSvg).attr("cursor", "pointer").bind("click", {
                    location : location,
                    rapperWay : 2,
                    rapperType : rapperType
                }, rapperWayChangeFunction);
                $(runningTextSvg).attr("cursor", "pointer").bind("click", {
                    location : location,
                    rapperWay : 1,
                    rapperType : rapperType
                }, rapperWayChangeFunction);
                $(stoppingTextSvg).attr("cursor", "pointer").bind("click", {
                    location : location,
                    rapperWay : 0,
                    rapperType : rapperType
                }, rapperWayChangeFunction);

                var beginRect = svg.rect(parseFloat($(autoRectSvg).attr('x')) + 3, parseFloat($(autoRectSvg).attr("y")) + 4, 12, 12,
                        epRunStateFieldSettings);
                var runRect = svg.rect(parseFloat($(runRectSvg).attr('x')) + 3, parseFloat($(runRectSvg).attr("y")) + 4, 12, 12,
                        epRunStateFieldSettings);
                var stopRect = svg.rect(parseFloat($(stopRectSvg).attr('x')) + 3, parseFloat($(stopRectSvg).attr("y")) + 4, 12, 12,
                        epRunStateFieldSettings);
                var rapperTypeStr = "anode";
                if (rapperType == 0) {
                    rapperTypeStr = "anode";
                } else if (rapperType == 1) {
                    rapperTypeStr = "cathode";
                }
                $(beginRect).attr("transform", "translate(0.5,0.5)").attr("cursor", "pointer").attr("id", rapperTypeStr + "_runWayForAuto_" + electricFields[location].title);;
                $(runRect).attr("transform", "translate(0.5,0.5)").attr("cursor", "pointer").attr("id", rapperTypeStr + "_runWayForRun_" + electricFields[location].title);;
                $(stopRect).attr("transform", "translate(0.5,0.5)").attr("cursor", "pointer").attr("id", rapperTypeStr + "_runWayForStop_" + electricFields[location].title);;

            }
            // 阳极振打周期参数
            function drawRapperRunParam(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, rY, location, rapperType) {
                var beginTextX = 50 + currentElectricFieldLocationX;
                var beginTextY = 45 + currentElectricFieldLocationY + rY;
                svg.text(beginTextX, beginTextY, "开始时间", electricFieldTextSettings);
                var runTextX = 55 + beginTextX;
                svg.text(runTextX, beginTextY, "运行时间", electricFieldTextSettings);
                var waitTextX = 55 + runTextX;
                svg.text(waitTextX, beginTextY, "等待时间", electricFieldTextSettings);

                var paramRectWidth = 50;
                var paramRectHeight = 20;
                var textRectY = 50 + currentElectricFieldLocationY + rY;
                var beginTextRectSvg = svg.rect(beginTextX, textRectY, paramRectWidth, paramRectHeight, epRunStateFieldSettings);
                var runTextRectSvg = svg.rect(runTextX, textRectY, paramRectWidth, paramRectHeight, epRunStateFieldSettings);
                var waitTextRectSvg = svg.rect(waitTextX, textRectY, paramRectWidth, paramRectHeight, epRunStateFieldSettings);
                $(beginTextRectSvg).attr("transform", "translate(0.5,0.5)").attr("fill", "white");
                $(runTextRectSvg).attr("transform", "translate(0.5,0.5)").attr("fill", "white");
                $(waitTextRectSvg).attr("transform", "translate(0.5,0.5)").attr("fill", "white");

                var rapperTypeStr = "anode";
                if (rapperType == 0) {
                    rapperTypeStr = "anode";
                } else if (rapperType == 1) {
                    rapperTypeStr = "cathode";
                }

                var beginTextSvg = svg.text(beginTextX + 2, textRectY + 15, "36000", electricFieldTextSettings);
                $(beginTextSvg).attr("id", rapperTypeStr + "_beginTime_" + electricFields[location].title);
                var runningTextSvg = svg.text(runTextX + 2, textRectY + 15, "60", electricFieldTextSettings);
                $(runningTextSvg).attr("id", rapperTypeStr + "_runTime_" + electricFields[location].title);
                var waittingTextSvg = svg.text(waitTextX + 2, textRectY + 15, "000", electricFieldTextSettings);
                $(waittingTextSvg).attr("id", rapperTypeStr + "_waitTime_" + electricFields[location].title);
                $(beginTextSvg).bind("click", {
                    location : location,
                    field : "beginTime",
                    rapperType : rapperType
                }, showInputWindow);
                $(runningTextSvg).bind("click", {
                    location : location,
                    field : "runTime",
                    rapperType : rapperType
                }, showInputWindow);
                $(waittingTextSvg).bind("click", {
                    location : location,
                    field : "waitTime",
                    rapperType : rapperType
                }, showInputWindow);

                var beginSecondTextSvg = svg.text(beginTextX + 37, textRectY + 15, "秒", electricFieldTextSettings);
                var runningSecondTextSvg = svg.text(runTextX + 37, textRectY + 15, "秒", electricFieldTextSettings);
                var waittingSecondTextSvg = svg.text(waitTextX + 37, textRectY + 15, "秒", electricFieldTextSettings);
                $(beginSecondTextSvg).attr("cursor", "default");
                $(runningSecondTextSvg).attr("cursor", "default");
                $(waittingSecondTextSvg).attr("cursor", "default");

            }
            // 分割线
            function drawSeperatorLine(svg, currentElectricFieldLocationX, currentElectricFieldLocationY) {
                svg.line(currentElectricFieldLocationX + 10, currentElectricFieldLocationY + eachElectricFieldHeight / 2,
                        currentElectricFieldLocationX + eachElectricFieldWidth - 5, currentElectricFieldLocationY + eachElectricFieldHeight / 2, {
                            stroke : "black"
                        });
            }
            function getRapperCurvePath(svg, rapperForCathodeRectLocationX, rapperForCathodeRectLocationY) {
                var rapperPath = svg.createPath();
                rapperPath.move(5 + rapperForCathodeRectLocationX, 13 + rapperForCathodeRectLocationY, true);
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
            //振打方式的改变
            function rapperWayChangeFunction(event) {
                var location = event.data.location;
                if (isNaN(location) == false) {
                    var epName = electricFields[location].title;
                    var field = "runWay";
                    var rapperType = event.data.rapperType;
                    var rapperWay = event.data.rapperWay;
                    var sendData = {
                        epName : epName,
                        field : field,
                        resultValue : rapperWay,
                        rapperType : rapperType
                    };
                    var url = ctx + "/updateRapperForNoReturn.do";
                    $.get(url, sendData, function() {
                        // alert("success");
                        // $input.val(returnValue);
                    });
                }
            }
            function showInputWindow(event) {
                var location = event.data.location;
                if (isNaN(location) == false) {
                    var epName = electricFields[location].title;
                    var field = event.data.field;
                    var rapperType = event.data.rapperType;
                    var $input = $(this);
                    var tipString = "请输入设定值:";
                    var returnValue = window.prompt(tipString, $input.text());
                    if (null != returnValue && isNaN(returnValue) == false) {
                        var sendData = {
                            epName : epName,
                            field : field,
                            resultValue : returnValue,
                            rapperType : rapperType
                        };
                        var url = ctx + "/updateRapperForNoReturn.do";
                        $.get(url, sendData, function() {
                            // alert("success");
                            // $input.val(returnValue);
                        });

                        $input.text(returnValue);
                    }
                }

            }
        });