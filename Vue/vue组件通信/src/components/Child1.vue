<template>
  <div>
    <h2>子组件1号</h2>
    <p>来自父组件的值：{{title}}</p>
    <p><em>{{name}}</em>
    </p>
    <h3>{{msg}}</h3>
    <button @click="toParent">给父组件传值</button>
    <button @click="$boardcast('boardcast', 'hello, 我是子组件1号')">$boardcast 广播子元素</button>
    <grand-child1></grand-child1>
    <grand-child2></grand-child2>
  </div>
</template>
<script>
import GrandChild1 from "./GrandChild1";
import GrandChild2 from "./GrandChild2";
export default {
  name: "Child1",
  props: ["title", "imgHeight"],
  data() {
    return {
      name: "",
      msg: ""
    };
  },
  components: {
    GrandChild1,
    GrandChild2
  },
  mounted() {
    //在模板编译完成后执行
    this.$bus.$on("sendtochild1", name => {
      this.name = '来自兄弟组件2号的值:' + name;
    });
    this.$on("dispatch", msg => {
      this.msg = "接收dispatch消息:" + msg;
    });
    this.$bus.$on("event-bus", msg => {
      this.msg = "接收event-bus消息:" + msg;
    });
  },
  methods: {
    toParent() {
      this.$emit("sendmsg", "子组件1号给父组件传值"); //自定义事件， 传递值
    }
  }
};
</script>

