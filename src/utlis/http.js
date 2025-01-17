import { userStore } from "@/store/user";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStore } from "zustand";

const http = axios.create({
  baseURL: "/",
  timeout: 5000,
});

http.interceptors.request.use((config) => {
  console.log("req-------", config);

  const token = localStorage.getItem("token");
  if (token) {
    config.headers.authorization = "Bearer " + token;
  }
  return config;
});

http.interceptors.response.use(
  (result) => {
    console.log("res-------", result);

    return result.data;
  },
  (error) => {
    // 请求失败时的错误处理
    console.log("err", error);
    // 判断错误类型
    if (error.response) {
      // 服务器返回了响应，但是状态码不是 2xx
      switch (error.response.status) {
        case 400:
          // 处理 400 错误
          console.error("Bad Request:", error.response.data);
          break;
        case 401:
          // 处理 401 错误（未授权）
          localStorage.removeItem("token");
          userStore.getState().removeAccessToken();
          userStore.getState().removeUser();
          window.location.href = "/login";
          break;

        case 403:
          // 处理 403 错误（未授权）
          message.error("登录失效，请重新登录");
          localStorage.removeItem("token");

          userStore.getState().removeAccessToken();
          userStore.getState().removeUser();
          window.location.href = "/login";
          return;
        case 500:
          // 处理 500 错误（服务器错误）
          console.error("Server Error:", error.response.data);
          break;
        default:
          console.error("Request failed with status:", error.response.status);
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error("No response received:", error.request);
    } else {
      // 请求设置时发生的错误
      console.error("Error setting up request:", error.message);
    }

    // 你可以在这里统一显示错误信息，比如通过一个通知组件

    message.error(
      error?.response?.data?.message ||
        error?.response?.statusText ||
        "请求错误"
    );
    // 返回一个错误的 Promise，防止页面中断
    return Promise.resolve(error);
  }
);

export { http };
