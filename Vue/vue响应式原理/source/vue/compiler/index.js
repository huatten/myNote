import { nodeToFragment } from "../util"
export default class Compiler {
  constructor(vm) {
    this.$el = vm.$el;
    this.vm = vm;
    if (this.$el) {
      //原始dom转换为文档碎片
      const fragment = nodeToFragment(this.$el);
      //编译模板
      this.compiler(fragment);
      //把文档碎片添加到页面中
      this.$el.appendChild(fragment);
    }
  }
  /**
   * 模板编译
   * @param {*} node 
   */
  compiler(node) {
    const childNodes = node.childNodes;
    [...childNodes].forEach(child => {
      if (child.nodeType === 1) {//元素节点
        //递归遍历当前子节点
        this.compiler(child);
      } else if (child.nodeType === 3) {//文本节点
        this.compilerTextNode(child);
      }
    })
  }
  /**
   * 文本节点编译
   * @param {*} node 
   */
  compilerTextNode(node) {
    if (!node.expr) {
      node.expr = node.textContent;
    }
    let defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
    let _vm = this.vm;
    node.textContent = node.expr.replace(defaultTagRE, function (...args) {
      // 获取value
      let keys = args[1].split('.')
      return keys.reduce((data, current) => {
        return data[current];
      }, _vm)
    })
  }


}