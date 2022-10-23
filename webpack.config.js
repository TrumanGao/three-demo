const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "[hash].bundle.js",
    assetModuleFilename: "assets/[name][ext]",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: "babel-loader",
        exclude: path.resolve(__dirname, "node_modules"),
      },
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
        exclude: path.resolve(__dirname, "node_modules"),
      },
      {
        test: /\.(glb|gltf|obj)$/i,
        type: "asset/resource",
        exclude: path.resolve(__dirname, "node_modules"),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Three Demo",
    }),
  ],
};
