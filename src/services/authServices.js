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

  register(formData) {
    return axios.post(
      import.meta.env.MODE === "development"
        ? "http://localhost:5000/api/v1/auth/register"
        : "https://sigmacuba.com/api/v1/auth/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
  },
};
