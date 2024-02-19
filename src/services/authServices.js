import axios from "axios";
import { unauthorizedAPI } from "./api.js";

export default {
  refresh() {
    return unauthorizedAPI().get("/auth");
  },

  logout() {
    return unauthorizedAPI().get("/auth/logout");
  },

  login(user) {
    return unauthorizedAPI().post("/auth/login", user);
  },

  // OLD Register
  // register(user) {
  //   return unauthorizedAPI().post("/auth/register", user);
  // },

  register(formData) {
    return axios.post("https://sigmacuba.com/api/v1/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
  },
};
