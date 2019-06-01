<template>
  <div>
    <h2>孙孙子组件1号</h2>
    <p>祖先元素提供的数据：{{text.root}}</p>
    <button @click="$dispatch('dispatch', 'hello，我是孙孙子组件1号')">$dispatch向上传递</button>
    <h3>{{msg}}</h3>
  </div>
</template>
<script>
export default {
  name: "GrandGrandChild1",
  inject: {
    text: {
      
    }
  },
  data() {
    return {
      msg: ""
    };
  },
  props:{
    color:{
      type: String,
      default: "red"
    }
  },
  mounted() {
    this.$on("boardcast", msg => {
      this.msg = "接收boardcast消息:" + msg;
    });
    this.$bus.$on("event-bus", msg => {
      this.msg = "接收event-bus消息:" + msg;
    });
  }
};
</script>

