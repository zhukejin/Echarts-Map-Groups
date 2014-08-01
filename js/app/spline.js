define(['echarts', 'echarts/chart/line'],function (ec){
    var applySpline = function (dataSpline) {
        if ((typeof dataSpline) != 'object') {
            alert("typeError: data isn't a object")
            return false;
        }
        var domMain = document.getElementById(dataSpline.id);
        var myChart = ec.init(domMain);
         var option = {
            title : {
                text: dataSpline.name,
                x: 'center',
                textStyle: {
                    color: '#fff',
                    type: 'dashed'
                }
            },
            grid : {
                borderColor : "857979"
            },
            tooltip : {
                trigger: 'axis'
            },
            calculable : false,
            animation : true,
            xAxis : [
                {   
                    axisLabel : {
                        textStyle: {
                            color: '#fff',
                            fontFamily: 'sans-serif',
                            fontSize: 15,
                            fontStyle: 'italic',
                            fontWeight: 'bold'
                        }
                    },
                    axisLine : {    // 轴线
                        show: true,
                        lineStyle: {
                            color: 'rgba(68,136,187,0)',
                            type: 'solid',
                            width: 2
                        }
                    },
                    splitLine : {
                        show:true,
                        lineStyle: {
                            color: '#857979',
                            type: 'dashed',
                            width: 1
                        }
                    },
                    type : 'category',
                    boundaryGap : false,
                    data : dataSpline.xAxis
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLabel : {
                        formatter: '{value}',
                        textStyle: {
                            color: '#fff',
                            fontFamily: 'sans-serif',
                            fontSize: 15,
                            fontStyle: 'italic',
                            fontWeight: 'bold'
                        }
                    },
                    splitLine : {
                        show:true,
                        lineStyle: {
                            color: '#857979',
                            type: 'dashed',
                            width: 1
                        }
                    },
                    axisLine : {    // 轴线
                        show: true,
                        lineStyle: {
                            color: 'rgba(68,136,187,0)',
                            type: 'solid',
                            width: 2
                        }
                    },
                    min : dataSpline.yAxis.min,
                    max : dataSpline.yAxis.max,
                    data : dataSpline.yAxis
                }
            ],
            series : [
                {
                    name:dataSpline.name,
                    type:'line',
                    data:dataSpline.series,
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ],
                        effect : {
                            show: true,
                            color : "rgba(16,198,199,58)",
                            shadowBlur : 0 
                        }
                    },
                    markLine : {
                        data : [
                            {type : 'average', name: '平均值'}
                        ],
                        effect : { 
                            show: true,
                            scaleSize: require('zrender/tool/env').canvasSupported ? 1 : 2,
                            period: 10,             // 运动周期，无单位，值越大越慢
                            color: 'rgb(14, 233, 234)',
                            shadowColor: null,
                            shadowBlur : 5
                        },
                        itemStyle : {
                            normal: {
                                color: 'rgb(16,198,199)',
                                lineStyle: {        // 系列级个性化折线样式
                                    width: 1
                                }
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgb(16,198,199)',
                            lineStyle: {        // 系列级个性化折线样式
                                width: 2
                            }
                        },
                        emphasis: {
                            color: 'blue'
                        }
                    },
                }
            ]
        };               
        myChart.setOption(option);
    }

    return {
        applySpline : applySpline
    }
});