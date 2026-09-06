import axios from "axios";
import { API_BASE_URL, STORAGE_KEYS } from "@/lib/constants";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  timeout: 10000,
});

// Request interceptor: attach bearer token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 unauthenticated
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        // Clear auth cookie as well
        document.cookie = `${STORAGE_KEYS.AUTH_TOKEN}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
    }
    return Promise.reject(error);
  }
);

// Sanctum CSRF cookie initialization helper
export async function initCsrfCookie(): Promise<void> {
  try {
    const rootUrl = API_BASE_URL.replace(/\/api\/?$/, "");
    await axios.get(`${rootUrl}/sanctum/csrf-cookie`, { withCredentials: true });
  } catch (err) {
    // Gracefully ignore if not on Laravel Sanctum session mode
    console.debug("Sanctum CSRF cookie fetch skipped or not available:", err);
  }
}

export default api;
