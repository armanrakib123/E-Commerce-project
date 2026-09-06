import api, { initCsrfCookie } from "./api";
import { LoginCredentials, RegisterCredentials, AuthResponse } from "@/types/auth";
import { User } from "@/types/user";
import { STORAGE_KEYS, ENABLE_MOCK_FALLBACK } from "@/lib/constants";
import { mockCustomerUser, mockAdminUser } from "./mockData";

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      await initCsrfCookie();
      const response = await api.post<AuthResponse>("/login", credentials);
      const data = response.data;
      if (data.token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
        document.cookie = `${STORAGE_KEYS.AUTH_TOKEN}=${data.token}; path=/; max-age=2592000; SameSite=Lax`;
      }
      if (data.user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        // Fallback for demo when backend is offline
        const isAdmin = credentials.email.includes("admin");
        const user = isAdmin ? mockAdminUser : { ...mockCustomerUser, email: credentials.email };
        const token = "mock-jwt-token-" + Date.now();
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
        document.cookie = `${STORAGE_KEYS.AUTH_TOKEN}=${token}; path=/; max-age=2592000; SameSite=Lax`;
        return { token, user, message: "Logged in successfully (Demo Mode)" };
      }
      throw error;
    }
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      await initCsrfCookie();
      const response = await api.post<AuthResponse>("/register", credentials);
      const data = response.data;
      if (data.token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
        document.cookie = `${STORAGE_KEYS.AUTH_TOKEN}=${data.token}; path=/; max-age=2592000; SameSite=Lax`;
      }
      if (data.user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        const user: User = {
          id: Math.floor(Math.random() * 1000) + 10,
          name: credentials.name,
          email: credentials.email,
          role: "customer",
          created_at: new Date().toISOString(),
        };
        const token = "mock-jwt-token-" + Date.now();
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
        document.cookie = `${STORAGE_KEYS.AUTH_TOKEN}=${token}; path=/; max-age=2592000; SameSite=Lax`;
        return { token, user, message: "Registered successfully (Demo Mode)" };
      }
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post("/logout");
    } catch (err) {
      console.debug("Logout API call handled:", err);
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        document.cookie = `${STORAGE_KEYS.AUTH_TOKEN}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
    }
  },

  async getUser(): Promise<User | null> {
    try {
      const response = await api.get<{ data?: User; user?: User } | User>("/user");
      const user = "data" in response.data && response.data.data
        ? response.data.data
        : "user" in response.data && response.data.user
        ? response.data.user
        : (response.data as User);

      if (user && typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      }
      return user;
    } catch (error) {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(STORAGE_KEYS.USER);
        if (saved) {
          try {
            return JSON.parse(saved);
          } catch {
            return null;
          }
        }
      }
      return null;
    }
  },
};
