
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
 * compare whether object has changed
 * @param {*} obj1 
 * @param {*} obj2 
 */
function isObjChanged(obj1, obj2) {
  //data type
  if (isPlainObject(obj1) !== isPlainObject(obj2)) {
    return true;
  }
  //object
  if (isPlainObject(obj1)) {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
    if (obj1Keys.length !== obj2Keys.length) {
      return true;
    }
    if (obj1Keys.length === 0) {
      return false;
    }
    for (let i = 0; i < obj1Keys.length; i++) {
      let key = obj1Keys[i];
      if (obj1[key] !== obj2[key]) {
        return true;
      }
    }
  }
  return false;
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
  if (isPlainObject(vnode1) && isPlainObject(vnode2)) {
    return vnode1.type !== vnode2.type;
  }
  return vnode1 !== vnode2;
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
  //props changed
  if (isObjChanged(oldNode.props, newNode.props)) {
    const oldProps = oldNode.props || {};
    const newProps = newNode.props || {};
    const oldPropsKeys = Object.keys(oldProps);
    const newPropsKeys = Object.keys(newProps);
    if (newPropsKeys.length === 0) {
      oldPropsKeys.forEach(prop => $currentNode.removeAttribute(prop))
    } else {
      const allKeys = new Set([...oldPropsKeys, ...newPropsKeys]);
      allKeys.forEach(prop => {
        //no oldprops, need to set newprops
        if (oldProps[prop] === undefined) {
          return $currentNode.setAttribute(prop, newProps[prop]);
        }
        //no newprops, need to remove oldprops
        if (newProps[prop] === undefined) {
          return $currentNode.removeAttribute(prop);
        }
        //compare whether the two props the same
        if (oldProps[prop] !== newProps[prop]) {
          return $currentNode.setAttribute(prop, newProps[prop]);
        }
      })
    }
  }
  //Diff children
  if (newNode.type) {
    let maxLength = Math.max(oldNode.children.length, newNode.children.length);
    for (let i = 0; i < maxLength; i++) {
      updateElement($currentNode, oldNode.children[i], newNode.children[i], i)
    }
  }
}


const $app = document.getElementById("app");
const previous = null;
const current = <div class="list">
  <p>item 1</p>
  <p>item 2</p>
</div>

//apend newNode
const $appendNewNode = document.getElementById('append');
$appendNewNode.addEventListener("click", e => {
  updateElement($app, previous, current);
})

//remove oldNode
const $removeNewNode = document.getElementById('remove');
const removeNode = <div class="list">
  <p>item 1</p>
</div>;
$removeNewNode.addEventListener("click", e => {
  updateElement($app, current, removeNode);
})

//vnode.type or string change
const $nodeType = document.getElementById("nodeType");
const vnodeTypechanged = <div class="list">
  <p>item 1</p>
  <span>span</span>
</div>;
$nodeType.addEventListener("click", e => {
  updateElement($app, current, vnodeTypechanged);
})

//Diff children
const $diffChildren = document.getElementById("diffChildren");
const nodeChanged = <div class="list">
  <p>item 1</p>
  <p>
    <span>item 2-1</span>
    <span>diff chilren</span>
  </p>
</div>;
$diffChildren.addEventListener("click", e => {
  updateElement($app, current, nodeChanged);
});

//props update
const $propsUpdate = document.getElementById("propsUpdate");
const initprevious = null;
const initcurrent = <ul class="props-init">
  <li class="item1">hello</li>
  <li>
    <div>
      <h2>
        <p>
          <span class="props-name" data-props="Props">Props</span>
        </p>
      </h2>
    </div>
  </li>
</ul>;
const propsChanged = <ul class="props-changed">
  <li class="item1">hello</li>
  <li>
    <div>
      <h2>
        <p>
          <span class="props-name-changed" data-props="Update">Update</span>
        </p>
      </h2>
    </div>
  </li>
</ul>;
$propsUpdate.addEventListener("click", e => {
  updateElement($app, initprevious, initcurrent);
  setTimeout(() => {
    updateElement($app, initcurrent, propsChanged)
  }, 10000)
});
