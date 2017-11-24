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
		$("#returnBtn").bind("click",function(){window.location=ctx + "/heaterTempratorList.do";});
		$("[name='heaterTemprator.epId']").bind("change",function(){
			   var selectedText = $(this).find("option:selected").text();
			   if($("[name='heaterTemprator.name']").val().length == 0){
			   		$("[name='heaterTemprator.name']").val(selectedText);
			   }
			});
		function initTypeAndChild(){
		    
		}
    });
</script>
</head>

<body>
	<center>
		<jsp:include page="/common/header.jsp"></jsp:include>
		<jsp:include page="/common/commonMenu.jsp"></jsp:include>
		
		<div style="padding-top:30px;">
			温度
			<form action="${ctx }/saveOrUpdateHeaterTemprator.do" method="post">
				<s:textfield name="heaterTemprator.id"  style="display:none"></s:textfield>
				<s:select list="#request.epList" listKey="id" listValue="name" name="heaterTemprator.epId" ></s:select>
				<s:textfield name="heaterTemprator.name"></s:textfield>
				<s:select list="#{2:'灰斗温度',0:'瓷套温度',1:'瓷轴温度'}" listKey="key" listValue="value" name="heaterTemprator.tempratorType"></s:select>
				<s:select list="#request.lowDeviceList" listKey="id" listValue="name" name="heaterTemprator.lowDeviceId"></s:select>
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
