import api from "./api.js";

export default {
  loginUser(user) {
    return api().post("/auth/login", {
      email: user.email,
      password: user.password,
    });
  },

  refreshToken() {
    return api().get("/auth/refresh");
  },
};
