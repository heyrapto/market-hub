import { authApi } from "@/services/api";
import { User } from "@market-hub/shared-types";
import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (credentials: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,

        login: async (credentials) => {
          set({ loading: true, error: null });
          try {
            const response = await authApi.login(credentials);
            const { user, accessToken: token } = response;
            set({
              user,
              token,
              isAuthenticated: true,
              loading: false,
            });
            localStorage.setItem("auth_token", token);
          } catch (error: any) {
            const message = error.response?.data?.message || "Login failed";
            set({ error: message, loading: false });
            throw error;
          }
        },

        register: async (data) => {
          set({ loading: true, error: null });
          try {
            const response = await authApi.register(data);
            const { user, accessToken: token } = response;
            set({
              user,
              token,
              isAuthenticated: true,
              loading: false,
            });
            localStorage.setItem("auth_token", token);
          } catch (error: any) {
            const message = error.response?.data?.message || "Registration failed";
            set({ error: message, loading: false });
            throw error;
          }
        },

        logout: async () => {
          try {
            await authApi.logout();
          } catch (error) {
            console.error("Logout failed on server", error);
          } finally {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
            });
            localStorage.removeItem("auth_token");
          }
        },

        setUser: (user) => set({ user, isAuthenticated: !!user }),
        setToken: (token) => set({ token }),
        clearError: () => set({ error: null }),
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
      },
    ),
  ),
);
