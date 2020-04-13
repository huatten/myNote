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
    this.get();
  }
}