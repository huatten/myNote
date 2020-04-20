
/**
 * generate Virtual DOM
 * @param {*} type 
 * @param {*} props 
 * @param  {...any} children 
 */
function vnode(type, props, ...children) {
  return {
    type,
    props,
    children
  }
}
/**
 * is a plain object
 * @param {*} obj 
 */
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

/**
 * rendering virtual DOM into real DOM
 * @param {*} vnode 
 */
function createDomElementFromVnode(vnode) {
  let $el;
  if (vnode.type) {
    //tag
    $el = document.createElement(vnode.type);
  } else {
    //text
    $el = document.createTextNode(vnode);
  }
  if (vnode.props) {
    //props
    Object.keys(vnode.props).forEach(prop => {
      $el.setAttribute(prop, vnode.props[prop]);
    });
  }
  if (vnode.children && vnode.children.length) {
    vnode.children.forEach(child => {
      $el.appendChild(createDomElementFromVnode(child))
    })
  }
  return $el;
}

/**
 * compare whether vnode has changed
 * @param {*} vnode1 
 * @param {*} vnode2 
 */
function isVnodeChanged(vnode1, vnode2) {
  return typeof vnode1 !== typeof vnode2 ||
    typeof vnode1 === 'string' && vnode1 !== vnode2 ||
    vnode1.type !== vnode2.type
}

function updateElement($parent, oldNode, newNode, index = 0) {

  const $currentNode = $parent.childNodes[index];
  if (!oldNode) {
    //no oldNode apend newNode
    return $parent.appendChild(createDomElementFromVnode(newNode));
  }
  if (!newNode) {
    //no newNode remove oldNode
    return $parent.removeChild($currentNode);
  }
  //vnode.type or string changed 
  if (isVnodeChanged(oldNode, newNode)) {
    return $parent.replaceChild(createDomElementFromVnode(newNode), $currentNode);
  }
  //same string
  if (oldNode === newNode) {
    return;
  }
  //Diff children
  if ((oldNode.children && oldNode.children.length) || (newNode.children && newNode.children.length)) {
    let maxLength = Math.max(oldNode.children.length, newNode.children.length);
    for (let i = 0; i < maxLength; i++) {
      updateElement($currentNode, oldNode.children[i], newNode.children[i], i)
    }
  }
}


const $app = document.getElementById("app");
const previous = null;
const current = <ul class="cont" style="color:red"><li>Virtual</li><li>DOM</li></ul>;

//apend newNode
const $appendNewNode = document.getElementById('append');
$appendNewNode.addEventListener("click", e => {
  updateElement($app, previous, current);
})

//remove oldNode
const $removeNewNode = document.getElementById('remove');
$removeNewNode.addEventListener("click", e => {
  updateElement($app, current, null);
})

//vnode.type or string change 
const $nodeType = document.getElementById("nodeType");
const vnodeTypechanged = <ol class="cont" style="color:blue"><li>vnode.type</li><li>changed</li></ol>;
$nodeType.addEventListener("click", e => {
  updateElement($app, current, vnodeTypechanged);
})

//Diff children
const $diffChildren = document.getElementById("diffChildren");
const nodeChanged = <ul class="cont" style="color:red"><li>Diff</li><li>Children</li></ul>;
$diffChildren.addEventListener("click", e => {
  updateElement($app, current, nodeChanged);
});