import Observer from "./observer";
import Compiler from "./compiler";
class Mvue {
  constructor(options) {
    //获取元素的dom对象
    this.$el = document.querySelector(options.el);
    //转存数据
    this.$data = options.data || {};
    //数据劫持
    new Observer(this.$data);
    //模版编译
    new Compiler(this);
  }
}
window.Mvue = Mvue;