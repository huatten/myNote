<template>
  <div class="demo demo8">
    <h2>getCurrentInstance</h2>
    <h4>Vue 3.0 中通过 getCurrentInstance 方法获取当前组件的实例，然后通过 ctx 属性获得当前上下文</h4>
    <h3>当前路由：{{currentRoute}}</h3>
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";
export default {
  setup() {
    const { ctx } = getCurrentInstance();
    const currentRoute = ctx.$router.currentRoute.value.path;
    return {
      currentRoute
    };
  }
};
</script>

<style>
</style>
