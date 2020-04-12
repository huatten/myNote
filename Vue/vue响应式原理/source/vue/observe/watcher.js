let uid = 0;
export default class Watcher {
  constructor(vm, expOrfn, cb = () => { }) {
    this.vm = vm;
    this.expOrfn = expOrfn;
    this.cb = cb;
    this.uid = uid++;
    //if (typeof expOrfn === "function") {
      this.getter = expOrfn;
   // }
    this.get(); //默认创建一个watcher，会调用自身的方法
  }
  get() {
    this.getter()
  }
}