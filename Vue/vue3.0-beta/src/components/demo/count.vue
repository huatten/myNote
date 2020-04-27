<template>
  <div class="count">
    <h3>counter组件：{{count}}</h3>
    <button @click="count+=1">+1s</button>
  </div>
</template>

<script type="text/ecmascript-6">
import { ref } from "vue";

export default {
  setup() {
    // 1. 定义响应式的数据
    const count = ref(0);

    // 2. 把响应式数据 return 给 Template 使用
    return {
      count
    };
  }
};
</script>

<style>
.count{
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
}
</style>