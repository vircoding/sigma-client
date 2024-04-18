<script setup>
  import NavBar from "../components/NavBar.vue";
  import UpdatePostForm from "../components/UpdatePostForm.vue";
  import FooterSection from "../components/FooterSection.vue";
  import ImageCropper from "../components/ImageCropper.vue";
  import { usePostStore } from "../stores/postStore.js";
  import { useLayoutStore } from "../stores/layoutStore.js";
  import { onBeforeUnmount, ref } from "vue";

  const postStore = usePostStore();
  const layoutStore = useLayoutStore();

  onBeforeUnmount(() => {
    postStore.resetPost();
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
          <UpdatePostForm />
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
