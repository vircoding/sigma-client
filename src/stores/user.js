import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";
import userServices from "../services/user.js";

export const useUserStore = defineStore("user", () => {
  // State
  const token = ref("");
  const tokenExpiration = ref(null);

  // Getters
  const isLoggedIn = computed(() => !!token.value);

  // Actions
  const loginUserAction = async (user) => {
    try {
      const res = await userServices.loginUser(user);

      token.value = res.data.token;
      tokenExpiration.value = new Date();
      tokenExpiration.value.setSeconds(tokenExpiration.value.getSeconds() + res.data.expiresIn);
      setInterval(() => {
        refreshToken();
      }, 2 * 60 * 1000); // 2 Minutes
    } catch (error) {
      if (error.response.status === 400) {
        throw new Error("Request Error");
      } else if (error.response.status === 403) {
        throw new Error("Invalid Credentials");
      } else if (error.response.status === 500) {
        throw new Error("Server Error");
      } else {
        throw new Error("Untracked Error");
      }
    }
  };

  const registerUserAction = async (user) => {
    try {
      const res = await userServices.registerUser(user);

      token.value = res.data.token;
      tokenExpiration.value = new Date();
      tokenExpiration.value.setSeconds(tokenExpiration.value.getSeconds() + res.data.expiresIn);
      setInterval(() => {
        refreshToken();
      }, 2 * 60 * 1000); // 2 Minutes
    } catch (error) {
      if (error.response.status === 400) {
        throw new Error("Request Error");
      } else if (error.response.status === 403) {
        throw new Error("User Exists Already");
      } else if (error.response.status === 500) {
        throw new Error("Server Error");
      } else {
        throw new Error("Untracked Error");
      }
    }
  };

  const checkTokenExpiration = () => {
    const now = new Date();
    if (tokenExpiration.value && now >= tokenExpiration.value) {
      refreshToken();
    }
  };

  const refreshToken = async () => {
    try {
      const res = await userServices.refreshToken();
      token.value = res.data.token;
      tokenExpiration.value = new Date();
      tokenExpiration.value.setSeconds(tokenExpiration.value.getSeconds() + res.data.expiresIn);
    } catch (error) {
      console.log(error);
    }
  };

  // Extra Functions
  onMounted(async () => {
    await refreshToken();
    if (isLoggedIn.value) {
      setInterval(() => {
        refreshToken();
      }, 2 * 60 * 1000); // 2 Minutes
    }
  });

  return {
    token,
    tokenExpiration,
    isLoggedIn,
    loginUserAction,
    registerUserAction,
    checkTokenExpiration,
    refreshToken,
  };
});
