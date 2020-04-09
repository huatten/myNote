import Observer from "./observer";
import Compiler from "./compiler";
class Mvue {
  constructor(options) {
    //获取元素的dom对象
    this.$el = this.isElementNode(options.el) ? options.$el : document.querySelector(options.el);
    //转存数据
    this.$data = options.data || {};
    this.methods = options.methods || {};
    //数据和函数的代理
    this._proxyData(this.$data)
    this._proxyMethods(this.methods);
    //数据劫持
    new Observer(this.$data);
    //模版编译
    new Compiler(this);
  }
  /**
   * 元素节点
   * @param {*} node 
   */
  isElementNode(node) {
    return node.nodeType === 1;
  }
  /**
   * 数据代理 vm.$data.msg => vm.msg
   * @param {*} data 
   */
  _proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return data[key]
        },
        set(newValue) {
          data[key] = newValue;
        }
      })
    })
  }
  /**
   * 函数代理
   * @param {*} methods 
   */
  _proxyMethods(methods) {
    if (methods && typeof methods === "object") {
      Object.keys(methods).forEach(key => {
        this[key] = methods[key]
      })
    }
  }
  /**
   * new Proxy
   * @param {*} data 
   */
  _proxy(data) {
    let handler = {
      get(target, key) {
        let item = target[key];
        if (item && typeof item === "object") {
          return new Proxy(item, handler);
        } else {
          return item;
        }
      },
      set(target, key, value) {
        if (target[key] !== value) {
          target[key] = value;
          console.log('update')
        }
        return true;
      }
    }
    data = new Proxy(data, handler);
  }
}
window.Mvue = Mvue;