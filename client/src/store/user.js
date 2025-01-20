import { create } from "zustand";

export const userStore = create((set) => ({
  accessToken: "",
  userInfo: JSON.parse(localStorage.getItem("userInfo") || "{}"),
  setAccessToken: (accessToken) => {
    set(() => ({ accessToken }));
    localStorage.setItem("token", accessToken);
  },
  removeAccessToken: () => set({ accessToken: "" }),
  setUserInfo: (userInfo) => {
    set(() => ({ userInfo }));
    console.log("userInfo", userInfo);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  },
  removeUser: () => {
    set({ accessToken: "", userInfo: {} });
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
  },
}));
