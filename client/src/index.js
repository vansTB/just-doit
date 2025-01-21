import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css"; // Ant Design v5+
import "./index.scss";

import { App } from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <RouterProvider router={router}> </RouterProvider>

  <React.StrictMode>
    <App />
  </React.StrictMode>
);
