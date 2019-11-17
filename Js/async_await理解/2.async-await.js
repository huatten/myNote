const axios = require("axios");
async function getData() {
  const url = "http://jelly-uat.jr.sina.com.cn/h5/index/indexSyncData";
  const res = await axios.get(url); //await关键字接受一个promise
  console.log(res.data)
}
getData();