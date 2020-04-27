# vue3.0-beta体验
2020年4月17日凌晨4点左右看到尤大的提交记录，`vue-next v3.0.0-beta.1` 正式发布，意味着Vue3.0距离正式发布不远了，具体的发布内容大家可以戳[这里](https://github.com/vuejs/vue-next)，下面就真香体验一波。

### Vue3.0新特性

4月21日晚，尤大在哔哩哔哩直播分享了`Vue.js 3.0 Beta`最新进展，想看整体尤大直播的过程的戳 [这里](https://www.bilibili.com/video/BV1eK4y1k7BP?t=16)，想看文字稿的可以看劝退大佬 [总结](https://juejin.im/post/5e9f6b3251882573a855cd52?utm_source=gold_browser_extension)，下面是自己的一点认识和总结。

#### Composition API

`Composition API` 是Vue3.0 中的一大亮点。这是一种全新的逻辑重用和代码组织方法。在Vue2中，我们使用我们称之为`Options API`来构建组件。为了向Vue组件添加逻辑，我们填充（options）属性，如 `data`、`methods`、`computed`等。这种方法的最大缺点是，这本身并不是有效的JavaScript代码。 您需要确切了解模板中可以访问哪些属性，以及此关键字的行为。 在后台，Vue编译器需要将此属性转换为工作代码。 因此，我们无法从自动建议或类型检查中受益。

`Composition API` 旨在通过将当前通过组件属性可用的机制公开为`JavaScript函数`来解决这个问题。Vue团队将组合API描述为“一组可添加的、基于函数的API，允许灵活组合组件逻辑”。使用Composition API编写的代码可读性更高，并且使阅读和学习更容易的。

先体验这样一个计数器的例子：

```javascript
<template>
  <button @click="increment">
    Count is: {{ count }}, double is {{ double }}, click to increment.
  </button>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
export default {
  setup() {
    const count = ref(0)
    const double = computed(() => count.value * 2)

    function increment() {
      count.value++
    }

    onMounted(() => console.log('component mounted!'))

    return {
      count,
      double,
      increment
    }
  }
}
</script>
```

`Composition API` 将组件属性公开为函数，因此第一步是导入所需的函数。 在上面的例子中，我们需要创建带有 `ref` 的响应式引用、计算属性以及生命周期钩子函数 `onMounted`。

很想知道这种神秘的 `setup` 方法是什么？简而言之，它只是**一个将属性和函数返回到模板的函数** 而已，。 我们在这里声明所有的  `reactive` 、 `watch`、`computed`、`lifecycle hooks`，然后将它们返回，以便可以在 `template` 中使用它们。

当然这是一个简单的示例，也可以通过 `Options API` 轻松实现。 新的 `Composition API` 的真正好处不仅在此，在重用我们的代码/逻辑时，这些好处才能显示出来。我们如果要在其他组件之间共享一些代码，则有两个可用选项 `mixins` 和`作用域插槽`。

假设我们要提取计数器功能并将其在其他组件中重用，vue2中用mixins我们会这么做：

```javascript
import CounterMixin from './mixins/counter'

export default {
  mixins: [CounterMixin]
}
```

混入 (mixins) 是一种分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。它在混入之后会与组件相融合组成新的组件并且里面的方法重名时是会覆盖当前方法的，同时还可能会和现有属性和功能发生冲突，所以命名时需谨慎。

我们还可以用作用域插槽实现：

```javascript
<template>
  <Counter v-slot="{ count, increment }">
     {{ count }}
    <button @click="increment">Increment</button> 
  </Counter> 
</template>
```

使用作用域范围内的插槽，我们确切地知道可以通过`v-slot`属性访问哪些属性，因此更容易理解代码。 这种方法的缺点是我们只能在模板中访问它，并且只能在Counter组件范围中使用。

那么吹了这么久，是时候亮出 `Composition API`神器了：

```javascript
function useCounter() {
  const count = ref(0)
  function increment () { count.value++ }
  return {
    count,
    incrememt
  }
}

export default {
  setup () {
    const { count, increment } = useCounter()
    return {
      count,
      increment
    }
  }
}
```

是不是看着很舒服清晰呢？ 我们不受模板和组件范围的限制，并且确切地知道可以从计数器访问哪些属性。 另外由于useCounter只是一个返回某些属性的函数，因此我们可以从编辑器中可用的代码提示补全中受益，同时编辑器还可以帮助我们进行类型检查和建议。

![image](https://user-images.githubusercontent.com/10781715/80364986-6f8c1480-88b9-11ea-93e1-c0cbc26d0ea7.png)

![image-20200427190135833](/Users/macbook/Library/Application Support/typora-user-images/image-20200427190135833.png)

如果想了解有关`Composition API`及其用例的更多信息，强烈建议阅读[官方文档](https://vue-composition-api-rfc.netlify.app/#summary)。

#### 全局安装/配置API更改

我们可以发现在实例化和配置应用程序的方式上的一个重大变化，我们看之前vue2中的 `main.js`示例：

```javascript
import Vue from 'vue'
import App from './App.vue'

Vue.use(/* ... */)
Vue.mixin(/* ... */)
Vue.component(/* ... */)
Vue.directive(/* ... */)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

当前，我们正在使用全局Vue对象提供任何配置并创建新的Vue实例。 对Vue对象所做的任何更改都会影响每个Vue实例和组件。

现在，让我们看看它如何在Vue 3中的写法：

```javascript
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(/* ... */)
app.mixin(/* ... */)
app.component(/* ... */)
app.directive(/* ... */)

app.mount('#app')
```

您可能现在已经注意到，每个配置都限于使用createApp定义的某个Vue应用程序。它可以使代码更易于理解，并且不易出现由第三方插件引起的意外问题。 当前，如果某些第三方库正在修改Vue对象，则可能会以意想不到的方式（尤其是全局混合）影响我们的当前应用程序，而Vue 3则不会出现这种情况。此API更改正在此 [RFC](https://github.com/vuejs/rfcs/pull/29) 中讨论。

### Vue3.0项目初始化

第一步先安装 `vue-cli` 脚手架
```javascript
npm install -g @vue/cli
```
特别注意的就是下列错误安装！
```javascript
npm install -g vue-cli
```
安装成功后，我们即可使用 `vue` 命令，测试是否安装成功：
```javascript
$ vue --version  
@vue/cli 4.3.1 
```
第二步，利用安装好的 `vue-cli` 脚手架生成一个vue 项目：
```javascript
vue create vue3.0-beta
```
为了加速安装速度，我们可以使用淘宝源来加快初始化速度：
```javascript
vue create -r https://registry.npm.taobao.org vue3.0-beta
```
第三步，升级vue3.0，目前创建vue3.0项目需要通过插件升级的方式来实现，vue-cli还没有直接支持，我们进入项目目录，通过下面的指令：
```javascript
vue add vue-next
```
执行上述指令后，会自动安装 [vue-cli-plugin-vue-next](https://github.com/vuejs/vue-cli-plugin-vue-next) 插件，该插件会完成以下操作：
- 将 `vue3 beta` 和 `@Vue/compiler sfc` 添加到项目依赖项中
- 更新 `webpack loader` 配置，使其能够支持 `.vue` 文件编译构建
- 自动将代码中的 `vue router` 和 `vuex` 升级到 `4.0版本`，如果未安装则不会升级
- 自动生成 `vue Router` 和 `vuex` 模板代码
完成上述操作后，项目正式升级到 Vue3.0-beta版，不过目前还不支持 `typescript`。

下面再安装我们的 `vue-router`,执行下面的命令：

```javascript
npm install vue-router@4.0.0-alpha.1 --save
```

然后在  `src` 目录下新建 `router` 文件夹，存放路由文件 `index.js`。

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/demo',
    name: 'Demo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "demo" */ '../views/Demo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

初始化 `vue-router` 的过程与 3.0 版本变化不大，只是之前采用构造函数的方式，这里改为使用 `createRouter` 来创建 `Vue Router `实例，配置的方法基本一致，配置完成后我们还需要在 `main.js`中引入。

```javascript
import router from './router';
createApp(App).use(router).mount('#app');
```



### Vue3.0基本特性体验

- Composition API  👉  [useMouse](./src/composables/use-mouse.js)
- setup 👉  [demo1](./src/components/demo/demo1.vue)
- props & context 👉   [demo2](./src/components/demo/demo2.vue)
- reactive & ref & isRef & toRefs  👉  [demo3](./src/components/demo/demo3.vue)
- computed 👉   [demo4](./src/components/demo/demo4.vue)
- watch & watchEffect  👉  [demo5](./src/components/demo/demo5.vue)
- lifeCycle Hooks  👉  [demo6](./src/components/demo/demo6.vue)
- provide & inject  👉  [demo7](./src/components/demo/demo7.vue)
- getCurrentInstance   👉  [demo8](./src/components/demo/demo8.vue)
- 后续体验...

### Vue3.0 composition-api 实战

### 参考文章

- [Vue Composition API](https://vue-composition-api-rfc.netlify.app/#summary)

- [Vue Function-based API RFC](https://zhuanlan.zhihu.com/p/68477600)

  

