<template>
  <div id="app">
    <h2>父组件</h2>
    <h3>{{msg}}</h3>
    <button @click="changeRoot()">provide-inject响应式</button>
    <button @click="ref()">ref访问组件</button>
    <!-- 父组件监听子组件触发的 sendmsg 方法 -->
    <!-- getmsg(msg) 接受传递过来的文字 -->
    <child1  ref="child1" :title="titles" :img-height="imgHeight" data-name="child1" v-on:sendmsg="getmsg"></child1>
    <child2 data-name="child2"></child2>
  </div>
</template>

<script>
import Vue from "vue";
import Child1 from "@/components/Child1";
import Child2 from "@/components/Child2";
export default {
  name: "app",
  // provide(){
  //   return {
  //     text:{
  //       root: this.root //这样绑定并不是可响应式的
  //     }
  //   }
  // },

  // provide() {
  //   return {
  //     text: this //方案一：提供祖先元素的实例
  //   }
  // },

  provide(){
    this.text = Vue.observable({
      root: "老祖宗啊"
    })
    return {
      text: this.text
    }
  },
  data() {
    return {
      msg: "",
      titles: "我是你父亲",
      imgHeight: 100,

      root: "老祖宗啊"
    };
  },
  methods: {
    getmsg(msg) {
      //参数就是子组件传递过来的数据
      this.msg = msg;
    },
    // changeRoot(root){ //方案一
    //   if(root){
    //     this.root = root
    //   }else{
    //     this.root = this.root === '老祖宗啊' ? '老祖宗变了' : '老祖宗啊'
    //   }
    // },
    changeRoot(root){ //方案二
      if(root){
        this.text.root = root
      }else{
        this.text.root = this.text.root === '老祖宗啊' ? '老祖宗变了' : '老祖宗啊'
      }
    },
    ref(){
      const child1 = this.$refs.child1;
      child1.say();
    }
  },
  components: { Child1, Child2 },
  mounted() {
    this.$on("dispatch", msg => {
      this.msg = "接收dispatch消息:" + msg;
    });
    this.$bus.$on("event-bus", msg => {
      this.msg = "接收event-bus消息:" + msg;
    });
  }
};
</script>
<style>
div {
  border: 1px orange solid;
  padding: 5px 10px;
  display: inline-block;
  vertical-align: top;
  margin: 5px 30px;
}
h1,
h2 {
  font-size: 18px;
  margin: 5px 0;
}
h3,
em {
  color: red;
  font-size: 14px;
}
button{
  display: block;
}
</style>

