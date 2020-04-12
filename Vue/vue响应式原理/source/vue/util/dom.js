/**
 * 元素节点
 * @param {*} node 
 */
export function isElementNode(node) {
  return node.nodeType === 1;
}
/**
 * dom节点转换为文档碎片
 * @param {*} node 
 */
export function nodeToFragment(node) {
  let fragment = document.createDocumentFragment();
  let firstChild;
  while (firstChild = node.firstChild) {
    fragment.appendChild(firstChild);
  }
  return fragment;
}
