## Vue组件通信的姿势总结

### 一、props和$emit
#### 父组件向子组件通信 -- props
* 父组件引用子组件的时候利用 `v-bind` 去绑定 `titles`，传递给子组件（对应的就是 `title`）
* 子组件要创建 `props` 选项，注册传递的 `title` 的值，就可以直接拿到 `title` 这个值了

```html
<template>
  <div id="app">
    <h2>父组件</h2>
    <child1 :title="titles" :img-height="imgHeight"></child1>
  </div>
</template>

<script>
import Child1 from "@/components/Child1";
export default {
  name: "app",
  data() {
    return {
      titles: "我是你父亲",
      imgHeight: 100,
    };
  },
  components: { Child1 }
};
/*
  在父组件中的子组件需要通过 v-bind 来传递子组件中需要显示接收的数据
  title 第一个参数必须要与子组件的 props 同名
  titles 则是父组件需要向子组件传递的数据

*/
</script>
```
```html
<template>
  <div>
    <h2>子组件1号</h2>
    <p>来自父组件的值：{{title}}</p>
  </div>
</template>
<script>
export default {
  name: "Child1",
  //props: ["title", "imgHeight"],
  props:{
    title: {
      type: String,
      default: "",
      required: true
    },
    imgHeight:{
      type: [Numbber, String],
      default: 0
    }
  }
};
/*
  子组件需要显示的定义好需要从父组件接收哪些数据
*/
</script>
```
#### 总结：
* 使用 `props` 传递数据的作用域是孤立的，它是由父组件通过模板传递过来，想要接收父组件传来的数据，需要通过 `props选项` 来进行接收
* 子组件需要显示声明接收父组件传递来的数据的 `数量` 、`类型` 、`默认值`
* 简单的接收可以通过数组形式来接收
* 所有的 `props` 都使得其父子 `props` 之间形成了一个 `单向下行绑定`：父组件的 `props` 更新会向下流动到子组件，反过来则不行，这样防止子组件意外改变父组件的状态
* Vue传递数据时是基于 `数据单向流动`，子组件不能改变当前实例中的 `props` 任何属性，需要通知父组件改变相应的值，重新改变

#### 子组件向父组件通信 -- $emit(通过事件形式)
当点击按钮 “给父组件传值” 以后，子组件像父组件传值，`msg` 由原来的 “ ” 变为了 “子组件1号给父组件传值”
```html
<template>
  <div id="app">
    <h2>父组件</h2>
    <p>{{msg}}</p>
    <!-- 父组件监听子组件触发的 sendmsg 方法-->
    <child1 v-on:sendmsg="getmsg"></child1>
  </div>
</template>

<script>
import Child1 from "@/components/Child1";
export default {
  name: "app",
  data() {
    return {
      msg: "",
    };
  },
  components: { Child1 },
  methods:{
    getmsg(d){ //参数就是子组件传递过来的数据
      this.msg = d
    }
  }
};
</script>
```
```html
<template>
  <div>
    <h2>子组件1号</h2>
    <button @click="toParent">给父组件传值</button>
  </div>
</template>
<script>
export default {
  name: "Child1",
  methods:{
    //子组件通过 $emit 方法触发父组件定义好的函数 getmsg 从而将子组件中的数据传递给父组件 
    toParent(){
      this.$emit('sendmsg', '子组件1号给父组件传值')
    }
  }
};
</script>
```
#### 总结：
* 子组件通过events给父组件发送消息，自己的数据发送到父组件

### 二、$on和$emit (中央事件总线)
上面方式都是处理的父子组件之间的数据传递，那如果两个组件不是父子关系呢?比如兄弟组件。<br>
此时，我们可以用订阅发布模式，并且挂载到 `Vue.prototype` 之上，这种机制叫做 `总线机制（中央事件总线/事件中心）`，新建一个Vue事件bus对象，然后通过bus.$emit触发事件，bus.$on监听触发的事件，巧妙而轻量地实现了任何组件间的通信，包括父子、兄弟、跨级。下面演示兄弟组件的传值：
```js
//main.js
import Vue from 'vue';
//方案一：自己实现 Bus
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
//方案二：Vue本身就是一个订阅发布的实现，我们偷个懒，把Bus这个类可以删掉，新建一个空的Vue实例就可以啦
Vue.prototype.$bus = new Vue(); 
//new一个空的Vue实例作为中央事件总线（事件中心），用他来触发和监听事件
```
```html
// Child1
<template>
  <div>
    <h2>子组件1号</h2>
    <p>{{name}}</p>
  </div>
</template>
<script>
export default {
  name: "Child1",
  data(){
    return{
      name: ""
    }
  },
  mounted(){
    this.$bus.$on('sendToChild1', name=>{
      this.name = '来自兄弟组件2号的值:' + name
    })
  }
};
</script>
```
```html
// Child2
<template>
  <div>
    <h2>子组件2号</h2>
    <button @click="toChild1">给兄弟组件1号传值</button>
  </div>
</template>
<script>
export default {
  name: "Child2",
  methods{
    toChild1(){
      this.$bus.$emit('sendToChild1', '我是从子组件2号传过来的')
    }
  }
};
</script>
```
效果：

