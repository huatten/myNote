const axios = require("axios");
async function getData() {
  const url = "http://jelly-uat.jr.sina.com.cn/h5/index/indexSyncData";
  return await axios.get(url); //await关键字接受一个promise
}

//将async函数用在promisechain中
getData().then(res => {
  console.log(res.data)
}).catch(error => {
  console.log(error)
});