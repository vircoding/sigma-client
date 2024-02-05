import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";
import authServices from "../services/authServices.js";
import accountServices from "../services/accountServices.js";
import postsServices from "../services/postsServices.js";
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

  const myAccountState = ref(null);

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
    try {
      await authServices.logout();
      localStorage.removeItem("activeSession");
      $reset();
    } catch (error) {
      console.log(error);
    }
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

  const getMyAccount = async () => {
    const myAccount = {};

    if (credentialsState.value.role === "client") {
      myAccount.info = { username: userState.value.info.username };
    } else if (credentialsState.value.role === "agent") {
      myAccount.info = {
        bio: userState.value.info.bio,
        firstname: userState.value.info.firstname,
        lastname: userState.value.info.lastname,
      };
      myAccount.contact_details = {
        public_email: userState.value.contact_details.public_email,
        whatsapp: {
          code: userState.value.contact_details.whatsapp.code,
          phone: userState.value.contact_details.whatsapp.phone,
        },
      };
    }

    try {
      const posts_res = await postsServices.getAccountPosts(1);
      const favorites_res = await postsServices.getAccountFavorites(1);

      myAccount.posts = posts_res.data;
      myAccount.favorites = favorites_res.data;

      myAccountState.value = myAccount;
    } catch (error) {
      console.log(error);
    }
  };

  const getMyAccountPosts = async (page) => {
    try {
      const res = await postsServices.getAccountPosts(page);

      myAccountState.value.posts = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getMyAccountFavorites = async (page) => {
    try {
      const res = await postsServices.getAccountFavorites(page);

      myAccountState.value.favorites = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const insertPost = async (post, images) => {
    try {
      const formData = new FormData();
      images.forEach((item, index) => {
        formData.append("images", item, `img_${index + 1}.jpg`);
      });
      formData.append("data", JSON.stringify(post));

      const res = await accountServices.insertPost(formData);
      userPostsState.value = res.data.posts;
      postStore.setPost(res.data.post);

      return res.data.post.id;
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (post, id) => {
    try {
      const res = await accountServices.updatePost(post, id);
      postStore.setPost(res.data);
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

  const resetMyAccount = () => {
    myAccountState.value = null;
  };

  const $reset = () => {
    resetCredentials();
    resetUser();
    resetUserPosts();
    resetUserFavorites();
    resetMyAccount();
  };

  return {
    credentialsState,
    userState,
    userPostsState,
    userFavoritesState,
    myAccountState,
    isLoggedIn,
    refresh,
    login,
    register,
    logout,
    updateUser,
    getUser,
    getPosts,
    getFavorites,
    getMyAccount,
    getMyAccountPosts,
    getMyAccountFavorites,
    insertPost,
    updatePost,
    deletePost,
    addToFavorites,
    resetCredentials,
    resetUser,
    resetUserPosts,
    resetUserFavorites,
    resetMyAccount,
    $reset,
  };
});
