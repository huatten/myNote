const axios = require("axios");
const getData = async () => {
  const url = "http://jelly-uat.jr.sina.com.cn/h5/index/indexSyncData";
  return await axios.get(url); //await关键字接受一个promise
}

class APIClient {
  async fetch() {
    const url = "http://jelly-uat.jr.sina.com.cn/h5/index/indexSyncData";
    return await axios.get(url); //await关键字接受一个promise
  }
}

(async () => {
  const res = await getData();
  console.log(res)
  const client = new APIClient();
  const resopnse = await client.fetch();
  console.log(resopnse.data.msg);
})()