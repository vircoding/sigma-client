import { defineStore } from "pinia";
import { ref } from "vue";

export const useLayoutStore = defineStore("layout", () => {
  // State
  const sideMenuVisibility = ref(false);
  const isLoading = ref(false);
  const spinnerVisibility = ref(false);

  // Actions
  const unhideSideMenu = () => {
    sideMenuVisibility.value = true;
  };

  const hideSideMenu = () => {
    sideMenuVisibility.value = false;
  };

  const unhideLoading = () => {
    isLoading.value = true;
  };

  const hideLoading = () => {
    isLoading.value = false;
  };

  const unhideSpinner = () => {
    spinnerVisibility.value = true;
  };

  const hideSpinner = () => {
    spinnerVisibility.value = false;
  };

  return {
    sideMenuVisibility,
    isLoading,
    spinnerVisibility,
    unhideSideMenu,
    hideSideMenu,
    unhideLoading,
    hideLoading,
    unhideSpinner,
    hideSpinner,
  };
});
