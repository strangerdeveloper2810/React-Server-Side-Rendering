import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// WebSocket kết nối tới server tại ws://localhost:3000/ws
const socket = new WebSocket("ws://localhost:3000/ws");

socket.onopen = () => {
  console.log("WebSocket connection established");
};

socket.onmessage = (event) => {
  if (event.data === "reload") {
    console.log("Frontend content updated. Reloading...");
    if (module.hot) {
      module.hot.accept("./App"); // Kích hoạt hot reload trong module HMR
    }
  }
};

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};

socket.onclose = () => {
  console.log("WebSocket connection closed");
};

// Thực hiện Hydrate nếu sử dụng SSR
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.hydrateRoot(rootElement, <App />);
}
