import { observe } from "./index";
//获取数组原型上的的方法
const arrayProto = Array.prototype;
//复制一份 然后改新的数组方法
export const arrayMethods = Object.create(arrayProto);
//要修改的方法
const methodsPatch = ['push', 'pop', 'unshift', 'shift', 'splice', 'sort', 'reverse'];
methodsPatch.forEach(function (method) {
  //缓存原数组方法
  const origin = arrayProto[method];
  arrayMethods[method] = function (...args) {
    //不光要返回新的数组方法，还要执行监听
    const result = origin.apply(this, args);
    //实现新增属性的监听
    console.log("实现了监听数组属性的变化")
    //拿到新增的属性
    let inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2); //splice（index,howmany,item1,...itemX） 
        break;
    }
    //实现新增属性监听
    inserted && observeArray(inserted);
    //TODO 通知其他使用者改变
    return result;
  }
})
/**
 * 循环监听数组新增的每一个属性
 * @param {*} inserted 
 */
export function observeArray(inserted) {
  for (let i = 0; i < inserted.length; i++) {
    observe(inserted[i])
  }
}