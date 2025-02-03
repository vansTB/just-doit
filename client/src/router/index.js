import { createBrowserRouter, createHashRouter, Route } from "react-router-dom";
import Layout from "@/pages/layout";
import Login from "@/pages/login";
import User from "@/pages/user";
import Record from "@/pages/dazuo/record";
import Theme from "@/pages/dazuo/mode";
import Home from "@/pages/home";
import { AuthRoute } from "@/components/authRoute";
import Menu from "@/pages/user/menu";
import Role from "@/pages/user/role";
import { userStore } from "@/store/user";
import { useState } from "react";

console.log("store", userStore.getState());

const [routes, setRoutes] = useState;
export const router = createHashRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    redirect: "/home",
    children: [
      {
        path: "/menu",
        // element: (
        //   <Route key={"/menu"} path={"/menu"} element={<route.component />}>
        //     {renderRoutes(route.children)}
        //   </Route>
        // ),
        element: <Menu />,
        parent: "user-module",
      },
      {
        path: "/role",
        element: <Role />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/record",
        element: <Record />,
      },
      {
        path: "/mode",
        element: <Theme />,
      },
      {
        index: true, // 默认路由
        redirect: "/home", // 默认重定向
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

// 路由重定向 -- 动态配置

// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';

// const renderRoutes = (routes) =>
//   routes.map((route, index) => {
//     if (route.redirect) {
//       // 处理重定向
//       return <Route key={index} path={route.path} element={<Navigate to={route.redirect} />} />;
//     }

//     if (route.children) {
//       // 处理嵌套路由
//       return (
//         <Route key={index} path={route.path} element={<route.component />}>
//           {renderRoutes(route.children)}
//         </Route>
//       );
//     }

//     // 普通路由
//     return <Route key={index} path={route.path} element={<route.component />} />;
//   });

// const AppRoutes = ({ routes }) => <Routes>{renderRoutes(routes)}</Routes>;

// export default AppRoutes;

// App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import routes from './routes';

// const renderRoutes = (routes) =>
//   routes.map((route, index) => {
//     if (route.redirect) {
//       // 处理重定向
//       return <Route key={index} path={route.path} element={<Navigate to={route.redirect} />} />;
//     }

//     if (route.children) {
//       // 处理嵌套路由
//       return (
//         <Route key={index} path={route.path} element={<route.component />}>
//           {renderRoutes(route.children)}
//         </Route>
//       );
//     }

//     // 普通路由
//     return <Route key={index} path={route.path} element={<route.component />} />;
//   });

// const App = () => (
//   <Router>
//     <Routes>{renderRoutes(routes)}</Routes>
//   </Router>
// );

// export default App;
