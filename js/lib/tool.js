define(function () {
    /**
    * [fliter 过滤敏感字符]
    * @param {[string]} str [description]
    * @author [Primo.chu] <zhukejin@msn.com>
    */
    var fliter = function(str)
    {
      var pttr = /select|insert|update|delete|\'|\/\*|\*|\.\.\/|\.\/|union|into|load_file|outfile|script|<|>|"|'/;
      var res = str.match(pttr);
      if (res == null) return true;
        return false;
    }

    /**
    * [isNumberOr_Letter 检查输入字符串是否只由英文字母和数字和下划线组成 ]
    * @param  {[str]}  s [字符串]
    * @return {Boolean}   [description]
    * @author [Primo.chu] <zhukejin@msn.com>
    */
    var isNumberOr_Letter = function ( s )
    {
      //判断是否是数字或字母 
      var regu = "^[0-9a-zA-Z\_]+$";
      var re = new RegExp(regu);
      if (re.test(s)) {
          return true;
      }
      else {
          return false;
      }
    };

    /**
    * [ajax 发送ajax请求]
    * @param  {[obj]}  [description]
    * @return {[type]} [description]
    * @author [Primo.chu] <zhukejin@msn.com>
    */
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

    /**
    * [$ 选择器]
    * @param  {[str]} str [选择语法]
    * @return {[object]}     [查询后的对象]
    * @author [Primo.chu] <zhukejin@msn.com>
    */
    var $ = function (str) {
      return document.querySelectorAll(str);
    };


    /**
    * [addClass ]
    * @param {[str]} className [className]
    * @author [Primo.chu] <zhukejin@msn.com>
    */
    var addClass = function (obj,className) {
      for (var s = obj.length - 1; s >= 0; s--) {
        if (className.indexOf(",") > 0) {
          var classList = className.split(",");
          for (var i = classList.length - 1; i >= 0; i--) {
            if (obj[s].classList)
              obj[s].classList.add(classList[i]);
            else
              obj[s].className += ' ' + classList[i];   
          }
        } else {
            if (obj[s].classList)
              obj[s].classList.add(className);
            else
              obj[s].className += ' ' + className;
          }
      }
    }


    /**
    * [removeClass ]
    * @param {[str]} className [removeClass]
    * @author [Primo.chu] <zhukejin@msn.com>
    */
    var removeClass = function (obj,className) {
      for (var s = obj.length - 1; s >= 0; s--) {
        if (className.indexOf(",") > 0)
        {
          var classList = className.split(",");
          for (var i = classList.length - 1; i >= 0; i--)
          {
            if (obj[s].classList)
              obj[s].classList.remove(classList[i]);
            else
              obj[s].className = obj[s].className.replace(new RegExp('(^|\\b)' + classList[i].split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
          }
        } else {
            if (obj[s].classList)
              obj[s].classList.remove(className);
            else
              obj[s].className = obj[s].className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
      };
    }

    /**
    * [on 事件绑定]
    * @param  {[object]} obj   [对象组]
    * @param  {[string]} event [事件名称]
    * @param  {[boolen]} type  [事件捕获类型]
    */
    var on = function (obj,event,func,type) {
      for (var i = obj.length - 1; i >= 0; i--) {
        if (window.addEventListener)
          obj[i].addEventListener(event,func,type);
        else
          obj[i].attachEvent("on"+event,func,type);
      };
    };

    var test = function (a) {
      alert(1);
    }
    
    return {
      fliter: fliter,
      isNumberOr_Letter : isNumberOr_Letter,
      ajax : ajax,
      $ : $,
      addClass : addClass,
      removeClass :removeClass,
      on : on,
      test : test
    };
});