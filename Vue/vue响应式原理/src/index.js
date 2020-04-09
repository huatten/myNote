import Vue from "vue";
let vm = new Vue({
  el: "#app",
  data() {
    return {
      msg: "Vue",
      school: { name: "Buu" }
    }
  },
  computed: {},
  watch: {}
})

vm.$data.msg == 1