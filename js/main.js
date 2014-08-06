/**
 * [paths 定义requireJs path]
 * @type {Object}
 */
require.config({
    urlArgs: "bust=" +  (new Date()).getTime(),
    paths: {
        "init": "app/init",
        "echarts" : "app/echarts",
        "echarts/chart/map" : "app/echarts-map",
        "echarts/chart/line" : "app/echarts",
        "map" : "app/map",
        "spline": "app/spline",
        "ajax": "app/ajax"
    }
});
/**
 * [程序主模块]
 * @param  {[modal]} tool [工具模块]
 * @param  {[modal]} init [初始化模块]
 * @author [zhukejin@hupu.com]
 */
require(["init", "spline", "ajax"], function (init, spline, ajax) {
    /**
     * [getData 请求后端json数据]
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    var getData = function () {
        ajax.ajax({
        url:"php/ajax.php",
        data:"",
        type: "post",
        success:function(data){
            // 存储html5 本地缓存
            if (sessionStorage.getItem("Max")) {
                var date = new Date();
                var today = date.getFullYear() + "0" + (parseInt(date.getMonth()) + 1 ) + "0" + date.getDate();

                if (data.uvMax >= sessionStorage.getItem("Max") || data.uvMaxTime > today) {
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
                yAxis : data.pvyAxis,
                animation : true
            };
            //调用PV折线图模块渲染页面
            spline.applySpline(pvdata);

            var uvdata = {
                name : "活跃用户UV(最近15分钟)",
                id : "uvspline",
                series : data.datauv,
                xAxis : data.xAxis,
                yAxis : data.uvyAxis,
                animation : true
            };
            //调用UV折线图模块渲染页面
            spline.applySpline(uvdata);
        }
        });

        setTimeout(curry(getData,""),60000);
    };

    /**
     * [curry 函数柯里化]
     * @param  {Function} fn [description]
     * @return {[type]}      [description]
     */
    var curry = function (fn) {
        var outerArgs = Array.prototype.slice.call(arguments, 1);  
        return function() {
            var innerArgs = Array.prototype.slice.call(arguments),  
                finalArgs = outerArgs.concat(innerArgs);  
            return fn.apply(null, finalArgs);
        };  
    }

    setTimeout(curry(getData,""),60000);
});