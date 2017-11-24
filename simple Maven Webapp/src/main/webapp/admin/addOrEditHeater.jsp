<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/commonHead.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<jsp:include page="/common/commonJsAndCss.jsp"></jsp:include>

<!-- ingrid.js -->
<script type="text/javascript" src="js/ingrid/js/jquery.ingrid.js"></script>
<link rel="stylesheet" href="js/ingrid/css/ingrid.css" type="text/css" media="screen" />


<style type="text/css">
.controllerForcer {
	font-size: 2;
	color: red;
}
</style>
<script type="text/javascript">
	$(document).ready(function() {
		$("#returnBtn").bind("click", function() {
			window.location = ctx + "/listHeater.do";
		});
		$("[name='heater.epId']").bind("change", function() {
			var selectedText = $(this).find("option:selected").text();
			if ($("[name='heater.name']").val().length == 0) {
				$("[name='heater.name']").val(selectedText);
			}
		});
	});
</script>
</head>

<body>
	<center>
		<jsp:include page="/common/header.jsp"></jsp:include>
		<jsp:include page="/common/commonMenu.jsp"></jsp:include>

		<div style="padding-top:30px;width:300px;">
			Heater
			<form action="${ctx }/saveOrUpdateHeater.do" method="post">
				<s:textfield name="heater.id" style="display:none"></s:textfield>
				EP:<s:select list="#request.epList" listKey="id" listValue="name" name="heater.epId"></s:select><br/>
				类型：<s:select list="#{0:'瓷套',1:'瓷轴',2:'灰斗'}" listKey="key" listValue="value" name="heater.heaterType"></s:select><br/>
				关联温度：<s:select list="#request.htList" listKey="id" listValue="name +'-' +tempratorTypeString" name="heater.heaterTempratorId"></s:select><br/>
				关联低压设备：<s:select list="#request.lowDeviceList" listKey="id" listValue="name" name="heater.lowDeviceId"></s:select><br/>
				名称：<s:textfield name="heater.name"></s:textfield><br/>
				<s:submit style="text-align:center;"></s:submit>
				<input type="button" id="returnBtn" value="返回" />
			</form>
		</div>

		<!-- 		<embed src="" height="300" width="100%" type="image/svg+xml" /> -->
		<div id="homeSvgDiv" style="height:300px;"></div>
		<jsp:include page="/common/alarmFotter.jsp"></jsp:include>
	</center>
</body>
</html>
