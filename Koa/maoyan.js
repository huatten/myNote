const Koa = require('koa')
const Router = require('koa-router')
const Http = require('http')
const QueryString = require('querystring')

const app = new Koa()
const router = new Router();

//获取远端电影列表信息
const Service = {
  search: async (kw = '') => {
    return new Promise((resolve) => {
      Http.request({
        hostname: 'm.maoyan.com',
        path: `/ajax/search?${QueryString.stringify({
          kw, cityId: 10
        })}`
      }, res => {
        res.setEncoding('utf8')
        let data = []
        res.on('data', chunk => {
          data.push(chunk)
        }).on('end', () => {
          resolve(data.join(''))
        })
      }).end()
    })
  }
}

//渲染html
const Render = (data, kw) => {
  let movies = data.movies && data.movies.list,
    html = ''
  for (let i = 0; i < movies.length; i++) {
    html += `
    <div>
      <p> ${movies[i].pubDesc}</p>
      <h4>${movies[i].nm}</h4>
      <p>${movies[i].star}</p>
      <hr/>
    </div>`
  }
  return html
}

//路由规则
router.get('/', async (ctx) => {
  let { kw } = ctx.query; //获取url参数值
  let data = await Service.search(kw) //调用服务接口获取影片列表数据
  ctx.body = Render(JSON.parse(data), kw) //调用render方法渲染html
})

//调用路由启动
app.use(router.routes())
  .listen(8080, () => {
    console.log('service is runing...')
  })


function binaryToStr(str) {
  let result = [];
  let list = str.split(" ");
  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    let asciiCode = parseInt(item, 2);
    let charValue = String.fromCharCode(asciiCode);
    result.push(charValue);
  }
  return result.join("");

}
console.log(binaryToStr("1100001 1100010 1100011"))