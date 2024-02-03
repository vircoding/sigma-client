<script setup>
  import { useLayoutStore } from "../stores/layoutStore.js";

  const layoutStore = useLayoutStore();

  const closeImageCropper = () => {
    layoutStore.hideImageCropper();
  };
</script>

<template>
  <!-- NavBar -->
  <div class="fixed top-0 z-10 w-full">
    <nav class="flex h-[68px] justify-end space-x-4 p-4">
      <img
        @click.prevent="closeImageCropper"
        class="custom-shadow w-5"
        src="../assets/exit-fullscreen-icon.svg"
        alt="Exit Fullscreen"
      />
    </nav>
  </div>

  <!-- Vue-Zoomer: https://github.com/jarvisniu/vue-zoomer -->
  <div class="absolute flex h-full w-full items-center justify-center">
    <div class="flex h-full w-full flex-col items-center justify-center object-contain px-5">
      <img :src="layoutStore.getCropFileURL" class="object-contain" />
    </div>
  </div>
</template>
