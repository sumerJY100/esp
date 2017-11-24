$(document).ready(function() {
    

    function freshHeaterData() {
        var url = ctx + "/back/getAllEp.do";
        $.getJSON(url, function(json) {
            for (var i = 0; i < json.length; i++) {
                var cizhouHeater = json[i].cizhouHeater;
                var citaoHeater = json[i].citaoHeater;
                var huidouHeaterForLeftJson = json[i].huidouHeaterForLeft;
                var huidouHeaterForRightJson = json[i].huidouHeaterForRight;

                updateHeaterWay(cizhouHeater, citaoHeater, huidouHeaterForLeftJson, huidouHeaterForRightJson);
                udpateHeaterRunState(cizhouHeater, citaoHeater, huidouHeaterForLeftJson, huidouHeaterForRightJson);
                updateHeaterData(cizhouHeater, citaoHeater, huidouHeaterForLeftJson, huidouHeaterForRightJson);

            }
        });
    }
    /**
     * 更新加热方式
     */
    function updateHeaterWay(cizhouHeater, citaoHeater, huidouHeaterForLeftJson, huidouHeaterForRightJson) {
        // heater_runWay_rect_auto_cizhou_1A11
        if (cizhouHeater) {
            var cizhouRunWay = cizhouHeater.runType;
            $("#heater_runWay_rect_auto_cizhou_" + cizhouHeater.name).attr("fill", cizhouRunWay == 2 ? "red" : "green");
            $("#heater_runWay_rect_run_cizhou_" + cizhouHeater.name).attr("fill", cizhouRunWay == 1 ? "red" : "green");
            $("#heater_runWay_rect_stop_cizhou_" + cizhouHeater.name).attr("fill", cizhouRunWay == 0 ? "red" : "green");
        }
        if (citaoHeater) {
            var citaoRunWay = citaoHeater.runType;
            
            $("#heater_runWay_rect_auto_citao_" + citaoHeater.name).attr("fill", citaoRunWay == 2 ? "red" : "green");
            $("#heater_runWay_rect_run_citao_" + citaoHeater.name).attr("fill", citaoRunWay == 1 ? "red" : "green");
            $("#heater_runWay_rect_stop_citao_" + citaoHeater.name).attr("fill", citaoRunWay == 0 ? "red" : "green");
        }
        if (huidouHeaterForLeftJson) {
            var leftHopperRunWay = huidouHeaterForLeftJson.runType;
            $("#heater_runWay_rect_auto_leftHopper_" + huidouHeaterForLeftJson.name).attr("fill", leftHopperRunWay == 2 ? "red" : "green");
            $("#heater_runWay_rect_run_leftHopper_" + huidouHeaterForLeftJson.name).attr("fill", leftHopperRunWay == 1 ? "red" : "green");
            $("#heater_runWay_rect_stop_leftHopper_" + huidouHeaterForLeftJson.name).attr("fill", leftHopperRunWay == 0 ? "red" : "green");
        }
        if (huidouHeaterForRightJson) {
            var rightHopperRunWay = huidouHeaterForRightJson.runType;
            $("#heater_runWay_rect_auto_rightHopper_" + huidouHeaterForRightJson.name).attr("fill", rightHopperRunWay == 2 ? "red" : "green");
            $("#heater_runWay_rect_run_rightHopper_" + huidouHeaterForRightJson.name).attr("fill", rightHopperRunWay == 1 ? "red" : "green");
            $("#heater_runWay_rect_stop_rightHopper_" + huidouHeaterForRightJson.name).attr("fill", rightHopperRunWay == 0 ? "red" : "green");
        }
    }
    /**
     * 更新运行状态
     */
    function udpateHeaterRunState(cizhouHeater, citaoHeater, huidouHeaterForLeftJson, huidouHeaterForRightJson) {
        if (cizhouHeater) {
            // heater_cizhou_1A11
            // heater_path_cizhou_1A11
            var heaterRunState = cizhouHeater.runState;
            var heaterAlarmState = cizhouHeater.alarmState;
            var rectId = "heater_cizhou_" + cizhouHeater.name;
            var pathId = "heater_path_cizhou_" + cizhouHeater.name;
            handleHeaterRunState(rectId, pathId, heaterRunState, heaterAlarmState);
        }
        if(citaoHeater){
         // heater_cizhou_1A11
            // heater_path_cizhou_1A11
            var heaterRunState = citaoHeater.runState;
            var heaterAlarmState = citaoHeater.alarmState;
            var rectId = "heater_citao_" + citaoHeater.name;
            var pathId = "heater_path_citao_" + citaoHeater.name;
            handleHeaterRunState(rectId, pathId, heaterRunState, heaterAlarmState);
        }
        if(huidouHeaterForLeftJson){
            var heaterRunState = huidouHeaterForLeftJson.runState;
            var heaterAlarmState = huidouHeaterForLeftJson.alarmState;
            var rectId = "heater_leftHopper_" + huidouHeaterForLeftJson.name;
            var pathId = "heater_path_leftHopper_" + huidouHeaterForLeftJson.name;
            handleHeaterRunState(rectId, pathId, heaterRunState, heaterAlarmState);
        }
        if(huidouHeaterForRightJson){
            var heaterRunState = huidouHeaterForRightJson.runState;
            var heaterAlarmState = huidouHeaterForRightJson.alarmState;
            var rectId = "heater_rightHopper_" + huidouHeaterForRightJson.name;
            var pathId = "heater_path_rightHopper_" + huidouHeaterForRightJson.name;
            handleHeaterRunState(rectId, pathId, heaterRunState, heaterAlarmState);
        }

    }
    function updateHeaterData(cizhouHeater, citaoHeater, huidouHeaterForLeftJson, huidouHeaterForRightJson) {
        if (cizhouHeater) {
            // heater_lowwerTem_cizhou_1A11
            // heater_currentTem_cizhou_1A11
            // heater_upperTem_cizhou_1A11
            var heaterTemprator = cizhouHeater.heaterTemprator;
            if (heaterTemprator) {
                $("#heater_lowwerTem_cizhou_" + cizhouHeater.name).text(heaterTemprator.tempratorLower);
                $("#heater_currentTem_cizhou_" + cizhouHeater.name).text(heaterTemprator.temprator);
                $("#heater_upperTem_cizhou_" + cizhouHeater.name).text(heaterTemprator.tempratorUpper);
            }
        }
        if (citaoHeater) {
            var heaterTemprator = citaoHeater.heaterTemprator;
            if (heaterTemprator) {
                $("#heater_lowwerTem_citao_" + citaoHeater.name).text(heaterTemprator.tempratorLower);
                $("#heater_currentTem_citao_" + citaoHeater.name).text(heaterTemprator.temprator);
                $("#heater_upperTem_citao_" + citaoHeater.name).text(heaterTemprator.tempratorUpper);
            }
        }
        if (huidouHeaterForLeftJson) {
            var heaterTemprator = huidouHeaterForLeftJson.heaterTemprator;
            if (heaterTemprator) {
                $("#heater_lowwerTem_leftHopper_" + huidouHeaterForLeftJson.name).text(heaterTemprator.tempratorLower);
                $("#heater_currentTem_leftHopper_" + huidouHeaterForLeftJson.name).text(heaterTemprator.temprator);
                $("#heater_upperTem_leftHopper_" + huidouHeaterForLeftJson.name).text(heaterTemprator.tempratorUpper);
            }
        }
        if (huidouHeaterForRightJson) {
            var heaterTemprator = huidouHeaterForRightJson.heaterTemprator;
            if (heaterTemprator) {
                $("#heater_lowwerTem_rightHopper_" + huidouHeaterForRightJson.name).text(heaterTemprator.tempratorLower);
                $("#heater_currentTem_rightHopper_" + huidouHeaterForRightJson.name).text(heaterTemprator.temprator);
                $("#heater_upperTem_rightHopper_" + huidouHeaterForRightJson.name).text(heaterTemprator.tempratorUpper);
            }
        }
    }
    function handleHeaterRunState(rectId, pathId, heaterRunState, heaterAlarmState) {
        var $rectSvg = $("#" + rectId);
        var $pathSvg = $("#" + pathId);
        var rectColor = "green";
        var pathColor = "black";
        if (heaterAlarmState == 1) {
            rectColor = "yellow";
            if (heaterRunState == 1) {
                pathColor = "red";
            }
        } else if (heaterAlarmState == 0) {
            pathColor = "black";
            if (heaterRunState == 1) {
                rectColor = "red";
            }
        }
        $rectSvg.attr("fill", rectColor);
        $pathSvg.attr("stroke", pathColor);

    }


//    window.setTimeout(freshHeaterData, 1000);
    window.setInterval(freshHeaterData, 3000);
});

function getHeaterTypeByTyperString(heaterTypeStr) {

    var heaterType = -1;
    if (heaterTypeStr == "citao") {
        heaterType = 0;
    } else if (heaterTypeStr == "cizhou") {
        heaterType = 1;
    } else if (heaterTypeStr == "leftHopper") {
        heaterType = 2;
    } else if (heaterTypeStr == "rightHopper") {
        heaterType = 3;
    }
    return heaterType;
}

