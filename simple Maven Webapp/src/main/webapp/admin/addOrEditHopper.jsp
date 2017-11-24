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
		$("#returnBtn").bind("click",function(){window.location= ctx+"/hopperList.do";});
		$("[name='hopper.epId']").bind("change",function(){
		   var selectedText = $(this).find("option:selected").text();
		   if($("[name='hopper.name']").val().length == 0){
		   		$("[name='hopper.name']").val(selectedText);
		   }
		});
    });
</script>
</head>

<body>
	<center>
		<jsp:include page="/common/header.jsp"></jsp:include>
		<jsp:include page="/common/commonMenu.jsp"></jsp:include>
		
		<div style="padding-top:30px;">
			Hopper
			<form action="${ctx }/saveOrUpdateHopper.do" method="post">
				<s:textfield name="hopper.id"  style="display:none"></s:textfield>
				<s:select list="#request.epList" listKey="id" listValue="name" name="hopper.epId" ></s:select>
				<s:select list="#{0:'左侧',1:'右侧'}" listKey="key" listValue="value" name="hopper.location"></s:select>
				<s:select list="#request.lowDeviceList" listKey="id" listValue="name" name="hopper.lowDeviceId"></s:select>
				<s:textfield name="hopper.name"></s:textfield>
				<s:submit></s:submit>
				<input type="button" id="returnBtn" value="返回"/>
			</form>
		</div>

		<!-- 		<embed src="" height="300" width="100%" type="image/svg+xml" /> -->
		<div id="homeSvgDiv" style="height:300px;"></div>
		<jsp:include page="/common/alarmFotter.jsp"></jsp:include>
	</center>
</body>
</html>
