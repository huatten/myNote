<template>
  <div>
    <h2>孙子组件2号</h2>
    <p>祖先元素提供的数据：{{text.root}}</p>
    <button @click="eventBus">$bus发布</button>
    <h3>{{msg}}</h3>
    <grand-grand-child1></grand-grand-child1>
  </div>
</template>
<script>
import GrandGrandChild1 from "./GrandGrandChild1";
export default {
  name: "GrandChild2",
  inject: {
    text: {}
  },
  data() {
    return {
      msg: ""
    };
  },
  components: { GrandGrandChild1 },
  mounted() {
    this.$on("dispatch", msg => {
      this.msg = "接收dispatch消息:" + msg;
    });
    this.$on("boardcast", msg =>{
      this.msg = "接收boardcast消息:" + msg;
    })
  },
  methods: {
    eventBus() {
      this.$bus.$emit("event-bus", "eventBus");
    }
  }
};
</script>

