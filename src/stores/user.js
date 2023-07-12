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

  const token = ref("");
  const tokenExpiration = ref(null);
  const role = ref("reader");

  // Getters
  const isLoggedIn = computed(() => !!userState.value.credentials.token);

  // Actions
  const loginUser = async (user) => {
    try {
      const res = await userServices.loginUser(user);
      userState.value.credentials.token = res.data.credentials.token;
      userState.value.credentials.tokenExpiration = new Date();
      userState.value.credentials.tokenExpiration.setSeconds(
        userState.value.credentials.tokenExpiration.getSeconds() + res.data.credentials.expiresIn
      );
      userState.value.credentials.role = res.data.credentials.role;
      userState.value.info = res.data.info;

      setInterval(() => {
        refreshToken();
      }, 2 * 60 * 1000); // 2 Minutes

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
    }
  };

  const registerClient = async (user) => {
    try {
      const res = await userServices.registerClient(user);

      userState.value.credentials.token = res.data.credentials.token;
      userState.value.credentials.tokenExpiration = new Date();
      userState.value.credentials.tokenExpiration.setSeconds(
        userState.value.credentials.tokenExpiration.getSeconds() + res.data.credentials.expiresIn
      );
      userState.value.credentials.role = res.data.credentials.role;
      userState.value.info = res.data.info;

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

      userState.value.credentials.token = res.data.credentials.token;
      userState.value.credentials.tokenExpiration = new Date();
      userState.value.credentials.tokenExpiration.setSeconds(
        userState.value.credentials.tokenExpiration.getSeconds() + res.data.credentials.expiresIn
      );
      userState.value.credentials.role = res.data.credentials.role;
      userState.value.info = res.data.info;

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
    console.log("Refreshing Token");
    try {
      const res = await userServices.refreshToken();
      userState.value.credentials.token = res.data.token;
      userState.value.credentials.tokenExpiration = new Date();
      userState.value.credentials.tokenExpiration.setSeconds(
        userState.value.credentials.tokenExpiration.getSeconds() + res.data.expiresIn
      );
    } catch (error) {
      if (error.response.status === 401) {
        console.log("User not logged in");
      } else if (error.response.status === 500) {
        console.log("Server Error");
      } else {
        console.log("Untracked Error");
      }
    }
    console.log(userState.value.credentials.token);
    console.log(userState.value.credentials.tokenExpiration);
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
    await refreshToken();
    if (isLoggedIn.value) {
      setInterval(() => {
        refreshToken();
      }, 2 * 60 * 1000); // 2 Minutes
    }
  });

  return {
    userState,
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
