import "antd/dist/reset.css";
import "./global.css";

import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider, theme } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CommitFeedPage from "./pages/CommitFeedPage";
import ErrorPage from "./pages/ErrorPage";

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
