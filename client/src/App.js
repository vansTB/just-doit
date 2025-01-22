import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PageLayout from "./pages/layout";
import { userStore } from "./store/user";
import Login from "./pages/login";

// 动态加载组件
const loadComponent = (page_url) => {
  // 创建一个上下文，包含目标目录下的所有组件
  const context = require.context("./pages", true, /\.js$/);

  try {
    const component = context(`.${page_url}.js`).default;
    return React.lazy(() => Promise.resolve({ default: component }));
  } catch (e) {
    console.error(`Component for ${page_url} not found.`);
    // return React.lazy(() => import("./pages/NotFound"));
  }

  // console.log("page_url", page_url);
  // const context = require.context("./pages", false, /\.js$/); // 加载 src/pages 下的所有 .js 文件
  // const pageModule = context(`./pages${page_url}.js`); // 根据动态路径加载
  // console.log("pageModule", pageModule);
  // return pageModule;
};

// 路由守卫
const PrivateRoute = ({
  isAuthenticated,
  redirectPath = "/login",
  children,
}) => {
  console.log("isAuthenticated", isAuthenticated);
  console.log("redirectPath", redirectPath);
  console.log("children", children);
  return isAuthenticated ? children : <Navigate to={redirectPath} replace />;
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const tmpUseStore = userStore();

  useEffect(() => {
    console.log("tmpUseStore", tmpUseStore.userInfo);
    setLoading(false);
  }, [tmpUseStore.userInfo]);

  // if (loading) {
  //   return (
  //     <div style={{ textAlign: "center", marginTop: "20%" }}>
  //       <h3>Loading...</h3>
  //     </div>
  //   ); // 加载中提示
  // }

  const GlobalLoading = () => {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(255, 255, 255, 0.8)",
          zIndex: 9999,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Loading...
        </div>
      </div>
    );
  };
  return (
    <BrowserRouter>
      {/* {loading && <GlobalLoading />} */}
      <React.Suspense>
        <Routes>
          {/* 登录页 */}
          <Route path="/login" element={<Login />} />
          {/* <Route
            path="/role"
            key="asd"
            element={React.createElement(loadComponent("/user/role"))}
          /> */}

          {/* 需要登录后访问的路由 */}
          <Route
            path="/"
            key="layout"
            element={
              <PrivateRoute isAuthenticated={!!tmpUseStore.userInfo.id}>
                <PageLayout />
              </PrivateRoute>
            }
          >
            {/* 动态加载用户菜单 */}
            {(
              tmpUseStore?.userInfo?.menus?.filter((i) => i.page_url) || []
            ).map((menu) => {
              return (
                <Route
                  key={menu.path}
                  path={menu.path}
                  element={React.createElement(loadComponent(menu.page_url))}
                />
              );
            })}

            {/* 默认重定向到首页 */}
            <Route index element={<Navigate to="/home" replace />} />
          </Route>

          {/* 默认重定向 */}
          <Route
            path="*"
            element={
              <Navigate to={tmpUseStore.userInfo.id ? "/" : "/login"} replace />
            }
          />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export { App };
