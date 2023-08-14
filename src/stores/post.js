import { defineStore } from "pinia";
import { ref } from "vue";
import postServices from "../services/post.js";
import router from "../router";
import { useLayoutStore } from "./layout.js";
import { useUserStore } from "./user.js";

export const usePostStore = defineStore("post", () => {
  const userStore = useUserStore();
  const layoutStore = useLayoutStore();

  // State
  const postState = ref({});

  // Actions
  const loadPost = async (id) => {
    try {
      const res = await postServices.getPost(id);
      postState.value = res.data.post;
      postState.value.published_by = res.data.published_by;
    } catch (error) {
      console.log(error);
    }
  };

  const insertPost = async (post) => {
    try {
      layoutStore.unhideSpinner();
      const res = await postServices.insertPost(post);
      layoutStore.hideSpinner();

      await router.push(`/post/${res.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const getPost = async (id) => {
    try {
      const res = await postServices.getPost(id);
      return res.data.post;
    } catch (error) {
      console.log(error);
    }
  };

  const visitPost = async (id) => {
    try {
      await postServices.visitPost(id);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (id, post) => {
    try {
      layoutStore.unhideSpinner();
      await postServices.updatePost(id, post);
      layoutStore.hideSpinner();

      await router.push(`/post/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      layoutStore.unhideSpinner();
      await postServices.deletePost(id);
      layoutStore.hideSpinner();
    } catch (error) {
      console.log(error);
    }
  };

  const getPopularSales = async () => {
    try {
      const res = await postServices.getPopularSales();

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getPopularRents = async () => {
    try {
      const res = await postServices.getPopularRents();

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const favorite = async (id) => {
    try {
      const res = await postServices.favorite(id);
      userStore.userState.favorites = res.data.favorites;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    postState,
    loadPost,
    insertPost,
    getPost,
    visitPost,
    updatePost,
    deletePost,
    getPopularSales,
    getPopularRents,
    favorite,
  };
});
