
module.exports = function () {
  return async (ctx, next) => {
    const start = Date.now()
    await next()
    const end = Date.now()
    console.log(`${end - start} ${ctx.method} ${ctx.request.url}`)
  }
}