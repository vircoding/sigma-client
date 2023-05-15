import { defineStore } from "pinia";
import { ref } from "vue";

export const useLayoutStore = defineStore("layout", () => {
  // State
  const sideMenuVisibility = ref(false);

  // Actions
  const unhideSideMenu = () => {
    sideMenuVisibility.value = true;
  };

  const hideSideMenu = () => {
    sideMenuVisibility.value = false;
  };

  return { sideMenuVisibility, unhideSideMenu, hideSideMenu };
});
