import { observe } from "./index";
import { arrayMethods, observeArray, dependArray } from "./array";
import Dep from "./dep";
export default class Observe {
  constructor(data) {
    //创建数组专用dep
    this.dep = new Dep();
    //给数据对象添加属性
    Object.defineProperty(data, "__ob__", {
      get: () => this
    })
    //数据劫持 data => getter setter
    if (Array.isArray(data)) {
      //修改数组的原型方法
      data.__proto__ = arrayMethods;
      //只能拦截数组的方法 数组的每一项还需要监听
      observeArray(data)
    } else {
      this.walk(data);
    }
  }
  /**
   * 遍历data
   * @param {*} data 
   */
  walk(data) {
    if (data && typeof data === "object") {
      const keys = Object.keys(data);
      keys.forEach(key => {
        //数据劫持函数
        defineReactive(data, key, data[key])
      })
    }
  }
}

/**
   * Object.defineProperty来劫持对象属性的setter和getter操作，并“种下”一个监听器
   * @param {*} data 
   * @param {*} key 
   * @param {*} value 
   */
export function defineReactive(data, key, value) {
  //如果是对象递归监听
  let childOb = observe(value);
  let dep = new Dep();
  Object.defineProperty(data, key, {
    configurable: false,
    enumerable: true,
    get() {
      if (Dep.target) {
        dep.depend(); //watcher里面记录dep 同时在dep里面记录watcher
        if (childOb) {
          childOb.dep.depend();//数组收集当前的watcher
          dependArray(value); //收集儿子的依赖
        }
      }
      return value;
    },
    set(newValue) {
      if (newValue !== value) {
        //设置的有可能是对象
        observe(value);
        //TODO 触发view
        value = newValue;
        //数据更新后 通知所有的收集依赖的watcher， 重新计算页面展示
        dep.notify();
      }
    }
  });

}
