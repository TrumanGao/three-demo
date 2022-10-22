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
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/i,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/i,
        use: ["less-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        exclude: [/node_modules/, /src\/assets\/models/],
      },
      {
        test: /\.(glt|gltf|obj)$/i,
        type: "asset/resource",
        include: /src\/assets\/models/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Three Demo",
    }),
  ],
};
