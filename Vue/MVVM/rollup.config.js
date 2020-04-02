const path = require("path");
//const buble = require('rollup-plugin-buble');            //简化版的babel 编译速度比babel快一些 复杂的ES6+可以使用 rollup-plugin-babel
const babel = require("rollup-plugin-babel");
const nodeResolve = require("rollup-plugin-node-resolve");  //帮助寻找node_modules里的包
const commonjs = require("rollup-plugin-commonjs");              // 将非ES6语法的包转为ES6可用
const serve = require("rollup-plugin-serve");              //类比 webpack-dev-server, 提供静态服务器能力
const livereload = require('rollup-plugin-livereload');   // 监听文件改变，并刷新浏览器
const PORT = 3000;
const resolveFile = function (filePath) {
  return path.join(__dirname, ".", filePath)
};

module.exports = {
  input: "src/index.js",
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**" // 只编译我们的源代码
    }),
    serve({
      port: PORT,
      contentBase: [resolveFile("example"), resolveFile("dist")]
    }),
    livereload()
  ],
  output: {
    file: resolveFile("dist/mvue.js"),
    format: "umd",    //模块格式 - 'amd', 'cjs', 'es6', 'iife', 'umd'
  }
}