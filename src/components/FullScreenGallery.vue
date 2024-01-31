<script setup>
  import { useLayoutStore } from "../stores/layoutStore.js";
  import VueZoomer from "vue-zoomer/src/vue-zoomer.vue";
  import GalleryIndicator from "./GalleryIndicator.vue";

  const layoutStore = useLayoutStore();

  const closeFullScreen = () => {
    layoutStore.hideFullScreenGallery();
  };
</script>

<template>
  <!-- NavBar -->
  <div class="fixed top-0 z-10 w-full">
    <nav class="flex h-[68px] justify-end space-x-4 p-4">
      <img
        @click.prevent="$refs.zoomer.zoomIn()"
        class="custom-shadow w-6 -translate-x-[2px]"
        src="../assets/zoom-in-icon.svg"
        alt="Zoom In"
      />
      <img
        @click.prevent="$refs.zoomer.zoomOut()"
        class="custom-shadow w-6 -translate-x-[2px]"
        src="../assets/zoom-out-icon.svg"
        alt="Zoom Out"
      />
      <img
        @click.prevent="closeFullScreen"
        class="custom-shadow w-5"
        src="../assets/exit-fullscreen-icon.svg"
        alt="Exit Fullscreen"
      />
    </nav>
  </div>

  <!-- Vue-Zoomer: https://github.com/jarvisniu/vue-zoomer -->
  <VueZoomer
    ref="zoomer"
    pivot="image-center"
    class="absolute flex h-full w-full items-center justify-center"
  >
    <div class="flex h-full w-full flex-col items-center justify-center object-contain px-5">
      <img src="../assets/card-img.jpg" class="rounded-md border border-sgray-400 object-contain" />
    </div>
  </VueZoomer>

  <!-- Indicators -->
  <div
    @touchstart.prevent
    @touchmove.prevent
    @touchend.prevent
    @touchcancel.prevent
    @gesturestart.prevent
    @gesturechange.prevent
    @gestureend.prevent
    class="sticky top-full flex w-full items-center justify-center pb-14"
  >
    <div class="flex justify-center gap-[6px] rounded-full bg-stransparent px-5 py-2">
      <GalleryIndicator :enable="true" size="max" />
      <GalleryIndicator :enable="false" size="max" />
      <GalleryIndicator :enable="false" size="max" />
      <GalleryIndicator :enable="false" size="max" />
      <GalleryIndicator :enable="false" size="max" />
      <GalleryIndicator :enable="false" size="max" />
      <GalleryIndicator :enable="false" size="max" />
      <GalleryIndicator :enable="false" size="max" />
      <GalleryIndicator :enable="false" size="max" />
      <GalleryIndicator :enable="false" size="max" />
    </div>
  </div>
</template>
