const axios = require("axios");
const getData = async () => {
  const url = "http://jelly-uat.jr.sina.com.cn/h5/index/indexSync";
  const response = await axios.get(url); //await关键字接受一个promise
  //错误处理
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return response;
}

(async () => {
  //错误处理
  try {
    const res = await getData();
    console.log(res)
  } catch (error) {
    console.log(error);
  }
})()