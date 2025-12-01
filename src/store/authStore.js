import { create } from "zustand";
import axios from "../lib/axios";

const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // Login action
  login: async (identifier, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post("/auth/login", {
        identifier,
        password,
      });

      const { token, user } = response.data;

      // Store token in localStorage
      localStorage.setItem("auth_token", token);

      // Update state
      set({
        user,
        token,
        isAuthenticated: true,
        loading: false,
        error: null,
      });

      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";

      set({
        loading: false,
        error: errorMessage,
        isAuthenticated: false,
        user: null,
        token: null,
      });

      return { success: false, error: errorMessage };
    }
  },

  // Logout action
  logout: () => {
    localStorage.removeItem("auth_token");
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  // Check authentication on app load
  checkAuth: async () => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      set({ isAuthenticated: false });
      return;
    }

    try {
      // Verify token with backend
      const response = await axios.get("/auth/verify");
      const { user } = response.data;

      set({
        user,
        token,
        isAuthenticated: true,
      });
    } catch (error) {
      // Token is invalid, clear it
      localStorage.removeItem("auth_token");
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    }
  },

  // Clear error message
  clearError: () => set({ error: null }),
}));

export default useAuthStore;
