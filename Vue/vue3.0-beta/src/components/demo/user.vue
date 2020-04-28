<template>
  <h3 class="UserProfile">Loaded User: {{ user }}</h3>
</template>

<script type="text/ecmascript-6">
import { ref } from "vue";
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function fetchData() {
  await timeout(5000);
  //throw new Error("service is wrong!");
  const user = "Vue3.0";
  return user;
}

export default {
  async setup() {
    const user = ref(await fetchData());
    return { user };
  }
};
</script>

<style>
</style>