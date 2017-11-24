$(function() {
    initChart();
//    alert();
 //   window.setInterval(freshChart, 1000);
     window.setTimeout(freshChart, 1000);
     function Foo(){};
     Foo.prototype.id = "1";
     var foo = new Foo();
//     alert(foo.id);
//     alert(Foo.id);
//     alert(Foo);
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
var primaryChart, seconderyChart;
var chart_chart = {
    renderTo : 'primary_div', // 图表放置的容器，关联DIV#id
    zoomType : 'xy',// X、Y轴均可放大
    height : 300
// 因为是柱状图和曲线图共存在一个图表中，所以默认图表类型不在这里设置。
};
var chart_title = {
    text : '一次电压/电流' // 图表标题
};
var chart_subtitle = {
    text : '' // 图表副标题
};
var chart_xAxis = [ { // X轴标签
    categories : [ 'A11', 'A12', 'A21', 'A22', 'A31', 'A32', 'A41', 'A42', 'B11', 'B12', 'B21', 'B22', 'B31', 'B32', 'B41', 'B42' ],
    labels : {
	rotation : 0, // 逆时针旋转45°，标签名称太长。
	align : 'right' // 设置右对齐
    }
} ];
var chart_yAxis = [ { // 设置Y轴-第一个（增幅）
    labels : {
	formatter : function() { // 格式化标签名称
	    return this.value + '';
	},
	style : {
	    color : '#89A54E' // 设置标签颜色
	}
    },
    title : {
	text : ''
    }, // Y轴标题设为空
    opposite : true
// 显示在Y轴右侧，通常为false时，左边显示Y轴，下边显示X轴

}, { // 设置Y轴-第二个（金额）
    gridLineWidth : 0, // 设置网格宽度为0，因为第一个Y轴默认了网格宽度为1
    title : {
	text : ''
    },// Y轴标题设为空
    labels : {
	formatter : function() {// 格式化标签名称
	    return this.value + '';
	},
	style : {
	    color : '#4572A7' // 设置标签颜色
	}
    }

} ];
var chart_tooltip = { // 鼠标滑向数据区显示的提示框
    formatter : function() { // 格式化提示框信息
	var unit = {
	    '电压' : 'KV',
	    '电流' : 'A'
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
    name : '电压',
    color : '#4572A7',
    type : 'column', // 类型：纵向柱状图
    yAxis : 1, // 数据列关联到Y轴，默认是0，设置为1表示关联上述第二个Y轴即金额
    data : [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
// 金额数据
}, {
    name : '电流',
    color : '#89A54E',
    type : 'column', // 类型：曲线图
    data : [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 ]
// 增幅数据
} ];
var chartObj = {
    chart : chart_chart,
    title : chart_title,
    subtitle : chart_subtitle,
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

/**
 * 实例化图表
 * 
 * @returns
 */
function initChart() {
    primaryChart = new Highcharts.Chart(chartObj);
    $.extend(chart_chart, {
	renderTo : 'secondery_div'
    });
    $.extend(chart_title, {
	text : '二次电压/电流'
    });
    seconderyChart = new Highcharts.Chart(chartObj);
}
