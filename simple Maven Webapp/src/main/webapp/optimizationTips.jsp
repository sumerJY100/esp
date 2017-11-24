<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/commonHead.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<jsp:include page="/common/commonJsAndCss.jsp"></jsp:include>
<script type="text/javascript" src="js/Highcharts-3.0.5/js/highcharts.js"></script>
<!-- ingrid.js -->
<script type="text/javascript" src="js/ingrid/js/jquery.ingrid.js"></script>
<link rel="stylesheet" href="js/ingrid/css/ingrid.css" type="text/css" media="screen" />

<style type="text/css">
	#container table{
		border:0px solid black;
		border-spacing:0;
		border-collapse:0;
	}
	#container td{
		border:1px solid black;
	}
	#container td table td{
		height:40px;
	}
	#container th{
		text-align:center;
	}
</style>
<script type="text/javascript">
    $(document).ready(function() {

    });
</script>
</head>

<body>
	<center>
		<jsp:include page="common/header.jsp"></jsp:include>
		<jsp:include page="common/commonMenu.jsp"></jsp:include>
		<div id="container" style="height:600px;">
			<table cellspacing=0 cellpadding= 0 style="padding-top:20px;">
				<tr><th colspan=2>优化建议</th></tr>
				<tr >
					<td style="border:0px;padding-top:20px;">
						<table>
							<tr>
								<td colspan=2 style="text-align:center">一电场<td>
							</tr>
							<tr><td>1A11</td><td style="width:300px;">&nbsp;</td></tr>
							<tr><td>1A21</td><td>&nbsp;</td></tr>
							<tr><td>1B11</td><td>&nbsp;</td></tr>
							<tr><td>1B21</td><td>&nbsp;</td></tr>
						</table>
					</td>
					<td style="border:0px;padding-top:20px;">
						<table>
							<tr>
								<td colspan=2 style="text-align:center">二电场<td>
							</tr>
							<tr><td>1A12</td><td style="width:300px;">&nbsp;</td></tr>
							<tr><td>1A22</td><td>&nbsp;</td></tr>
							<tr><td>1B12</td><td>&nbsp;</td></tr>
							<tr><td>1B22</td><td>&nbsp;</td></tr>
						</table>
					</td>
				</tr>
				<tr>
					<td style="border:0px;padding-top:20px;">
						<table>
							<tr>
								<td colspan=2 style="text-align:center">三电场<td>
							</tr>
							<tr><td>1A11</td><td style="width:300px;">&nbsp;</td></tr>
							<tr><td>1A21</td><td>&nbsp;</td></tr>
							<tr><td>1B11</td><td>&nbsp;</td></tr>
							<tr><td>1B21</td><td>&nbsp;</td></tr>
						</table>
					</td>
					<td style="border:0px;padding-top:20px;">
						<table>
							<tr>
								<td colspan=2 style="text-align:center">四电场<td>
							</tr>
							<tr><td>1A12</td><td style="width:300px;">&nbsp;</td></tr>
							<tr><td>1A22</td><td>&nbsp;</td></tr>
							<tr><td>1B12</td><td>&nbsp;</td></tr>
							<tr><td>1B22</td><td>&nbsp;</td></tr>
						</table>
					</td>
				</tr>
			</table>
		</div>

		<jsp:include page="common/alarmFotter.jsp"></jsp:include>
	</center>
</body>
</html>
