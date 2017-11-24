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
                fill : "black",
                stroke : "#000000"
            };

            var ElectricFieldsArr = new Array(20);
            /** ***************************************画图************************************************************* */
            $("#heaterSvgDiv").svg({
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
                        var tempRect = svg.rect(x, y, eachElectricFieldWidth, eachElectricFieldHeight, eachElectricFieldRx, eachElectricFieldRy, eachElectricFiedSettings);
                        ElectricFieldsArr[arrayIndex] = tempRect;
                        arrayIndex++;
                    }
                }
            }
            function drawRapperRunState(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, i) {
                // 电场名称
                drawEpName(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, i);
                // 阳极振打框
                drawRapperRunStateRect(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, -5, "瓷 轴", i, "cizhou");
                // 阳极振打方式
                drawRapperRunWay(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, -5, i, "cizhou");
                // 阳极振打周期参数
                drawRapperRunParam(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, -5, i, "cizhou");
                // 分割线
                drawSeperatorLine(svg, currentElectricFieldLocationX, currentElectricFieldLocationY);
                // 阴极振打框
                drawRapperRunStateRect(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, 65, "瓷 套", i, "citao");
                // 阴极振打方式
                drawRapperRunWay(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, 65, i, "citao");
                // 阴极振打周期参数
                drawRapperRunParam(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, 65, i, "citao");
            }
            // 电场名称
            function drawEpName(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, location) {
                var title = electricFields[location].title;
                var titleLocationX = parseInt(8 + currentElectricFieldLocationX);
                var titleLocationY = parseInt(12 + currentElectricFieldLocationY);
                svg.text(titleLocationX, titleLocationY, title, electricFieldTitleSettings);
            }
            // 阳极振打框
            function drawRapperRunStateRect(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, rY, nameStr, locatoin, heaterTypeString) {
                var rectSvgId = "heater_" + heaterTypeString + "_" + electricFields[locatoin].title;
                var rectPathSvgId = "heater_path_" + heaterTypeString + "_" + electricFields[locatoin].title;
                var porcelainShaftRect = svg.rect(10 + currentElectricFieldLocationX, 20 + rY + currentElectricFieldLocationY, 35, 30, epRunStateFieldSettings);
                $(porcelainShaftRect).attr("transform", "translate(0.5,0.5)");
                $(porcelainShaftRect).attr("id", rectSvgId);
                var insulatorRectLocationX = parseFloat($(porcelainShaftRect).attr("x"));
                var insulatorRectLocationY = parseFloat($(porcelainShaftRect).attr("y"));

                var insulatorPath = createHeatePath(svg, insulatorRectLocationX, insulatorRectLocationY);
                if (rY > 0) {
                    insulatorPath = createHeatePath2(svg, insulatorRectLocationX, insulatorRectLocationY);
                }

                var pathSvg = svg.path(insulatorPath, {
                    fill : "none",
                    stroke : "black",
                    strokeWidth : "2.5px"
                });
                $(pathSvg).attr("id", rectPathSvgId);
                svg.text(1 + insulatorRectLocationX, 25 + insulatorRectLocationY + 22, nameStr, {
                    fontSize : "12px"
                });
            }
            // 阳极振打方式
            function drawRapperRunWay(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, rY, location, heaterTypeString) {
                var heaterRunWayTextForAutoId = "heater_runWay_text_auto_" + heaterTypeString + "_" + electricFields[location].title;
                var heaterRunWayTextForRunId = "heater_runWay_text_run_" + heaterTypeString + "_" + electricFields[location].title;
                var heaterRunWayTextForStopId = "heater_runWay_text_stop_" + heaterTypeString + "_" + electricFields[location].title;

                var heaterRunWayRectForAutoId = "heater_runWay_rect_auto_" + heaterTypeString + "_" + electricFields[location].title;
                var heaterRunWayRectForRunId = "heater_runWay_rect_run_" + heaterTypeString + "_" + electricFields[location].title;
                var heaterRunWayRectForStopId = "heater_runWay_rect_stop_" + heaterTypeString + "_" + electricFields[location].title;

                var autoWayRectX = 50 + currentElectricFieldLocationX;
                var wayRectY = 10 + currentElectricFieldLocationY + rY;
                var wayRectWidth = 50;
                var wayRectHeight = 20;
                var autoRectSvg = svg.rect(autoWayRectX, wayRectY, wayRectWidth, wayRectHeight, epRunStateFieldSettings);
                var runWayRect = 55 + autoWayRectX;
                var runRectSvg = svg.rect(runWayRect, wayRectY, wayRectWidth, wayRectHeight, epRunStateFieldSettings);
                var stopWayRect = 55 + runWayRect;
                var stopRectSvg = svg.rect(stopWayRect, wayRectY, wayRectWidth, wayRectHeight, epRunStateFieldSettings);
                $(autoRectSvg).attr("transform", "translate(0.5,0.5)");
                $(runRectSvg).attr("transform", "translate(0.5,0.5)");
                $(stopRectSvg).attr("transform", "translate(0.5,0.5)");

                var autoTextSvg = svg.text(parseFloat($(autoRectSvg).attr('x')) + 20, parseFloat($(autoRectSvg).attr("y")) + 15, "自动", electricFieldTextSettings);
                var runningTextSvg = svg.text(parseFloat($(runRectSvg).attr('x')) + 20, parseFloat($(runRectSvg).attr("y")) + 15, "连续", electricFieldTextSettings);
                var stoppingTextSvg = svg.text(parseFloat($(stopRectSvg).attr('x')) + 20, parseFloat($(stopRectSvg).attr("y")) + 15, "停止", electricFieldTextSettings);
                $(autoTextSvg).attr("cursor", "pointer").attr("id", heaterRunWayTextForAutoId).bind("click", {
                    location : location,
                    heaterWay : 2,
                    heaterType : heaterTypeString
                }, changeRapperRunWayBtnFunction);
                $(runningTextSvg).attr("cursor", "pointer").attr("id", heaterRunWayTextForRunId).bind("click", {
                    location : location,
                    heaterWay : 1,
                    heaterType : heaterTypeString
                }, changeRapperRunWayBtnFunction);
                $(stoppingTextSvg).attr("cursor", "pointer").attr("id", heaterRunWayTextForStopId).bind("click", {
                    location : location,
                    heaterWay : 0,
                    heaterType : heaterTypeString
                }, changeRapperRunWayBtnFunction);

                var beginRect = svg.rect(parseFloat($(autoRectSvg).attr('x')) + 3, parseFloat($(autoRectSvg).attr("y")) + 4, 12, 12, epRunStateFieldSettings);
                var runRect = svg.rect(parseFloat($(runRectSvg).attr('x')) + 3, parseFloat($(runRectSvg).attr("y")) + 4, 12, 12, epRunStateFieldSettings);
                var stopRect = svg.rect(parseFloat($(stopRectSvg).attr('x')) + 3, parseFloat($(stopRectSvg).attr("y")) + 4, 12, 12, epRunStateFieldSettings);
                $(beginRect).attr("transform", "translate(0.5,0.5)").attr("cursor", "pointer").attr("id", heaterRunWayRectForAutoId);
                $(runRect).attr("transform", "translate(0.5,0.5)").attr("cursor", "pointer").attr("id", heaterRunWayRectForRunId);
                $(stopRect).attr("transform", "translate(0.5,0.5)").attr("cursor", "pointer").attr("id", heaterRunWayRectForStopId);

            }
            // 阳极振打周期参数
            function drawRapperRunParam(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, rY, location, heaterTypeString) {
                var heaterUpperTem = "heater_upperTem_" + heaterTypeString + "_" + electricFields[location].title;
                var heaterLowwerTem = "heater_lowwerTem_" + heaterTypeString + "_" + electricFields[location].title;
                var heaterCurrentTem = "heater_currentTem_" + heaterTypeString + "_" + electricFields[location].title;

                var beginTextX = 50 + currentElectricFieldLocationX;
                var beginTextY = 45 + currentElectricFieldLocationY + rY;
                svg.text(beginTextX, beginTextY, "温度下限", electricFieldTextSettings);
                var runTextX = 55 + beginTextX;
                svg.text(runTextX, beginTextY, "当前温度", electricFieldTextSettings);
                var waitTextX = 55 + runTextX;
                svg.text(waitTextX, beginTextY, "温度上限", electricFieldTextSettings);

                var paramRectWidth = 50;
                var paramRectHeight = 20;
                var textRectY = 50 + currentElectricFieldLocationY + rY;
                var beginTextRectSvg = svg.rect(beginTextX, textRectY, paramRectWidth, paramRectHeight, epRunStateFieldSettings);
                var runTextRectSvg = svg.rect(runTextX, textRectY, paramRectWidth, paramRectHeight, epRunStateFieldSettings);
                var waitTextRectSvg = svg.rect(waitTextX, textRectY, paramRectWidth, paramRectHeight, epRunStateFieldSettings);
                $(beginTextRectSvg).attr("transform", "translate(0.5,0.5)").attr("fill", "white");
                $(runTextRectSvg).attr("transform", "translate(0.5,0.5)").attr("fill", "white");
                $(waitTextRectSvg).attr("transform", "translate(0.5,0.5)").attr("fill", "white");

                var beginTextSvg = svg.text(beginTextX + 15, textRectY + 15, "90", electricFieldTextSettings);
                var runningTextSvg = svg.text(runTextX + 15, textRectY + 15, "60", electricFieldTextSettings);
                var waittingTextSvg = svg.text(waitTextX + 15, textRectY + 15, "120", electricFieldTextSettings);
                $(beginTextSvg).attr("cursor", "default").attr("id", heaterLowwerTem);
                $(runningTextSvg).attr("cursor", "default").attr("id", heaterCurrentTem);
                $(waittingTextSvg).attr("cursor", "default").attr("id", heaterUpperTem);

                $(beginTextSvg).bind("click", showInputWindow);
                $(runningTextSvg).attr("cursor", "default");
                // $(runningTextSvg).bind("click",showInputWindow);
                $(waittingTextSvg).bind("click", showInputWindow);

                var beginSecondTextSvg = svg.text(beginTextX + 37, textRectY + 15, "℃", electricFieldTextSettings);
                var runningSecondTextSvg = svg.text(runTextX + 37, textRectY + 15, "℃", electricFieldTextSettings);
                var waittingSecondTextSvg = svg.text(waitTextX + 37, textRectY + 15, "℃", electricFieldTextSettings);
                $(beginSecondTextSvg).attr("cursor", "default");
                $(runningSecondTextSvg).attr("cursor", "default");
                $(waittingSecondTextSvg).attr("cursor", "default");

            }
            // 分割线
            function drawSeperatorLine(svg, currentElectricFieldLocationX, currentElectricFieldLocationY) {
                svg.line(currentElectricFieldLocationX + 10, currentElectricFieldLocationY + eachElectricFieldHeight / 2, currentElectricFieldLocationX + eachElectricFieldWidth - 5,
                        currentElectricFieldLocationY + eachElectricFieldHeight / 2, {
                            stroke : "black"
                        });
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
             * 更新加热的运行方式 updateHeaterRunWay
             */
            function changeRapperRunWayBtnFunction(event) {
                var location = event.data.location;
                var heaterWay = event.data.heaterWay;
                var heaterTypeStr = event.data.heaterType;

                var heaterType = getHeaterTypeByTyperString(heaterTypeStr);
                var epName = electricFields[location].title;
                var url = ctx + "/updateHeaterRunWay.do";
                var sendData = {
                    epName : epName,
                    heaterType : heaterType,
                    heaterWay : heaterWay
                };
                $.get(url, sendData, function(data) {
                });
            }
            /**
             * 更新温度设定值 updateHeaterTempratorByEpName_HeaterType 更新运行方式
             * 
             */
            function showInputWindow(event) {
                var $input = $(this);
                var tipString = "请输入设定值:";
                var returnValue = window.prompt(tipString, $input.text());

                if (null != returnValue) {
                    if (isNaN(returnValue) == false) {
                        // heater_upperTem_cizhou_1A11
                        var svgEleId = $input.attr("id");
                        var strArr = svgEleId.split("_");
                        var epName = strArr[3];
                        var heaterType = getHeaterTypeByTyperString(strArr[2]);
                        var tempValue = returnValue;
                        var fieldString = strArr[1];
                        var fieldName = "";
                        if (fieldString == "upperTem")
                            fieldName = "tempratorUpper";
                        else if (fieldString == "lowwerTem")
                            fieldName = "tempratorLower";
                        var sendData = {
                            epName : epName,
                            heaterType : heaterType,
                            tempValue : tempValue,
                            fieldString : fieldName
                        };
                        var url = ctx + "/updateHeaterTempratorByEpName_HeaterType.do";
                        $.get(url, sendData, function() {
                            $input.val(returnValue);
                        });
                        $input.text(returnValue);
                    }
                }
            }

        });