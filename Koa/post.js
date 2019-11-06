const Koa = require("koa")
const app = new Koa()

function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postData = ""
      ctx.req.addListener('data', data => {
        postData += data //userName=abc&nickName=aaa&email=nbilly%40163.com
      })
      ctx.req.addListener('end', function () {
        let parseData = url2json(postData)
        /**
         * {
            "userName": "abc",
            "nickName": "aaa",
            "email": "nbilly@163.com"
            }
         *  */
        resolve(parseData)
      })
    } catch (err) {
      reject(err)
    }
  })
}
//将post请求参数解析成json
function url2json(url) {
  let queryData = {}
  let queryArr = url.split("&")
  for (let i = 0; i < queryArr.length; i++) {
    let arr = queryArr[i].split("=");
    queryData[arr[0]] = decodeURIComponent(arr[1])
  }
  return queryData;
}

app.use(async (ctx) => {
  if (ctx.url === "/" && ctx.method === "GET") {
    //get请求返回表单
    let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
  } else if (ctx.url === "/" && ctx.method === "POST") {
    // 当POST请求的时候，解析POST表单里的数据，并显示出来
    let postData = await parsePostData(ctx)
    ctx.body = postData
  } else {
    // 其他请求显示404
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'

  }
})

app.listen(3000, () => {
  console.log('post is starting at port 3000')
})
