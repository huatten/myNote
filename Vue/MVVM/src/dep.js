//依赖收集 名单
export default class Dep {
  constructor() {
    //存放所有的watcher
    this.subs = {}
  }
  addSub(target) {
    if (!this.subs[target.id]) {
      this.subs[target.id] = target;
    }
  }
  notify() {
    for (let id in this.subs) {
      this.subs[id].update();
    }
  }
}