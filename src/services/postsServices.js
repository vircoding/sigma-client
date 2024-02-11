import { authorizedAPI, unauthorizedAPI } from "./api";

export default {
  getPosts() {
    return unauthorizedAPI().get("/posts");
  },

  getSales(page, province, municipality, currency, infl, supl) {
    let query = `?page=${page}`;

    if (province) query = query + `&province=${encodeURIComponent(province)}`;
    if (municipality) query = query + `&municipality=${encodeURIComponent(municipality)}`;
    if (currency) query = query + `&currency=${currency}`;
    if (infl) query = query + `&infl=${infl}`;
    if (supl) query = query + `&supl=${supl}`;

    return unauthorizedAPI().get(`/posts/sales${query}`);
  },

  getRents(page, province, municipality, currency, frequency, infl, supl) {
    let query = `?page=${page}`;

    if (province) query = query + `&province=${encodeURIComponent(province)}`;
    if (municipality) query = query + `&municipality=${encodeURIComponent(municipality)}`;
    if (currency) query = query + `&currency=${currency}`;
    if (frequency) query = query + `&frequency=${frequency}`;
    if (infl) query = query + `&infl=${infl}`;
    if (supl) query = query + `&supl=${supl}`;

    return unauthorizedAPI().get(`/posts/rents${query}`);
  },

  getExchanges(page, province, municipalty) {
    let query = `?page=${page}`;

    if (province) query = query + `&province=${encodeURIComponent(province)}`;
    if (municipalty) query = query + `&municipality=${encodeURIComponent(municipalty)}`;

    return unauthorizedAPI().get(`/posts/exchanges${query}`);
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
