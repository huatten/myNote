import { initState } from "./observe";
import { isElementNode } from "./util"
import Watcher from "./observe/watcher";
import Compiler from "./compiler"
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
  //初始化渲染页面
  if (vm.$options.el) {
    vm.$mount()
  }
}
Vue.prototype.$mount = function () {
  let vm = this;
  let el = vm.$options.el;
  //获取当前节点
  el = vm.$el = isElementNode(el) ? el : document.querySelector(el);
  //渲染节点  通过watcher渲染
  const updateComponent = () => {
    //更新和渲染
    vm._update();
  }
  new Watcher(vm, updateComponent);
}
//拿到数据更新试图
Vue.prototype._update = function () {
  let vm = this;
  //节点内容进行替换 模板编译
  new Compiler(vm);
}

export default Vue;