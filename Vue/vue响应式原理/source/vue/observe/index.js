import Observe from "./observe";
import Watcher from "./watcher";
import Dep from "./dep";
/**
 * 各种初始化工作
 * @param {*} vm 
 */
export function initState(vm) {
  let options = vm.$options;
  options.data && initData(vm);
  options.computed && initComputed(vm, options.computed);
  options.watch && initWatch(vm);
}

export function observe(data) {
  if (data && typeof data === "object") {
    //观察数据的业务逻辑
    if (data.__ob__) {
      return data.__ob__;
    }
    return new Observe(data);
  }
}

/**
 * 初始化数据
 * @param {*} vm 
 */
function initData(vm) {
  let data = vm.$options.data;
  data = vm.$data = typeof data === "function" ? data.call(vm) : data || {};
  //数据代理
  proxyData(vm, data)
  //观察数据
  observe(data);

}

function initComputed(vm, computed) {
  //计算属性是有缓存的,定义空对象用来存放所有计算属性相关的watcher
  let watchers = vm._watcherComputed = Object.create(null);
  for (let key in computed) {
    let userDef = computed[key];
    watchers[key] = new Watcher(
      vm,  //实例
      userDef, //getter 用户传入的求值函数
      () => { },  //回调函数
      { lazy: true } //声明lazy属性 标记computed watcher
    );
    //当用户取值的时候 我们将key定义到我们的vm上
    Object.defineProperty(vm, key, {
      get: creatComputedGetter(vm, key)
    })
  }
}

function initWatch(vm) {
  let watch = vm.$options.watch;
  for (let key in watch) {
    let handler = watch[key];
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        creatWatch(vm, key, handler[i])
      }
    } else {
      creatWatch(vm, key, handler);
    }
  }
}

function creatWatch(vm, expOrfn, handler, opts) {
  if (typeof handler == "object") {
    opts = handler;
    handler = handler.handler;
  }
  if (typeof handler == "string") {
    handler = vm[handler];
  }
  return vm.$watch(expOrfn, handler, opts);
}

/**
 * 数据代理 vm.$data.msg => vm.msg
 * @param {*} vm 
 * @param {*} data 
 */
function proxyData(vm, data) {
  const keys = Object.keys(data);
  keys.forEach(key => {
    Object.defineProperty(vm, key, {
      set(newValue) {
        data[key] = newValue;
      },
      get() {
        return data[key];
      }
    });
  });
}

function creatComputedGetter(vm, key) {
  let watcher = vm._watcherComputed[key];
  return function () {
    if (watcher) {
      //页面取值 dirty=true 调用get方法计算
      watcher.evalValue();
    }
    if(Dep.target){
      console.log(Dep.target)
      watcher.depend();
    }
    return watcher.value;
  }

}
