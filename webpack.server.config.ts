import path from "path";
import nodeExternals from "webpack-node-externals";

export default {
  entry: "./src/server/server.ts", // Điểm vào cho server
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist"),
  },
  target: "node", // Đảm bảo webpack build cho môi trường Node.js
  externals: [nodeExternals()], // Bỏ qua các thư viện Node.js trong quá trình build
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};
