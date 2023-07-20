import { defineStore } from "pinia";
import postServices from "../services/post.js";
import router from "../router";
import { useLayoutStore } from "./layout.js";
import { useUserStore } from "./user.js";

const userStore = useUserStore();
const layoutStore = useLayoutStore();

export const usePostStore = defineStore("post", () => {
  // Actions
  const insertPost = async (post) => {
    try {
      layoutStore.unhideSpinner();
      const res = await postServices.insertPost(post);
      await userStore.loadSessionPosts();
      layoutStore.hideSpinner();

      router.push(`/post/${res.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPosts = async () => {
    try {
      const res = await postServices.getUserPosts();

      return res.data.posts;
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
      await userStore.loadSessionPosts();
      layoutStore.hideSpinner();

      router.push(`/post/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      await postServices.deletePost(id);
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

  return {
    insertPost,
    getUserPosts,
    getPost,
    visitPost,
    updatePost,
    deletePost,
    getPopularSales,
    getPopularRents,
  };
});
