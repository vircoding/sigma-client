import { unauthorizedAPI } from "./api.js";

export default {
  getCountries() {
    return unauthorizedAPI().get("/countries");
  },
};
