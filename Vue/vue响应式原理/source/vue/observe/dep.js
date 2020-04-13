let uid = 0;
export default class Dep {
  constructor() {
    this.uid = uid++;
    this.subs = [];
  }
  addSub(watcher) { //订阅
    this.subs.push(watcher);
  }
  notify() { //发布
    this.subs.forEach(watcher => {
      watcher.update();
    })
  }
  depend() {
    //存watcher
    if (Dep.target) {
      Dep.target.addDep(this) //watcher.addDep(this)
    }
  }
}

//保存当前watcher
let stack = [];
export function pushTarget(watcher) { //存
  Dep.target = watcher;
  stack.push(watcher);
}

export function popTarget() { //取
  stack.pop();
  Dep.target = stack[stack.length - 1];
}