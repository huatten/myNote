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
    <h3>toRefs(): {{userName}}</h3>
    <h3 ref="h3Ref">template refs: 通过 ref() 还可以引用页面上的元素</h3>
    <button @click="showNumber">获取counter组件中的count值</button>
    <!-- 3. 为组件添加 ref 引用 -->
    <count ref="comRef"></count>
  </div>
</template>

<script>
import { onMounted, ref, reactive, isRef, toRefs } from "vue";
import count from "./count";
export default {
  setup() {
    const age = ref(18);
    //创建响应式数据对象，得到的 state 类似于 vue 2.x 中 data() 返回的响应式对象
    const state = reactive({
      reactCount: 1,
      userName: "toRefs",
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

    /**
     * isRef() 用来判断某个值是否为 ref() 创建出来的对象
     */
    const unwrapped = isRef(age);
    console.log(`Is age make by ref ? => ${unwrapped}`);

    /**
     * toRefs() 函数 将 state 上的每个属性，都转化为 ref 形式的响应式数据
     */
    //return {
    //...toRefs(state),  在template中可以直接通过 userName 获取<h3>toRefs(): {{userName}}</h3>
    //};

    /**
     * template refs: 通过 ref() 还可以引用页面上的元素或组件
     */
    // 创建一个 DOM 引用
    const h3Ref = ref(null);
    // 在 DOM 首次加载完毕之后，才能获取到元素的引用
    onMounted(() => {
      // 为 dom 元素设置字体颜色
      // h3Ref.value 是原生DOM对象
      h3Ref.value.style.color = "red";
    });
    //  创建一个组件的 ref 引用
    const comRef = ref(null);
    //展示子组件中 count 的值
    const showNumber = () => {
      alert(` count组件的count值为：${comRef.value.count}`);
    };
    return {
      //...toRefs(state),  在template中可以直接通过 userName 获取<h3>toRefs(): {{userName}}</h3>
      state,
      refCount,
      age,
      h3Ref,
      comRef,
      showNumber
    };
  },
  //注意在template 中访问响应式数据， 包装对象会自动展开
  template: `<button>count是：{{reactCount}} </button>`,
  components: { count }
};
</script>

<style>
</style>
