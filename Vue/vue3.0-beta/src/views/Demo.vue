<template>
  <div class="Demo">
    <h1>Root Component</h1>
    <h3>pageX: {{x}}, pageY:{{y}}</h3>
    <demo1></demo1>
    <demo2 :count="state.count"></demo2>
    <demo3></demo3>
    <demo4></demo4>
    <demo5></demo5>
    <demo6></demo6>
    <demo7></demo7>
    <div class="Demo7Btn">
      <button @click="themeColor='black'">黑色</button>
      <button @click="themeColor='blue'">蓝色</button>
      <button @click="themeColor='pink'">粉色</button>
    </div>
    <demo8></demo8>
  </div>
</template>

<script type="text/ecmascript-6">
import demo1 from "../components/demo/demo1";
import demo2 from "../components/demo/demo2";
import demo3 from "../components/demo/demo3";
import demo4 from "../components/demo/demo4";
import demo5 from "../components/demo/demo5";
import demo6 from "../components/demo/demo6";
import demo7 from "../components/demo/demo7";
import demo8 from "../components/demo/demo8";
import { useMouse } from "../composables/use-mouse";
import { reactive, provide, ref } from "vue";
export default {
  setup() {
    const state = reactive({
      count: 0
    });
    const { x, y } = useMouse();
    setTimeout(() => {
      state.count = 1000;
    }, 2000);
    // 定义 ref 响应式数据
    const themeColor = ref("red");

    // 把 ref 数据通过 provide 提供的子组件使用
    provide("globalColor", themeColor);

    return {
      state,
      x,
      y,
      themeColor
    };
  },
  components: { demo1, demo2, demo3, demo4, demo5, demo6, demo7, demo8 }
};
</script>

<style>
.Demo {
  border: 1px solid dodgerblue;
  padding: 30px;
}
.demo {
  padding: 20px;
  margin: 10px;
  border: 1px solid red;
}
.demo h3 {
  color: #42b983;
}
.Demo button {
  font-size: 18px;
}
</style>