import { h } from "./vdom";
/**
 * <div id="app" attr="1" key="99" @click="handler">
 *  <span style="color="red">Virtual</span>
 *  DOM
  </div>
 */
const vdom = {
  type: "div",
  props: { id: "app", attr: "1", onClick: "handler" },
  children: [
    { type: "span", props: { color: "red", }, children: [{ type: "", props: "", children: [], text: "Virtual" }] },
    { type: "", props: "", children: [], text: "DOM" }
  ]
}

let vnode = h("div", { id: "app", attr: 1, key: 99, onClick: "handler" }, h("span", { style: { color: "red" } }, "Virtual"), "DOM");
console.log(vnode)