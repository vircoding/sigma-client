<script setup>
  import { usePostStore } from "../stores/postStore.js";
  import { useLayoutStore } from "../stores/layoutStore.js";
  import { onBeforeUnmount } from "vue";
  import NavBar from "../components/NavBar.vue";
  import UpdateSaleForm from "../components/UpdateSaleForm.vue";
  import UpdateRentForm from "../components/UpdateRentForm.vue";
  import UpdateExchangeForm from "../components/UpdateExchangeForm.vue";
  import FooterSection from "../components/FooterSection.vue";
  import ImageCropper from "../components/ImageCropper.vue";

  const postStore = usePostStore();
  const layoutStore = useLayoutStore();

  onBeforeUnmount(() => {
    layoutStore.resetEditImage();
    layoutStore.resetSingleImageURLState();
    layoutStore.resetPostImagesURL();
    postStore.resetUpdatePost();
  });
</script>

<template>
  <div :class="layoutStore.imageCropper ? 'h-screen' : ''">
    <!-- Image Cropper -->
    <div class="overlay" v-if="layoutStore.imageCropper">
      <ImageCropper />
    </div>

    <!-- Main -->
    <div :class="layoutStore.imageCropper ? 'blur' : ''">
      <div class="flex min-h-screen flex-col">
        <!-- Header -->
        <header class="relative z-20 h-[68px] w-full shadow-md">
          <NavBar class="absolute" />
        </header>

        <!-- Form -->
        <main class="flex grow flex-col items-center justify-center">
          <UpdateSaleForm v-if="postStore.updatePostState.type === 'sale'" />
          <UpdateRentForm v-if="postStore.updatePostState.type === 'rent'" />
          <UpdateExchangeForm v-if="postStore.updatePostState.type === 'exchange'" />
        </main>
      </div>

      <!-- Footer -->
      <footer>
        <FooterSection background="#011b33" title="#ffffff" text="#ffffff" />
      </footer>
    </div>
  </div>
</template>

<style scoped>
  .blur {
    filter: blur(2px);
  }

  .overlay {
    will-change: transform;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 20;
  }
</style>
