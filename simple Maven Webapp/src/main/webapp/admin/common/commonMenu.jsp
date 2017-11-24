<%@ page language="java" pageEncoding="UTF-8"%>
<script type="text/javascript">
    $(document).ready(function() {
	$("#EpListBtn").bind("click", function() {
	    window.location = $("#ctx").val() + "/listEp.do";
	});
	$("#HeaterListBtn").bind("click", function() {
	    window.location = $("#ctx").val() + "/listHeater.do";
	});
	$("#RapperListBtn").bind("click", function() {
	    window.location = $("#ctx").val() + "/listRapper.do";
	});
	$("#HeaterTempratorListBtn").bind("click", function() {
	    window.location = $("#ctx").val() + "/heaterTempratorList.do";
	});
	$("#HopperListBtn").bind("click", function() {
	    window.location = $("#ctx").val() + "/hopperList.do";
	});
	$("#LowDeviceListBtn").bind("click", function() {
	    window.location = $("#ctx").val() + "/lowDeviceList.do";
	});
    });
</script>
<input id="EpListBtn" type="button" style="float:left" value="Ep" />
<input id="HeaterListBtn" type="button" style="float:left" value="Heater" />
<input id="HeaterTempratorListBtn" type="button" style="float:left" value="Heater Temprator" />
<input id="RapperListBtn" type="button" style="float:left" value="Rapper" />
<input id="HopperListBtn" type="button" style="float:left" value="Hopper" />
<input id="LowDeviceListBtn" type="button" style="float:left" value="Low Device" />