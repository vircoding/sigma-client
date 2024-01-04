import { defineStore } from "pinia";
import { ref } from "vue";
import agentsServices from "../services/agentsServices.js";

export const useAgentStore = defineStore("agent", () => {
  // States
  const authorState = ref(null);

  // Actions
  const getAuthor = async (id) => {
    try {
      const res = await agentsServices.getAgent(id);
      authorState.value = {
        role: "agent",
        id: res.data.id,
        contact_details: res.data.contact_details,
        info: res.data.info,
      };
    } catch (error) {
      if (error.response.data.error === "Agent not founded") throw new Error("Agent not founded");
      console.log(error);
    }
  };

  // Resets
  const resetAuthor = () => {
    authorState.value = null;
  };

  const $reset = () => {
    resetAuthor();
  };

  return { authorState, getAuthor, resetAuthor, $reset };
});
