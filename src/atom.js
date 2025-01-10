import { atom } from "recoil";

export const isLoggedIn = atom({
  key: "user",
  default: false,
});
