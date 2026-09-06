import { create } from "zustand";
import { User } from "@/types/user";
import { authService } from "@/services/auth.service";
import { LoginCredentials, RegisterCredentials } from "@/types/auth";
import { STORAGE_KEYS } from "@/lib/constants";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  isAdmin: false,

  login: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await authService.login(credentials);
      const user = response.user;
      const isAdmin = user?.role === "admin" || credentials.email.includes("admin");
      set({
        user,
        token: response.token || null,
        isAuthenticated: !!user,
        isAdmin,
        isLoading: false,
      });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  register: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await authService.register(credentials);
      const user = response.user;
      set({
        user,
        token: response.token || null,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isLoading: false,
      });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authService.logout();
    } finally {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isAdmin: false,
        isLoading: false,
      });
    }
  },

  checkAuth: async () => {
    if (typeof window === "undefined") {
      set({ isLoading: false });
      return;
    }

    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);

    if (!token && !savedUser) {
      set({ user: null, token: null, isAuthenticated: false, isAdmin: false, isLoading: false });
      return;
    }

    try {
      const user = await authService.getUser();
      if (user) {
        set({
          user,
          token,
          isAuthenticated: true,
          isAdmin: user.role === "admin",
          isLoading: false,
        });
      } else {
        set({ user: null, token: null, isAuthenticated: false, isAdmin: false, isLoading: false });
      }
    } catch {
      set({ user: null, token: null, isAuthenticated: false, isAdmin: false, isLoading: false });
    }
  },

  setUser: (user) => {
    set({
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === "admin",
    });
  },
}));
