import { initState } from "./observe";

/**
 * Vue构造函数
 * @param {*} options 
 */
function Vue(options) {
  this._init(options)
}

Vue.prototype._init = function (options) {
  let vm = this;
  //转存数据
  vm.$options = options;
  //重新初始化状态 data computed watch
  initState(vm);
}
export default Vue;