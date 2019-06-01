<template>
  <div>
    <h2>子组件2号</h2>
    <button @click="toChild1">给兄弟组件1号传值</button>
    <grand-child1></grand-child1>
  </div>
</template>
<script>
import GrandChild1 from "./GrandChild1";
export default {
  name: "Child1",
  props: ["title"],
  data() {
    return {
      msg: ""
    };
  },
  components: {
    GrandChild1
  },
  mounted() {
    this.$on("dispatch", msg => {
      this.msg = "接收dispatch消息:" + msg;
    });
    this.$bus.$on("event-bus", msg => {
      this.msg = "接收event-bus消息:" + msg;
    });
  },
  methods: {
    toChild1() {
      this.$bus.$emit("sendtochild1", "我是从子组件2号传过来的");
    }
  }
};
</script>

