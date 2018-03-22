const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new webpack.ProvidePlugin({
      firebase: "firebase/app"
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist")
  }
};
