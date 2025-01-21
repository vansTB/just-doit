import React, { useState, useEffect, Suspense } from "react";
import {
  Navigate,
  Route,
  Router,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import { userStore } from "./store/user";
import { AuthRoute } from "./components/authRoute";
import { Layout } from "antd";
import Login from "./pages/login";

export const App = () => {
  const useStore = userStore();
  const [routes, setRoutes] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadUserDataAndRoutes = async () => {
      const menuTree = useStore.getUserMenus().tree;
      //   setRoutes();
      let tmpRoutes = [
        {
          path: "/",
          element: (
            <AuthRoute>
              <Layout />
            </AuthRoute>
          ),
          redirect: "/home",
          children: menuTree,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ];
      setRoutes(tmpRoutes);
      setIsAuthenticated(true); // 登录成功
    };
    if (useStore.userInfo) {
      console.log("--------", useStore.userInfo);
      loadUserDataAndRoutes();
    }
  }, [useStore.userInfo]);

  if (!isAuthenticated) {
    return <div>Loading...</div>; // 或者显示登录页面
  }

  // 动态加载组件
  const loadComponent = (page_url) => {
    // console.log("page_url", page_url);
    // const context = require.context("./pages", false, /\.js$/); // 加载 src/pages 下的所有 .js 文件
    // const pageModule = context(`./${page_url}.js`); // 根据动态路径加载
    // return pageModule;
    console.log("====", `./pages${page_url}`);
    return React.lazy(() => import(`./pages${page_url}`));
  };
  // 根据从后端获取的路由数据动态生成 router 配置
  //   const router = createBrowserRouter(
  //     routes
  //       .filter((i) => i.page_url)
  //       .map((route) => {
  //         console.log("route======", route);

  //         const Component = loadComponent(route.page_url);
  //         return {
  //           path: route.path,
  //           element: (
  //             <Suspense fallback={<div>Loading...</div>}>
  //               <Component />
  //             </Suspense>
  //           ),
  //         };
  //       })
  //   );

  const getPathComponent = (route) => {
    const Component = loadComponent(route.page_url);
    return {
      path: route.path,
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Component />
        </Suspense>
      ),
    };
  };

  const renderRoutes = (routes) =>
    routes.map((route, id) => {
      if (route.redirect) {
        // 处理重定向
        return (
          <Route
            key={id}
            path={route.path}
            element={<Navigate to={route.redirect} />}
          />
        );
      }

      if (route.children) {
        // 处理嵌套路由
        return (
          <Route key={id} path={route.path}>
            {renderRoutes(route.children)}
          </Route>
        );
      }

      // 普通路由
      return (
        <Route
          key={id}
          path={route.path}
          element={route.element ? <route.element /> : getPathComponent(route)}
        />
      );
    });

  //   const AppRoutes = ({ routes }) => <Routes>{renderRoutes(routes)}</Routes>;
  return (
    <Router>
      <Routes>{renderRoutes(routes)}</Routes>
    </Router>
  );
  // export default AppRoutes;
  //   return <RouterProvider router={router} />;
};
