define(["map", "spline", "ajax"], function (map, spline, ajax){
    var nameSpace = {
        a:1
    };

    /**
     * [计算屏幕高度 & 渲染初始数据]
     * @return {[type]} [description]
     */
    (function () {
        var screenY = window.screen.height;
        var Els = document.querySelectorAll(".frame");
        Array.prototype.slice.call(Els).forEach(function (value){
            value.style.height = screenY / 2 + "px";
        });

        if (!window.localStorage) {
            alert("您的浏览器太落后了~！部分功能可能失效");
        }

        //调用地图模块渲染地图数据
        map.applyMap({'aaa':"aaa"});

        ajax.ajax({
            url:"php/ajax.php",
            data:"",
            type: "post",
            success:function(data){
                console.log(data)
                // 存储html5 本地缓存
                if (sessionStorage.getItem("Max")) {
                    var date = new Date();
                    var today = date.getFullYear() + "0" + (parseInt(date.getMonth()) + 1 ) + "0" + date.getDate();

                    if (data.uvMax >= sessionStorage.getItem("Max") && data.uvMaxTime > today) {
                        sessionStorage.setItem("Max", data.uvMax);
                        sessionStorage.setItem("MaxTime", data.uvMaxTime);
                    }
                    var MaxTime1 = sessionStorage.getItem("MaxTime").substring(8,10);
                    var MaxTime2 = sessionStorage.getItem("MaxTime").substring(10,12);
                    document.querySelector("#maxuv").textContent = sessionStorage.getItem("Max");
                    document.querySelector("#maxTime").textContent = MaxTime1 + ":" + MaxTime2;
                } else {  
                    sessionStorage.setItem("Max", data.uvMax);
                    sessionStorage.setItem("MaxTime", data.uvMaxTime);
                    document.querySelector("#maxuv").textContent = sessionStorage.getItem("Max");
                    document.querySelector("#maxTime").textContent = sessionStorage.getItem("MaxTime");
                }


                document.querySelector("#uv").textContent = data.datauv[data.datauv.length -1];
                var pvdata = {
                    name : "浏览量PV(最近15分钟)",
                    id : "pvspline",
                    series : data.datapv,
                    xAxis : data.xAxis,
                    yAxis : data.pvyAxis
                };
                
                var uvdata = {
                    name : "活跃用户UV(最近15分钟)",
                    id : "uvspline",
                    series : data.datauv,
                    xAxis : data.xAxis,
                    yAxis : data.uvyAxis
                };

                //调用UV折线图模块渲染页面
                spline.applySpline(uvdata);

                //调用PV折线图模块渲染页面
                spline.applySpline(pvdata);
            }
        });
    })();

    return {
        nameSpace: nameSpace
    };
});