<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/commonHead.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<jsp:include page="/common/commonJsAndCss.jsp"></jsp:include>
<script type="text/javascript" src="js/Highcharts-3.0.5/js/highcharts.js"></script>
<script type="text/javascript" src="js/ingrid/js/jquery.ingrid.js"></script>
<link rel="stylesheet" href="js/ingrid/css/ingrid.css" type="text/css" media="screen" />
<script type="text/javascript" src="js/jquery.svg.js"></script>
<script type="text/javascript" src="js/rapper/rappingForSvg.js"></script>
<script type="text/javascript" src="js/rapper/rapper.js"></script>

<script type="text/javascript">
    $(document).ready(
	    function() {

		setTimeout(freshRapperData,2000);
		//setInterval(freshRapperData, 2000);
		
	    });
</script>
</head>

<body>
	<center>
		<jsp:include page="common/header.jsp"></jsp:include>
		<jsp:include page="common/commonMenu.jsp"></jsp:include>

		<div id="rappingSvgDiv" style="height:600px;"></div>
		<jsp:include page="common/alarmFotter.jsp"></jsp:include>
	</center>
</body>
</html>
