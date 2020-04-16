import { h, render } from "./vdom";
/**
 * <div id="wrap" attr="1" key="99" @click="handler">
 *  <span style="color="#42b983">Virtual</span>
 *  DOM
  </div>
 */
const vdom = {
  tag: "div",
  props: { id: "wrap", attr: "1", onClick: "handler" },
  children: [
    { tag: "span", props: { color: "#42b983", }, children: [{ tag: "", props: "", children: [], text: "Virtual" }] },
    { tag: "", props: "", children: [], text: "DOM" }
  ]
}

let vnode = h("div", { id: "wrap", attr: 1, key: 99, onClick: "handler", style: { color: "#f90892" } }, h("span", { style: { color: "#42b983" } }, "Virtual"), "DOM");
render(vnode, app);
