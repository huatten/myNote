# vue3.0-beta体验
2020年4月17日凌晨4点左右看到尤大的提交记录，`vue-next v3.0.0-beta.1` 正式发布，意味着Vue3.0距离正式发布不远了，具体的发布内容大家可以戳[这里](https://github.com/vuejs/vue-next)，下面就真香体验一波。

### Vue3.0最新进展

4月21日晚，尤大在哔哩哔哩直播分享了`Vue.js 3.0 Beta`最新进展，想看整体尤大直播的过程的戳 [这里](https://www.bilibili.com/video/BV1eK4y1k7BP?t=16)，想看文字稿的可以看劝退大佬 [总结](https://juejin.im/post/5e9f6b3251882573a855cd52?utm_source=gold_browser_extension)。

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

### Vue3.0基本特性体验

- Composition API  👉  [useMouse](./src/component/useMouse.js)
- setup 👉  [demo1](./src/component/demo1.vue)
- props和context 👉   [demo2](./src/component/demo2.vue)
- reactive和ref  👉  [demo3](./src/component/demo3.vue)
- computed 👉   [demo4](./src/component/demo4.vue)
- watch和watchEffect  👉  [demo5](./src/component/demo5.vue)
- lifeCycle Hooks  👉  [demo6](./src/component/demo6.vue)
- 后续体验...

参考文章
- [Vue Composition API](https://vue-composition-api-rfc.netlify.app/#summary)
- [Vue Function-based API RFC](https://zhuanlan.zhihu.com/p/68477600)