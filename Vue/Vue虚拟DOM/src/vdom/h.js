import { vnode } from "./vnode";
/**
 * 
 * @param {*} tag  标签类型
 * @param {*} props 节点属性
 * @param  {...any} children 所有孩子
 */
export default function createElement(tag, props = {}, ...children) {
  let key;
  if (props.key) {
    key = props.key;
    delete props.key; //把props中key拿出来
  }
  //不是虚拟节点的子节点 => 子节点
  children = children.map(child => {
    if (typeof child === "string") {
      return vnode(undefined, undefined, undefined, undefined, child);
    } else {
      return child;
    }
  })
  return vnode(tag, key, props, children)
}
