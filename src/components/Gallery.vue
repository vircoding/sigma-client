<script setup>
  import { ref, watch, computed } from "vue";
  import { useLayoutStore } from "../stores/layoutStore.js";
  import { usePostStore } from "../stores/postStore.js";
  // import cardImg from "../assets/card-img.jpg";
  // import cardImg2 from "../assets/card-img2.jpg";
  // import cardImg3 from "../assets/card-img3.jpg";
  // import cardImg4 from "../assets/card-img4.jpg";
  // import cardImg5 from "../assets/card-img5.jpg";
  // import cardImg6 from "../assets/card-img6.jpg";
  // import cardImg7 from "../assets/card-img7.jpg";
  // import cardImg8 from "../assets/card-img8.jpg";
  // import cardImg9 from "../assets/card-img9.jpg";
  // import cardImg10 from "../assets/card-img10.jpg";
  import GalleryIndicator from "./GalleryIndicator.vue";

  const layoutStore = useLayoutStore();
  const postStore = usePostStore();

  const images = [
    ...postStore.postState.images,
    // cardImg,
    // cardImg2,
    // cardImg3,
    // cardImg4,
    // cardImg5,
    // cardImg6,
    // cardImg7,
    // cardImg8,
    // cardImg9,
    // cardImg10,
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

  watch(activeIndex, () => {
    layoutStore.setActiveImageIndex(activeIndex.value);
  });

  const activeIndexState = computed(() => layoutStore.activeImageIndex);

  watch(activeIndexState, () => {
    transitionEnable.value = "transition-transform duration-250";
    activeIndex.value = activeIndexState.value;
    translationLength.value = -(activeIndex.value * window.innerWidth);
    setTimeout(() => {
      transitionEnable.value = "";
    }, 250);
  });

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
      <div class="absolute bottom-0 flex w-screen items-center justify-between px-3 pb-3">
        <div
          class="icon-container flex justify-center gap-[2px] rounded-lg px-[10px] py-[5px]"
          :class="images.length > 1 ? '' : 'invisible'"
        >
          <GalleryIndicator
            v-for="(image, index) in images"
            :key="index"
            @click="directMove(index)"
            size="min"
            :enable="index === activeIndex ? true : false"
          />
        </div>
        <div
          @click.prevent="EnterFullScreen"
          class="icon-container rounded-md pb-[1px] pl-[3px] pr-[2px]"
        >
          <img class="w-6" src="../assets/fullscreen-icon.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .icon-container {
    background-color: rgb(0, 0, 0, 0.7);
  }
</style>
