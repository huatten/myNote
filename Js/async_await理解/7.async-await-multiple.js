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
    console.time()
    //串行 861ms
    const res = await getData('2019');
    const res2 = await getData('2020');
    console.log(res.data)
    console.log(res2.data) 
    
    //并行 472ms
    const resPromise = getData('2019');
    const res2Promise = getData('2020');
    const resData = await resPromise;
    const res2Data = await res2Promise;
    console.log(resData.data)
    console.log(res2Data.data)

    console.timeEnd();
  } catch (error) {
    console.log(error);
  }
})()