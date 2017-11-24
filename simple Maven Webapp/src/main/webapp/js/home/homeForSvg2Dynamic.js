$(document).ready(function() {
    // var epRunStateSvgObject =
    // {"titleSvg":titleSvg,"runStateRectSvg":runStateRectSvg,"runStateLineSvg":runStateLineSvg};

    window.setTimeout(freshData, 3000);
    // window.setInterval(freshData, 1500);
});
function freshData() {
    var url = ctx + "/back/getAllEp.do";
    $.getJSON(url, function(json) {
        for (var i = 0; i < json.length; i++) {
            for (var j = 0; j < electricFields.length; j++) {
                if (electricFields[j].title == json[i].name) {
                    electricFields[j].epId = json[i].id;
                    electricFields[j].epRunStateSvg.epId = json[i].id;
                    // 更新状态
                    electricFields[j].epRunStateSvg.update(json[i].runState, json[i].alarmState, json[i].communicationFlag);
                    // 更新数据
                    electricFields[j].epRunDataSvg.updateData(json[i].primaryVoltageReading, json[i].primaryCurrentReading,
                            json[i].secondVoltageReading, json[i].secondCurrentReading, json[i].sparkReading);
                    // 更新振打与加热状态
                    var anodeForEp = json[i].anodeRapper;
                    if (anodeForEp) {
                        electricFields[j].rapperForAnodeSvg.updateData(anodeForEp.runState, anodeForEp.alarmState, anodeForEp.comunication);
                    }
                    var catchodeForEp = json[i].cathodeRapper;
                    if (catchodeForEp) {
                        electricFields[j].rapperForCathodeSvg
                                .updateData(catchodeForEp.runState, catchodeForEp.alarmState, catchodeForEp.comunication);
                    }
                    var cizhouHeater = json[i].cizhouHeater;
                    var citaoHeater = json[i].citaoHeater;
                    var huidouHeaterForLeftJson = json[i].huidouHeaterForLeft;
                    var huidouHeaterForRightJson = json[i].huidouHeaterForRight;
                    if (cizhouHeater) {
                        electricFields[j].heaterForCiZhouSvg.updateData(cizhouHeater.runState, cizhouHeater.alarmState, cizhouHeater.comunication);
                    }
                    if (citaoHeater) {
                        electricFields[j].heaterForCiTaoSvg.updateData(citaoHeater.runState, citaoHeater.alarmState, citaoHeater.comunication);
                    }
                    if (huidouHeaterForLeftJson) {
                        electricFields[j].heaterForLeftHopper.updateData(huidouHeaterForLeftJson.runState, huidouHeaterForLeftJson.alarmState,
                                huidouHeaterForLeftJson.comunication);
                    }
                    if (huidouHeaterForRightJson) {
                        electricFields[j].heaterForRightHopper.updateData(huidouHeaterForRightJson.runState, huidouHeaterForRightJson.alarmState,
                                huidouHeaterForRightJson.comunication);
                    }

                    // ElectricField.prototype.rapperForAnodeSvg = null;
                    // ElectricField.prototype.rapperForCathodeSvg = null;
                    // ElectricField.prototype.heaterForCiZhouSvg = null;
                    // ElectricField.prototype.heaterForCiTaoSvg = null;
                    // ElectricField.prototype.heaterForHopper = null;
                }

            }
        }
    });
}
/** *****************************************************************EpRunStateSvgObject****begin******************************************************************** */
var RECT_NO_COMMUNICATION_COLOR = "#F0F0F0";// 通讯中断
var RECT_ALARM_COLOR = "yellow";// 告警
var RECT_NORMAL_RUN_COLOR = "red";// 正常运行中
var RECT_NORMARL_STOP_COLOR = "#7CFC00";// 正常停运中

var LINE_ALARM_FILL_COLOR = "red";
var LINE_NO_ALARM_STOP_FILL_COLOR = "BLACK";
var LINE_NO_ALARM_RUN_FILL_COLOR = "black";
function EpRunStateSvgObject() {
    this.titleSvg = null;
    this.runStateRectSvg = null;
    this.runSateLineSvg = null;
    this.epId = "";
    this.update = function(runState, alarmState, communication) {
        // 更新状态
        this.changeRunState(runState, alarmState, communication);
        // 注册按钮的启停操作
        regClickFunction(runState, alarmState, communication, this);
    };
    this.changeRunState = function(runState, alarmState, communication) {
        changeRunStateForEp(runState, alarmState, communication, this);
    };
}
/**
 * 
 */

