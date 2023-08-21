import { authorizedAPI, unauthorizedAPI } from "./api.js";

export default {
  insertPost(post) {
    return authorizedAPI().post("/posts", {
      type: post.type,
      province: post.address.province,
      municipality: post.address.municipality,
      bed_room: post.features.bed_room,
      bath_room: post.features.bath_room,
      garage: post.features.garage,
      garden: post.features.garden,
      pool: post.features.pool,
      furnished: post.features.furnished,
      phone: post.phone,
      description: post.description,
      currency: post.currency,
      frequency: post.frequency,
      amount: post.amount,
    });
  },

  getUserPosts(page) {
    return authorizedAPI().get(`/posts/user?page=${page}`);
  },

  getUserFavorites(page) {
    return authorizedAPI().get(`posts/user/favorites?page=${page}`);
  },

  getNextFavorite(index) {
    return authorizedAPI().get(`posts/user/favorites?page=${index}&limit=1`);
  },

  getPost(id) {
    return unauthorizedAPI().get(`/posts/${id}`);
  },

  visitPost(id) {
    return unauthorizedAPI().put(`/posts/${id}`);
  },

  favorite(id) {
    return authorizedAPI().put(`/posts/favorite/${id}`);
  },

  removeFavorite(id) {
    return authorizedAPI().put(`/posts/favorite/${id}?remove=1`);
  },

  updatePost(id, post) {
    return authorizedAPI().patch(`/posts/${id}`, {
      type: post.type,
      province: post.address.province,
      municipality: post.address.municipality,
      bed_room: post.features.bed_room,
      bath_room: post.features.bath_room,
      garage: post.features.garage,
      garden: post.features.garden,
      pool: post.features.pool,
      furnished: post.features.furnished,
      phone: post.phone,
      description: post.description,
      currency: post.currency,
      frequency: post.frequency,
      amount: post.amount,
    });
  },

  deletePost(id) {
    return authorizedAPI().delete(`/posts/${id}`);
  },

  getPopularSales() {
    return unauthorizedAPI().get("/posts/sales");
  },

  getPopularRents() {
    return unauthorizedAPI().get("/posts/rents");
  },
};
