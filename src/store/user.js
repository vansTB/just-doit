import { create } from "zustand";

export const userStore = create((set) => ({
  accessToken: "",
  userInfo: { username: "tmp" },
  setAccessToken: (accessToken) => set(() => ({ accessToken })),
  removeAccessToken: () => set({ accessToken: "" }),
  setUserInfo: (userInfo) => set(() => ({ userInfo })),
  removeUser: () => set({}, true),
}));
