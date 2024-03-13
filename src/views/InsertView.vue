<script setup>
  import { onBeforeUnmount } from "vue";
  import { useLayoutStore } from "../stores/layoutStore.js";
  import NavBar from "../components/NavBar.vue";
  import InsertForm from "../components/InsertForm.vue";
  import FooterSection from "../components/FooterSection.vue";
  import ImageCropper from "../components/ImageCropper.vue";

  const layoutStore = useLayoutStore();

  onBeforeUnmount(() => {
    layoutStore.resetEditImage();
    layoutStore.resetSingleImageURLState();
    layoutStore.resetPostImagesURL();
  });
</script>

<template>
  <div :class="layoutStore.imageCropper ? 'h-screen' : ''">
    <div class="overlay" v-if="layoutStore.imageCropper">
      <ImageCropper />
    </div>
    <div :class="layoutStore.imageCropper ? 'blur' : ''">
      <div class="flex min-h-screen flex-col">
        <!-- Header -->
        <header class="relative z-20 h-[68px] w-full shadow-md">
          <NavBar class="absolute" />
        </header>
        <main class="flex grow flex-col items-center justify-center">
          <InsertForm />
        </main>
      </div>
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
