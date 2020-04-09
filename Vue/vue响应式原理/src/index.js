import Vue from "vue";
let vm = new Vue({
  el: "#app",
  data() {
    return {
      msg: "Vue",
      school: { name: "Buu" },
      arr: [1, 2, 3]
    }
  },
  computed: {},
  watch: {}
})

vm.arr.push(4)
