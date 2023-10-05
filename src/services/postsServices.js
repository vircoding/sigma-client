import { unauthorizedAPI } from "./api";

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

  visitPost(id) {
    return unauthorizedAPI().put(`/posts/${id}`);
  },
};
