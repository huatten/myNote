import Dep from "./dep";

let uid = 0;
export default class Watcher {
  constructor(exp, scope, cb) {
    //转存
    this.exp = exp;
    this.scope = scope;
    this.cb = cb;
    this.id = uid++;
    this.update();
  }
  /**
   * 计算表达式的值
   */
  get() {
    Dep.target = this; // 将 this （即 Wathcer 示例）给全局的 Dep.target
    let newVal;
    try {
      newVal = Watcher.computedExpression(this.exp, this.scope);
    } catch (e) {
      //...
    } finally {
      Dep.target = null;
    }
    return newVal;
  }
  /**
   * 将在依赖项更改时调用 回调函数调用
   * dep.subs[i].notify()会执行到这里
   */
  update() {
    // vue源码中是通过异步队列更新
    // queueWatcher 异步调用了 run() 方法，因为：如果一次性更新多个属性，无需每个都 update 一遍，异步就解决了这个问题
    // queueWatcher(this)
    let newVal = this.get()
    this.cb && this.cb(newVal);
  }
  /**
   * 创建函数
   * 把scope当作作用域
   * 函数内部使用with来指定作用域
   * 执行函数得到表达式的值
   * Function()的作用域是全局的
   * @param {*} exp 
   * @param {*} scope 
   */
  static computedExpression(exp, scope) {
    let fn = new Function("scope", `with(scope){return ${exp}}`); //https://www.jianshu.com/p/7d17d1972577
    return fn(scope);
  }
}