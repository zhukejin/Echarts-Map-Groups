define(function () {
    var ajax = function (obj) {
        var xhr
          , delta = .25;
        if(window.addEventListener) xhr = new XMLHttpRequest;
        else xhr = new ActiveXObject("Msxml2.XMLHTTP");
        xhr.open(obj.type, obj.url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function(){   
          if (xhr.status == 200){
            if (xhr.readyState == 4) {
              res = eval('(' + xhr.responseText + ')');
              callback(res);
            }
          } else {
            console.log('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
          }
        };
        xhr.send(obj.data);
        var callback = function(res){
          obj.success(res);
        };
    };
    return {
        ajax : ajax
    };
});