function changeRunStateForEp(runState, alarmState, communication, obj) {
    var rectSvg = $(obj.runStateRectSvg);
    var lineSvg = $(obj.runSateLineSvg);
    updateDeviceState(runState, alarmState, communication, rectSvg, lineSvg);
}
function regClickFunction(runState, alarmState, communication, epRunStateSvgObject) {
    var $rect = $(epRunStateSvgObject.runStateRectSvg);
    var epId = epRunStateSvgObject.epId;
    if (communication == 1 || epId.length < 1) {
        // 通讯中断，取消点击功能
        $rect.unbind("click");
    } else if (communication == 0) {
        // 通讯正常，点击时可以启停电源
        $rect.bind("click", function() {
            if (runState == 1) {
                var returnValue = window.confirm("停止电源");
                if (returnValue == true) {
                    var sendData = {
                        "ep.id" : epId,
                        "ep.runState" : 0
                    };
                    var url = ctx + "/back/epUpdate.do";
                    $.getJSON(url, sendData, function(data) {
                        if (data.runState == 0) {
                            epRunStateSvgObject.changeRunState(0, alarmState, communication, epRunStateSvgObject);
                            $rect.unbind("click");
                            regClickFunction(0, alarmState, communication, epRunStateSvgObject);
                        }
                    });
                } else {

                }
            } else if (runState == 0) {
                var returnValue = window.confirm("启动电源");
                if (returnValue == true) {
                    var sendData = {
                        "ep.id" : epId,
                        "ep.runState" : 1
                    };
                    var url = ctx + "/back/epUpdate.do";
                    $.getJSON(url, sendData, function(data) {
                        if (data.runState == 1) {
                            epRunStateSvgObject.changeRunState(1, alarmState, communication, epRunStateSvgObject);
                            $rect.unbind("click");
                            regClickFunction(1, alarmState, communication, epRunStateSvgObject);
                        }
                    });

//                    epRunStateSvgObject.changeRunState(1, alarmState, communication, epRunStateSvgObject);
//                    $rect.unbind("click");
//                    regClickFunction(1, alarmState, communication, epRunStateSvgObject);
                }
            }
        });
    }
};
/** *****************************************************************EpRunStateSvgObject****end******************************************************************** */
/** *****************************************************************EpRunDataSvgObject****begin******************************************************************** */
function EpRunDataSvgObject() {
    this.epId = "";
    this.u1Svg = null;
    this.i1Svg = null;
    this.u2Svg = null;
    this.i2Svg = null;
    this.spmSvg = null;
    this.updateData = function(u1, i1, u2, i2, spm) {
        updateEpData(u1, i1, u2, i2, spm, this);
    };
}
function updateEpData(u1, i1, u2, i2, spm, obj) {
    $(obj.u1Svg).html(u1);
    $(obj.i1Svg).html(i1);
    $(obj.u2Svg).html(u2);
    $(obj.i2Svg).html(i2);
    $(obj.spmSvg).html(spm);
}
/** *****************************************************************EpRunDataSvgObject****end******************************************************************** */
/** *****************************************************************LowDevice****begin******************************************************************** */

function LowDevice() {
    this.epId = "";
    this.rectSvg = null;
    this.lineSvg = null;
    this.updateData = function(runState, alarmState, communicationState) {
        updateLowDeviceState(runState, alarmState, communicationState, this);
    };
}
function updateLowDeviceState(runState, alarmState, communicationState, obj) {
    var $rectSvg = $(obj.rectSvg);
    var $lineSvg = $(obj.lineSvg);
    updateDeviceState(runState, alarmState, communicationState, $rectSvg, $lineSvg);

}
/** *****************************************************************LowDevice****end******************************************************************** */
function updateDeviceState(runState, alarmState, communication, rectSvg, lineSvg) {
    var runStateRectSvgFill = RECT_NO_COMMUNICATION_COLOR;
    var lineSvgFill = LINE_NO_ALARM_STOP_FILL_COLOR;
    if (communication == 1) {
        // 通讯中断
        runStateRectSvgFill = RECT_NO_COMMUNICATION_COLOR;
    } else if (communication == 0) {
        // 通讯正常
        if (runState == 0) {
            // 电源停运
            if (alarmState == 0) {
                // 无告警
                runStateRectSvgFill = RECT_NORMARL_STOP_COLOR;
            } else if (alarmState == 1) {
                // 告警中
                runStateRectSvgFill = RECT_ALARM_COLOR;
            }
        } else if (runState == 1) {
            // 电源运行中
            if (alarmState == 0) {
                // 无告警
                runStateRectSvgFill = RECT_NORMAL_RUN_COLOR;
                lineSvgFill = LINE_NO_ALARM_RUN_FILL_COLOR;
            } else if (alarmState == 1) {
                // 告警中
                runStateRectSvgFill = RECT_ALARM_COLOR;
                lineSvgFill = LINE_ALARM_FILL_COLOR;
                // alert(LINE_ALARM_FILL_COLOR);
            }
        }
    }
    rectSvg.attr("fill", runStateRectSvgFill);
    if (lineSvg.attr("fill") != "none") {
        lineSvg.attr("fill", lineSvgFill);
    } else {
        lineSvg.attr("stroke", lineSvgFill);
    }
}
