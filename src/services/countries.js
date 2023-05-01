import api from "./api.js";

export default {
  getCountries() {
    return api().get("/countries");
  },
};
