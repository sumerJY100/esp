<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/commonHead.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP 'commonMenu.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<jsp:include page="/common/commonJsAndCss.jsp"></jsp:include>

</head>

<body>
	jump
	<input type="hidden" value="${jumpMessage }" id="jumpMessage" />
	<script type="text/javascript">
	$(document).ready(function() {
	    if ($("#jumpMessage").val().length > 0) {
		window.returnValue = "success";
		window.close();
	    }

	});
    </script>
</body>
</html>
