<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/commonHead.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<jsp:include page="/common/commonJsAndCss.jsp"></jsp:include>
<!-- highchart.js -->
<script type="text/javascript" src="js/Highcharts-3.0.5/js/highcharts.js"></script>
<!-- ingrid.js -->
<script type="text/javascript" src="js/ingrid/js/jquery.ingrid.js"></script>
<link rel="stylesheet" href="js/ingrid/css/ingrid.css" type="text/css" media="screen" />
<!-- svg.js -->
<script type="text/javascript" src="js/jquery.svg.js"></script>
<script type="text/javascript" src="js/home/home.js"></script>
<script type="text/javascript" src="js/home/homeForSvg.js"></script>
<!-- DWR -->
<script type='text/javascript' src='/ESP2.0/dwr/engine.js'></script>
<script type='text/javascript' src='/ESP2.0/dwr/util.js'></script>
<script type='text/javascript' src='/ESP2.0/dwr/interface/voltageAndCurrent.js'></script>
<style type="text/css">
.controllerForcer {
	font-size: 2;
	color: red;
}
</style>
<script type="text/javascript">
    $(document).ready(function() {
	// 	voltageAndCurrent.getCurrentVoltageAndCurrent(function(data) {
	// 	    alert(data);
	// 	});
	$("#addSvg").bind("click", function() {
	    var svgTemp = $("#homeSvgDiv svg");
	    alert(svgTemp.html());
	    var tempRectHtml = "<rect x=\"0\" y=\"0\" width=\"148\" height=\"145\" fill=\"RED\" stroke=\"#000000\" stroke-opacity=\"1\" \/>";
	    var $tempRect = $(tempRectHtml);
	    // 	   svgTemp.append($tempRect);
	   // $tempRect.appendTo(svgTemp);
	    
	    var newRect = $svgNew("rect");
	    newRect.attr("x",0).attr("y",0).attr("width",50).attr("height",50).attr("fill","RED");
	    newRect.appendTo(svgTemp);
	});

	var svgns = "http://www.w3.org/2000/svg";
	function $svgNew(tagName) {
	    return $(document.createElementNS(svgns, tagName));
	};
    });
</script>
</head>

<body>
	<center>
		<jsp:include page="common/header.jsp"></jsp:include>
		<jsp:include page="common/commonMenu.jsp"></jsp:include>
		<table style="width:100%">
			<tr>
				<td style="text-align:center;">
					<span id="primary_div" style="width:45%;"></span>
				</td>
				<td style="text-align:center;">
					<span id="secondery_div" style="width:45%"></span>
				</td>
			</tr>
		</table>
		<!-- 		<embed src="" height="300" width="100%" type="image/svg+xml" /> -->
		<div id="homeSvgDiv" style="height:300px;border:1px solid black;"></div>
		<input type="button" value="添加SVG元素" id="addSvg" />

		<jsp:include page="common/alarmFotter.jsp"></jsp:include>
	</center>
</body>
</html>
