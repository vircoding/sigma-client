<script setup>
  import { ref } from "vue";
  import cardImg from "../assets/card-img.jpg";
  import cardImg2 from "../assets/card-img2.jpg";
  import cardImg3 from "../assets/card-img3.jpg";
  import cardImg4 from "../assets/card-img4.jpg";
  import cardImg5 from "../assets/card-img5.jpg";

  const images = [cardImg, cardImg2, cardImg3, cardImg4, cardImg5];

  const activeIndex = ref(0);

  // Swipe
  const startPositionX = ref(null);
  const startPositionY = ref(null);
  const diffX = ref(0);
  const translationLength = ref(0);
  const transitionEnable = ref("");

  const startSwipe = (event) => {
    startPositionX.value = event.touches[0].clientX;
    startPositionY.value = event.touches[0].clientY;
  };

  const moveSwipe = (event) => {
    const movePosX = event.touches[0].clientX;
    const movePosY = event.touches[0].clientY;
    const diffY = Math.abs(movePosY - startPositionY.value);

    if (diffY > 0) {
      event.preventDefault();
    }

    if (activeIndex.value === 0 && movePosX - startPositionX.value > 0) {
      return;
    } else if (activeIndex.value === 4 && movePosX - startPositionX.value < 0) {
      return;
    }
    diffX.value = movePosX - startPositionX.value;
    translationLength.value =
      -(activeIndex.value * window.innerWidth) + movePosX - startPositionX.value;
  };

  const endSwipe = (event) => {
    if (diffX.value > window.innerWidth / 2) {
      activeIndex.value = activeIndex.value - 1;
    } else if (diffX.value < -(window.innerWidth / 2)) {
      activeIndex.value = activeIndex.value + 1;
    }
    transitionEnable.value = "transition-transform duration-500";
    translationLength.value = -(activeIndex.value * window.innerWidth);
    startPositionX.value = null;
    diffX.value = 0;
    setTimeout(() => {
      transitionEnable.value = "";
    }, 500);
  };

  const directMove = (index) => {
    transitionEnable.value = "transition-transform duration-500";
    activeIndex.value = index;
    translationLength.value = -(activeIndex.value * window.innerWidth);
    setTimeout(() => {
      transitionEnable.value = "";
    }, 500);
  };

  // Loading Images
  // onMounted(() => {
  //   images.forEach((image) => (new Image().src = image));
  // });
</script>

<template>
  <div class="overflow-hidden">
    <div
      :style="`transform: translateX(${translationLength}px)`"
      class="relative flex aspect-video w-full"
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
    <div class="mt-2 flex justify-center">
      <span
        v-for="(image, index) in images"
        :key="index"
        @click="directMove(index)"
        class="text-lg text-sgray-400"
      >
        {{ index === activeIndex ? "●" : "○" }}
      </span>
    </div>
  </div>
</template>
