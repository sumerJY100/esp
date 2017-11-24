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

<style type="text/css">
.table {
	border-collapse: collapse;
	border-spacing: 0;
	/* 	border:1px solid black; */
}

.table td,.table th {
	padding: 0;
	border: 1px solid black;
	text-align: center;
}
</style>
<script type="text/javascript">
    $(document).ready(function() {
	Date.prototype.Format = function(fmt) { //author: meizz   
	    var o = {
		"M+" : this.getMonth() + 1, //月份   
		"d+" : this.getDate(), //日   
		"h+" : this.getHours(), //小时   
		"m+" : this.getMinutes(), //分   
		"s+" : this.getSeconds(), //秒   
		"q+" : Math.floor((this.getMonth() + 3) / 3), //季度   
		"S" : this.getMilliseconds()
	    //毫秒   
	    };
	    if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
		    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	};

	setInterval(function() {
	    var now = new Date();
	    $('#dateTh').html(now.Format("yyyy-MM-dd hh:mm:ss"));
	    var currentTimeStr = $('#dateTh').html();
	    var lastValue = currentTimeStr.substring(currentTimeStr.length -1);
	    if(lastValue%3 == 0){
	        freshData();
	    }
	}, 1000);
	
	// 	initData();
	function initData() {
	    var url = ctx + "/getEpRealTimeValuesForParamSet.do";
	    $.get(url, function(realTimeData) {
		var $realTimeTable = $("#realTimeTable");
		$realTimeTable.find("tr").not(":eq(0),:eq(1)").remove();
		for (var i = 0; i < realTimeData.length; i++) {
		    $tempTr = $("<tr></tr>");
		    $tempTr.append("<td>" + realTimeData[i].name + "</td>");
		    $tempTr.append("<td>" + realTimeData[i].primaryVoltage + "</td>");
		    $tempTr.append("<td>" + realTimeData[i].primaryCurrent + "</td>");
		    $tempTr.append("<td>" + realTimeData[i].secondaryCurrent + "</td>");
		    $tempTr.append("<td>" + realTimeData[i].secondaryVoltage + "</td>");
		    $realTimeTable.append($tempTr);
		}
	    });
	}
    });
    function freshData() {
        var url = ctx + "/back/getAllEp.do";
        $.getJSON(url, function(json) {
            var $table = $("#realTimeTable");
            var tdArr = $table.find("td");
            for (var i = 0; i < json.length; i++) {
                var ep = json[i];
                for(var j=0;j<tdArr.length;j++){
                    if(ep.name == $(tdArr[j]).html()){
                        $(tdArr[j + 1]).html(ep.primaryVoltageReading);
                        $(tdArr[j + 2]).html(ep.primaryCurrentReading);
                        $(tdArr[j + 3]).html(ep.secondVoltageReading);
                        $(tdArr[j + 4]).html(ep.secondCurrentReading);
                        $(tdArr[j + 5]).html(ep.sparkReading);
                        break;
                    }
                }
            }
            var $table2 = $("#realTimeTable2");
            var tdArr2 = $table2.find("td");
            for (var i = 0; i < json.length; i++) {
                var ep = json[i];
                for(var j=0;j<tdArr2.length;j++){
                    if(ep.name == $(tdArr2[j]).html()){
                        $(tdArr2[j + 1]).html(ep.primaryVoltageReading);
                        $(tdArr2[j + 2]).html(ep.primaryCurrentReading);
                        $(tdArr2[j + 3]).html(ep.secondVoltageReading);
                        $(tdArr2[j + 4]).html(ep.secondCurrentReading);
                        $(tdArr2[j + 5]).html(ep.sparkReading);
                        break;
                    }
                }
            }
        });
    }
</script>
</head>

<body>
	<center>
		<jsp:include page="common/header.jsp"></jsp:include>
		<jsp:include page="common/commonMenu.jsp"></jsp:include>
		<div style="height:600px;">
			<div style="height:30px;v-align:center;padding-top:10px;font-weight:bold;">
				<div style="float">1号炉电除尘实时报表</div>
			</div>
			<div id="returnTohistoryReport" style="top:70px;right:60px;" class="jumpBtn">历史报表</div>
			<div>
				<table style="width:80%;height:530px" id="reportTable">
					<tr>
						<td style="text-align:right;padding-left:0px;width:50%">
							<table id="realTimeTable" class="table" style="width:100%;height:520px;">
								<thead>
									<tr>
										<th colspan=5 style="text-align:right;border:0px;" >&nbsp;</th>
									</tr>
								</thead>
								<tr>
									<td>柜号</td>
									<td>
										U1<br />AVE(V)
									</td>
									<td>
										I1<br />RMS(A)
									</td>
									<td>
										U2<BR />AVE(KV)
									</td>
									<td>
										I2<BR />AVE(mA)
									</td>
									<td>
										火花率<BR />(spm)
									</td>
								</tr>

								<tr>
									<td>1A11</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>1A12</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>1A13</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>1A14</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr style="border-bottom:2px solid black;">
									<td>1A15</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>1A21</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>1A22</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>1A23</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>1A24</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>1A25</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							</table>
						</td>
						<td style="text-align:center;width:50%;">
							<table id="realTimeTable2" class="table" style="width:100%;height:520px;">
								<thead>
									<tr>
										<th colspan=5 style="text-align:right;border:0px" id="dateTh">2014-01-01</th>
									</tr>
								</thead>
								<tr>
									<td>柜号</td>
									<td>
										U1<br />AVE(V)
									</td>
									<td>
										I1<br />RMS(A)
									</td>
									<td>
										U2<BR />AVE(KV)
									</td>
									<td>
										I2<BR />AVE(mA)
									</td>
									<td>
										火花率<BR />(spm)
									</td>
								</tr>

								<tr>
									<td>1B11</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>1B12</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>1B13</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>1B14</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr style="border-bottom:2px solid black;">
									<td>1B15</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>1B21</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>1B22</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>1B23</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>1B24</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>1B25</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							</table>
						</td>
					</tr>
				</table>


			</div>
		</div>

		<jsp:include page="common/alarmFotter.jsp"></jsp:include></center>
</body>
</html>
