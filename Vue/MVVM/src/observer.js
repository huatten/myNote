import Dep from "./dep";
//数据劫持
export default class Observer {
  constructor(data) {
    //数据转存
    this.data = data;
    //遍历data完成所有数据的劫持
    this.walk(this.data);
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
      this.defineReactive(data, key, data[key]);
    })
  }
  /**
   * 动态响应式设置数据 Define a reactive property on an Object.
   * @param {*} data 
   * @param {*} key 
   * @param {*} value 
   */
  defineReactive(data, key, value) {
    let dep = new Dep();
    Object.defineProperty(data, key, {
      enumerable: true, //可遍历
      configurable: false, //不可再配置
      get: () => {
        console.log("get")
        Dep.target && dep.addSub(Dep.target)
        return value;
      },
      set: (newValue) => {
        console.log("set")
        value = newValue;
        //TODO 触发view视图更新
        dep.notify();
      }
    })
    this.walk(value);
  }
}