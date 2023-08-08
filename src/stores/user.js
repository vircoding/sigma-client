import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";
import router from "../router";
import userServices from "../services/user.js";
import postServices from "../services/post.js";
import { useLayoutStore } from "./layout";

export const useUserStore = defineStore("user", () => {
  // State
  const userState = ref({
    info: {},
    credentials: {
      token: "",
      tokenExpiration: null,
      role: "reader",
    },
    posts: [],
    favorites: [],
  });

  const layoutStore = useLayoutStore();

  const token = ref("");
  const tokenExpiration = ref(null);
  const role = ref("reader");

  // Getters
  const isLoggedIn = computed(() => !!userState.value.credentials.token);

  // Actions
  const loginUser = async (user) => {
    try {
      layoutStore.unhideSpinner();
      const res = await userServices.loginUser(user);

      console.log(res.data);

      userState.value.credentials.token = res.data.credentials.token;
      userState.value.credentials.tokenExpiration = new Date();
      userState.value.credentials.tokenExpiration.setSeconds(
        userState.value.credentials.tokenExpiration.getSeconds() + res.data.credentials.expiresIn
      );
      userState.value.credentials.role = res.data.credentials.role;
      userState.value.info = res.data.info;
      userState.value.favorites = res.data.favorites;

      const posts = await postServices.getUserPosts();

      userState.value.posts = posts.data.posts;

      localStorage.setItem(
        "activeSession",
        JSON.stringify({
          expiresIn: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 Days
        })
      );

      layoutStore.hideSpinner();

      await router.push("/");
    } catch (error) {
      $reset();
      console.log(error);
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
      layoutStore.unhideSpinner();
      const res = await userServices.registerClient(user);

      userState.value.credentials.token = res.data.credentials.token;
      userState.value.credentials.tokenExpiration = new Date();
      userState.value.credentials.tokenExpiration.setSeconds(
        userState.value.credentials.tokenExpiration.getSeconds() + res.data.credentials.expiresIn
      );
      userState.value.credentials.role = res.data.credentials.role;
      userState.value.info = res.data.info;
      userState.value.favorites = res.data.favorites;

      localStorage.setItem(
        "activeSession",
        JSON.stringify({
          expiresIn: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 Days
        })
      );

      layoutStore.hideSpinner();

      await router.push("/");
    } catch (error) {
      $reset();
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

  const registerAgent = async (user) => {
    try {
      layoutStore.unhideSpinner();
      const res = await userServices.registerAgent(user);

      userState.value.credentials.token = res.data.credentials.token;
      userState.value.credentials.tokenExpiration = new Date();
      userState.value.credentials.tokenExpiration.setSeconds(
        userState.value.credentials.tokenExpiration.getSeconds() + res.data.credentials.expiresIn
      );
      userState.value.credentials.role = res.data.credentials.role;
      userState.value.info = res.data.info;
      userState.value.favorites = res.data.favorites;

      localStorage.setItem(
        "activeSession",
        JSON.stringify({
          expiresIn: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 Days
        })
      );

      layoutStore.hideSpinner();

      await router.push("/");
    } catch (error) {
      $reset();
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

  const refreshToken = async (firstLoad = false) => {
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

          if (firstLoad) {
            await loadSessionInfo();
            await loadSessionPosts();
          }
        } catch (error) {
          // console.log(error);
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
      layoutStore.unhideSpinner();
      await userServices.logoutUser();
      localStorage.removeItem("activeSession");
      $reset();
      layoutStore.hideSpinner();
      await router.push("/");
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
      layoutStore.unhideSpinner();
      await userServices.updateClient(user);
      await loadSessionInfo();
      layoutStore.hideSpinner();
    } catch (error) {
      console.log(error);
    }
  };

  const updateAgent = async (user) => {
    try {
      layoutStore.unhideSpinner();
      await userServices.updateAgent(user);
      await loadSessionInfo();
      layoutStore.hideSpinner();
    } catch (error) {
      console.log(error);
    }
  };

  const loadSessionInfo = async () => {
    try {
      const res = await userServices.getSessionInfo();
      userState.value.credentials.role = res.data.credentials.role;
      userState.value.info = res.data.info;
      userState.value.favorites = res.data.favorites;
    } catch (error) {
      console.log(error);
    }
  };

  const loadSessionPosts = async () => {
    try {
      const posts = await postServices.getUserPosts();
      userState.value.posts = posts.data.posts;
    } catch (error) {
      console.log(error);
    }
  };

  // Extra Functions
  const $reset = () => {
    userState.value = {
      info: {},
      credentials: {
        token: "",
        tokenExpiration: null,
        role: "reader",
      },
      posts: [],
      favorites: [],
    };
  };

  onMounted(async () => {
    setInterval(async () => {
      console.log("refreshing de onmounted");
      if (isLoggedIn.value) {
        await refreshToken();
      }
    }, 10 * 60 * 1000); // 10 Minutes
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
    loadSessionInfo,
    loadSessionPosts,
  };
});
