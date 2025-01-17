import { create } from "zustand";

export const userStore = create((set) => ({
  accessToken: "",
  userInfo: {},
  setAccessToken: (accessToken) => {
    set(() => ({ accessToken }));
    localStorage.setItem("token", accessToken);
  },
  removeAccessToken: () => set({ accessToken: "" }),
  setUserInfo: (userInfo) => set(() => ({ userInfo })),
  removeUser: () => set({}, true),
}));
