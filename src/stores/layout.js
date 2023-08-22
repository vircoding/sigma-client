import { defineStore } from "pinia";
import { ref } from "vue";

export const useLayoutStore = defineStore("layout", () => {
  // State
  const sideMenuVisibility = ref(false);
  const isLoading = ref(false);
  const spinnerVisibility = ref(false);
  const tableSpinnerVisibility = ref(false);

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

  const unhideTableSpinner = () => {
    tableSpinnerVisibility.value = true;
  };

  const hideTableSpinner = () => {
    tableSpinnerVisibility.value = false;
  };

  return {
    sideMenuVisibility,
    isLoading,
    spinnerVisibility,
    tableSpinnerVisibility,
    unhideSideMenu,
    hideSideMenu,
    unhideLoading,
    hideLoading,
    unhideSpinner,
    hideSpinner,
    unhideTableSpinner,
    hideTableSpinner,
  };
});
