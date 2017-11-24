function freshRapperData() {
    $("rect[fill='#CCCCCC'][stroke='#999999'][width='25.11']").css({
	"fill" : "#C9DBF8",
	"stroke" : "#C9DBF8"
    });

    var resetTextArr = $("text");
    var resetRectArr = $("rect[fill='#CCCCCC'][stroke='#999999'][width='17.02']");
    for (var i = 0; i < resetTextArr.length; i++) {
	var $resetText = $(resetTextArr[i]);
	if ($resetText.html() == "复位") {
	    var $resetRect = getReseTect($resetText, resetRectArr);
	    var rapper = null;
	    for(var j=0;j<RappingGroupsArray.length;j++){
		var tempRappingGroup = RappingGroupsArray[j];
		var tempRappingSvg = tempRappingGroup.rappingSvgGroup;
		if(tempRappingSvg.reSetBtn.attr('id') == $resetText.attr("id")){
		    rapper = tempRappingGroup;
		    break;
		}
	    }
	    var tempResetObj = new ResetObj($resetText, $resetRect, rapper);
	    tempResetObj.setTextMiddle();
	}
    }
    
    
    var freshRapperDataUrl = ctx + "/getFreshRapperData.do?radom="+Math.random();
    $.get(freshRapperDataUrl, function(rapperData) {
	for (var i = 0; i < rapperData.length; i++) {
//	    RappingGroupsArray[i].freshRunState(rapperData[i].epName, rapperData[i].anodeRapperState, rapperData[i].catchodeRapperState);
//	    RappingGroupsArray[i].freshRunMode(rapperData[i].epId, rapperData[i].anodeRapperId, rapperData[i].catchodeRapperId, rapperData[i].anodeRapperMode, rapperData[i].catchodeRapperMode);
	    $("#anode_beginTime_"+rapperData[i].epName).text(rapperData[i].anodeRapperBeginTime);
	    $("#anode_runTime_"+rapperData[i].epName).text(rapperData[i].anodeRapperRunTime);
	    $("#anode_waitTime_"+rapperData[i].epName).text(rapperData[i].anodeRapperWaitTime);
	    
	    $("#cathode_beginTime_"+rapperData[i].epName).text(rapperData[i].catchodeRapperBeginTime);
	    $("#cathode_runTime_"+rapperData[i].epName).text(rapperData[i].catchodeRapperRunTime);
	    $("#cathode_waitTime_"+rapperData[i].epName).text(rapperData[i].catchodeRapperWaitTime);
	    
//	    .attr("id", rapperTypeStr + "_runWayForAuto_" + electricFields[location].title);;
	    var anodeRunWay = rapperData[i].anodeRunWay;
	    var communicationForAnode = rapperData[i].anodeCommunication;
	    $("#anode_runWayForStop_"+rapperData[i].epName).attr("fill",communicationForAnode==0?(anodeRunWay==0?"red":"green"):"grey");
	    $("#anode_runWayForRun_"+rapperData[i].epName).attr("fill",communicationForAnode==0?(anodeRunWay==1?"red":"green"):"grey");
	    $("#anode_runWayForAuto_"+rapperData[i].epName).attr("fill",communicationForAnode==0?(anodeRunWay==2?"red":"green"):"grey");
	    var cathodeRunWay = rapperData[i].cathodeRunWay;
	    var communicationForCatchode = rapperData[i].cathodeCommunication;
	    $("#cathode_runWayForStop_"+rapperData[i].epName).attr("fill",communicationForCatchode==0?(cathodeRunWay==0?"red":"green"):"grey");
	    $("#cathode_runWayForRun_"+rapperData[i].epName).attr("fill",communicationForCatchode==0?(cathodeRunWay==1?"red":"green"):"grey");
	    $("#cathode_runWayForAuto_"+rapperData[i].epName).attr("fill",communicationForCatchode==0?(cathodeRunWay==2?"red":"green"):"grey");
	    
	    var anodeRunState = rapperData[i].anodeRapperState;
	    var cathodeRunState = rapperData[i].catchodeRapperState;
	    
	    var anodeRunStateSvg = $("#anode_runState_" + rapperData[i].epName);
	    var cathodeRunStateSvg = $("#cathode_runState_" + rapperData[i].epName);
	    if(anodeRunState == 0){
	        anodeRunStateSvg.attr("fill","green");
	    }else if(anodeRunState == 1){
	        anodeRunStateSvg.attr("fill","red");
	    }else if(anodeRunState == 2){
	        anodeRunStateSvg.attr("fill","yellow");
	    }
	    if(cathodeRunState == 0){
	        cathodeRunStateSvg.attr("fill","green");
	    }else if(cathodeRunState == 1){
	        cathodeRunStateSvg.attr("fill","red");
	    }else if(cathodeRunState == 2){
	        cathodeRunStateSvg.attr("fill","yellow");
	    }
	}
    });
}
/**
 * 通过一个textSvg的位置X与Y，查询距离最近的rect，并返回
 * 
 * @param textLocationX
 * @param textLocationY
 * @param rectArr
 * @returns
 */
