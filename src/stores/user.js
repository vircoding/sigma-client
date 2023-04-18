import { defineStore } from "pinia";
import { ref } from "vue";
import userServices from "../services/user.js";

export const useUserStore = defineStore("user", () => {
  // States
  const logedState = ref(false);

  const tokenState = ref({
    token: undefined,
    expiresIn: 3600,
  });

  // Actions
  const loginUserAction = async (user) => {
    try {
      const res = await userServices.loginUser(user);

      tokenState.value.token = await res.data.token;
      tokenState.value.expiresIn = await res.data.expiresIn;

      logedState.value = true;
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.error.length === 2) {
          throw new Error("Email and Password error");
        } else {
          if (error.response.data.error[0].msg === "Invalid Email") {
            throw new Error("Email error");
          }
          if (error.response.data.error[0].msg === "Invalid Password") {
            throw new Error("Password error");
          }
        }
      }
      if (error.response.status === 403) {
        throw new Error("Invalid credentials");
      }
      if (error.response.status === 500) {
        console.error("Server Error");
      }
    }
  };

  const refreshTimeAction = () => {
    setTimeout(() => {
      console.log(`Token Refreshed: ${new Date()}`);
      refreshTokenAction();
    }, tokenState.value.expiresIn * 1000 - 6000);
  };

  const refreshTokenAction = async () => {
    try {
      const res = await userServices.refreshToken();

      logedState.value = true;

      refreshTimeAction();
      return true;
    } catch (error) {
      if (error.response.data.error === "There's no token") return false;
      console.log(error.response.data);
    }
  };

  return { logedState, loginUserAction, refreshTokenAction };
});
