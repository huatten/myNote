const axios = require("axios");
function getData() {
  const url = "http://jelly-uat.jr.sina.com.cn/h5/index/indexSyncData"
  axios.get(url).then(function (res) {
    console.log(res.data)
  }).catch(function (error) {
    console.log(error);
  });

}
getData();