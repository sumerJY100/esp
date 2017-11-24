<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/commonHead.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<jsp:include page="/common/commonJsAndCss.jsp"></jsp:include>
<script type="text/javascript" src="js/Highcharts-3.0.5/js/highcharts.js"></script>
<script type="text/javascript" src="js/ingrid/js/jquery.ingrid.js"></script>
<script type="text/javascript" src="js/jquery.svg.js"></script>
<link rel="stylesheet" href="js/ingrid/css/ingrid.css" type="text/css" media="screen" />


<link rel="stylesheet" href="js/jquery.svg.css" type="text/css" media="screen">
<script type="text/javascript" src="js/jquery.svg.js"></script>
<script type="text/javascript" src="js/jquery.svganim.js"></script>
<script type="text/javascript" src="js/hopperForSvg.js"></script>
<script type="text/javascript">
    $(document).ready(function() {
	setTimeout(freshHopperData,1000);
	function freshHopperData() {
	    var url = ctx + "/getHopperJSONData.do";
	    $.get(url, function(returnData) {
		for (var i = 0; i < returnData.length; i++) {
		    var leftHopper = returnData[i].hopperList[0];
		    var rightHopper = returnData[i].hopperList[1];
		    var epName = returnData[i].ep.name;
		    hopperGroupArray[i].updateHopperData(epName, leftHopper.name, leftHopper.hopperLevel, rightHopper.name, rightHopper.hopperLevel);
		}
	    });
	}

    });
</script>

</head>

<body>
	<center>
		<jsp:include page="common/header.jsp"></jsp:include>
		<jsp:include page="common/commonMenu.jsp"></jsp:include>
		<!-- 		<input type="button" id="btnTest"	value="test"/> -->
		<div id="hopper" style="height:600px;"></div>
		<!-- 	<embed src="SVG/hopper.svg"   height="600" width="100%" type="image/svg+xml" /> -->
		<!-- 		<embed src="SVG/gradient.svg"   height="600px" width="100%" type="image/svg+xml" /> -->
		<!-- 		<div id="gradient" style="height:600px;"></div> -->
		<!-- 		<div id="svgintro"></div> -->
		<jsp:include page="common/alarmFotter.jsp"></jsp:include>
	</center>
</body>
</html>
