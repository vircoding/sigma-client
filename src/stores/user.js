import { defineStore } from "pinia";
import { ref } from "vue";
import userServices from "../services/user.js";

export const useUserStore = defineStore("user", () => {
  // States
  const logedState = ref(false);

  // Actions
  const loginUserAction = async (user) => {
    try {
      const res = await userServices.loginUser(user);
      console.log(res.data);

      logedState.value = true;
      return true;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const refreshTokenAction = async () => {
    try {
      const res = await userServices.refreshToken();
      console.log(res.data);

      logedState.value = true;
      return true;
    } catch (error) {
      if (error.response.data.error === "There's no token") return false;
      console.log(error.response.data);
    }
  };

  return { logedState, loginUserAction, refreshTokenAction };
});
