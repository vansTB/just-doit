import { createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/layout";
import Login from "@/pages/login";
import User from "@/pages/user";
import Record from "@/pages/clock/record";
import Theme from "@/pages/clock/theme";
import Home from "@/pages/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    redirect: "/login",
    children: [
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
        element: <Record></Record>,
      },
      {
        path: "theme",
        element: <Theme></Theme>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

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
