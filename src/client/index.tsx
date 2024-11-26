import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Kiểm tra xem môi trường có phải là phát triển không và kích hoạt HMR
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept();
}

// Kiểm tra nếu phần tử có tồn tại trước khi gọi hydrateRoot
const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.hydrateRoot(rootElement, <App />); // Sử dụng rootElement nếu tồn tại
} else {
  console.error("Không tìm thấy phần tử có id 'root'.");
}
