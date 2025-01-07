import axios from "axios";

const http = axios.create({
  baseURL: "localhost:8080/just/",
  timeout: 5000,
});

http.interceptors.request.use((config) => {
  return config;
});

http.interceptors.response.use((result) => {
  return result;
});

export { http };
