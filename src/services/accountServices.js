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

  insertPost(post) {
    return authorizedAPI().post("/account/posts", post);
  },

  updateUser(user) {
    return authorizedAPI().patch("/account", user);
  },

  updatePost(post, id) {
    return authorizedAPI().patch(`/account/posts/${id}`, post);
  },

  addToFavorites(id, remove = false) {
    if (remove) {
      return authorizedAPI().put(`/account/favorites/${id}?remove=1`);
    }
    return authorizedAPI().put(`/account/favorites/${id}`);
  },

  deletePost(id) {
    return authorizedAPI().delete(`/account/posts/${id}`);
  },
};
