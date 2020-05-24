/*
$ajax({
  url: "", //请求地址
  type: 'GET',   //请求方式
  data: { name: 'zhangsan', age: '23', email: '2372734044@qq.com' }, //请求参数
  dataType: "json",     // 返回值类型的设定
  async: false,   //是否异步
  success: function (response) {
    console.log(response);   //   此处执行请求成功后的代码
  },
  fail: function (status) {
    console.log('状态码为' + status);   // 此处为执行成功后的代码
  }
});
*/
function $ajax(options) {
    /**
    *  默认为GET请求
    */
    options.type = (options.type.toLocaleUpperCase() || "GET");
    /**
     * 返回值类型默认为json
     */
    options.dataType = options.dataType || 'json';
    /**
     * 默认为异步请求
     */
    options.async = options.async || true;
    /**
     * 对需要传入的参数的处理
     */
    var params = formatParams(options.data);
    /**
     * 1.创建
     */
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    /**
     * 2.连接
     * 3.发送
     */
    if (options.type === "GET") {
        xhr.open(options.url + '?' + params, options.async);
        xhr.send(null);
    }
    else if (options.type === "POST") {
        xhr.open(options.url, options.async);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
    }
    /**
     * 4.接收
     */
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var status_1 = xhr.status;
            if (status_1 >= 200 || status_1 < 300) {
                var resopnse = options.dataType === 'json' ? JSON.parse(xhr.responseText) : xhr.responseText;
                options.success && options.success(resopnse);
            }
            else {
                options.fail && options.fail(status_1);
            }
        }
    };
}
function formatParams(data) {
    var arr = [];
    for (var name_1 in data) {
        arr.push(encodeURIComponent(name_1) + "=" + encodeURIComponent(data[name_1]));
    }
    arr.push(("v=" + Math.random()).replace(".", ""));
    return arr.join("&");
}
