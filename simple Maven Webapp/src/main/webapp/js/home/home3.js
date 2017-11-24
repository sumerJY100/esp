$(function() {
    initChart();
    // alert();
    // window.setInterval(freshChart, 1000);
    /** 刷新图表 */
    // window.setTimeout(freshChart, 1000);
});
function freshChart() {
    voltageAndCurrent.getCurrentVoltageAndCurrent(function(data) {
	var json = $.parseJSON(data);
	primaryChart.series[0].setData(json[0].firstVoltage);
	primaryChart.series[1].setData(json[0].firstCurrent);
	seconderyChart.series[0].setData(json[0].secondVoltage);
	seconderyChart.series[1].setData(json[0].secondCurrent);
    });
}
var tempData = new Array(20);
for (var i = 0; i < 20; i++) {
    tempData[i] = 0;
}
var tempDataForPrimaryVoltage = new Array(20);
var tempDataForPrimaryCurrent = new Array(20);
var tempDataForSeconderyVoltage = new Array(20);
var tempDataForSeconderyCurrent = new Array(20);

function freshPrimaryVoltageChart() {
    primaryVoltageChart.series[0].setData(tempDataForPrimaryVoltage);
}
function freshPrimaryCurrentChart() {
    primaryCurrentChart.series[0].setData(tempDataForPrimaryCurrent);
}
function freshSeconderyVoltageChart() {
    seconderyVoltageChart.series[0].setData(tempDataForSeconderyVoltage);
}
function freshSeconderyCurrentChart() {
    seconderyCurrentChart.series[0].setData(tempDataForSeconderyCurrent);
}
function freshChartTemp() {
    for (var i = 0; i < 20; i++) {
	tempDataForPrimaryVoltage[i] = parseFloat((Math.random() * 30 + "").substring(0, 4)) + 360;
    }
    for (var i = 0; i < 20; i++) {
	tempDataForPrimaryCurrent[i] = parseFloat((Math.random() * 30 + "").substring(0, 4)) + 180;
    }
    for (var i = 0; i < 20; i++) {
	tempDataForSeconderyVoltage[i] = parseFloat((Math.random() * 20 + "").substring(0, 4)) + 50;
    }
    for (var i = 0; i < 20; i++) {
	tempDataForSeconderyCurrent[i] = parseFloat((Math.random() * 300 + "").substring(0, 4)) + 1000;
    }
    freshPrimaryVoltageChart();
    freshPrimaryCurrentChart();
    freshSeconderyVoltageChart();
    freshSeconderyCurrentChart();
    
    var primaryVoltageChartSeris0Data = primaryVoltageChart.series[0].data;
    var primaryVoltageDataArr = new Array(primaryVoltageChartSeris0Data.length);
    $.each(primaryVoltageChartSeris0Data,function(key,value){
	primaryVoltageDataArr[key] = value.y;
    });
    var minValue = parseInt(Math.min.apply(null,primaryVoltageDataArr) + "");
    primaryVoltageChart.yAxis[0].update({min:(minValue - 10),tickInterval:20});
}
var primaryCurrentChart, primaryVoltageChart, seconderyCurrentChart, seconderyVoltageChart;
var chart_chart = {
    renderTo : 'primaryVoltage_div', // 图表放置的容器，关联DIV#id
    // zoomType : 'xy',// X、Y轴均可放大
    zoomType : '',
    height : 300,
    width : 600
// 因为是柱状图和曲线图共存在一个图表中，所以默认图表类型不在这里设置。
};

var chart_xAxis = [ { // X轴标签
    categories : [ '1A11', '1A12', '1A13', '1A14', '1A15', '1A21', '1A22', '1A23', '1A24', '1A25', '1B11', '1B12', '1B13', '1B14', '1B15', '1B21', '1B22', '1B23', '1B24', '1B25' ],
    labels : {
	rotation : -45, // 逆时针旋转45°，标签名称太长。
	align : 'center', // 设置右对齐
	style : {
	    fontSize : 12
	},
	y : 25
    },
    lineWidth : "1",
    lineColor : "#000000"
} ];
var chart_yAxis = { // 设置Y轴-第一个（增幅）

    labels : {
	formatter : function() { // 格式化标签名称
	    return this.value + 'V';
	},
	style : {
	    color : '#89A54E' // 设置标签颜色
	}
    },
    title : {
	text : ''
    }, // Y轴标题设为空
    opposite : false,
    lineWidth : "1",
    lineColor : "#000000",
    max : 420,
    min : 0,
    tickInterval : 60,
    ceiling : 50,
    plotLines : [ {
	color : "red",
	value : 360,
	width : 2,
	label : {
	    text : "一次电压低报警值360V",
	    algin : "center",
	    x : 200,
	    style : {
		fontWeight : "bold"
	    }
	},
	zIndex : 5
    }, {
	color : "red",
	value : 340,
	width : 2,
	label : {
	    text : "一次电压低跳闸值340V",
	    algin : "center",
	    x : 200,
	    style : {
		fontWeight : "bold"
	    }
	},
	zIndex : 5
    }, {
	color : "red",
	value : 420,
	width : 2,
	label : {
	    text : "一次电压高跳闸值420V",
	    algin : "center",
	    x : 200,
	    style : {
		fontWeight : "bold"
	    }
	},
	zIndex : 5
    } ]

};
var chart_tooltip = { // 鼠标滑向数据区显示的提示框
    formatter : function() { // 格式化提示框信息
	var unit = {
	    '一次电压' : 'V'
	}[this.series.name];
	return '' + this.x + ': ' + this.y + ' ' + unit;
    }
};
var chart_lenged = { // 设置图例
    layout : 'vertical', // 水平排列图例
    shadow : true, // 设置阴影
    enabled : false
};

