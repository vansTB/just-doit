import { handleMenuListToTree } from "@/utlis";
import { create } from "zustand";

export const userStore = create((set, get) => ({
  accessToken: "",
  userInfo: JSON.parse(localStorage.getItem("userInfo") || "{}"),
  setAccessToken: (accessToken) => {
    set(() => ({ accessToken }));
    localStorage.setItem("token", accessToken);
  },
  removeAccessToken: () => set({ accessToken: "" }),
  getUserMenus: () => {
    console.log("get()", get());
    const menus = get().userInfo.menus;
    const menuTree = handleMenuListToTree(menus);
    console.log("menuTree----------", menuTree);
    return menuTree;
  },
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
