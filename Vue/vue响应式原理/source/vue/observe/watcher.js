import { pushTarget, popTarget } from "./dep";
let uid = 0;
export default class Watcher {
  constructor(vm, expOrfn, cb = () => { }, opts) {
    this.vm = vm;
    this.expOrfn = expOrfn;
    this.cb = cb;
    if (opts) {
      this.user = !!opts.user;
      this.deep = !!opts.deep;
      this.lazy = !!opts.lazy; //如果这个值为true 说明他是计算属性
    } else {
      this.user = this.deep = this.lazy = false;
    }
    this.dirty = this.lazy;
    this.uid = uid++;
    this.deps = [];
    this.depsId = new Set();
    this.expOrfn = expOrfn;
    if (typeof expOrfn === "function") {
      this.getter = expOrfn;
    } else {
      //key
      this.getter = function () {
        let keys = expOrfn.split('.');
        return keys.reduce((data, current) => {
          if (data && data[current]) {
            return data[current];
          }
        }, this.vm);
      }
    }
    //如果是计算属性的话不会默认调用自身的get方法
    this.value = this.lazy ? undefined : this.get();
  }
  get() {
    //初始化渲染watcher
    pushTarget(this); // Dep.target = watcher
    let oldValue = this.getter.call(this.vm);
    popTarget();
    return oldValue;
  }
  addDep(dep) {
    let uid = dep.uid;
    if (!this.depsId.has(uid)) {
      this.depsId.add(uid);
      this.deps.push(dep);
      dep.addSub(this); //=>watcher
    }
  }
  update() {
    //异步批量更新 防止重复渲染
    if (this.lazy) { // 如果是计算属性
      this.dirty = true
    } else {
      queueWatcher(this); //this=>watcher
    }
  }
  run() {
    let newValue = this.get();
    //对比新值newValue和旧值this.value是否相等
    if (newValue !== this.value || typeof this.value === "object" || this.deep) {
      if (this.user) {
        // 意味着这个观察者是开发者定义的，所谓开发者定义的是指那些通过 watch 选项或 $watch 函数定义的观察者
        try {
          this.cb(newValue, this.value)
        } catch (e) {
          // 回调函数在执行的过程中其行为是不可预知, 出现错误给出提示
          throw Error(e);
        }
      } else {
        this.cb(newValue, this.value);
      }
    }
  }
  evalValue() {
    this.value = this.get();
    this.dirty = false;
  }
  depend() {
    let i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  }
}

let has = {};
let queen = [];
/**
 * 刷新watcher队列运行watcher
 */
function flushQueue() {
  queen.forEach(watcher => watcher.run());
  //clean
  has = {};
  queen = [];
}
/**
 * 将watcher放入watcher队列
 * 重复作业的uid将被跳过 除非在刷新队列时推送
 * @param {*} watcher 
 */
function queueWatcher(watcher) {
  const uid = watcher.uid;
  if (has[uid] == null) {
    has[uid] = true;
    queen.push(watcher)
    nextTick(flushQueue);
  }
}

let callbacks = [];
function flushCallbacks() {
  callbacks.forEach(cb => cb());
}
/**
 * https://github.com/vuejs/vue/blob/dev/src/core/util/next-tick.js
 * @param {*} flushQueue 
 */
function nextTick(flushQueue) {
  callbacks.push(flushQueue);
  let asyncFn = () => {
    flushCallbacks();
  }
  if (typeof Promise !== "undefined") {
    Promise.resolve().then(asyncFn);
  } else if (typeof setImmediate !== "undefined") {
    setImmediate(asyncFn)
  } else {
    setTimeout(asyncFn, 0);
  }
}