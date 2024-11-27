import path from "path";
import webpack from "webpack";

const config: webpack.Configuration = {
  entry: [
    "webpack-hot-middleware/client?reload=true",
    "./src/client/index.tsx",
  ], // Thêm HMR client
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/", // Đường dẫn public cho Webpack
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Kích hoạt HMR
  ],
  mode: "development",
  devtool: "inline-source-map",
};

export default config;
