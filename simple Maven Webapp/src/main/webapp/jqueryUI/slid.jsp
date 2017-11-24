<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/commonHead.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP 'list.jsp' starting page</title>

<jsp:include page="/common/commonJsAndCss.jsp"></jsp:include>
<script type="text/javascript" src="js/jquery-ui-1.10.4.custom/js/jquery-ui-1.10.4.custom.js"></script>
<style type="text/css">


.price_list {
	list-style: none
}

.price_list li {
	float: left;
	line-height: 22px;
	margin-right: 10px;
	padding: 2px 6px
}

.price_list li.title {
	display: block;
	width: 60px;
	height: 60px;
}

#custom {
	border: 1px solid #d3d3d3;
	padding: 0 16px 0 2px;
	background: url(image/icon.gif) no-repeat right 8px;
	position: relative;
}

.custom_show {
	background: url(image/icon.gif) no-repeat right 18px;
}

#show {
	width: 100%;
	height: 26px
}

.input {
	width: 66px;
	height: 20px;
	line-height: 20px;
	border: 1px solid #d3d3d3
}

.btn {
	width: 54px;
	height: 24px;
	line-height: 24px;
	background: url(image/btn_bg.gif) repeat-x;
	border: 1px solid #d3d3d3;
	cursor: pointer
}

#slider_wrap {
	width: 250px;
	height: 80px;
	padding: 10px;
	position: absolute;
	left: -1px;
	top: 22px;
	border: 1px solid #d3d3d3;
	background: #fff;
	display: none;
	z-index: 1001
}

#slider {
	width: 230px;
	height: 40px;
	margin: 5px auto;
	border: none;
	background: url(image/line_bg.gif) no-repeat
}

#range {
	width: 220px;
	margin-left: 4px
}

#slider_wrap p {
	width: 230px;
	margin: 4px auto
}

.ui-slider {
	position: relative;
	text-align: left;
}

.ui-slider .ui-slider-handle {
	position: absolute;
	z-index: 2;
	width: 11px;
	height: 14px;
	cursor: default;
	background: url(image/arr.gif) no-repeat
}

.ui-slider .ui-slider-range {
	position: absolute;
	z-index: 1;
	display: block;
	border: 0;
	background: #f90
}

.ui-slider-horizontal {
	height: 10px;
}

.ui-slider-horizontal .ui-slider-handle {
	top: 14px;
	margin-left: 0;
}

.ui-slider-horizontal .ui-slider-range {
	top: 20px;
	height: 4px;
}

.ui-slider-horizontal .ui-slider-range-min {
	left: 0;
}

.ui-slider-horizontal .ui-slider-range-max {
	right: 0;
}
</style>
<script type="text/javascript">
	$(document).ready(function() {
		$("#acceptPass").bind("click", function() {
			var url = ctx + "/addUser.do?tempNum=" + Math.random();
			var returnObj = window.showModalDialog(url);
		});

		$("#show").click(function() {
			if ($("#slider_wrap").css("display") == "none") {
				$("#slider_wrap").show();
				$("#custom").css("background-position", "right -18px");
			} else {
				$("#slider_wrap").hide();
				$("#custom").css("background-position", "right 8px");
			}
		});

		$("#range").slider({
			min : 0,
			max : 10000,
			step : 500,
			values : [ 0, 3000 ],
			slide : function(event, ui) {
				$("#start").val(ui.values[0]);
				$("#end").val(ui.values[1]);
			}
		});

		$("#btn_ok").click(function() {
			$("#slider_wrap").hide();
			$("#custom").css("background-position", "right 8px");
			var start = $("#start").val();
			var end = $("#end").val();
			$("#show").html(start + "-" + end);
		});
	});
</script>

</head>

<body>
	<jsp:include page="/common/commonMenu.jsp" flush="true" />


	<ul class="price_list">
		<li class="title">价格范围：</li>
		<li><a href="#">3000元以下</a></li>
		<li><a href="#">3000-4000元</a></li>
		<li><a href="#">4000-5000元</a></li>
		<li><a href="#">5000-6000元</a></li>
		<li><a href="#">6000-7000元</a></li>
		<li><a href="#">7000-8000元</a></li>
		<li><a href="#">8000-9000元</a></li>
		<li><a href="#">9000-10000元</a></li>
		<li><a href="#">10000元以上</a></li>
		<li id="custom"><a href="javascript:;" id="show">自定义</a>
			<div id="slider_wrap">
				<div id="slider">
					<div id="range"></div>
				</div>
				<p>
					<input type="text" class="input" id="start" value="0" /> - <input type="text" class="input" id="end" value="3000" />
					<input type="button" class="btn" id="btn_ok" value="确 定" />
				</p>
			</div></li>
	</ul>

</body>
</html>
