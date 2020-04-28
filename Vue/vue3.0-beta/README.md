# vue3.0-beta体验
2020年4月17日凌晨4点左右看到尤大的提交记录，`vue-next v3.0.0-beta.1` 正式发布，意味着Vue3.0距离正式发布不远了，具体的发布内容大家可以戳[这里](https://github.com/vuejs/vue-next)，具体的Roadmap可以戳 [这里](https://github.com/vuejs/vue/projects/6)。



### Vue3.0新特性

4月21日晚，尤大在哔哩哔哩直播分享了`Vue.js 3.0 Beta`最新进展，想看整体尤大直播的过程的戳 [这里](https://www.bilibili.com/video/BV1eK4y1k7BP?t=16)，想看文字稿的可以看劝退大佬 [总结](https://juejin.im/post/5e9f6b3251882573a855cd52?utm_source=gold_browser_extension)，下面是自己的一点认识和总结。



#### Composition API

`Composition API` 是Vue3.0 中的一大亮点。这是一种全新的逻辑重用和代码组织方法。在Vue2中，我们使用我们称之为`Options API`来构建组件。为了向Vue组件添加逻辑，我们填充（options）属性，如 `data`、`methods`、`computed`等。这种方法的最大缺点是，这本身并不是有效的JavaScript代码。 您需要确切了解模板中可以访问哪些属性，以及此关键字`this`的行为。 在背后Vue编译器需要将此属性转换为被浏览器识别的JavaScript代码。 因此，我们无法从自动建议或类型检查中受益。

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

混入 (mixins) 是一种分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。它在混入之后会与组件相融合组成新的组件并且里面的方法重名时是会覆盖当前方法的，同时还可能会和现有属性和函数名发生冲突，所以命名时需谨慎。

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

![image](https://user-images.githubusercontent.com/10781715/80438019-c1728000-8935-11ea-9c25-6cf40ef3e4c4.png)

如果想了解有关`Composition API`及其用例的更多信息，强烈建议阅读[官方文档](https://vue-composition-api-rfc.netlify.app/#summary)。



#### Global mounting/configuration API change

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

您可能现在已经注意到，每个配置都限于使用 `createApp` 定义的某个Vue应用程序。它可以使代码更易于理解，并且不易出现由第三方插件引起的意外问题。 当前，如果某些第三方库正在修改Vue对象，则可能会以意想不到的方式（尤其是全局混合）影响我们的当前应用程序，而Vue 3则不会出现这种情况。此API更改正在此 [RFC](https://github.com/vuejs/rfcs/pull/29) 中讨论。



#### Fragments

Vue 3中另一个激动人心的附加功能就是 `Fragments`，可以叫它碎片，那什么叫碎片呢？如果您创建一个Vue组件，则它只能有一个根节点。我们可以查看官网文档 [片段实例]([https://cn.vuejs.org/v2/guide/migration.html#%E7%89%87%E6%AE%B5%E5%AE%9E%E4%BE%8B%E7%A7%BB%E9%99%A4](https://cn.vuejs.org/v2/guide/migration.html#片段实例移除))，当然这也是很好的一道vue面试题— [vue为什么要求组件模板只能有一个根元素？](https://github.com/haizlin/fe-interview/issues/457)，其实这个问题官方 issues下面也有 [解释](https://github.com/vuejs/vue/issues/7088#issuecomment-357899727) 的。

```vue
<template>
  <div>Hello</div>
  <div>World</div>
</template>
```

像上面这样的操作在Vue2中是会报错的，原因是任何Vue组件的Vue实例都需要绑定到单个DOM元素中。创建具有多个DOM节点的组件的唯一方法是创建一个没有底层Vue实例的功能组件 `functional component `。

原来React社区也有同样的问题。他们提出的 [解决方案](https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html) 是创建一个名为Fragment的虚拟元素。

```react
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>Hello</div>
        <div>World</div>
      </React.Fragment>
    );
  }
}
```

尽管Fragment看起来像是普通的DOM元素，但它是虚拟的，根本不会在DOM树中呈现。 这样，我们可以将组件功能绑定到单个元素中，而无需创建冗余DOM节点。

如何可以在Vue2中使用`Fragments` ？这要依赖一个名为   `vue-fragments`，具体使用可以看 [文档](https://www.npmjs.com/package/vue-fragments)。但是在Vue3中我们无须依赖别的库了。



#### Suspense

 `Suspense组件` 又是一个比较有亮点的功能，也是受到React启发。Suspense 能够暂停你的组件渲染，并渲染后备组件，直到条件满足为止。在 Vue London 期间，尤雨溪简短地谈到了这个主题，并向我们展示了可以期望的 API。事实证明，Suspense 只是带有插槽的组件：

```vue
<Suspense>
  <template >
    <Suspended-component />
  </template>
  <template #fallback>
    Loading...
  </template>
</Suspense>
```

直到 `Suspended-component` 完全渲染前将会显示后备内容。挂起可以等待，直到该组件被下载（如果该组件是异步组件的话），或者在 `setup` 函数中执行一些异步操作。

那我们啥时候使用异步组件呢？其实场景还是蛮多的，比如每当我们希望组件等到它获取数据（通常是在异步API调用中）时，我们可以使用Vue3 `Composition API` 创建一个异步组件。



#### Multiple v-models

V-model 是一种指令，可用于在给定组件上实现双向绑定。我们可以传递响应性属性，并从组件内部对其进行修改。

我们可以从表单元素上很好的了解 `v-model`：

```vue
<input v-model="val"/>
```

其实是语法糖， `v-model` 只是传递 `value` 属性和侦听 `input` 事件的捷径。把上面的例子重写为以下语法，将具有完全相同的效果：

```vue
<input 
  v-bind:value="val"
  v-on:input="val = $event.target.value"
/>
```

我们甚至可以用组件 `model` 属性来更改默认属性和事件的名称：

```javascript
model: {
  prop: 'checked',
  event: 'change'
}
```

如果我们想要在组件中进行双向绑定，`v-model` 指令可能是一个非常有用的语法。不幸的是，每个组件只能有一个 `v-model`。但是在 Vue 3 中就不会有问题！你将能够给 `v-model` 属性名，并根据需要拥有尽可能多的属性名。在下面的例子中，你可以在表单组件中找到两个 `v-model`：

```vue
<InviteeForm
  v-model:name="inviteeName"
  v-model:email="inviteeEmail"
/>
```

可以在 [Vue 3 Template Explorer]([https://vue-next-template-explorer.netlify.app/#%7B%22src%22%3A%22%3CInviteeForm%5Cr%5Cn%20%20v-model%3Aname%3D%5C%22inviteeName%5C%22%5Cr%5Cn%20%20v-model%3Aemail%3D%5C%22inviteeEmail%5C%22%5Cr%5Cn%2F%3E%22%2C%22options%22%3A%7B%22mode%22%3A%22module%22%2C%22prefixIdentifiers%22%3Afalse%2C%22optimizeBindings%22%3Afalse%2C%22hoistStatic%22%3Afalse%2C%22cacheHandlers%22%3Afalse%2C%22scopeId%22%3Anull%7D%7D](https://vue-next-template-explorer.netlify.app/#{"src"%3A""%2C"options"%3A{"mode"%3A"module"%2C"prefixIdentifiers"%3Afalse%2C"optimizeBindings"%3Afalse%2C"hoistStatic"%3Afalse%2C"cacheHandlers"%3Afalse%2C"scopeId"%3Anull}})) 中看下编译结果，目前，此 API 的更改已在[这个 RFC](https://github.com/vuejs/rfcs/pull/31) 中进行讨论。



#### Teleport 

在Vue 3 alpha版本中还叫做Portal，不过在beta版中最终命名为Teleport。Portal 是特殊的组件，用来在当前组件之外渲染某些内容。它也是[在 React 中实现](https://pl.reactjs.org/docs/portals.html)的功能之一，React中关于Portals的内容：

“*Portals 提供了一种独特的方法来将子级渲染到父组件的 DOM 层次结构之外的 DOM 节点中。*”

这种处理模式，是弹出式窗口以及通常显示在页面顶部的组件所使用的一种非常好的方法。使用Portal，你可以在DOM树中的其他位置呈现组件，即使该位置不在应用程序的作用域中。当处理modal、通知、弹出窗口或其他对它们在DOM树中的位置敏感的元素时，Portal非常方便。对于每个 Portal，我们需要为其指定目标位置，在该目标位置将渲染 Portals内容。在下面，你可以从 [portal-vue](https://portal-vue.linusb.org/) 库中看到实现，该库将此功能添加到了 Vue 2， 里面有文档加例子说明。

比如这样的需求，点击按钮弹出确认提示弹窗：

```vue
<!-- UserCard.vue -->
<template>
  <div class="user-card">
    <b> {{ user.name }} </b>  
    <button @click="isPopUpOpen = true">Remove user</button>
    <div v-show="isPopUpOpen">
      <p>Are you sure?</p>
      <button @click="removeUser">Yes</button>
      <button @click="isPopUpOpen = false">No</button>
    </div>
  </div>
</template>
```

在代码维护方面，将相关组件（确认弹出窗口）保持在同一位置是一个很好的做法。但是当涉及到应该出现在其他元素之上的UI元素时，它可能会导致一些问题，当然我们可以通过 `z-index`来调节，但是弹窗多了层级大小也没法维护了。这就是为什么我们通常会将UI元素放在其他元素的上面，就在结束标记之前。这样我们就不需要做任何操作来确保我们的弹出窗口显示了我们想要的确切位置和方式，而且还确保其他元素不会覆盖它。

那么看起来两点矛盾：

- 我们应该保持相关组件在一起，这意味着要保持弹出窗口在当前组件中
- 我们应该把弹出窗口放在结束body标记之前

为了满足这两个需求，我们需要确保即使弹出代码位于当前组件中，它也会被渲染在其他地方——那么理想的情况，就在结束body标记之前。

Portal Component 只有一个 `to` 属性和一个默认插槽，插槽内容将渲染在DOM元素中，该元素由传递给目标属性的查询选择器选择。

```vue
<!-- In some nested Vue component -->
<NestedComponent>
  <Teleport to="#popup-target">
    <PopUp />
  </Teleport>
</NestedComponent>
<!-- before closing body tag -->
<div id="popup-target"></div>
```

在上面的示例中，PopUp组件将在id为portal-targe的div中渲染，即使它位于NestedComponent组件中。知道了这一点，我们可以改写我们的组件：

```vue
<!-- UserCard.vue -->
<template>
  <div class="user-card">
    <b> {{ user.name }} </b>  
    <button @click="isPopUpOpen = true">Remove user</button>
    <Teleport to="#popup-target">
      <div v-show="isPopUpOpen">
        <p>Are you sure?</p>
        <button @click="removeUser">Yes</button>
        <button @click="isPopUpOpen = false">No</button>
      </div>
    </Teleport>
  </div>
</template>
```

完美解决，也可以看尤大大提供的 [官方示例](https://github.com/vuejs/vue-next/blob/46490ac1a5a7a20411affcd93877174c6dc007a7/packages/vue/examples/transition/modal.html)。

#### New custom directives API

自定义指令 API 在 Vue 3 中将略有变化，以便更好地与组件生命周期保持一致。这项改进应使 API 更加直观，从而使新手更容易理解和学习 API。

这是当前的自定义指令 API：

```js
const MyDirective = {
  bind(el, binding, vnode, prevVnode) {},
  inserted() {},
  update() {},
  componentUpdated() {},
  unbind() {}
}
```

这是在 Vue 3 中的样子。

```javascript
const MyDirective = {
  beforeMount(el, binding, vnode, prevVnode) {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {}, // new
  unmounted() {}
}
```

[在此 RFC](https://github.com/vuejs/rfcs/pull/32/files) 中讨论了这个 API 的更改。



#### No filters

vue3中将取消 `filter` 过滤器，不过这个提案还在 Active阶段，戳 [这里](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0015-remove-filters.md)。

```vue
<!--vue2-->
<div>
  {{count | formatMoney}}
</div>
<!--vue3-->
<div>
  {{formatMoney(count)}}
</div>
```



###  Vue3.0项目初始化

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



### Vue3.0体验demo

- Composition API  👉  [useMouse](./src/composables/use-mouse.js)
- setup 👉  [demo1](./src/components/demo/demo1.vue)
- props & context 👉   [demo2](./src/components/demo/demo2.vue)
- reactive & ref & isRef & toRefs  👉  [demo3](./src/components/demo/demo3.vue)
- computed 👉   [demo4](./src/components/demo/demo4.vue)
- watch & watchEffect  👉  [demo5](./src/components/demo/demo5.vue)
- lifeCycle Hooks  👉  [demo6](./src/components/demo/demo6.vue)
- provide & inject  👉  [demo7](./src/components/demo/demo7.vue)
- getCurrentInstance   👉  [demo8](./src/components/demo/demo8.vue)
- Suspense  👉  [demo9](./src/components/demo/demo9.vue)
- Teleport  👉  [demo10](./src/components/demo/demo10.vue)
- 后续体验...

### 参考文章

- [Exciting new features in Vue 3](https://vueschool.io/articles/vuejs-tutorials/exciting-new-features-in-vue-3/)

- [Vue Composition API](https://vue-composition-api-rfc.netlify.app/#summary)

- [Vue Function-based API RFC](https://zhuanlan.zhihu.com/p/68477600)

- [Vue RFCs](https://github.com/vuejs/rfcs/)

- [Portal – a new feature in Vue 3](https://vueschool.io/articles/vuejs-tutorials/portal-a-new-feature-in-vue-3/)

  

