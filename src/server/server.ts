import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "../../webpack.client.config"; // Import Webpack config
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../client/App";
import { WebSocketServer, WebSocket } from "ws";

const app = express();
const PORT = 3000;

const compiler = webpack(webpackConfig);

// WebSocket server để lắng nghe thay đổi từ Webpack
const wss = new WebSocketServer({ noServer: true });
let clients: WebSocket[] = [];

// Middleware cho Webpack Dev
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output?.publicPath || "/",
    stats: { colors: true },
  })
);

// Middleware cho Webpack Hot Module Replacement
app.use(webpackHotMiddleware(compiler));

// SSR: Render React từ server
app.get("*", (req, res) => {
  const content = ReactDOMServer.renderToString(React.createElement(App));

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
        <script src="/bundle.js"></script> <!-- Đường dẫn tới bundle.js -->
      </body>
    </html>
  `);
});

const server = app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// WebSocket upgrade để lắng nghe kết nối
server.on("upgrade", (request, socket, head) => {
  if (request.url === "/ws") {
    wss.handleUpgrade(request, socket, head, (ws) => {
      clients.push(ws);
      console.log("Client connected via WebSocket");

      ws.on("close", () => {
        clients = clients.filter((client) => client !== ws);
        console.log("Client disconnected from WebSocket");
      });
    });
  } else {
    socket.destroy();
  }
});

// Lắng nghe khi Webpack biên dịch xong
compiler.hooks.done.tap("NotifyClients", () => {
  console.log("Frontend content updated. Notifying clients...");
  clients.forEach((ws) => ws.send("reload"));
});
