<template>
  <div class="demo demo5">
    <h2>watchEffect && watch</h2>
    <h4>watchEffect() 函数用来监视某些数据项的变化，从而触发某些特定的操作</h4>
    <h3>watch: {{count}}</h3>
    <button @click="add">add</button>&nbsp;&nbsp;
    <button @click="stopwatch">stop watch</button>&nbsp;&nbsp;
    <h3>my name is {{state.name}}, age is {{state.age}} years old</h3>
    <button @click="watchMultiple">Watch Multiple</button>
    <br />
    <input v-model="inputVal" type="text" />
    <span>{{inputVal}}</span>
  </div>
</template>

<script>
import { reactive, ref, watchEffect, watch } from "vue";
export default {
  setup() {
    const count = ref(18);
    //一、watchEffect() 返回一个停止观察的函数  同时组件销毁时也会被自动停止
    const stop = watchEffect(() =>
      console.log(`count.value is update: ${count.value}`)
    );
    const add = () => {
      count.value++;
    };

    //二、清除监视
    const stopwatch = () => {
      stop();
    };

    //三、监听多个数据源
    const state = reactive({ name: "vue3", age: 3 });
    //`watch` now only supports `watch(source, cb, options?) signature.
    watch(
      [() => state.name, () => state.age],
      ([name, age], [oldName, oldAge]) => {
        console.log(`new name is ${name}`);
        console.log(`new age is ${age}`);
        console.log(`old name is ${oldName}`);
        console.log(`old age is ${oldAge}`);
      }
    );
    const watchMultiple = () => {
      state.age++;
      state.name = `vue${state.age}`;
    };

    //四、在watch中清除无效异步任务 清理副作用
    const inputVal = ref("");
    const asyncFn = val => {
      return setTimeout(() => {
        console.log(`输入完成1s后执行结果：${val}`);
      }, 1000);
    };

    //一个异步操作在完成之前数据就产生了变化，我们可能要撤销还在等待的前一个操作。
    //为了处理这种情况，watcher 的回调会接收到的第三个参数是一个用来注册清理操作的函数。调用这个函数可以注册一个清理函数
    watch(inputVal, (inputVal, oldInputval, onCleanup) => {
      //执行异步任务得到id
      const timerId = asyncFn(inputVal);
      //inputVal 发生改变，或者watcher即将被停止
      //取消还未完成的异步操作
      //如果 watch 被重复执行，则会先清除上次未完成的异步任务
      onCleanup(() => clearTimeout(timerId));
    });

    //五、watch回调的调用时机
    //默认情况下，所有的 watcher 回调都会在当前的 renderer flush 之后被调用。
    //这确保了在回调中 DOM 永远都已经被更新完毕。如果你想要让回调在 DOM 更新之前或是被同步触发，可以使用 flush 选项
    watch(
      () => count.value + 1,
      () => console.log(`count changed`),
      {
        flush: "post", // default, fire after renderer flush
        flush: "pre", // fire right before renderer flush
        flush: "sync" // fire synchronously
      }
    );
    return {
      count,
      state,
      add,
      stopwatch,
      watchMultiple,
      inputVal
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
