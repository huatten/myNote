/**
 * 
 * @param {*} tag 类型
 * @param {*} key key
 * @param {*} props 节点属性
 * @param {*} children 所有孩子
 * @param {*} text 文本
 */
export function vnode(tag, key, props, children, text) {
  return {
    tag, key, props, children, text
  }
}