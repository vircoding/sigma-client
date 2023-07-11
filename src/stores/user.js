import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";
import router from "../router";
import userServices from "../services/user.js";
import postServices from "../services/post.js";

export const useUserStore = defineStore("user", () => {
  // State
  const token = ref("");
  const tokenExpiration = ref(null);
  const role = ref("reader");

  // Getters
  const isLoggedIn = computed(() => !!token.value);

  // Actions
  const loginUser = async (user) => {
    try {
      const res = await userServices.loginUser(user);

      role.value = res.data.role;
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

  const registerClient = async (user) => {
    try {
      const res = await userServices.registerClient(user);

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

  const registerAgent = async (user) => {
    try {
      const res = await userServices.registerAgent(user);

      token.value = res.data.token;
      tokenExpiration.value = new Date();
      tokenExpiration.value.setSeconds(tokenExpiration.value.getSeconds() + res.data.expiresIn);
      setInterval(() => {
        refreshToken();
      }, 2 * 60 * 1000); // 2 Minutes
    } catch (error) {
      console.log(error);
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

  const refreshToken = async () => {
    try {
      const res = await userServices.refreshToken();
      token.value = res.data.token;
      tokenExpiration.value = new Date();
      tokenExpiration.value.setSeconds(tokenExpiration.value.getSeconds() + res.data.expiresIn);
    } catch (error) {
      if (error.response.status === 401) {
        console.log("User not logged in");
      } else if (error.response.status === 500) {
        console.log("Server Error");
      } else {
        console.log("Untracked Error");
      }
    }
  };

  const logoutUser = async () => {
    try {
      await userServices.logoutUser();
      router.push("/");
      $reset();
    } catch (error) {
      if (error.response.status === 500) {
        throw new Error("Server Error");
      } else {
        throw new Error("Untracked Error");
      }
    }
  };

  const updateClient = async (user) => {
    try {
      const res = await userServices.updateClient(user);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateAgent = async (user) => {
    try {
      const res = await userServices.updateAgent(user);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserInfo = async () => {
    try {
      const res = await userServices.getUserInfo();

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getAccountViewData = async () => {
    try {
      const userInfo = await userServices.getUserInfo();
      const postsInfo = await postServices.getUserPosts();

      const res = {
        user: userInfo.data,
        posts: postsInfo.data.posts,
      };

      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const $reset = () => {
    token.value = "";
    tokenExpiration.value = null;
    role.value = "reader";
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
    role,
    isLoggedIn,
    loginUser,
    registerClient,
    registerAgent,
    refreshToken,
    logoutUser,
    updateClient,
    updateAgent,
    getUserInfo,
    getAccountViewData,
  };
});
