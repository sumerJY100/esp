<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/commonHead.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP 'list.jsp' starting page</title>

<jsp:include page="/common/commonJsAndCss.jsp"></jsp:include>


 <link rel="stylesheet" href="js/jquery-ui-1.10.4/themes/base/jquery-ui.css">

<script src="js/jquery-ui-1.10.4/ui/jquery-ui.js"></script>
<!-- <link rel="stylesheet" href="/resources/demos/style.css"> -->
<script type="text/javascript">
	$(function() {
		$("#slider").slider();
	});
</script>



</head>

<body>

<div id="dialog" title="Basic dialog"></div>
	<div id="slider">
	</div>


</body>
</html>
