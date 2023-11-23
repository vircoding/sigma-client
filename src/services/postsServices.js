import { authorizedAPI, unauthorizedAPI } from "./api";

export default {
  getPosts() {
    return unauthorizedAPI().get("/posts");
  },

  getSales() {
    return unauthorizedAPI().get("/posts/sales");
  },

  getRents() {
    return unauthorizedAPI().get("/posts/rents");
  },

  getExchanges() {
    return unauthorizedAPI().get("/posts/exchanges");
  },

  getPost(id) {
    return unauthorizedAPI().get(`/posts/${id}`);
  },

  getAccountPosts(page) {
    return authorizedAPI().get(`/posts/user/posts?page=${page}`);
  },

  getAccountFavorites(page) {
    return authorizedAPI().get(`/posts/user/favorites?page=${page}`);
  },

  getPopularSales() {
    return unauthorizedAPI().get("/posts/popular/sales");
  },

  getPopularRents() {
    return unauthorizedAPI().get("/posts/popular/rents");
  },

  getPopularExchanges() {
    return unauthorizedAPI().get("/posts/popular/exchanges");
  },

  visitPost(id) {
    return unauthorizedAPI().put(`/posts/${id}`);
  },
};
