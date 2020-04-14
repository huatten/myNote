import Vue from "vue";
let vm = new Vue({
  el: "#app",
  data() {
    return {
      msg: "Vue",
      school: { name: "Buu" },
      arr: [1, 2, 3, { age: 30 }],
      list: ["VUE", "REACT", "ANGULAR"],
      watchs: "$watch测试",
    }
  },
  computed: {},
  watch: {
    msg(newValue, oldValue) {
      console.log("--watch start--")
      console.log(newValue, oldValue); //Hello, Vue
      console.log("--watch end--")
      /**
       * 这样使用watch时有一个特点，就是当值第一次绑定的时候，不会执行监听函数，只有值发生改变才会执行。如果我们需要在最初绑定值的时候也执行函数，则就需要用到immediate属性。
       */
    },
    'school.name': {
      handler(newValue, oldValue) {
        console.log("--immediate start--")
        console.log(`newVal:${newValue}, oldVal:${oldValue}`)
        console.log("--immediate end--")
      },
      deep: true,
      immediate: true
    }
  }
})

vm.arr[3].age = 108

//重写数组方法
// vm.arr.splice(1, 2)

//批量更新和防止重复渲染
// setTimeout(() => {
//   vm.school.name = "111"
//   vm.school.name = "222"
//   vm.school.name = "333"
// }, 3000)

//数组依赖收集
setTimeout(() => {
  vm.list.push("WEBPACK")
}, 1000)

//watch 
vm.msg = "Hello";

//vm.$watch
vm.$watch('watchs', function (newVal, oldVal) {
  // todo
  console.log(`调用了$watch，newVal是${newVal}，oldVal是${oldVal}`)
})
vm.watchs = "$watch调用辣";

//深度监听
setTimeout(() => {
  vm.school.name = "USTB"
}, 2000)
//可以看到初次进入 即可监听到school.name  打印  newVal:Buu, oldVal:undefined
//2s之后值额更新为 newVal:USTB, oldVal:Buu
