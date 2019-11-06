const Koa = require("koa")
const app = new Koa()

const handler = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500
    ctx.response.body = {
      message: err.message
    }
    //如果错误被try catch捕获的话，就不会触发error事件，必须调用ctx.app.emit()手动释放error事件，才能让监听函数有效
    ctx.app.emit('error', err, ctx)
  }
}

const main = ctx => {
  ctx.throw(500)
}

app.on("error", (err) => {
  console.log(err.message)
  console.log(err)
})
app.use(handler)
app.use(main)

app.listen(3000)