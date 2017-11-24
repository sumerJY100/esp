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
}
.selectedInput{
	border:2px solid red;
}
</style>
<script type="text/javascript">
    $(document).ready(function() {
			$("#heaterTable td table").eq(0).css({"margin-left":"150px"});
			$("#heaterTable td table").eq(1).css({"margin-right":"150px"});
			$("#heaterTable td[rowspan='4']").css({"background-color":"#add8e6"});
			$("#heaterTable td table tr").each(function(i,trObj){
// 			    alert(i);
// 			    alert($(trObj).children().last().html());
				if($(trObj).children().last().html() !="报警"){
			   		$(trObj).children().last().css({"color":"#228b22","width":"80px","text-align":"center"});
				}
				
			});
			
			$("#heaterDataTableForHuiDou").find("tr").not(":eq(0)").remove();
			$("#heaterDataTableForCiTao").find("tr").not(":eq(0)").remove();
			var url = ctx + "/getHeaterJson.do";
			$.get(url,function(returnData){
			   for(var i=0;i<returnData.length;i++){
			       
			       addHuidouTr(returnData[i]);
			       
			       addCiTaoTr(returnData[i]);
			   } 
			   $("input[id^='heater_continue_'],input[id^='heater_auto_'],input[id^='heater_stop']").bind("click",function(){
			       var id = $(this).attr("id");
			       var heaterId = id.split("_")[4];
			       var heaterMode = id.split("_")[2];
			       	var url = ctx +"/updateHeaterMode.do?heater.id=" + heaterId +"&heater.runType="+heaterMode;
			       	$.get(url,function(){});
			      });
			});
			function addHuidouTr(obj){
			    var $table =$("#heaterDataTableForHuiDou");
			    var heaters = obj.heaterList;
			    var heaterTemprator = obj.heaterTemprator;
			    if(heaterTemprator.tempratorType == 2){
				    for(var i=0;i<heaters.length;i++){
						var $tr = $("<tr></tr>");
						$tr.append("<td>" + heaters[i].name+"灰斗"+ "</td>");
						if(i==0){
						    $tr.append("<td rowSpan=" + heaters.length+">" + heaterTemprator.temprator +"</td>");
						}
						var heaterId = heaters[i].id;
						var runType = heaters[i].runType;
						$tr.append("<td>" + heaters[i].runTypeString +"&nbsp;" + getAutoBtn(heaterId,runType) + "&nbsp;" + getContinueBtn(heaterId,runType) + "&nbsp;" + getStopBtn(heaterId,runType) +"</td>");
						$tr.append("<td>" + heaters[i].runStateString + "</td>");
						$tr.append("<td>" + heaters[i].alarmStateString + "</td>");
						$table.append($tr);
				    }
			    }
			}
			function addCiTaoTr(obj){
			    var $table = $("#heaterDataTableForCiTao");
			    var heaters = obj.heaterList;
			    var heaterTemprator = obj.heaterTemprator;
			    if(heaterTemprator.tempratorType == 0){
				    for(var i=0;i<heaters.length;i++){
						var $tr = $("<tr></tr>");
						if(heaters[i].heaterType == 1){
							$tr.append("<td>" + heaters[i].name+"瓷轴"+ "</td>");
						}else{
						    $tr.append("<td>" + heaters[i].name+"瓷套"+ "</td>");
						}
						if(i==0){
						    $tr.append("<td rowSpan=" + heaters.length+">" + heaterTemprator.temprator +"</td>");
						}
						var heaterId = heaters[i].id;
						var runType = heaters[i].runType;
						$tr.append("<td>" + heaters[i].runTypeString +"&nbsp;" + getAutoBtn(heaterId,runType) + "&nbsp;" + getContinueBtn(heaterId,runType) + "&nbsp;" + getStopBtn(heaterId,runType) +"</td>");
						$tr.append("<td>" + heaters[i].runStateString + "</td>");
						$tr.append("<td>" + heaters[i].alarmStateString + "</td>");
						$table.append($tr);
				    }
			    }
			}
			function getAutoBtn(heaterId,runType){
			    var temp = "<input type='button' class='"+(runType==2?"selectedInput":"")+"' id ='heater_auto_2_id_" + heaterId +"' value='自动'/>";
			    return temp;
			}
			function getContinueBtn(heaterId,runType){
			    var temp = "<input type='button' class='"+(runType==1?"selectedInput":"")+"' id ='heater_continue_1_id_" + heaterId +"' value='强制开'/>";
			    return temp;
			}
			function getStopBtn(heaterId,runType){
			    var temp = "<input type='button' class='"+(runType==0?"selectedInput":"")+"' id ='heater_stop_0_id_" + heaterId +"' value='强制关'/>";
			    return temp;
			}
    });
</script>
</head>

<body>
	<center>
		<jsp:include page="common/header.jsp"></jsp:include>
		<jsp:include page="common/commonMenu.jsp"></jsp:include>
		<table style="width:100%;height:600px;" id="heaterTable">
			<tr>
				<td style="border:none;vertical-align:top;padding-top:30px;text-align:center;" >
					<table class="table" id="heaterDataTableForHuiDou">
						<tr>
							<th>加热器名称</th>
							<th>温度测量</th>
							<th>设定状态及方式</th>
							<th>运行状态</th>
							<th>报警状态</th>
						</tr>
						<tr>
							<td>3A11灰斗1加热</td>
							<td rowspan=4></td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3A12灰斗1加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3A13灰斗1加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3A14灰斗1加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3A11灰斗2加热</td>
							<td rowspan=4></td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3A12灰斗2加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3A13灰斗2加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3A14灰斗2加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3A21灰斗1加热</td>
							<td rowspan=4></td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3A22灰斗1加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3A23灰斗1加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3A24灰斗1加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3A21灰斗2加热</td>
							<td rowspan=4>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3A22灰斗2加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3A23灰斗2加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3A24灰斗2加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>A1室瓷釉加热</td>
							<td></td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>A2室瓷釉加热</td>
							<td></td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>A1室瓷釉加热</td>
							<td></td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>A2室瓷釉加热</td>
							<td></td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
					</table>
				</td>
				<td style="border:none;vertical-align:top;padding-top:30px;">
					<table class="table" id="heaterDataTableForCiTao" >
						<tr>
							<th>加热器名称</th>
							<th>温度测量</th>
							<th>设定状态及方式</th>
							<th>运行状态</th>
							<th>报警状态</th>
						</tr>
						<tr>
							<td>3B11灰斗1加热</td>
							<td rowspan=4></td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3B12灰斗1加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3B13灰斗1加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3B14灰斗1加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3B11灰斗2加热</td>
							<td rowspan=4></td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3B12灰斗2加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3B13灰斗2加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3B14灰斗2加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3B21灰斗1加热</td>
							<td rowspan=4></td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3B22灰斗1加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3B23灰斗1加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3B24灰斗1加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3B21灰斗2加热</td>
							<td rowspan=4>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3B22灰斗2加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3B23灰斗2加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>3B24灰斗2加热</td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>B1室瓷釉加热</td>
							<td></td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>B2室瓷釉加热</td>
							<td></td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>B1室瓷釉加热</td>
							<td></td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
						<tr>
							<td>B2室瓷釉加热</td>
							<td></td>
							<td>
								自动
								<input type="button" value="自动" />
								<input type="button" value="强制开" />
								<input type="button" value="强制关" />
							</td>
							<td>闭合</td>
							<td>闭合</td>
							<td>正常</td>
						</tr>
					</table>
				</td>
			</tr>

		</table>

		<jsp:include page="common/alarmFotter.jsp"></jsp:include>
	</center>
</body>
</html>
