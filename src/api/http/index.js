import axios from "axios";

const http = axios.create({
  baseURL: "",
  timeout: 20000,
});

http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default http;
