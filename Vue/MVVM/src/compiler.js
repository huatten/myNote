import Watcher from "./watcher";
//模板编译
export default class Compiler {
  constructor(context) {
    this.$el = context.$el;
    this.context = context;
    if (this.$el) {
      //把原始dom抓换为文档碎片
      this.$fragment = this.nodeToFragment(this.$el);
      //编译模板
      this.compiler(this.$fragment);
      //把文档碎片添加到页面中
      this.$el.appendChild(this.$fragment);
    }
  }
  /**
   * 模板编译
   * @param {*} node 
   */
  compiler(node) {
    if (node.childNodes && node.childNodes.length) {
      node.childNodes.forEach(child => {
        if (child.nodeType === 1) { //元素节点
          this.compilerElementNode(child);
        } else if (child.nodeType === 3) { //文本节点
          this.compilerTextNode(child);
        }
      })
    }
  }
  /**
   * 编译元素节点
   * @param {*} node 
   */
  compilerElementNode(node) {
    //TODO 元素的编译 指令
    let attrs = [...node.attributes];
    attrs.forEach(attr => {
      let { name: attrName, value: attrValue } = attr;
      if (attrName.startsWith("v-")) {
        let dirName = attrName.slice(2);
        switch (dirName) {
          case "text":
            //textContent
            new Watcher(attrValue, this.context, newVal => {
              node.textContent = newVal;
            });
            break;
          case "html":
            //innerHTML
            new Watcher(attrValue, this.context, newVal => {
              node.innerHTML = newVal;
            });
            break;
          case "model":
            //value
            new Watcher(attrValue, this.context, newVal => {
              node.value = newVal;
            });
            node.addEventListener("input", e => {
              this.context[attrValue] = e.target.value;
            })
            break;
        }
      }
      if (attrName.startsWith("@")) {
        this.compilerMethod(this.context, node, attrName, attrValue)
      }
    })
    this.compiler(node);
  }
  /**
   * 编译函数
   * @param {*} context 
   * @param {*} node 
   * @param {*} attrName 
   * @param {*} attrValue 
   */
  compilerMethod(context, node, attrName, attrValue) {
    let type = attrName.slice(1);
    let fn = context[attrValue];
    node.addEventListener(type, fn.bind(context));
  }
  /**
   * 编译文本节点
   * @param {*} node 
   */
  compilerTextNode(node) {
    let text = node.textContent.trim(); //{{msg}} 插值表达式
    if (text) {
      //text => 表达式
      let reg = this.parseTextExp(text);  // '123'+(msg +  '!')+'456'
      //添加订阅者，计算表达式的值
      //当表达式依赖的数据发生变化的时侯
      //1.重新计算表达式的值
      //2.node.textContent给最新的值
      //即可完成Model => View的响应式
      new Watcher(reg, this.context, (newVal) => {
        node.textContent = newVal;
      })
    }
  }

  /**
   * 文本转换为表达式
   * 123{{msg +  '!'}}456  =>  123 + msg +  '!' + 456
   * @param {*} text 
   */
  parseTextExp(text) {
    let regText = /\{\{(.+?)\}\}/g;
    //分割插值表达式前后内容
    let pices = text.split(regText); //["123", "msg +  '!'", "456"]
    let metchs = text.match(regText);  //["{{msg +  '!'}}"]
    //表达式数组
    let tokens = [];
    pices.forEach(item => {
      if (metchs && metchs.includes(`{{${item}}}`)) {
        tokens.push(`(${item})`);
      } else {
        tokens.push(`'${item}'`);
      }
    })
    return tokens.join('+');
  }
  /**
   * 转换为文档碎片
   * @param {*} node 
   */
  nodeToFragment(node) {
    let fragment = document.createDocumentFragment();
    if (node.childNodes && node.childNodes.length) {
      node.childNodes.forEach(child => {
        //判断是不是我们要添加到节点
        //如果是无用的节点或者是换行是不会添加的
        if (!this.ignorable(child)) {
          fragment.appendChild(child);
        }
      })
    }
    return fragment;
  }
  /**
   * 忽略哪些节点不添加到文档片段
   * @param {*} node 
   */
  ignorable(node) {
    let reg = /^[\t\n\r]+/;
    //注释、元素的文本内容或者属性
    return node.nodeType === 8 || (node.nodeType === 3 && reg.test(node.textContent))
  }
}