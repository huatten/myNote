<template>
  <div class="demo demo3">
    <h2>reactive && ref</h2>
    <h4>
      reactive() 函数接收一个普通对象，返回一个响应式的数据对象。
      <br />ref() 函数用来根据给定的值创建一个响应式的数据对象，ref() 函数调用的返回值是一个对象，这个对象上只包含一个 .value 属性。
    </h4>
    <h3>reactive: {{state.reactCount}}</h3>
    <h3>ref: {{refCount}}</h3>
    <h3>在 reactive 对象中访问 ref 创建的响应式数据: {{age}}</h3>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  setup() {
    const age = ref(18);
    //创建响应式数据对象，得到的 state 类似于 vue 2.x 中 data() 返回的响应式对象
    const state = reactive({
      reactCount: 1,
      age
    });
    /**
     * 当把 ref() 创建出来的响应式数据对象，挂载到 reactive() 上时，
     * 会自动把响应式数据对象展开为原始的值，不需通过 .value 就可以直接被访问。
     */
    state.age++; //19
    console.log(state); //Proxy {counts: 0}
    const refCount = ref(2);
    console.log(refCount.value); //2
    return {
      state,
      refCount,
      age
    };
  },
  //注意在template 中访问响应式数据， 包装对象会自动展开
  template: `<button>count是：{{reactCount}} </button>`
};
</script>

<style>
</style>
