import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";
import { env } from "../config/env";
import { authToken } from "./authToken";

//1. Create an Axios instance (your "HTTP client")
export const http: AxiosInstance = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "appication/json",
  },
});
//2. REQUEST interceptors: run BEFORE every request is sent
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    //2.1 Get token from storage
    const token = authToken.getAccessToken();
    //2.2 If token exists, attach it to Authorization header
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    //2.3 MUST return config, so Axios can continue the request
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);
//3. RESPONSE interceptor: runs AFTER response comes back
http.interceptors.response.use(
  //3.1 If success, just return response
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    //If backend respond with 401, token is invalid, expired
    if (error.response?.status === 401) {
      authToken.clear();

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    //3.3 Pass the error to whereever called API
    return Promise.reject(error);
  },
);
