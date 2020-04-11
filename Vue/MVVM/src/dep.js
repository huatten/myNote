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
      // 在 defineReactive 的 setter 中触发
      // subs[id] 是一个 Watcher 实例
      this.subs[id].update();
    }
  }
}