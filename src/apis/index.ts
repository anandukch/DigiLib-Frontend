import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const api_url="https://digilib-7ff9.onrender.com"
// const api_url="http://localhost:8000"
const api = axios.create({
  baseURL: api_url,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authToken = localStorage.getItem("token")
    const newConfig = config;
    if (authToken) {
      newConfig.headers!.Authorization = `Bearer ${authToken}`;
    }
    return newConfig;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export const setAuthToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default api;