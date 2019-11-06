const Koa = require("koa")
const Router = require("koa-router")
const app = new Koa()
const router = new Router()

app.use(async (ctx, next) => {
  console.log("start:" + Date.now())
  await next()
  console.log("end:" + Date.now())
})

router.get("/news", async (ctx, next) => {
  ctx.body = "新闻页面列表"
  console.log("路由中间件")
  await next()
})

router.get("/detail/:id", async (ctx) => {
  ctx.body = `新闻详情${ctx.params.id}`
  console.log(ctx.query)
  console.log(ctx.querystring)
})

app.use(router.routes())  // 启动路由
  .use(router.allowedMethods())  //这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后,所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头
app.listen(3000)