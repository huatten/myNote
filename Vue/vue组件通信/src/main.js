import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;
//方案一：自己实现 Bus
/*
class Bus{
  constructor(){
    this.callbacks = {}
  }
  //监听
  $on(name, fn){
    this.callbacks[name] = this.callbacks[name] || []
    this.callbacks[name].push(fn)
  }
  //触发
  $emit(name, args){
    if(this.callbacks[name]){
      //遍历所有的callbacks
      this.callbacks[name].forEach(cb => cb(args))
    }
  }
}
Vue.prototype.$bus = new Bus(); 
*/

//new一个空的Vue实例作为中央事件总线（事件中心），用他来触发和监听事件
Vue.prototype.$bus = new Vue(); 

//$dispatch 向上传递
Vue.prototype.$dispatch = function (eventName, data) {
  let parent = this.$parent;
  //向上查找父元素
  while (parent) {
    if (parent) {
      //父元素 用$emit触发
      parent.$emit(eventName, data);
      //递归查找父元素
      parent = parent.$parent;
    } else {
      break;
    }
  }
}
//$boardcast  向下广播
Vue.prototype.$boardcast = function (eventName, data) {
  boardcast.call(this, eventName, data);
}
function boardcast(eventName, data) {
  this.$children.forEach(child => {
    //子元素 触发$emit（$emit就是通知自己，之所以可以通知父元素，是因为父元素传递了一个函数给自己）
    child.$emit(eventName, data);
    //递归通知所有子元素
    if (child.$children.length) {
      boardcast.call(child, eventName, data);
    }
  });
}
new Vue({
  render: h => h(App),
}).$mount('#app')
