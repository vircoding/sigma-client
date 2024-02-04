import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useLayoutStore = defineStore("layout", () => {
  // State
  const sideMenu = ref(false);
  const logoLoading = ref(false);
  const spinnerLoading = ref(false);
  const tableSpinner = ref(false);
  const fullScreenGallery = ref(false);
  const imageCropper = ref(false);
  const popup = ref({
    preInsert: false,
    deletePost: false,
  });
  const deletePostId = ref(null);
  const cropFileURLState = ref(null);
  const blobImagesURLState = ref([]);

  // Getters
  const isPopup = computed(() => {
    for (let prop in popup.value) {
      if (popup.value[prop]) return true;
    }
    return false;
  });

  const getCropFileURL = computed(() => {
    return cropFileURLState.value;
  });

  // Setters
  const setDeletePostId = (id) => {
    deletePostId.value = id;
  };

  const setCropFileURL = (url) => {
    cropFileURLState.value = url;
  };

  const setBlobImageURL = (url) => {
    if (blobImagesURLState.value.length < 10) {
      blobImagesURLState.value.push(url);
    }
  };

  // Actions
  const removeBlobImageURL = (index) => {
    if (index >= 0 && index < blobImagesURLState.value.length) {
      blobImagesURLState.value.splice(index, 1);
    }
  };

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

  const unhideImageCropper = () => {
    imageCropper.value = true;
  };

  const hideImageCropper = () => {
    imageCropper.value = false;
  };

  const unhidePopup = (key) => {
    switch (key) {
      case "pre-insert":
        popup.value.preInsert = true;
        break;
      case "delete-post":
        popup.value.deletePost = true;
        break;
      default:
        break;
    }
  };

  const hidePopup = () => {
    popup.value = {
      preInsert: false,
      deletePost: false,
    };
  };

  // Resets
  const resetDeletePostId = () => {
    deletePostId.value = null;
  };

  const resetCropFileURL = () => {
    cropFileURLState.value = null;
  };

  const $reset = () => {
    sideMenu.value = false;
    logoLoading.value = false;
    spinnerLoading.value = false;
    tableSpinner.value = false;
    fullScreenGallery.value = false;
    imageCropper.value = false;
    popup.value = {
      preInsert: false,
      deletePost: false,
    };
    resetDeletePostId();
    resetCropFileURL();
  };

  return {
    sideMenu,
    logoLoading,
    spinnerLoading,
    tableSpinner,
    fullScreenGallery,
    imageCropper,
    popup,
    cropFileURLState,
    blobImagesURLState,
    deletePostId,
    isPopup,
    getCropFileURL,
    setDeletePostId,
    setBlobImageURL,
    setCropFileURL,
    removeBlobImageURL,
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
    unhideImageCropper,
    hideImageCropper,
    unhidePopup,
    hidePopup,
    resetDeletePostId,
    resetCropFileURL,
    $reset,
  };
});
