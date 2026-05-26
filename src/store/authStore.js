import { create } from "zustand";

export const useAuthStore = create((set) => ({
  admin: null,
  isAuthenticated: false,

  login: (adminData) =>
    set({
      admin: adminData,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      admin: null,
      isAuthenticated: false,
    }),
}));

//const { admin, login, logout } = useAuthStore();