import { unauthorizedAPI, authorizedAPI } from "./api.js";

export default {
  loginUser(user) {
    return unauthorizedAPI().post("/auth/login", {
      email: user.email,
      password: user.password,
    });
  },

  registerClient(user) {
    return unauthorizedAPI().post("/auth/register/client", {
      username: user.username,
      email: user.email,
      password: user.password,
      repassword: user.repassword,
    });
  },

  registerAgent(user) {
    return unauthorizedAPI().post("/auth/register/agent", {
      email: user.email,
      password: user.password,
      repassword: user.repassword,
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      bio: user.bio,
      public_email: user.public_email,
    });
  },

  refreshToken() {
    return unauthorizedAPI().get("/auth/refresh");
  },

  logoutUser() {
    return unauthorizedAPI().get("/auth/logout");
  },

  updateClient(user) {
    return authorizedAPI().patch("/auth/update/client", {
      username: user.username,
    });
  },

  getUserInfo() {
    return authorizedAPI().get("/auth/");
  },
};
