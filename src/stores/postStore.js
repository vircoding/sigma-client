import { defineStore } from "pinia";
import { ref } from "vue";

export const userStore = defineStore("post", () => {
  // Settings

  // States
  const userPostsState = ref(null);

  const userFavoritesState = ref(null);

  const updatePostState = ref(null);

  const popularSalesState = ref(null);

  const popularRentsState = ref(null);

  const popularExchangesState = ref(null);

  const postState = ref(null);

  const agentPostsState = ref(null);

  // Actions

  // Setters
  const setPost = (post) => {
    postState.value = post;
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
    setPost,
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
