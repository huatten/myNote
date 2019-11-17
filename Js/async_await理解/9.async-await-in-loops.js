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
    //串行 892ms
    const names = ['2019', '2020'];
    for (const name of names) {
      const res = await getData(name)
      console.log(res.data)
    }
    console.timeEnd();
  } catch (error) {
    console.log(error);
  }
})();

(async () => {
  try {
    console.time()
    //并行 456ms
    const names = ['2019', '2020'];
    const promises = names.map(x => getData(x))
    for (const promise of promises) {
      const res = await promise
      console.log(res.data)
    }
    console.timeEnd();
  } catch (error) {
    console.log(error);
  }
})()