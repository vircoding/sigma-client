import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useLayoutStore = defineStore('layout', () => {
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
    serverError: false,
    invalidCredentials: false,
    userExists: false,
    badRequest: false,
    sourceNotFounded: false,
  });

  const deletePostId = ref(null);
  const singleImageURLState = ref(null);
  const singleAvatarURLState = ref(null);
  const postImagesURLState = ref([]);
  const avatarURLState = ref(undefined);
  const editImage = ref({
    status: false,
    index: null,
  });
  const editAvatar = ref(false);
  const activeImageIndex = ref(0);

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

  const getSingleAvatarURLState = computed(() => {
    return singleAvatarURLState.value;
  });

  // Setters
  const setDeletePostId = (id) => {
    deletePostId.value = id;
  };

  const setSingleImageURLState = (url) => {
    singleImageURLState.value = url;
  };

  const setSingleAvatarURLState = (url) => {
    singleAvatarURLState.value = url;
  };

  const setPostImageURL = (url, file) => {
    if (postImagesURLState.value.length < 10) {
      postImagesURLState.value.push({
        cropped: url,
        original: singleImageURLState.value,
        file,
      });
    }
  };

  const setAvatarImageURL = (url, file) => {
    avatarURLState.value = {
      cropped: url,
      original: singleAvatarURLState.value,
      file,
    };
  };

  const editPostImageURL = (index, url, file) => {
    postImagesURLState.value[index].cropped = url;
    postImagesURLState.value[index].file = file;
  };

  const editAvatarURL = (url, file) => {
    avatarURLState.value.cropped = url;
    avatarURLState.value.file = file;
  };

  const setEditImage = (index) => {
    editImage.value = {
      status: true,
      index: index,
    };
  };

  const setEditAvatar = () => {
    editAvatar.value = true;
  };

  const setActiveImageIndex = (index) => {
    activeImageIndex.value = index;
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
      case 'pre-insert':
        popup.value.preInsert = true;
        break;
      case 'delete-post':
        popup.value.deletePost = true;
        break;
      case 'server-error':
        popup.value.serverError = true;
        break;
      case 'invalid-credentials':
        popup.value.invalidCredentials = true;
        break;
      case 'user-exists':
        popup.value.userExists = true;
        break;
      case 'source-not-founded':
        popup.value.sourceNotFounded = true;
        break;
      case 'bad-request':
        popup.value.badRequest = true;
        break;
      default:
        break;
    }
  };

  const hidePopup = () => {
    popup.value = {
      preInsert: false,
      deletePost: false,
      serverError: false,
      invalidCredentials: false,
      badRequest: false,
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

  const resetEditAvatar = () => {
    editAvatar.value = false;
  };

  const resetSingleImageURLState = () => {
    singleImageURLState.value = null;
  };

  const resetSingleAvatarURLState = () => {
    singleAvatarURLState.value = null;
  };

  const resetPostImagesURL = () => {
    postImagesURLState.value = [];
  };

  const resetAvatarURL = () => {
    avatarURLState.value = undefined;
  };

  const resetActiveImageIndex = () => {
    activeImageIndex.value = 0;
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
    resetPostImagesURLState();
    resetEditImage();
    resetSingleImageURLState();
    resetDeletePostId();
    resetActiveImageIndex();
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
    singleAvatarURLState,
    postImagesURLState,
    avatarURLState,
    activeImageIndex,
    isPopup,
    getSingleImageURLState,
    getSingleAvatarURLState,
    editImage,
    editAvatar,
    setDeletePostId,
    setSingleImageURLState,
    setSingleAvatarURLState,
    setPostImageURL,
    setAvatarImageURL,
    setEditImage,
    setEditAvatar,
    setActiveImageIndex,
    removePostImageURL,
    editPostImageURL,
    editAvatarURL,
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
    resetPostImagesURL,
    resetAvatarURL,
    resetSingleImageURLState,
    resetEditAvatar,
    resetSingleAvatarURLState,
    resetEditImage,
    resetActiveImageIndex,
    $reset,
  };
});
