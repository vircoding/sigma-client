import { defineStore } from "pinia";
import { ref, computed } from "vue";
import postsServices from "../services/postsServices.js";

export const usePostStore = defineStore("post", () => {
  // States
  const postState = ref(null);
  const updatePostState = ref(null);
  const popularSalesState = ref(null);
  const popularRentsState = ref(null);
  const popularExchangesState = ref(null);
  const agentPostsState = ref(null);
  const userPostsState = ref(null);
  const userFavoritesState = ref(null);

  // Computed
  const isPostState = computed(() => !!postState.value);

  // Actions
  const getPost = async (id) => {
    try {
      const res = await postsServices.getPost(id);
      postState.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getUpdatePost = async (id) => {
    try {
      const res = await postsServices.getPost(id);
      updatePostState.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const visitPost = async (id) => {
    try {
      await postsServices.visitPost(id);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPosts = async () => {
    try {
      console.log("Get User Posts Action");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserFavorites = async () => {
    try {
      console.log("Get User Favorites Action");
    } catch (error) {
      console.log(error);
    }
  };

  const getPopularSales = async () => {
    try {
      const res = await postsServices.getPopularSales();
      popularSalesState.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getPopularRents = async () => {
    try {
      const res = await postsServices.getPopularRents();
      popularRentsState.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getPopularExchanges = async () => {
    try {
      const res = await postsServices.getPopularExchanges();
      popularExchangesState.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  // Setters
  const setPost = (post) => {
    postState.value = post;
  };

  const setUpdatePost = (post) => {
    updatePostState.value = post;
  };

  // Resets
  const resetUserPosts = () => {
    userPostsState.value = null;
  };

  const resetUserFavorites = () => {
    userFavoritesState.value = null;
  };

  const resetUpdatePost = () => {
    updatePostState.value = null;
  };

  const resetPopularSales = () => {
    popularSalesState.value = null;
  };

  const resetPopularRents = () => {
    popularRentsState.value = null;
  };

  const resetPopularExchanges = () => {
    popularExchangesState.value = null;
  };

  const resetPost = () => {
    postState.value = null;
  };

  const resetAgentPosts = () => {
    agentPostsState.value = null;
  };

  const $reset = () => {
    resetUserPosts();
    resetUserFavorites();
    resetUpdatePost();
    resetPopularSales();
    resetPopularRents();
    resetPopularExchanges();
    resetPost();
    resetAgentPosts();
  };

  return {
    userPostsState,
    userFavoritesState,
    updatePostState,
    popularSalesState,
    popularRentsState,
    popularExchangesState,
    postState,
    agentPostsState,
    isPostState,
    getPost,
    getUpdatePost,
    visitPost,
    getUserPosts,
    getUserFavorites,
    getPopularSales,
    getPopularRents,
    getPopularExchanges,
    setPost,
    setUpdatePost,
    resetUserPosts,
    resetUserFavorites,
    resetUpdatePost,
    resetPopularSales,
    resetPopularRents,
    resetPopularExchanges,
    resetPost,
    resetAgentPosts,
    $reset,
  };
});
