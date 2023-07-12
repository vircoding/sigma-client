import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";
import router from "../router";
import userServices from "../services/user.js";
import postServices from "../services/post.js";

export const useUserStore = defineStore("user", () => {
  // State
  const userState = ref({
    info: {},
    credentials: {
      token: "",
      tokenExpiration: null,
      role: "reader",
    },
  });

  const firstLoadState = ref(false);

  const token = ref("");
  const tokenExpiration = ref(null);
  const role = ref("reader");

  // Getters
  const isLoggedIn = computed(() => !!userState.value.credentials.token);

  // Actions
  const loginUser = async (user) => {
    try {
      const res = await userServices.loginUser(user);

      localStorage.setItem(
        "activeSession",
        JSON.stringify({
          expiresIn: Date.now() + 30 * 24 * 60 * 60 * 1000,
        })
      );

      userState.value.credentials.token = res.data.credentials.token;
      userState.value.credentials.tokenExpiration = new Date();
      userState.value.credentials.tokenExpiration.setSeconds(
        userState.value.credentials.tokenExpiration.getSeconds() + res.data.credentials.expiresIn
      );
      userState.value.credentials.role = res.data.credentials.role;
      userState.value.info = res.data.info;

      router.push("/");
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
      console.log(error);
    }
  };

  const registerClient = async (user) => {
    try {
      const res = await userServices.registerClient(user);

      localStorage.setItem(
        "activeSession",
        JSON.stringify({
          expiresIn: Date.now() + 30 * 24 * 60 * 60 * 1000,
        })
      );

      userState.value.credentials.token = res.data.credentials.token;
      userState.value.credentials.tokenExpiration = new Date();
      userState.value.credentials.tokenExpiration.setSeconds(
        userState.value.credentials.tokenExpiration.getSeconds() + res.data.credentials.expiresIn
      );
      userState.value.credentials.role = res.data.credentials.role;
      userState.value.info = res.data.info;

      router.push("/");
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

      localStorage.setItem(
        "activeSession",
        JSON.stringify({
          expiresIn: Date.now() + 30 * 24 * 60 * 60 * 1000,
        })
      );

      userState.value.credentials.token = res.data.credentials.token;
      userState.value.credentials.tokenExpiration = new Date();
      userState.value.credentials.tokenExpiration.setSeconds(
        userState.value.credentials.tokenExpiration.getSeconds() + res.data.credentials.expiresIn
      );
      userState.value.credentials.role = res.data.credentials.role;
      userState.value.info = res.data.info;

      router.push("/");
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
    if (localStorage.getItem("activeSession")) {
      const refreshTokenExpiration = JSON.parse(localStorage.getItem("activeSession"));
      if (Date.now() < refreshTokenExpiration.expiresIn) {
        try {
          const res = await userServices.refreshToken();
          userState.value.credentials.token = res.data.token;
          userState.value.credentials.tokenExpiration = new Date();
          userState.value.credentials.tokenExpiration.setSeconds(
            userState.value.credentials.tokenExpiration.getSeconds() + res.data.expiresIn
          );

          if (firstLoadState.value) {
            const res = await userServices.getSessionInfo();
            userState.value.credentials.role = res.data.credentials.role;
            userState.value.info = res.data.info;
          }
        } catch (error) {
          if (error.response.status === 401) {
            console.log("User not logged in");
          } else if (error.response.status === 500) {
            console.log("Server Error");
          } else {
            console.log("Untracked Error");
          }
        }
        return;
      }
      localStorage.removeItem("activeSession");
      $reset();
      return;
    }
  };

  const logoutUser = async () => {
    try {
      await userServices.logoutUser();
      localStorage.removeItem("activeSession");
      $reset();
      router.push("/");
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
    userState.value = {
      info: {},
      credentials: {
        token: "",
        tokenExpiration: null,
        role: "reader",
      },
    };
  };

  // Extra Functions
  onMounted(async () => {
    console.log("first Refresh");
    firstLoadState.value = true;
    await refreshToken();
    firstLoadState.value = false;
    setInterval(() => {
      console.log("refreshing de onmounted");
      if (isLoggedIn.value) refreshToken();
    }, 2 * 60 * 1000); // 2 Minutes
  });

  return {
    userState,
    firstLoadState,
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