![bus](src/assets/bus.gif)
### 三、provide和inject (祖先后代)
props一层层传递，爷爷给孙子还好，如果嵌套了五六层还这么写，那也未免太恶心了，Vue在2.2.0版本为我们提供了 `provide / inject`，这一对选项，需要一起配合使用，祖先组件中通过 `provide` 来提供变量，然后在子孙组件中通过 `inject` 来注入变量。不论子组件有多深，只要调用了inject那么就可以注入provide中的数据。而不是局限于只能从当前父组件的prop属性来获取数据，只要在祖先组件的生命周期内，子孙组件都可以调用。

```html
// App
<template>
  <div id="app">
    <h2>祖先组件</h2>
    <child1></child1>
  </div>
</template>

<script>
import Child1 from "@/components/Child1";
export default {
  name: "app",
  provide: {
    root: "老祖宗"
  },
  components: { Child1 },
};
</script>
```
```html
//Child1
<template>
  <div>
    <h2>子组件1号</h2>
    <p>祖先组件App提供的数据：{{root}}</p>
    <grand-child1></grand-child1>
  </div>
</template>
<script>
import GrandChild1 from "./GrandChild1";
export default {
  name: "Child1",
  inject: ["root"], //得到祖先组件传递过来的数据 
  components: { GrandChild1 }
};
</script>
```
```html
//GrandChild1
<template>
  <div>
    <h2>孙子组件1号</h2>
    <p>祖先组件App提供的数据：{{root}}</p>
  </div>
</template>
<script>
export default {
  name: "GrandChild1",
  inject: ["root"] //得到祖先组件传递过来的数据
};
</script>
```
运行结果：

![provide&inject](src/assets/provide&inject.png)
#### 总结：
* provide 和 inject 主要为高阶插件或者组件库提供用例，并不推荐直接用于应用程序代码
* provide 和 inject 绑定并不是可响应式的，这是刻意为之的。然而，如果你传入了一个可监听对象，那么其对象属性还是可响应的。（因此，根组件中 `root` 变了的话，其子组件、孙组件中的 `root` 是不会变的），仍然是 `老祖宗`  [vue官网提示](https:cn.vuejs.org/v2/api/#provide-inject)
* provide 和 inject 如何实现响应式？<br>
1. 方案一：provide 祖先组件的实例，然后在子孙组件中注入依赖，这样就可以在子孙组件中直接修改祖先元素的实例的属性；<br>
2. 方案二：使用2.6最新API Vue.observable 优化响应式 provide(推荐)

先看第一种方案：
```html
// App
<template>
  <div id="app">
    <h2>祖先组件</h2>
    <button @click="changeRoot()">provide-inject实现响应式</button>
    <child1></child1>
  </div>
</template>

<script>
import Child1 from "@/components/Child1";
export default {
  name: "app",
  provide(){
    return {
      text: this //提供祖先元素的实例
    }
  },
  data(){
    return{
      root: "老祖宗啊"
    }
  },
  components: { Child1 },
  methods:{
    changeRoot(root){
      if(root){
        this.root = root
      }else{
        this.root = this.root === '老祖宗啊' ? '老祖宗变了' : '老祖宗啊'        
      }
    }
  }
};
</script>
```
```html
//Child1
<template>
  <div>
    <h2>子组件1号</h2>
    <p>祖先组件App提供的数据：{{text.root}}</p>
    <grand-child1></grand-child1>
  </div>
</template>
<script>
import GrandChild1 from "./GrandChild1";
export default {
  name: "Child1",
  inject:{
    text:{}
  },
  components: { GrandChild1 }
};
</script>
```
```html
//GrandChild1
<template>
  <div>
    <h2>孙子组件1号</h2>
    <p>祖先组件App提供的数据：{{root}}</p>
  </div>
</template>
<script>
export default {
  name: "GrandChild1",
  inject:{
    text:{}
  }
};
</script>
```
第二种方案：

```html
// App
<template>
  <div id="app">
    <h2>祖先组件</h2>
    <button @click="changeRoot()">provide-inject实现响应式</button>
    <child1></child1>
  </div>
</template>

<script>
import Vue from "vue";
import Child1 from "@/components/Child1";
export default {
  name: "app",
  provide(){
    this.text = Vue.observable({
      root: this.root
    })
    return {
      text: this.text
    }
  },
  data(){
    return{
      root: "老祖宗啊"
    }
  },
  components: { Child1 },
  methods:{
    changeRoot(root){
      if(root){
        this.text.root = root
      }else{
        this.text.root = this.text.root === '老祖宗啊' ? '老祖宗变了' : '老祖宗啊'        
      }
    }
  }
};
</script>
```
```html
//Child1
<template>
  <div>
    <h2>子组件1号</h2>
    <p>祖先组件App提供的数据：{{text.root}}</p>
    <grand-child1></grand-child1>
  </div>
</template>
<script>
import GrandChild1 from "./GrandChild1";
export default {
  name: "Child1",
  inject:{
    text:{}
  },
  components: { GrandChild1 }
};
</script>
```
```html
//GrandChild1
<template>
  <div>
    <h2>孙子组件1号</h2>
    <p>祖先组件App提供的数据：{{root}}</p>
  </div>
</template>
<script>
export default {
  name: "GrandChild1",
  inject:{
    text:{}
  }
};
</script>
```
运行结果：

![provide&inject实现响应式](src/assets/provide-inject实现响应式.gif)

### 四、$parent和$children
### 五、$dispatch和$broadcast
### 六、$attrs和$listeners
未完。。。
