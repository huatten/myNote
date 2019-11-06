const Koa = require('koa')
const path = require('path')
const mimes = require('./utils/mimes')
const content = require('./utils/content')
const app = new Koa()

const staticPath = "./static"

//解析资源类型
function parseMime(url) {
  let extName = path.extname(url)   //index.html => .html
  extName = extName ? extName.slice(1) : "unknow"  //html
  return mimes[extName]
}

app.use(async (ctx) => {
  let fullStaticPath = path.join(__dirname, staticPath)
  // 解析请求内容的类型
  let _mime = await parseMime(ctx.url) //text/html
  // 获取静态资源内容，有可能是文件内容，目录，或404
  let _content = await content(ctx, fullStaticPath)
  ctx.body = _content
})

app.listen(3000)