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
<script type="text/javascript" src="js/home.js"></script>

<script type="text/javascript">
    $(document).ready(function() {
	
    });
</script>
</head>

<body >
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
	<embed src="SVG/home.svg"   height="200" width="100%" type="image/svg+xml" />
	
	<jsp:include page="common/alarmFotter.jsp"></jsp:include>
</center>
</body>
</html>
