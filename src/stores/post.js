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

  return { insertPost };
});
