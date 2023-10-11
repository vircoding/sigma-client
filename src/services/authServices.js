import { unauthorizedAPI } from "./api.js";

export default {
  refresh() {
    return unauthorizedAPI().get("/auth");
  },

  login(user) {
    return unauthorizedAPI().post("/auth/login", user);
  },

  register(user) {
    return unauthorizedAPI().post("/auth/register", user);
  },
};
