import Vue from "vue";
let vm = new Vue({
  el: "#app",
  data() {
    return {
      msg: "Vue",
      school: { name: "Buu" },
      arr: [1, 2, 3, { age: 30 }]
    }
  },
  computed: {},
  watch: {}
})
vm.arr[3].age = 108
vm.arr.splice(1, 2)
setTimeout(() => {
  vm.school.name = "W3c"
}, 3000)