var chart_series = [ { // 数据列
    name : '一次电压',
    color : '#6699ff',
    type : 'column', // 类型：纵向柱状图
    yAxis : 0, // 数据列关联到Y轴，默认是0，设置为1表示关联上述第二个Y轴即金额
    data : tempData
} ];
var chartObjForPrimaryVoltage = {
    chart : chart_chart,
    title : {
	text : '一次电压' // 图表标题
    },
    credits : {
	enabled : false
    // 不显示LOGO
    },
    xAxis : chart_xAxis,
    yAxis : chart_yAxis,
    tooltip : chart_tooltip,
    legend : chart_lenged,
    series : chart_series
};
var chartObjForPrimaryCurrent = $.extend({}, chartObjForPrimaryVoltage, {
    chart : $.extend({}, chart_chart, {
	renderTo : 'primaryCurrent_div',
	height : 300
    }),
    title : {
	text : '一次电流' // 图表标题
    },
    yAxis : $.extend({}, chart_yAxis, {
	labels : {
	    formatter : function() { // 格式化标签名称
		return this.value + 'A';
	    }
	},
	max : 260,
	tickInterval : 40,
	plotLines : []
    })
});

// var chartObjForPrimaryCurrent = {
//
// };
var chartObjForSeconderyVoltage = {};
$.extend(chartObjForSeconderyVoltage, chartObjForPrimaryVoltage, {
    chart : $.extend({}, chart_chart, {
	renderTo : 'seconderyVoltage_div'
    }),
    title : {
	text : '二次电压' // 图表标题
    },
    yAxis : $.extend({}, chart_yAxis, {
	labels : {
	    formatter : function() { // 格式化标签名称
		return this.value + 'kV';
	    }
	},
	max : 80,
	min : 0,
	tickInterval : 10,
	plotLines : [ {
	    color : "red",
	    value : 10,
	    width : 2,
	    label : {
		text : "二次电压低报警值10kV",
		algin : "center",
		x : 200,
		style : {
		    fontWeight : "bold"
		}
	    },
	    zIndex : 5
	}, {
	    color : "red",
	    value : 5,
	    width : 2,
	    label : {
		text : "二次电压低跳闸值5kV",
		algin : "center",
		x : 200,
		style : {
		    fontWeight : "bold"
		}
	    },
	    zIndex : 5
	}, {
	    color : "red",
	    value : 75,
	    width : 2,
	    label : {
		text : "二次电压高跳闸值75kV",
		algin : "center",
		x : 200,
		style : {
		    fontWeight : "bold"
		}
	    },
	    zIndex : 5
	} ]
    })
});
var chartObjForSeconderyCurrent = {};
$.extend(chartObjForSeconderyCurrent, chartObjForPrimaryVoltage, {
    chart : $.extend({}, chart_chart, {
	renderTo : 'seconderyCurrent_div'
    }),
    title : {
	text : '二次电流' // 图表标题
    },
    yAxis : $.extend({}, chart_yAxis, {
	labels : {
	    formatter : function() { // 格式化标签名称
		return this.value + 'mA';
	    }
	},
	max : 1700,
	min : 0,
	tickInterval : 200,
	lineWidth : "1",
	lineColor : "#000000",
	plotLines : []
    })
});
/**
 * 实例化图表
 * 
 * @returns
 */
function initChart() {
    primaryVoltageChart = new Highcharts.Chart(chartObjForPrimaryVoltage);
    primaryCurrentChart = new Highcharts.Chart(chartObjForPrimaryCurrent);
    seconderyCurrentChart = new Highcharts.Chart(chartObjForSeconderyCurrent);
    seconderyVoltageChart = new Highcharts.Chart(chartObjForSeconderyVoltage);
}
