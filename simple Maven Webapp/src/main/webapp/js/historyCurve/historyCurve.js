$(function() {
    $("#queryHistoryReportBtn").bind("click", function() {
        var epId = $("#epId").val();
        var attrName = $("#attrSelect").val();
        var beginTime = $("#queryHistoryTimePickerInputForBegin").val();
        var endTime = $("#queryHistoryTimePickerInputForEnd").val();
        var newSeriesName = $("#epId").children(":selected").html() + "-" + $("#attrSelect").children(":selected").html();
        var series = chart.series;
        for (var i = 0; i < series.length; i++) {
            if (series[i].name == newSeriesName) {
                alert("数据存在");
                break;
                return;
            }

        }
        var url = ctx + "/getQueryDataFromEpHistory.do";
        var sendData = {
            epId : epId,
            queryPropertyName : attrName,
            queryBeginTime : beginTime,
            queryEndTime : endTime
        };
        $.get(url, sendData, function(returnData) {
            chart.addSeries({
                name : newSeriesName,
                data : returnData
            });
        });
    });
    var yAxis_1 = {
        labels : {
            distance : 15,
            x : 0
        },
        title : {
            text : '一次电压'
        },
        lineColor : "black",
        lineWidth : 1,
        gridLineWidth : 0,
        min : 0,
        max : 450
    };
    var yAxis_4 = {
            labels : {
                distance : 15,
                x : 0
            },
            title : {
                text : '一次电流'
            },
            lineColor : "black",
            lineWidth : 1,
            gridLineWidth : 0,
            min : 0,
            max : 450
        };
    var yAxis_2 = {
        labels : {
            x : 0
        },
        title : {
            align : "middle",
            margin : 0,
            text : '二次电压'
        },
        lineColor : "black",
        lineWidth : 1,
        opposite : true,
        min : 0,
        max : 100
    };
    var yAxis_3 = {
        labels : {
            x : 0
        },
        title : {
            text : '二次电流'
        },
        lineColor : "black",
        lineWidth : 1,
        opposite : true,
        min : 0,
        max : 2000
    };
    var legend = {
        layout : 'vertical',
        backgroundColor : '#FFFFFF',
        floating : true,
        borderColor:"#000000",
        borderWidth:1,
        align : 'left',
        x : 120,
        verticalAlign : 'top',
        y : 30
    };
    var categories = new Array();
    var series1Data = new Array();
    var series2Data = new Array();
    var series3Data = new Array();
    var series4Data = new Array();
    for (var i = 0; i < 24; i++) {
        categories[i] = ((i + 1) + ":00");
        series1Data[i] = (parseInt((Math.random() * 20 + 360) * 100)) / 100;
        series2Data[i] = (parseInt((Math.random() * 10 + 50) * 100)) / 100;
        series3Data[i] = (parseInt((Math.random() * 500 + 900) * 100)) / 100;
        series4Data[i] = (parseInt((Math.random() * 50 + 160) * 100)) / 100;
    }
    $('#containerDiv').highcharts({
        chart : {
            // alignTicks: false,
            type : 'line'
        },
        title : {
            text : "历史曲线"
        },
        xAxis : {
            categories : categories
        },
        yAxis : [ yAxis_1, yAxis_2, yAxis_3 ,yAxis_4],
        legend : legend,
        tooltip : {
            formatter : function() {
                return '<b>' + this.series.name + '</b><br/>' + this.x + ': ' + this.y;
            }
        },
        plotOptions : {},
        series : [ {
            name : "一次电压",
            data : series1Data
        }, {
            name : "二次电压",
            data : series2Data,
            yAxis : 1
        }, {
            name : "二次电流",
            data : series3Data,
            yAxis : 2
        } ,{
            name : "一次电流",
            data : series4Data,
            yAxis : 3
        }],
        credits : {
            enabled : false
        }
    });
});