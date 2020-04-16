/**
 * 
 * @param {*} vnode 虚拟节点
 * @param {*} el 要渲染的容器
 */
export function render(vnode, wrap) {
  let el = createDomElementFromVnode(vnode);
  wrap.appendChild(el);
}
/**
 * 虚拟节点转换为真实节点
 * @param {*} vnode 
 */
function createDomElementFromVnode(vnode) {
  let { tag, key, props, children, text } = vnode;
  if (tag) { //tag标签
    vnode.domElement = document.createElement(tag); //建立虚拟节点和真实元素的关系
    updateProperties(vnode);
    //children 里面也是虚拟节点 递归渲染
    children.forEach(childVnode => {
      render(childVnode, vnode.domElement);
    });
  } else { //text文本
    vnode.domElement = document.createTextNode(text);
  }
  return vnode.domElement;
}

/**
 * 根据当前虚拟节点的属性 去更新真实DOM
 * @param {*} newVnode //新的虚拟节点 
 * @param {object} oldProps //节点老属性
 */
function updateProperties(newVnode, oldProps = {}) {
  let domElement = newVnode.domElement; //div 真实dom
  let newProps = newVnode.props; //虚拟节点中的属性

  //如果老的里面有 新的里面没有 这个属性要被移除
  //<div id="app" a=1></div>   oldProps
  //<div id="app"></div>       newProps
  for (let oldPropName in oldProps) {
    if (!newProps[oldPropName]) {
      delete domElement[oldPropName];
    }
  }

  //如果新的里面有style 老的里面也有style style还有可能不一样 老dom元素更新后 没有某个样式需要删除
  //<div id="app" style="color:red; background:blue"></div>       oldStyle
  //<div id="app" style="color:red"></div>                        newStyle
  let newStyle = newProps.style || {};
  let oldStyle = oldProps.style || {};
  for (let olds in oldStyle) {
    if (!newStyle[olds]) {
      domElement.style[olds] = "";
    }
  }
  
  //如果老的里面没有 新的里面有 新的覆盖老的
  //<div id="app"></div>      oldProps
  //<div id="app" a=1></div>  newProps
  for (let newPropName in newProps) {
    if (newPropName === "style") {
      let styleobj = newProps.style;
      for (let s in styleobj) {
        domElement.style[s] = styleobj[s];
      }
    } else {
      domElement[newPropName] = newProps[newPropName];
    }
  }
  console.log(newVnode)
}