import { defineStore } from "pinia";
import { ref } from "vue";
import postServices from "../services/post.js";

export const usePostStore = defineStore("post", () => {
  // Actions
  const insertPost = async (post, token) => {
    try {
      const res = await postServices.insertPost(post, token);

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPosts = async (token) => {
    try {
      const res = await postServices.getUserPosts();

      return res.data.posts;
    } catch (error) {
      console.log(error);
    }
  };

  return { insertPost, getUserPosts };
});
