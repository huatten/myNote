<template>
  <div class="demo demo7">
    <h2>provide && inject</h2>
    <h4>provide() 和 inject() 可以实现嵌套组件之间的数据传递</h4>
    <h3>
      父组件传来的themeColor是
      <span :style="{color: themeColor}">{{themeColor}}</span>
    </h3>
  </div>
</template>

<script>
import { inject, getCurrentInstance } from "vue";
export default {
  setup() {
    const { ctx } = getCurrentInstance();
    console.log(ctx);
    //调用 inject 函数时，通过指定的数据名称，获取到父级共享的数据
    const themeColor = inject("globalColor");
    //把接收到的共享数据 return 给 Template 使用
    return { themeColor };
  }
};
</script>

<style>
</style>
