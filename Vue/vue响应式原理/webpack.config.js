const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const resolveFile = function (filepath) { return path.resolve(__dirname, filepath) };
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "vue.js",
    path: resolveFile("dist")
  },
  devtool: "source-map", //调试方便快速定位源码
  resolve: {
    //更改模块查找方式
    modules: [resolveFile('source'), resolveFile('node_modules')]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolveFile("example/index.html")
    })
  ],
  devServer: {
    contentBase: resolveFile("example"),
    inline: true, //支持dev-server自动刷新的配置
    open: true
  }
}