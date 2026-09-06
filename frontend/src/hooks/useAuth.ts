import { useAuthStore } from "@/store/auth.store";

export function useAuth() {
  const { user, token, isAuthenticated, isLoading, isAdmin, login, register, logout, checkAuth } =
    useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    isAdmin,
    login,
    register,
    logout,
    checkAuth,
  };
}
