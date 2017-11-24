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
            var epHopperLevelStateSettings = {
                // fill : "#5b5b5b",
                fill : "#d5d5d5",
                stroke : "#000000"
            };
            var epHopperLevelWithGrayStateSettings = {
                // fill : "#5b5b5b",
                fill : "#5b5b5b",
                stroke : "#000000"
            };

            var ElectricFieldsArr = new Array(20);
            /** ***************************************画图************************************************************* */
            $("#hopperLevelSvgDiv").svg({
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
                        var currentElectricFieldId = "electricField_id_" + electricFields[i * 5 + j].title;
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
            function drawRapperRunState(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, i) {
                // 电场名称
                drawEpName(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, i);
                // 灰斗框
                drawHopperLevelStateRect(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, 0, "灰 斗", i, "left");
                // 灰斗料位数据
                drawHopperLevelDataText(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, 0, "灰 斗", i, "left");

                // 灰斗框
                drawHopperLevelStateRect(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, eachElectricFieldWidth / 2, "灰 斗", i,
                        "right");
                // 灰斗料位数据
                drawHopperLevelDataText(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, eachElectricFieldWidth / 2, "灰 斗", i,
                        "right");
                // 阴极振打方式
            }
            // 电场名称
            function drawEpName(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, location) {
                var title = electricFields[location].title;
                var titleLocationX = parseInt(eachElectricFieldWidth / 2 - 20 + currentElectricFieldLocationX);
                var titleLocationY = parseInt(20 + currentElectricFieldLocationY);
                svg.text(titleLocationX, titleLocationY, title, electricFieldTitleSettings);
            }
            function drawHopperLevelStateRect(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, rx, hopperName, location,
                    leftOrRight) {
                var svgId = leftOrRight + "_hopperLevelRect_" + electricFields[location].title;
                var point1 = new Array((0 + currentElectricFieldLocationX + rx), (50 + currentElectricFieldLocationY));
                var point2 = new Array((eachElectricFieldWidth / 2 + currentElectricFieldLocationX + rx), (50 + currentElectricFieldLocationY));
                var point3 = new Array(((4 * eachElectricFieldWidth / 2) / 6 + currentElectricFieldLocationX + rx),
                        (eachElectricFieldHeight + currentElectricFieldLocationY));
                var point4 = new Array((2 * eachElectricFieldWidth / 2 / 6 + currentElectricFieldLocationX + rx),
                        (eachElectricFieldHeight + currentElectricFieldLocationY));
                var epRunStatePath = new Array(point1, point2, point3, point4, point1);
                svg.polyline(epRunStatePath, epHopperLevelStateSettings);

                var random = Math.random() * 80;

                var newPoints = getLevelRectPoints(random, currentElectricFieldLocationX, currentElectricFieldLocationY, rx);
                var rectSvg = svg.polyline(newPoints, epHopperLevelWithGrayStateSettings);
                $(rectSvg).attr("id", svgId);
            }
            /**
             * 绘制料位框数据
             */
            function getLevelRectPoints(random, currentElectricFieldLocationX, currentElectricFieldLocationY, rx) {
                var totalHeight = eachElectricFieldHeight - 50;
                var nPoint1Y = (50 + currentElectricFieldLocationY) + (100 - random) / 100 * totalHeight;
                var tempWidth = eachElectricFieldWidth / 2 / 3;
                var nPoint1X = (100 - random) / 100 * tempWidth;
                var npoint1 = new Array((nPoint1X + currentElectricFieldLocationX + rx), nPoint1Y);
                var nPoint2X = random / 100 * tempWidth;
                var npoint2 = new Array((nPoint2X + eachElectricFieldWidth / 2 / 6 * 4 + currentElectricFieldLocationX + rx), nPoint1Y);
                var npoint3 = new Array(((4 * eachElectricFieldWidth / 2) / 6 + currentElectricFieldLocationX + rx),
                        (eachElectricFieldHeight + currentElectricFieldLocationY));
                var npoint4 = new Array((2 * eachElectricFieldWidth / 2 / 6 + currentElectricFieldLocationX + rx),
                        (eachElectricFieldHeight + currentElectricFieldLocationY));
                var hoppeRunStatePathForLevel = new Array(npoint1, npoint2, npoint3, npoint4, npoint1);

                return hoppeRunStatePathForLevel;
            }
            function drawHopperLevelDataText(svg, currentElectricFieldLocationX, currentElectricFieldLocationY, rx, note, location, leftOrRight) {
                var svgId = leftOrRight + "_hopperLevelText_" + electricFields[location].title;
                var hopperLevelText = "12.2";
                var hopperLevelTextSvgLocationX = rx + 30 + currentElectricFieldLocationX;
                var hopperLevelTextSvgLocationY = 65 + currentElectricFieldLocationY;
                var textSvg = svg.text(hopperLevelTextSvgLocationX, hopperLevelTextSvgLocationY, hopperLevelText, electricFieldValueUnitSettings);
                $(textSvg).attr("id", svgId);
                var hopperLevelTextUnitSvgLocationX = 30 + hopperLevelTextSvgLocationX;
                var hopperLevelUnitText = "m";
                svg.text(hopperLevelTextUnitSvgLocationX, hopperLevelTextSvgLocationY, hopperLevelUnitText, electricFieldValueUnitSettings);
            }
            
            
            //刷新数据
            function freshRapperData(){
                var url = ctx + "/getHopperJSONData.do";
                $.get(url,function(returnData){
                    for(var i=0;i<returnData.length;i++){
                        var ep = returnData[i].ep;
                        var hList = returnData[i].hopperList;
                        var epRectSvgId = "electricField_id_" + ep.name;
                        var locationX = parseInt($("#" + epRectSvgId).attr("x"));
                        var locationY = parseInt($("#" + epRectSvgId).attr("y"));
                        for(var j=0;j<hList.length;j++){
                            var hopper = hList[j];
                            var hopperLocation = hopper.location==0?"left":"right";
                            var hopperTextId = hopperLocation + "_hopperLevelText_" + ep.name;
                            $("#"+hopperTextId).text(hopper.hopperLevel);
                            var hopperRectId = hopperLocation + "_hopperLevelRect_" + ep.name;
                            var rx = hopper.location == 0 ?0:eachElectricFieldWidth / 2;
//                            alert(locationX)
                            var hopperRectPoints = getLevelRectPoints(hopper.hopperLevel,locationX,locationY,rx);
//                            var hopperRectPoints = "200.6412848091086,110.66497180417568 269.3587151908914,110.66497180417568 253.33333333333331,150 216.66666666666666,150 200.6412848091086,110.66497180417568";
//                                                    200.6412848091086,110.66497180417568 269.3587151908914,110.66497180417568 253.33333333333331,150 216.66666666666666,150 200.6412848091086,110.66497180417568
//                                                      303.03421528015866,91.99307386948033 386.96578471984134,91.99307386948033 363.3333333333333,150 326.66666666666663,150 303.03421528015866,91.99307386948033
                                                    26.41800,501064.8,83.61800,501064.8,73.333333333333331800,14010,36.6666666666666641800,14010,26.41800,501064.8
//                            alert($("#"+hopperRectId).attr("points"));
                            $("#"+hopperRectId).attr("points",hopperRectPoints);
                           
                        }
                    }
                },"json");
            }
            
            
            window.setTimeout(freshRapperData, 1000);
        });