<script setup>
  import { ref } from "vue";
  import { useLayoutStore } from "../stores/layout.js";
  import cardImg from "../assets/card-img.jpg";
  import cardImg2 from "../assets/card-img2.jpg";
  import cardImg3 from "../assets/card-img3.jpg";
  import cardImg4 from "../assets/card-img4.jpg";
  import cardImg5 from "../assets/card-img5.jpg";
  import GalleryIndicator from "./GalleryIndicator.vue";

  const layoutStore = useLayoutStore();

  const images = [
    cardImg,
    cardImg2,
    cardImg3,
    cardImg4,
    cardImg5,
    cardImg,
    cardImg2,
    cardImg3,
    cardImg4,
    cardImg5,
  ];

  const activeIndex = ref(0);

  // Swipe
  const startPositionX = ref(null);
  const startPositionY = ref(null);
  const startTime = ref(0);
  const diffX = ref(0);
  const translationLength = ref(0);
  const transitionEnable = ref("");

  const startSwipe = (event) => {
    startTime.value = Date.now();
    startPositionX.value = event.touches[0].clientX;
    startPositionY.value = event.touches[0].clientY;
  };

  const moveSwipe = (event) => {
    const movePosX = event.touches[0].clientX;
    const movePosY = event.touches[0].clientY;
    const diffY = Math.abs(movePosY - startPositionY.value);

    if (diffY > 0) {
      if (event.cancelable) {
        event.preventDefault();
      }
    }

    if (activeIndex.value === 0 && movePosX - startPositionX.value > 0) {
      return;
    } else if (activeIndex.value === images.length - 1 && movePosX - startPositionX.value < 0) {
      return;
    }
    diffX.value = movePosX - startPositionX.value;
    translationLength.value =
      -(activeIndex.value * window.innerWidth) + movePosX - startPositionX.value;
  };

  const endSwipe = (event) => {
    const endTime = Date.now();
    const swipeDuration = endTime - startTime.value;
    if (swipeDuration < 175) {
      if (diffX.value > window.innerWidth * 0.15) {
        activeIndex.value = activeIndex.value - 1;
      } else if (diffX.value < -(window.innerWidth * 0.15)) {
        activeIndex.value = activeIndex.value + 1;
      }
    } else {
      if (diffX.value > window.innerWidth / 2) {
        activeIndex.value = activeIndex.value - 1;
      } else if (diffX.value < -(window.innerWidth / 2)) {
        activeIndex.value = activeIndex.value + 1;
      }
    }
    transitionEnable.value = "transition-transform duration-250";
    translationLength.value = -(activeIndex.value * window.innerWidth);
    startPositionX.value = null;
    diffX.value = 0;
    setTimeout(() => {
      transitionEnable.value = "";
    }, 250);
  };

  const directMove = (index) => {
    transitionEnable.value = "transition-transform duration-250";
    activeIndex.value = index;
    translationLength.value = -(activeIndex.value * window.innerWidth);
    setTimeout(() => {
      transitionEnable.value = "";
    }, 250);
  };

  const EnterFullScreen = () => {
    layoutStore.unhideFullScreenGallery();
  };
</script>

<template>
  <div class="overflow-hidden">
    <div class="relative">
      <div
        :style="`transform: translateX(${translationLength}px)`"
        class="relative flex aspect-video w-full will-change-transform"
        :class="transitionEnable"
      >
        <img
          v-for="(image, index) in images"
          :key="index"
          :src="image"
          class="sticky left-0 w-full object-cover shadow-lg"
          @touchstart="startSwipe($event)"
          @touchmove="moveSwipe($event)"
          @touchend="endSwipe($event)"
        />
      </div>
      <img
        @click.prevent="EnterFullScreen"
        class="custom-shadow absolute bottom-0 right-0 mb-[10px] mr-3 h-5 w-5"
        src="../assets/fullscreen-icon.svg"
      />
    </div>
    <div class="mt-2 flex justify-center gap-[2px] py-4">
      <GalleryIndicator
        v-for="(image, index) in images"
        :key="index"
        @click="directMove(index)"
        :enable="index === activeIndex ? true : false"
      />
    </div>
  </div>
</template>
