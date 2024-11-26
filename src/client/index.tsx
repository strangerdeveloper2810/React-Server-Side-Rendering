import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Kiểm tra nếu môi trường là phát triển và có HMR
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept();
}

// Kiểm tra phần tử root trước khi hydrate
const rootElement = document.getElementById("root");

if (rootElement) {
  // Sử dụng hydrateRoot nếu phần tử root tồn tại (SSR)
  ReactDOM.hydrateRoot(rootElement, <App />);
} else {
  console.error("Không tìm thấy phần tử có id 'root'.");
}
