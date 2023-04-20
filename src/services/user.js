import api from "./api.js";

export default {
  loginUser(user) {
    return api().post("/auth/login", {
      email: user.email,
      password: user.password,
    });
  },

  registerUser(user) {
    return api().post("/auth/register", {
      username: user.username,
      email: user.email,
      password: user.password,
      repassword: user.repassword,
    });
  },

  refreshToken() {
    return api().get("/auth/refresh");
  },
};
