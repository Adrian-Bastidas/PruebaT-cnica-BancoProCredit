import axios from "axios";
import { cookieUtils } from "../utils/cookieUtils";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "https://localhost:7139/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = cookieUtils.get("procredit_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Eliminar cookies al recibir 401 (no autorizado)
      cookieUtils.remove("procredit_token");
      cookieUtils.remove("procredit_user");
      cookieUtils.remove("procredit_expires_at");
      if (window.location.pathname !== "/login")
        window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
