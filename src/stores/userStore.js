import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";
import authServices from "../services/authServices.js";
import accountServices from "../services/accountServices.js";
import { usePostStore } from "./postStore.js";

export const useUserStore = defineStore("user", () => {
  // Settings
  const postStore = usePostStore();

  onMounted(async () => {
    setInterval(async () => {
      if (isLoggedIn.value) {
        await refresh();
      }
    }, 10 * 60 * 1000); // 10 Minutes
  });

  // States
  const credentialsState = ref({
    token: "",
    tokenExpiration: "",
    role: "reader",
  });

  const userState = ref({});

  const userPostsState = ref([]);

  const userFavoritesState = ref([]);

  // Getters
  const isLoggedIn = computed(() => !!credentialsState.value.token);

  // Actions
  const refresh = async (firstLoad = false) => {
    if (localStorage.getItem("activeSession")) {
      const expiresIn = JSON.parse(localStorage.getItem("activeSession")).expiresIn;
      if (Date.now() < expiresIn) {
        try {
          const res = await authServices.refresh();
          credentialsState.value.token = res.data.token;
          credentialsState.value.tokenExpiration = new Date();
          credentialsState.value.tokenExpiration.setSeconds(
            credentialsState.value.tokenExpiration.getSeconds() + res.data.expiresIn
          );

          if (firstLoad) await getUser();
        } catch (error) {
          if (error.response.status === 401) {
            console.log("User not logged in");
          } else if (error.response.status === 500) {
            console.log("Server Error");
          } else {
            console.log("Untracked Error");
            console.log(error);
          }
        }
      } else {
        localStorage.removeItem("activeSession");
        $reset();
      }
    }
  };

  const login = async (user) => {
    try {
      const res = await authServices.login(user);
      credentialsState.value.token = res.data.credentials.token;
      credentialsState.value.tokenExpiration = new Date();
      credentialsState.value.tokenExpiration.setSeconds(
        credentialsState.value.tokenExpiration.getSeconds() + res.data.credentials.expiresIn
      );
      credentialsState.value.role = res.data.credentials.role;
      if (res.data.credentials.role === "client") {
        userState.value = { info: res.data.info };
      } else if (res.data.credentials.role === "agent") {
        userState.value = { info: res.data.info, contact_details: res.data.contact_details };
      }
      userPostsState.value = res.data.posts;
      userFavoritesState.value = res.data.favorites;

      localStorage.setItem(
        "activeSession",
        JSON.stringify({
          expiresIn: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 Days
        })
      );
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

  const register = async (user) => {
    try {
      const res = await authServices.register(user);
      credentialsState.value.token = res.data.credentials.token;
      credentialsState.value.tokenExpiration = new Date();
      credentialsState.value.tokenExpiration.setSeconds(
        credentialsState.value.tokenExpiration.getSeconds() + res.data.credentials.expiresIn
      );
      credentialsState.value.role = res.data.credentials.role;
      if (res.data.credentials.role === "client") {
        userState.value = { info: res.data.info };
      } else if (res.data.credentials.role === "agent") {
        userState.value = { info: res.data.info, contact_details: res.data.contact_details };
      }

      localStorage.setItem(
        "activeSession",
        JSON.stringify({
          expiresIn: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 Days
        })
      );
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

  const logout = async () => {
    console.log("Logout Action");
  };

  const updateUser = async (user) => {
    try {
      const res = await accountServices.updateUser(user);
      credentialsState.value.role = res.data.credentials.role;
      if (res.data.credentials.role === "client") {
        userState.value = { info: res.data.info };
      } else if (res.data.credentials.role === "agent") {
        userState.value = { info: res.data.info, contact_details: res.data.contact_details };
      }
      userPostsState.value = res.data.posts;
      userFavoritesState.value = res.data.favorites;
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const res = await accountServices.getUser();
      credentialsState.value.role = res.data.credentials.role;
      if (res.data.credentials.role === "client") {
        userState.value = { info: res.data.info };
      } else if (res.data.credentials.role === "agent") {
        userState.value = { info: res.data.info, contact_details: res.data.contact_details };
      }
      userPostsState.value = res.data.posts;
      userFavoritesState.value = res.data.favorites;
    } catch (error) {
      console.log(error);
    }
  };

  const getPosts = async () => {
    try {
      const res = await accountServices.getPosts();
      userPostsState.value = res.data.posts;
    } catch (error) {
      console.log(error);
    }
  };

  const getFavorites = async () => {
    try {
      const res = await accountServices.getFavorites();
      userFavoritesState.value = res.data.favorites;
    } catch (error) {
      console.log(error);
    }
  };

  const insertPost = async (post) => {
    try {
      const res = await accountServices.insertPost(post);
      userPostsState.value = res.data.posts;
      postStore.setPostState(res.data.post);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (post, id) => {
    try {
      const res = await accountServices.updatePost(post, id);
      postStore.setPostState(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      const res = await accountServices.deletePost(id);
      userPostsState.value = res.data.posts;
    } catch (error) {
      console.log(error);
    }
  };

  const addToFavorites = async (id) => {
    try {
      const res = await accountServices.addToFavorites(id);
      userFavoritesState.value = res.data.favorites;
    } catch (error) {
      console.log(error);
    }
  };

  // Resets
  const resetCredentials = () => {
    credentialsState.value = {
      token: "",
      tokenExpiration: "",
      role: "reader",
    };
  };

  const resetUser = () => {
    userState.value = {};
  };

  const resetUserPosts = () => {
    userPostsState.value = [];
  };

  const resetUserFavorites = () => {
    userFavoritesState.value = [];
  };

  const $reset = () => {
    resetCredentials();
    resetUser();
    resetUserPosts();
    resetUserFavorites();
  };

  return {
    credentialsState,
    userState,
    userPostsState,
    userFavoritesState,
    isLoggedIn,
    refresh,
    login,
    register,
    logout,
    updateUser,
    getUser,
    getPosts,
    getFavorites,
    insertPost,
    updatePost,
    deletePost,
    addToFavorites,
    resetCredentials,
    resetUser,
    resetUserPosts,
    resetUserFavorites,
    $reset,
  };
});
