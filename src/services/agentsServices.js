import { unauthorizedAPI } from "./api.js";

export default {
  getAgents() {
    return unauthorizedAPI().get("/agents");
  },

  getAgent(id) {
    return unauthorizedAPI().get(`/agents/${id}`);
  },
};
