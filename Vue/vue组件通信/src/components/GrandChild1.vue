<template>
  <div>
    <h2>孙子组件1号</h2>
    <p>祖先元素提供的数据：{{text.root}}</p>
    <h3>{{msg}}</h3>
  </div>
</template>
<script>
export default {
  name: "GrandChild1",
  inject: {
    text: {}
  },
  data() {
    return {
      msg: ""
    };
  },
  components: {},
  mounted() {
    this.$on("dispatch", msg => {
      this.msg = "接收dispatch消息:" + msg;
    });
    this.$on("boardcast", msg => {
      this.msg = "接收boardcast消息:" + msg;
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

