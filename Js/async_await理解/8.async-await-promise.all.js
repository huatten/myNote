const axios = require("axios");
const getData = async (tid) => {
  const url = `http://jelly-uat.jr.sina.com.cn/h5/index/indexSyncData?time${tid}`;
  const response = await axios.get(url); //await关键字接受一个promise

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return response;
}

(async () => {
  try {
    const [res, res2] = await Promise.all([ //Promise.all 实现代码await并行
      getData('2019'),
      getData('2020')
    ])
    console.log(res.data)
    console.log(res2.data)
  } catch (error) {
    console.log(error);
  }
})()