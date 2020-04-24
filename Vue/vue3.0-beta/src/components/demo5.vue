<template>
  <div class="demo demo5">
    <h2>watchEffect</h2>
    <h4>watchEffect() 函数用来监视某些数据项的变化，从而触发某些特定的操作</h4>
    <h3>
      watch: {{count}} &nbsp;&nbsp;
      <button @click="add">add</button>&nbsp;&nbsp;
      <button @click="stopwatch">stop watch</button>
    </h3>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
export default {
  setup() {
    const count = ref(18);
    const refA = ref(111);
    const refB = ref(222);
    const prevA = ref([0]);
    const prevB = ref(["p"]);
    //watchEffect() 返回一个停止观察的函数  同时组件销毁时也会被自动停止
    const stop = watchEffect(() =>
      console.log(`count.value is update: ${count.value}`)
    );

    const add = () => {
      count.value++;
    };
    const stopwatch = () => {
      stop();
    };
    return {
      count,
      add,
      stopwatch
    };
    /**
     * watch() 接收的第一个参数被称作 “数据源”，它可以是:
     * 1.一个返回任意值的函数
     * 2.一个包装对象
     * 3.一个包含上述两种数据源的数组
     * 第二个参数是回调函数。回调函数只有当数据源发生变动时才会被触发
     * 和 2.x 的 $watch 有所不同的是，watch() 的回调会在创建时就执行一次。
     * 这有点类似 2.x watcher 的 immediate: true 选项
     * 但有一个重要的不同：默认情况下 watch() 的回调总是会在当前的 renderer flush 之后才被调用
     * 换句话说，watch()的回调在触发时，DOM 总是会在一个已经被更新过的状态下。 这个行为是可以通过选项来定制的。
     */
  }
};
</script>

<style>
</style>
