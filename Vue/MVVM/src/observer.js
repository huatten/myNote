import Dep from "./dep";
import { arrayMethods, observeArray } from "./array";
//数据劫持
export default class Observer {
  constructor(data) {
    //遍历data完成所有数据的劫持 data => getter setter
    if (Array.isArray(data)) {
      console.log(data)
      data.__proto__ = arrayMethods;
      //只能拦截数组的方法 数组的每一项还需要监听
      observeArray(data)
    } else {
      this.walk(data);
    }
  }
  /**
   * 遍历对象
   * @param {*} data 
   */
  walk(data) {
    if (!data || typeof data !== "object") {
      return;
    }
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key]);
    })
  }
}

/**
 * 创建观察者实例
 * @param {*} data 
 */
export function observe(data) {
  if (data && typeof data === "object") {
    return new Observer(data);
  }
}

/**
   * 动态响应式设置数据 Define a reactive property on an Object.
   * @param {*} data 
   * @param {*} key 
   * @param {*} value 
   */
export function defineReactive(data, key, value) {
  // 每次执行 defineReactive 都会创建一个 dep ，它会一直存在于闭包中
  let dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true, //可遍历
    configurable: false, //不可再配置
    get: () => {
      Dep.target && dep.addSub(Dep.target) //绑定依赖
      console.log(value, "获取数据，触发get");
      return value;
    },
    set: (newValue) => {
      if (value === newValue) {
        return;
      }
      observe(value);
      // TODO 触发view视图更新
      value = newValue;
      console.log(value, "设置数据，触发set");
      // 数据更新后，通知所有依赖watcher，重新计算页面展示
      dep.notify();   //触发更新
    }
  })
  //对象递归监听
  observe(value);
}

