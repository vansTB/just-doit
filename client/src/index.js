import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css"; // Ant Design v5+
import "./index.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router}> </RouterProvider>

  // <React.StrictMode>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
