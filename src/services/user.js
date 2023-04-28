import api from "./api.js";

export default {
  loginUser(user) {
    return api().post("/auth/login", {
      email: user.email,
      password: user.password,
    });
  },

  registerClient(user) {
    return api().post("/auth/register/client", {
      username: user.username,
      email: user.email,
      password: user.password,
      repassword: user.repassword,
    });
  },

  registerAgent(user) {
    return api().post("/auth/register/agent", {
      email: user.email,
      password: user.password,
      repassword: user.repassword,
      firstname: user.firstname,
      lastname: user.lastname,
      phone: "5354017747",
      bio: user.bio,
      public_email: user.public_email,
    });
  },

  refreshToken() {
    return api().get("/auth/refresh");
  },

  logoutUser() {
    return api().get("/auth/logout");
  },
};
