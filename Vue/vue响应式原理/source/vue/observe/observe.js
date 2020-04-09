export default class Observe {
  constructor(data) {
    //数据劫持 data => getter setter
    this.walk(data);
  }
  /**
   * 遍历data
   * @param {*} data 
   */
  walk(data) {
    if (data && typeof data === "object") {
      Object.keys(data).forEach(key => {
        //数据劫持函数
        this.defineReactive(data, key, data[key])
      })
    }
  }
  /**
   * 动态响应式数据
   * @param {*} data 
   * @param {*} key 
   * @param {*} value 
   */
  defineReactive(data, key, value) {
    Object.defineProperty(data, key, {
      configurable: false,
      enumerable: true,
      get() {
        console.log("获取数据，触发get");
        return value;
      },
      set(newValue) {
        if (newValue !== value) {
          console.log("设置数据，触发set");
          //TODO 触发view
          value = newValue;
        }
      }
    });
    this.walk(value)
  }

}
