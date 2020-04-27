<template>
  <div class="demo demo4">
    <h2>computed</h2>
    <h4>用来创建计算属性，返回值是一个 ref 的实例</h4>
    <h3>只读的计算属性: {{readonlyCount}}</h3>
    <h3>创建可读可写的计算属性: {{writeAndreadCount}}</h3>
  </div>
</template>

<script>
import { ref, computed } from "vue";
export default {
  setup() {
    const count = ref(4);
    // 根据 count 的值，创建一个响应式的计算属性 readonlyCount
    // 它会根据依赖的 ref 自动计算并返回一个新的 ref
    const readonlyCount = computed(() => count.value + 1);
    // 创建一个 computed 计算属性
    const writeAndreadCount = computed(
      // read
      () => count.value + 1,
      // write
      val => {
        count.value = val - 1;
      }
    );
    /**
     * computed() 返回的是一个只读的包装对象，
     * 它可以和普通的包装对象一样在 setup() 中被返回 ，
     * 也一样会在渲染上下文中被自动展开，默认情况下，如果用户试图去修改一个只读包装对象，会触发警告。
     */
    console.log(readonlyCount.value); //5
    readonlyCount.value++; //Write operation failed: computed value is readonly

    writeAndreadCount.value = 9;
    console.log(writeAndreadCount.value); //5
    return {
      count,
      readonlyCount,
      writeAndreadCount
    };
  }
};
</script>

<style>
</style>
