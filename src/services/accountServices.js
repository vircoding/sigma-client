import axios from "axios";
import { useUserStore } from "../stores/userStore.js";
import { authorizedAPI } from "./api.js";

export default {
  getUser() {
    return authorizedAPI().get("/account");
  },

  getInfo() {
    return authorizedAPI().get("/account/info");
  },

  getRole() {
    return authorizedAPI().get("/account/role");
  },

  getPosts() {
    return authorizedAPI().get("/account/posts");
  },

  getFavorites() {
    return authorizedAPI().get("account/favorites");
  },

  updateUser(user) {
    return authorizedAPI().patch("/account", user);
  },

  updatePost(post, id) {
    return authorizedAPI().patch(`/account/posts/${id}`, post);
  },

  addToFavorites(id) {
    return authorizedAPI().put(`/account/favorites/${id}`);
  },

  deletePost(id) {
    return authorizedAPI().delete(`/account/posts/${id}`);
  },

  insertPost(formData) {
    const userStore = useUserStore();
    return axios.post(
      import.meta.env.MODE === "development"
        ? "http://localhost:5000/api/v1/account/posts"
        : "https://sigmacuba.com/api/v1/account/posts",
      formData,
      {
        headers: {
          "Contet-Type": "multipart/form-data",
          Authorization: `Bearer ${userStore.credentialsState.token}`,
        },
      }
    );
  },
};
