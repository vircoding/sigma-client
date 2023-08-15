import { unauthorizedAPI } from "./api.js";

export default {
  getAgentInfo(id) {
    return unauthorizedAPI().get(`/agents/${id}`);
  },

  getAgentPosts(id, page) {
    return unauthorizedAPI().get(`/agents/${id}/posts?page=${page}`);
  },
};
