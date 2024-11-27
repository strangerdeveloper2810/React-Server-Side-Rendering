import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

let socket: WebSocket | null = null;

const connectWebSocket = () => {
  // Kết nối lại WebSocket nếu bị mất kết nối
  socket = new WebSocket("ws://localhost:3000/ws");

  socket.onopen = () => {
    console.log("WebSocket connection established");
  };

  socket.onmessage = (event) => {
    if (event.data === "reload") {
      console.log("Frontend content updated. Reloading...");
      window.location.reload();
    }
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed. Reconnecting...");
    // Tự động kết nối lại sau một khoảng thời gian
    setTimeout(connectWebSocket, 3000); // Thử kết nối lại sau 3 giây
  };
};

// Kết nối WebSocket
connectWebSocket();

// Thực hiện Hydrate cho SSR
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.hydrateRoot(rootElement, <App />);
}
