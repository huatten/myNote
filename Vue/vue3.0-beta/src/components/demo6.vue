<template>
  <div class="demo demo6">
    <h2>LifeCycle Hooks 生命周期函数</h2>
    <h4>所有现有的生命周期钩子都会有对应的 onXXX 函数（只能在 setup() 中使用）</h4>
    <h3>counts：{{counts}}</h3>
    <button @click="addcount">change</button> &nbsp;&nbsp;
    <button @click="destroy">destroyed</button>&nbsp;&nbsp;
    <button @click="errorCapture">errorCaptured</button>
  </div>
</template>

<script>
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured
} from "vue";
export default {
  setup() {
    console.log("beforeCreate -> setup", counts); //counts = undefined
    console.log("created -> setup", counts); //counts = undefined
    const counts = ref(0);
    const addcount = () => {
      counts.value = 1;
    };
    const destroy = () => {};
    const errorCapture = () => {};
    onBeforeMount(() => {
      console.log("beforeMount -> onBeforeMount", counts.value); //counts.value = 0
    });
    onMounted(() => {
      console.log("mounted -> onMounted", counts.value); //counts.value = 0
    });
    onBeforeUpdate(() => {
      console.log("beforeUpdate -> onBeforeUpdate", counts.value); //counts.value = 1
    });
    onUpdated(() => {
      console.log("updated -> onUpdated", counts.value); //counts.value = 1
    });
    onBeforeUnmount(() => {
      console.log("beforeDestroy -> onBeforeUnmount", counts.value); //counts.value = 1
    });
    onUnmounted(() => {
      console.log("destroyed -> onUnmounted", counts.value); //counts.value = 1
    });
    onErrorCaptured(() => {
      console.log("errorCaptured -> onErrorCaptured", counts.value); //counts.value = 1
    });
    return {
      counts,
      addcount,
      destroy,
      errorCapture
    };
  }
};
/**
 * 除了beforeCreate和created之外，我们可以在setup方法中访问9个旧的生命周期钩子函数
 * onBeforeMount - 开始挂载前调用
 * onMounted – 组件挂载完成时调用
 * onBeforeUpdate - 当响应式数据发生更改时，在重新渲染前调用
 * onUpdated – 重新渲染之后调用
 * onBeforeUnmount – 在vue实例被销毁之前调用
 * onUnmounted – 在vue实例被销毁之后调用
 * onActivated – 当组件启用keep-alive的时候调用
 * onDeactivated – 当一个开启keep-alive的组件deactivated的时候调用
 * onErrorCaptured – 从子组件捕获错误时调用
 */

/**
 * vue2.0和vue3.0生命周期函数对比
 * beforeCreate -> use setup()
 * created -> use setup()
 * beforeMount -> onBeforeMount
 * mounted -> onMounted
 * beforeUpdate -> onBeforeUpdate
 * updated -> onUpdated
 * beforeDestroy -> onBeforeUnmount
 * destroyed -> onUnmounted
 * errorCaptured -> onErrorCaptured
 *  */
</script>

<style>
</style>
