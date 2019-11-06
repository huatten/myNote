const path = require('path')
const fs = require('fs')

//封装读取目录内容的方法
const dir = require('./dir')
//封装读取文件内容的方法
const file = require('./file')

/**
 * 获取静态资源内容
 * @param {object} ctx koa上下文
 * @param {string} fullStaticPath 静态资源目录在本地的绝对路径
 * @returns {string} 请求获取到的本地内容
 */
async function content(ctx, fullStaticPath) {
  //封装请求资源的完全路径
  let reqPath = path.join(fullStaticPath, ctx.url)  // /Users/macbook/Desktop/myNote/Koa/static/index.html
  // 判断请求路径是否为存在目录或者文件
  let exist = fs.existsSync(reqPath) //true
  //返回请求内容
  let content = ''
  if (!exist) {
    content = '404 Not Found!'
  } else {
    //判断地址是文件夹还是文件
    let stat = fs.statSync(reqPath)
    if (stat.isDirectory()) {
      //是目录，则读取目录内容
      content = dir(ctx.url, reqPath)
    } else {
      //是文件，则读取文件内容
      content = await file(reqPath)
    }
  }
  return content
}

module.exports = content