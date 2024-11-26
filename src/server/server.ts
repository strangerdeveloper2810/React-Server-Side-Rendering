import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "../../webpack.client.config";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../client/App";

const app = express();
const PORT = 3000;

// Cấu hình Webpack compiler
const compiler = webpack(webpackConfig);

if (process.env.NODE_ENV === "development") {
  // Middleware DevServer và HMR
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output?.publicPath || "/",
    })
  );
  app.use(webpackHotMiddleware(compiler));
}

// SSR: Render React từ phía server
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
        <script src="/main.js"></script>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
