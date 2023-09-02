<script setup>
  import { ref } from "vue";
  import { useLayoutStore } from "../stores/layout.js";

  const layoutStore = useLayoutStore();

  const currentPosition = ref({ x: 0, y: 0 });
  const touchState = ref({
    isDragging: false,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
  });

  const initialScale = ref(1);
  const currentScale = ref(1);

  const getImageStyle = () => {
    return `transform: scale(${currentScale.value}) translate(${currentPosition.value.x}px, ${currentPosition.value.y}px)`;
  };

  const onTouchStart = (event) => {
    const touch = event.touches[0];
    touchState.value.isDragging = true;
    touchState.value.startX = touch.clientX;
    touchState.value.startY = touch.clientY;
  };

  const onTouchMove = (event) => {
    if (!touchState.value.isDragging) return;
    const touch = event.touches[0];
    const offsetX = touch.clientX - touchState.value.startX;
    const offsetY = touch.clientY - touchState.value.startY;
    touchState.value.offsetX = offsetX;
    touchState.value.offsetY = offsetY;

    currentPosition.value = {
      x: currentPosition.value.x + offsetX,
      y: currentPosition.value.y + offsetY,
    };

    touchState.value.startX = touch.clientX;
    touchState.value.startY = touch.clientY;
  };

  const onTouchEnd = () => {
    touchState.value.isDragging = false;
    touchState.value.offsetX = 0;
    touchState.value.offsetY = 0;
  };

  const onGestureStart = (event) => {
    initialScale.value = currentScale.value;
  };

  const onGestureChange = (event) => {
    currentScale.value = initialScale.value * event.scale;
  };

  const onGestureEnd = () => {
    initialScale.value = currentScale.value;
  };

  const closeFullScreen = () => {
    layoutStore.hideFullScreenGallery();
  };

  const zoomIn = () => {
    console.log("Zoom In");
  };

  const zoomOut = () => {
    console.log("Zoom Out");
  };
</script>

<template>
  <div class="fixed top-0 z-10 w-full">
    <nav class="flex h-[68px] justify-end p-4">
      <!-- <img
        @click.prevent="zoomIn"
        class="custom-shadow mx-[6px] w-5"
        src="../assets/zoom-in-icon.svg"
        alt="Zoom In"
      />
      <img
        @click.prevent="zoomOut"
        class="custom-shadow mx-[6px] w-5"
        src="../assets/zoom-out-icon.svg"
        alt="Zoom Out"
      /> -->
      <img
        @click.prevent="closeFullScreen"
        class="custom-shadow w-5"
        src="../assets/exit-fullscreen-icon.svg"
        alt="Exit Fullscreen"
      />
    </nav>
  </div>
  <div
    @touchstart.prevent="onTouchStart"
    @touchmove.prevent="onTouchMove"
    @touchend.prevent="onTouchEnd"
    @touchcancel.prevent="onTouchEnd"
    @gesturestart.prevent="onGestureStart"
    @gesturechange.prevent="onGestureChange"
    @gestureend.prevent="onGestureEnd"
    class="relative flex h-full w-full items-center justify-center px-5"
  >
    <div class="relative">
      <img ref="image" src="../assets/card-img2.jpg" :style="getImageStyle()" alt="Imagen" />
    </div>
    <div class="arrow-button custom-shadow absolute left-0 ml-2 rounded-full p-2">
      <img
        class="relative right-[1px] w-5 rotate-180"
        src="../assets/next-arrow-icon.svg"
        alt="Previous"
      />
    </div>
    <div class="arrow-button custom-shadow absolute right-0 mr-2 rounded-full p-2">
      <img class="relative left-[1px] w-5" src="../assets/next-arrow-icon.svg" alt="Next" />
    </div>
  </div>
</template>

<style scoped>
  .arrow-button {
    background-color: rgba(237, 237, 237, 0.45);
  }
</style>
