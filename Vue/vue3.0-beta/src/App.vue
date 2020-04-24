<template>
  <div class="App">
    <h1>Root Component</h1>
    <demo1></demo1>
    <demo2 :count="state.count"></demo2>
    <demo3></demo3>
    <demo4></demo4>
    <demo5></demo5>
  </div>
</template>

<script>
import demo1 from "./components/demo1";
import demo2 from "./components/demo2";
import demo3 from "./components/demo3";
import demo4 from "./components/demo4";
import demo5 from "./components/demo5";
import { reactive } from "vue";
export default {
  setup() {
    const state = reactive({
      count: 0
    });
    setTimeout(() => {
      state.count = 1000;
    }, 2000);
    return {
      state
    };
  },
  components: { demo1, demo2, demo3, demo4, demo5 }
};
</script>


<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.App {
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
button {
  font-size: 18px;
}
</style>
