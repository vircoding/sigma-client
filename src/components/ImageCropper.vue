<script setup>
  import { ref, onMounted, onUnmounted, watch } from "vue";
  import { useLayoutStore } from "../stores/layoutStore.js";
  import Cropper from "cropperjs";

  const layoutStore = useLayoutStore();

  let cropper = null;

  const img = ref(null);

  onMounted(() => {
    cropper = new Cropper(img.value, {
      aspectRatio: 1,
      minCropBoxWidth: 256,
      minCropBoxHeight: 256,
      viewMode: 3,
      dragMode: "move",
      background: false,
      cropBoxMovable: false,
      cropBoxResizable: false,
    });
  });

  onUnmounted(() => {
    cropper.destroy();
  });

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

  <!--Cropper.js: https://github.com/fengyuanchen/cropperjs -->
  <div class="absolute flex h-full w-full items-center justify-center">
    <div class="flex h-full w-full flex-col items-center justify-center object-contain px-5">
      <!-- Cropper Container -->
      <div class="w-full object-contain">
        <img ref="img" :src="layoutStore.getCropFileURL" class="hidden object-contain" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
