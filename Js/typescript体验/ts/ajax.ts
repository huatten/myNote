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

interface AjaxConfig {
  url: string
  type: string,
  data?: object
  dataType: string
  async?: boolean
  success: Function,
  fail: Function
}


function $ajax(options: AjaxConfig) {
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
  let params = formatParams(options.data);
  /**
   * 1.创建
   */
  let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")

  /**
   * 2.连接 
   * 3.发送
   */
  if (options.type === "GET") {
    xhr.open(options.url + '?' + params, options.async)
    xhr.send(null)
  } else if (options.type === "POST") {
    xhr.open(options.url, options.async)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(params)
  }
  /**
   * 4.接收
   */
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      let status = xhr.status;
      if (status >= 200 || status < 300) {
        let resopnse = options.dataType === 'json' ? JSON.parse(xhr.responseText) : xhr.responseText;
        options.success && options.success(resopnse);
      } else {
        options.fail && options.fail(status);
      }
    }
  }

}
function formatParams(data: object) {
  let arr = [];
  for (let name in data) {
    arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
  }
  arr.push(("v=" + Math.random()).replace(".", ""));
  return arr.join("&");
}