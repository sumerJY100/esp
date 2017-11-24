<%@ page language="java"  pageEncoding="UTF-8"%>
<%@ include file="/common/commonHead.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<jsp:include page="/common/commonJsAndCss.jsp"></jsp:include>
<STYLE type="text/css">
A: link {
	COLOR: #ffffff;
	FONT-SIZE: 12px;
	TEXT-DECORATION: none
}

A: visited {
	COLOR: #ffffff;
	FONT-SIZE: 12px;
	TEXT-DECORATION: none
}

A: hover {
	COLOR: #ffffff
}

BODY input {
	MARGIN-TOP: 2px;
	FONT: 12px "微软雅黑";
}

TD {
	LINE-HEIGHT: 15px;
	FONT-SIZE: 12px
}
</STYLE>
<script type="text/javascript">
    $(document).ready(function() {
	if (navigator.userAgent.indexOf("MSIE") > 0) {
	    $("#loginTable").before($("<div style='height:220px;''></div>"));
	    //    return "MSIE";       //IE浏览器 
	}
	if (navigator.userAgent.indexOf("Firefox") > 0) {
	    //      return "Firefox";     //Firefox浏览器 
	}
    });
</script>
</head>

<body>

	<DIV align=center>
		<form method="post" name="form1" action="login.do">
			<TABLE id=__01 border=0 cellSpacing=1 cellPadding=0 width=668 align=center>
				<TBODY>
					<TR>
						<TD>
							<TABLE border=0 cellSpacing=1 cellPadding=0 width="667" background="image/banner.jpg" height="408">
								<TBODY>
									<TR>
										<TD>



											<TABLE id="loginTable" style="padding-top:220px;" border=0 cellSpacing=0 cellPadding=2 width=660>
												<TBODY>
													<tr>
													<td colspan=2 align=center style="color:red;font-weight:bold;font-size:16px;">${message }</td>
													</tr>
													<TR>
														<TD height=25 width="37%">
															<DIV align=right style="font-size:25;">帐号：</DIV>
														</TD>
														<TD width="63%">
															<DIV align=left>
																<INPUT style="WIDTH: 200px" id=username size=25 name=user.loginName>
																&#160;
															</DIV>
														</TD>
													</TR>
													<TR>
														<TD height=25>
															<DIV align=right style="font-size:25;">密码：</DIV>
														</TD>
														<TD>
															<DIV align=left>
																<INPUT style="WIDTH: 200px" id=password size=25 type=password name=user.longPwd>
																&#160;
															</DIV>
														</TD>
													</TR>
													<TR>
														<TD height=37>
															<DIV align=left></DIV>
														</TD>
														<TD>
															<DIV align=left>
																<P>
																	<INPUT value=登陆进入系统 type=submit name=B1>
																</P>
															</DIV>
														</TD>
													</TR>
												</TBODY>
											</TABLE>
								</TD>
								</TR>
								</TBODY>
							</TABLE>
						</TD>
					</TR>
				</TBODY>
			</TABLE>
		</form>
	</DIV>
</body>
</html>
