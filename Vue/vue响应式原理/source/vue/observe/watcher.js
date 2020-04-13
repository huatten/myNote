import { pushTarget, popTarget } from "./dep";
let uid = 0;
export default class Watcher {
  constructor(vm, expOrfn, cb = () => { }) {
    this.vm = vm;
    this.expOrfn = expOrfn;
    this.cb = cb;
    this.uid = uid++;
    this.deps = [];
    this.depsId = new Set();
    if (typeof expOrfn === "function") {
      this.getter = expOrfn;
    }
    this.get(); //默认创建一个watcher，会调用自身的方法
  }
  get() {
    //初始化渲染watcher
    pushTarget(this); // Dep.target = watcher
    this.getter();
    popTarget();
  }
  addDep(dep) {
    console.log(dep)
    let uid = dep.uid;
    if (!this.depsId.has(uid)) {
      this.depsId.add(uid);
      this.deps.push(dep);
      dep.addSub(this); //=>watcher
    }
  }
  update() {
    //异步批量更新 防止重复渲染
    queueWatcher(this); //this=>watcher
  }
  run() {
    this.get();
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