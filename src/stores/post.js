import { defineStore } from "pinia";
import postServices from "../services/post.js";

export const usePostStore = defineStore("post", () => {
  // Actions
  const insertPost = async (post) => {
    try {
      const res = await postServices.insertPost(post);

      return res.data;
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
      const res = await postServices.updatePost(id, post);

      return res.data.post;
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
