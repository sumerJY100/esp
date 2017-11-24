$(function() {
    /**
    Highcharts.setOptions({
	global : {
	    useUTC : false
	}
    });
    $('#containerDiv').highcharts('StockChart', {

	chart : {
	// alignTicks: true // by default
	},
	tooltips : {
	    shared : true,
	    xDateFormat : '%Y-%m-%d'
	},
	xAxis : {
	    type : 'datetime',
	    dateTimeLabelFormats : {
		millisecond : '%H:%M:%S.%L',
		second : '%H:%M:%S',
		minute : '%H:%M',
		hour : '%H:%M',
		day : '%e. %b',
		week : '%e. %b',
		month : '%b \'%y',
		year : '%Y'
	    },
	    formatter : function() {
		var vDate = new Date(this.value);
		// alert(this.value);
		return vDate.getFullYear() + "-" + (vDate.getMonth() + 1) + "-" + vDate.getDate();
	    }
	},
	yAxis : [ {
	    lineColor : "black",
	    lineWidth : 1,
	    title : {
		text : 'GOOGL',
		margin : 40
	    },
	    labels : {
		x : 25
	    }
	}, {
	    title : {
		text : 'MSFT'
	    },
	    gridLineWidth : 0,
	    opposite : false,
	    labels : {
		x : 0,
		y : 0
	    }
	} ],

	rangeSelector : {
	    selected : 1
	},

	series : [ {
	    name : 'GOOGL',
	    data : GOOGL
	}, {
	    name : 'MSFT',
	    data : MSFT,
	    yAxis : 1
	} ]
    });
    
    */
    
    
    var chart = new Highcharts.StockChart({  
        chart: {  
            renderTo: 'containerDiv'//指向的div的id属性  
        },  
        exporting: {    
            enabled: false //是否能导出趋势图图片  
        },   
        title : {  
                text : ''//图表标题  
            },  
        xAxis: {  
            tickPixelInterval: 200,//x轴上的间隔  
        //  title :{  
        //      text:"title"  
        //  },  
            type: 'datetime', //定义x轴上日期的显示格式  
            labels: {  
            formatter: function() {  
                var vDate=new Date(this.value);  
                //alert(this.value);  
                return vDate.getFullYear()+"-"+(vDate.getMonth()+1)+"-"+vDate.getDate();  
            },  
            align: 'center'  
        }  
        },  
        yAxis : {    
              lineColor:"#000000", 
              lineWidth:1,
              title: {    
                  text: ''  //y轴上的标题  
              } ,
              labels:{
        	  x:0
              },
              reversed:false,
              opposite:false
         },    
        tooltip: {  
            xDateFormat: '%Y-%m-%d, %H:%M:%S'//鼠标移动到趋势线上时显示的日期格式  
        },  
        rangeSelector: {  
            buttons: [{//定义一组buttons,下标从0开始  
            type: 'week',  
            count: 1,  
            text: '1w'  
        },{  
            type: 'month',  
            count: 1,  
            text: '1m'  
        }, {  
            type: 'month',  
            count: 3,  
            text: '3m'  
        }, {  
            type: 'month',  
            count: 6,  
            text: '6m'  
        }, {  
            type: 'ytd',  
            text: 'YTD'  
        }, {  
            type: 'year',  
            count: 1,  
            text: '1y'  
        }, {  
            type: 'all',  
            text: 'All'  
        }],  
            selected: 1//表示以上定义button的index,从0开始  
        },  
          
        series: [{  
            name: 'USD to EUR(美元对欧元)',//鼠标移到趋势线上时显示的属性名  
            data: GOOGL//属性值  
//            data: []//属性值  
//            marker : {  
//                  enabled : true,  
//                  radius : 3  
//              },  
//            shadow : true  
        }]  
    });  
});