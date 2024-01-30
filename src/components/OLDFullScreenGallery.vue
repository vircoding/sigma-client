<script setup>
  import { ref, computed } from "vue";
  import { useLayoutStore } from "../stores/layoutStore.js";

  const layoutStore = useLayoutStore();

  const currentPosition = ref({ x: 0, y: 0 });
  const touchState = ref({
    isDragging: false,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
  });
  const finishGesture = ref(false);

  const initialScale = ref(1);
  const currentScale = ref(1);

  const maxScale = () => {
    let scale;
    const screenX = window.screen.width;
    const screenY = window.screen.height;
    const initialX = screenX - 40;
    const initialY = (9 * initialX) / 16;

    scale = screenY / initialY;

    return scale - 0.5;
  };

  const figureDimentions = () => {
    const screenX = window.screen.width;
    const screenY = window.screen.height;
    const initialX = screenX - 40;
    const initialY = (9 * initialX) / 16;

    return { x: initialX * currentScale.value, y: initialY * currentScale.value };
  };

  const transDuration = computed(() => {
    if (finishGesture.value) return "250ms";
    else if (touchState.value.isDragging) return "0s";
    else return "250ms";
  });

  const getImageStyle = () => {
    return `transform: scale(${currentScale.value}) translate(${
      Math.floor(currentPosition.value.x) / (currentScale.value * 0.6)
    }px, ${
      Math.floor(currentPosition.value.y) / (currentScale.value * 0.6)
    }px); transition: transform ${transDuration.value}`;
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
    // const offsetY = touch.clientY - touchState.value.startY;
    touchState.value.offsetX = offsetX;
    // touchState.value.offsetY = offsetY;

    if (
      Math.floor(currentPosition.value.x / (currentScale.value * 0.6) >= 90 + 20) &&
      offsetX >= 0
    ) {
    } else if (
      Math.floor(currentPosition.value.x / (currentScale.value * 0.6) <= -90 - 20) &&
      offsetX <= 0
    ) {
    } else {
      currentPosition.value = {
        x: currentPosition.value.x + offsetX,
        // y: currentPosition.value.y + offsetY,
        y: 0,
      };
    }

    touchState.value.startX = touch.clientX;
    // touchState.value.startY = touch.clientY;
  };

  const onTouchEnd = () => {
    touchState.value.isDragging = false;
    touchState.value.offsetX = 0;
    touchState.value.offsetY = 0;

    const screenWidth = window.screen.width;

    const { x, y } = figureDimentions();

    if (x <= screenWidth - 40) {
      currentPosition.value = { x: 0, y: 0 };
    } else {
      if (Math.floor(currentPosition.value.x) / (currentScale.value * 0.6) > 90) {
        currentPosition.value.x = 90 + 20;
      } else if (Math.floor(currentPosition.value.x) / (currentScale.value * 0.6) < -90) {
        currentPosition.value.x = -90 - 20;
      }
    }
  };

  const onGestureStart = (event) => {
    initialScale.value = currentScale.value;
  };

  const onGestureChange = (event) => {
    currentScale.value = initialScale.value * event.scale;
    if (currentScale.value >= maxScale()) currentScale.value = maxScale();
    else if (currentScale.value <= 1) currentScale.value = 1;
  };

  const onGestureEnd = () => {
    finishGesture.value = true;
    initialScale.value = currentScale.value;
    currentPosition.value = { x: 0, y: 0 };
    setTimeout(() => {
      finishGesture.value = false;
    }, 300);
  };

  const closeFullScreen = () => {
    layoutStore.hideFullScreenGallery();
  };

  const zoomIn = () => {
    if (currentScale.value < maxScale() - 1) {
      currentScale.value += 1;
    } else {
      currentScale.value = maxScale() + 0.5;
      setTimeout(() => {
        currentScale.value = maxScale();
      }, 150);
    }
    currentPosition.value = { x: 0, y: 0 };
  };

  const zoomOut = () => {
    if (currentScale.value - 1 >= 1) {
      currentScale.value -= 1;
    } else {
      if (currentScale.value === 1) {
        currentScale.value = 0.75;
        setTimeout(() => {
          currentScale.value = 1;
        }, 150);
      } else {
        currentScale.value = 1;
      }
    }
    currentPosition.value = { x: 0, y: 0 };
  };
</script>

<template>
  <div class="fixed top-0 z-10 w-full">
    <nav class="flex h-[68px] justify-end space-x-4 p-4">
      <img
        @click.prevent="zoomIn"
        class="custom-shadow w-6 -translate-x-[2px]"
        src="../assets/zoom-in-icon.svg"
        alt="Zoom In"
      />
      <img
        @click.prevent="zoomOut"
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
  <div
    @touchstart.prevent="onTouchStart"
    @touchmove.prevent="onTouchMove"
    @touchend.prevent="onTouchEnd"
    @touchcancel.prevent="onTouchEnd"
    @gesturestart.prevent="onGestureStart"
    @gesturechange.prevent="onGestureChange"
    @gestureend.prevent="onGestureEnd"
    class="absolute flex h-full w-full items-center justify-center px-5"
  >
    <div class="relative">
      <img
        ref="image"
        src="../assets/card-img2.jpg"
        :style="getImageStyle()"
        alt="Imagen"
        class="gallery-shadow rounded border border-sgray-400"
      />
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
