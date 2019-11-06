//使用中间件：koa-bodyparser，来获取post请求的参数
const Koa = require("koa")
const bodyParser = require("koa-bodyparser")
const logger = require("./koa-logger")
const app = new Koa()

app.use(bodyParser()) //koa-bodyparser中间件
app.use(logger())  //自己封装的koa-logger中间件
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
    let postData = ctx.request.body
    ctx.body = postData
  } else {
    // 其他请求显示404
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'

  }
})

app.listen(3000, () => {
  console.log('post is starting at port 3000')
})
