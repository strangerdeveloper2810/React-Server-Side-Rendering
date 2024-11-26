import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "@client/App";
import http from "http";
import hmr from "node-hmr"; // Thêm node-hmr để theo dõi sự thay đổi

const app = express();
const PORT = 3000;

let currentApp = App; // Khởi tạo ứng dụng React

// Sử dụng node-hmr để theo dõi thay đổi và reload ứng dụng
hmr(async () => {
  console.log("Reloading App...");
  ({ default: currentApp } = await import("../client/App")); // Tải lại App khi có thay đổi
});

// SSR: Render React từ phía server
app.get("*", (req, res) => {
  const content = ReactDOMServer.renderToString(
    React.createElement(currentApp)
  );

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React SSR</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/main.js"></script>
      </body>
    </html>
  `);
});

// Tạo server HTTP
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
