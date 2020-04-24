<template>
  <div class="demo demo1">
    <h2>setup</h2>
    <h4>它会在一个组件实例被创建时，初始化了props之后调用，即在 beforeCreate 之后、created 之前执行</h4>
    <h3>ref：{{counts}}</h3>
    <!--
      虽然 setup() 返回的 counts 是一个包装对象，但在模版中我们直接用了 {{ counts }}这样的绑定，没有用 .value。
      这是因为当包装对象被暴露给模版渲染上下文，或是被嵌套在另一个响应式对象中的时候，它会被自动展开 (unwrap)为内部的值。
    -->
    <button @click="addcount">addcount</button>
  </div>
</template>

<script>
import { ref, computed } from "vue";
export default {
  setup() {
    const counts = ref(0);
    //ref() 返回的是一个 value reference （包装对象）。
    //一个包装对象只有一个属性：.value ，该属性指向内部被包装的值。
    //包装对象的值可以被直接修改
    const addcount = () => {
      counts.value++;
    };
    // 读取
    console.log(counts.value); //0
    /**
     * 包装对象也可以包装非原始值类型的数据，被包装的对象中嵌套的属性都会被响应式地追踪。
     * 用包装对象去包装对象或是数组并不是没有意义的：它让我们可以对整个对象的值进行替换
     *  比如用一个 filter 过的数组去替代原数组：
     */
    const arr = ref([1, 2, 3]);
    console.log(arr.value); //Proxy {0: 1, 1: 2, 2: 3}
    arr.value = arr.value.filter(n => n > 1);
    console.log(arr.value); //Proxy {0: 2, 1: 3}
    return {
      counts,
      addcount
    };
  }
};
/**
 * 我们知道在 JavaScript 中，原始值类型如 string 和 number 是只有值，没有引用的。
 * 如果在一个函数中返回一个字符串变量，接收到这个字符串的代码只会获得一个值，是无法追踪原始变量后续的变化的。
 * 因此，包装对象的意义就在于提供一个让我们能够在函数之间以引用的方式传递任意类型值的容器。
 * 这有点像 React Hooks 中的 useRef —— 但不同的是 Vue 的包装对象同时还是响应式的数据源。
 */
</script>

<style>
</style>
