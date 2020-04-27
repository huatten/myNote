<template>
  <div class="Home">
    <router-link
      v-for="(item,index) in pageData"
      :to="{ path: item.path }"
      :key="index"
    >{{item.title}}</router-link>
  </div>
</template>

<script>
import { routes } from "../router/index";
import { ref } from "vue";
export default {
  name: "Home",
  setup() {
    const pageData = ref(routes);
    console.log(routes);
    return {
      pageData
    };
  }
};
</script>

<style  scoped>
.Home {
  width: 100%;
  overflow: hidden;
}

.Home a {
  float: left;
  width: 50%;
  box-sizing: border-box;
  border-right: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  background: #f9f9f9;
  text-align: center;
  line-height: 2.5;
}
.Home a:nth-child(2n-1) {
  border-right: 1px solid #d8d8d8;
  border-left: 1px solid #d8d8d8;
}
.Home a:nth-child(2n) {
  border-right: 1px solid #d8d8d8;
}
.Home a:nth-child(1) {
  border-top: 1px solid #d8d8d8;
}
.Home a:nth-child(2) {
  border-top: 1px solid #d8d8d8;
}
</style>
