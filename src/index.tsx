import "antd/dist/reset.css";
import "./global.css";

import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider, theme } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CommitFeedPage from "./pages/CommitFeedPage";
import ErrorPage from "./pages/ErrorPage";
import reportWebVitals from "./reportWebVitals";

const themeConfig = {
  // algorithm: theme.darkAlgorithm,
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:user/:repo",
    element: <CommitFeedPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider theme={themeConfig}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
