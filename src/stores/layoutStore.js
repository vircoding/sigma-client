import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useLayoutStore = defineStore("layout", () => {
  // State
  const sideMenu = ref(false);
  const logoLoading = ref(false);
  const spinnerLoading = ref(false);
  const tableSpinner = ref(false);
  const fullScreenGallery = ref(false);
  const popup = ref({
    preInsert: false,
  });

  // Actions
  const unhideSideMenu = () => {
    sideMenu.value = true;
  };

  const hideSideMenu = () => {
    sideMenu.value = false;
  };

  const unhideLogoLoading = () => {
    logoLoading.value = true;
  };

  const hideLogoLoading = () => {
    logoLoading.value = false;
  };

  const unhideSpinnerLoading = () => {
    spinnerLoading.value = true;
  };

  const hideSpinnerLoading = () => {
    spinnerLoading.value = false;
  };

  const unhideTableSpinner = () => {
    tableSpinner.value = true;
  };

  const hideTableSpinner = () => {
    tableSpinner.value = false;
  };

  const unhideFullScreenGallery = () => {
    fullScreenGallery.value = true;
  };

  const hideFullScreenGallery = () => {
    fullScreenGallery.value = false;
  };

  const unhidePopup = (key) => {
    switch (key) {
      case "preInsert":
        popup.value.preInsert = true;
        break;
      default:
        break;
    }
  };

  const hidePopup = () => {
    popup.value = {
      preInsert: false,
    };
  };

  const isPopup = computed(() => {
    for (let prop in popup.value) {
      if (popup.value[prop]) return true;
    }
    return false;
  });

  // Resets
  const $reset = () => {
    sideMenu.value = false;
    logoLoading.value = false;
    spinnerLoading.value = false;
    tableSpinner.value = false;
    fullScreenGallery.value = false;
    popup.value = {
      preInsert: false,
    };
  };

  return {
    sideMenu,
    logoLoading,
    spinnerLoading,
    tableSpinner,
    fullScreenGallery,
    popup,
    isPopup,
    unhideSideMenu,
    hideSideMenu,
    unhideLogoLoading,
    hideLogoLoading,
    unhideSpinnerLoading,
    hideSpinnerLoading,
    unhideTableSpinner,
    hideTableSpinner,
    unhideFullScreenGallery,
    hideFullScreenGallery,
    unhidePopup,
    hidePopup,
    $reset,
  };
});
