<script setup>
  import { useLayoutStore } from "../stores/layout.js";

  const layoutStore = useLayoutStore();

  const closeFullScreen = () => {
    layoutStore.hideFullScreenGallery();
  };
</script>

<template>
  <div class="relative flex h-full w-full items-center justify-center px-5">
    <div class="relative">
      <img src="../assets/card-img3.jpg" alt="Una Casa" />
      <img
        @click.prevent="closeFullScreen"
        class="absolute -top-[48px] right-0 mr-2 w-10"
        src="../assets/exit-fullscreen-icon.svg"
      />
    </div>
    <div class="arrow-button custom-shadow absolute left-0 ml-2 rounded-full p-2">
      <img class="relative right-[1px] w-5 rotate-180" src="../assets/next-arrow-icon.svg" />
    </div>
    <div class="arrow-button custom-shadow absolute right-0 mr-2 rounded-full p-2">
      <img class="relative left-[1px] w-5" src="../assets/next-arrow-icon.svg" />
    </div>
  </div>
</template>

<style scoped>
  .arrow-button {
    background-color: rgba(237, 237, 237, 0.6);
  }
</style>