function getReseTect($resetText, rectArr) {
    var resultRect = null;
    var textLocation = getAcutalLocationXAndY($resetText);
    for (var i = 0; i < rectArr.length; i++) {
	var $currentRect = $(rectArr[i]);
	if (null == resultRect) {
	    resultRect = $currentRect;
	    continue;
	} else {
	    var rectLocation = getAcutalLocationXAndY($currentRect);
	    var resultRectLocation = getAcutalLocationXAndY(resultRect);
	    
	    var distance_x = Math.abs(rectLocation.x - textLocation.x);
	    var distance_y = Math.abs(rectLocation.y - textLocation.y);
	    
	    var distance_x_result = Math.abs(resultRectLocation.x - textLocation.x);
	    var distance_y_result = Math.abs(resultRectLocation.y - textLocation.y);
	    if((distance_x + distance_y) < (distance_x_result + distance_y_result)){
		resultRect = $currentRect;
	    }
	}
    }
    return resultRect;
}
/**
 * 复位对象
 */
function ResetObj(resetTextSvg, resetRectSvg, rapper) {
    this.resetTextSvg = resetTextSvg;
    this.resetRectSvg = resetRectSvg;
    this.rapper = rapper;
}
/**
 * 设置resetRext与resetText相对居中
 */
ResetObj.prototype.setTextMiddle = function() {
    var rectHeight = this.resetRectSvg.attr('height');
    var textX = this.resetTextSvg.attr("x");
    var textY = this.resetTextSvg.attr("y");

    var rectTransformArr = decompositionTransform(this.resetRectSvg.attr("transform"));
    var textTransformArr = decompositionTransform(this.resetTextSvg.attr("transform"));
    
    var rectLocation = getAcutalLocationXAndY(this.resetRectSvg);
    textTransformArr[0] = 1;
    textTransformArr[1] = 0;
    textTransformArr[2] = 0;
    textTransformArr[3] = 1.2;
    textTransformArr[4] = rectLocation.x + 2 - parseFloat(textX);
    textTransformArr[5] = rectLocation.y + parseFloat(rectHeight) -3 - parseFloat(textY)*1.2;
    this.resetTextSvg.attr("transform",transfromArrayToMatrix(textTransformArr));
    
    rectTransformArr[0] = 1;
    rectTransformArr[1] = 0;
    rectTransformArr[2] = 0;
    rectTransformArr[3] = 1;
//    alert(transfromArrayToMatrix(rectTransformArr));
    this.resetRectSvg.attr("transform",transfromArrayToMatrix(rectTransformArr));
};
/**
 * 分解matrixValue
 * 
 * @param transformValue
 * @returns
 */
function decompositionTransform(transformValue) {
    transformValue = transformValue.trim();
    var matrixValue = transformValue.substr(7, transformValue.length-8);
    var arr = matrixValue.split(",");
    return arr;
}
/**
 * 将一个数组转换为matrix arr长度必须为6
 * 
 * @param arr
 */
function transfromArrayToMatrix(arr) {
    if (arr.length == 6) {
	var maxtrixNewValue = "matrix(";
	for (var i = 0; i < arr.length; i++) {
	    if (i > 0)
		maxtrixNewValue += ",";
	    maxtrixNewValue += arr[i];
	}
	maxtrixNewValue += ")";
	return maxtrixNewValue;
    }
    
}
/**
 * 获取一个SVG元素的实际X与Y位置
 * @param $svg
 * @returns {Location}
 */
function getAcutalLocationXAndY($svg){
    var x = $svg.attr("x");
    var y = $svg.attr("y");
    var matrixArr = decompositionTransform($svg.attr("transform"));
    var actualX = parseFloat(x) + parseFloat(matrixArr[4]);
    var actualY = parseFloat(y) + parseFloat(matrixArr[5]);
    
    return new Location(actualX,actualY);
}
function Location(x,y){
    this.x = parseFloat(x);
    this.y = parseFloat(y);
}
String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
 };
 String.prototype.ltrim=function(){
    return this.replace(/(^\s*)/g,"");
 };
 String.prototype.rtrim=function(){
    return this.replace(/(\s*$)/g,"");
 };