const Koa = require("koa")
const app = new Koa()
const compose = require("koa-compose")
const fs = require("fs.promised")

const logger = async (ctx, next)=>{
  const start = Date.now()
  await next()
  const end = Date.now()
  console.log(`${end-start} ${ctx.body.length} ${ctx.request.url}`)
}

const read = async (ctx)=>{
  ctx.response.type = "html"
  ctx.response.body = await fs.readFile("./template.html", "utf-8")
}

const middlewares = compose([logger, read])
app.use(middlewares)
app.listen(3000)