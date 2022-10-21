const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "[hash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/i,
        use: ["style-loader", "css-loader"],
        exclude: path.resolve(__dirname, "node_modules"),
      },
      {
        test: /\.less$/i,
        use: ["less-loader"],
        exclude: path.resolve(__dirname, "node_modules"),
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Three Demo",
    }),
  ],
};
