import { observe } from "./index";
import { arrayMethods, observeArray } from "./array";
export default class Observe {
  constructor(data) {
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
  Object.defineProperty(data, key, {
    configurable: false,
    enumerable: true,
    get() {
      console.log(value, "获取数据，触发get");
      return value;
    },
    set(newValue) {
      if (newValue !== value) {
        console.log(newValue, "设置数据，触发set");
        observe(value);
        //TODO 触发view
        value = newValue;
      }
    }
  });
  //如果是对象递归监听
  observe(value)
}
