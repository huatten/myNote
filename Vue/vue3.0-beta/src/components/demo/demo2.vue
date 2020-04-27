<template>
  <div class="demo demo2">
    <h2>props && context</h2>
    <h4>在 props 中定义当前组件允许外界传递过来的参数名称，通过 setup 函数的第一个形参，接收 props 数据</h4>
    <h3>props: {{count}}</h3>
  </div>
</template>

<script>
import { ref, watch } from "vue";
export default {
  props: {
    count: Number
  },
  setup(props, context) {
    console.log("props.count：" + props.count); //0
    console.log(context);
    /**
     * context.attrs
     * context.slots
     * context.parent
     * context.root
     * context.emit
     * context.refs
     */
    watch(
      () => props.count,
      (value, oldValue) => {
        console.log(`watch props.count value:${value} oldValue:${oldValue}`);
      }
    );
    /**
     * 还可以直接通过 watch 方法来观察某个 prop 的变动，这是为什么呢？
     * 答案非常简单，就是 props本身在源码中，也是一个被 reactive 包裹后的对象，
     * 因此它具有响应性，所以在watch 方法中的回调函数会自动收集依赖，
     * 之后当 count 变动时，会自动调用这些回调逻辑。
     */
  }
};
</script>

<style>
</style>
