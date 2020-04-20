const path = require("path");
const HtmlWabpackPlugin = require("html-webpack-plugin");
const resolveFile = (filepath) => path.resolve(__dirname, filepath);
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "virtualdom.js",
    path: resolveFile("dist")
  },
  devtool: "source-map",
  resolve: {
    modules: [resolveFile('src'), resolveFile("node_modules")]
  },
  plugins: [
    new HtmlWabpackPlugin({
      template: resolveFile("example/index.html")
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
        options: {
          compact: true
        }
      }
    ]
  },
  devServer: {
    inline: true,
    open: true
  }
}