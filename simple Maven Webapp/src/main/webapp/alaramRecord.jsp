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
<script type="text/javascript">
    var windowWidth = $(window).width();
    var each_Width = (windowWidth - 200) / 6;
    //  each_Width = 1126/8 - 20;
    var allAlarmGird_colWidths = [ 60, each_Width, each_Width, each_Width, each_Width, each_Width ];
    var allAlarmGrid;
    /**
     * 实例化告警表格
     * 
     * @returns
     */
    function initAllAlaramTable() {
	var tempUrlForAll = ctx + '/showAllAlarmLog.do';
	allAlarmGrid = $("#allAlarmTable").ingrid({
	    url : tempUrlForAll,
	    height : 450,
	    sorting : false,
	    initialLoad : true,
	    rowClasses : [ 'grid-row-style1', 'grid-row-style1', 'grid-row-style2', 'grid-row-style1', 'grid-row-style1', 'grid-row-style3' ],
	//    paging : true,
	    totalRecords : $("#counts").val(),
	    colWidths : allAlarmGird_colWidths
	});
    }
    $(function() {
	initAllAlaramTable();
		$("a").each(function(i){
		    if($(this).attr("href") == "#"){
				$(this).attr("href","javascript:void(0);");
		    }
		});
	
	// 		for(var i=0;i<10;i++){
	// 		    var $tr = $("<tr></tr>");
	// 		    for(var i=0;i<8;i++)
	// 			$tr.append("<td></td>");
	// 			$(".datagrid ,.grid-header-bg").append($tr);
	// 		}
	$('#jump20').click(function(){
	 // the 'g' object is ingrid - call methods like so:
	 allAlarmGrid.g.p.setPage(20);
	 });
    });
</script>
</head>

<body>
	<center>
		<jsp:include page="common/header.jsp"></jsp:include>
		<jsp:include page="common/commonMenu.jsp"></jsp:include>
		<div style="height:30px;"></div>
		<input type="hidden" id="counts" value="100" />
		<table style="width:100%;" id="allAlarmTable">
			<thead>
				<tr>
					<th>编号</th>
					<th>设备名称</th>
					<th>报警日期</th>
					<th>解警时间</th>
					<th>告警状态</th>
					<th>告警类型</th>
				</tr>
			<thead>
			<tbody>
				<!-- 				<tr> -->
				<!-- 					<td>2014-02-04</td><td>13:05:07</td><td>2014-02-04</td><td>13:03:50</td><td>#3炉EP1A6通讯中断</td><td>恢复</td><td>通讯中断</td><td>EP1A6通讯</td> -->
				<!-- 				</tr> -->
			</tbody>
		</table>
		<div style="height:50px;"></div>
		<jsp:include page="common/alarmFotter.jsp"></jsp:include>
	</center>
</body>
</html>
