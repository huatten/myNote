<template>
  <div class="demo demo9">
    <h2>Suspense</h2>
    <h4>Suspense 能够暂停你的组件渲染，并渲染后备组件，直到条件满足为止。</h4>
    <div class="error" v-if="error">{{error}}</div>
    <Suspense v-else>
      <template #default>
        <user-profile></user-profile>
      </template>
      <template #fallback>
        <div class="loading">Loading...</div>
      </template>
    </Suspense>
  </div>
</template>

<script type="text/ecmascript-6">
import { onErrorCaptured, ref } from "vue";
import UserProfile from "./user";
export default {
  setup() {
    const error = ref(null);
    onErrorCaptured(e => {
      error.value = e;
      return true;
    });
    return { error };
  },
  components: { UserProfile }
};
</script>

<style>
.demo9 .error {
  color: red;
  font-size: 20px;
}
</style>