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
  const singleImageURLState = ref(null);
  const postImagesURLState = ref([]);
  const editImage = ref({
    status: false,
    index: null,
  });

  // Getters
  const isPopup = computed(() => {
    for (let prop in popup.value) {
      if (popup.value[prop]) return true;
    }
    return false;
  });

  const getSingleImageURLState = computed(() => {
    return singleImageURLState.value;
  });

  // Setters
  const setDeletePostId = (id) => {
    deletePostId.value = id;
  };

  const setSingleImageURLState = (url) => {
    singleImageURLState.value = url;
  };

  const setPostImageURL = (url) => {
    if (postImagesURLState.value.length < 10) {
      postImagesURLState.value.push({
        cropped: url,
        original: singleImageURLState.value,
      });
    }
  };

  const editPostImageURL = (index, url) => {
    postImagesURLState.value[index].cropped = url;
  };

  const setEditImage = (index) => {
    editImage.value = {
      status: true,
      index: index,
    };
  };

  // Actions
  const removePostImageURL = (index) => {
    if (index >= 0 && index < postImagesURLState.value.length) {
      postImagesURLState.value.splice(index, 1);
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

  const resetEditImage = () => {
    editImage.value = {
      status: false,
      index: null,
    };
  };

  const resetSingleImageURLState = () => {
    singleImageURLState.value = null;
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
    singleImageURLState.value = null;
    postImagesURLState.value = [];
    editImage.value = {
      status: false,
      index: null,
    };
    resetDeletePostId();
  };

  return {
    sideMenu,
    logoLoading,
    spinnerLoading,
    tableSpinner,
    fullScreenGallery,
    imageCropper,
    popup,
    deletePostId,
    singleImageURLState,
    postImagesURLState,
    isPopup,
    getSingleImageURLState,
    editImage,
    setDeletePostId,
    setSingleImageURLState,
    setPostImageURL,
    setEditImage,
    removePostImageURL,
    editPostImageURL,
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
    resetSingleImageURLState,
    resetEditImage,
    $reset,
  };
});
