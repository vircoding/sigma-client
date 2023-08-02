<script setup>
  import { ref } from "vue";
  import cardImg from "../assets/card-img.jpg";
  import cardImg2 from "../assets/card-img2.jpg";
  import cardImg3 from "../assets/card-img3.jpg";
  import cardImg4 from "../assets/card-img4.jpg";
  import cardImg5 from "../assets/card-img5.jpg";

  const images = [cardImg, cardImg2, cardImg3, cardImg4, cardImg5];

  const activeIndex = ref(0);
  const activeClass = ref("-translate-x-[0%]");

  // Swipe
  const startPosition = ref(null);
  const diffX = ref(0);
  const translationLength = ref(0);

  const startSwipe = (event) => {
    startPosition.value = event.touches[0].clientX;
  };

  const moveSwipe = (event) => {
    const movePos = event.touches[0].clientX;
    if (activeIndex.value === 0 && movePos - startPosition.value > 0) {
      return;
    } else if (activeIndex.value === 4 && movePos - startPosition.value < 0) {
      return;
    }
    diffX.value = movePos - startPosition.value;
    translationLength.value =
      -(activeIndex.value * window.innerWidth) + movePos - startPosition.value;
  };

  const endSwipe = (event) => {
    if (diffX.value > window.innerWidth / 2) {
      activeIndex.value = activeIndex.value - 1;
    } else if (diffX.value < -(window.innerWidth / 2)) {
      activeIndex.value = activeIndex.value + 1;
    }
    translationLength.value = -(activeIndex.value * window.innerWidth);
    startPosition.value = null;
    diffX.value = 0;
  };

  const directMove = (index) => {
    activeIndex.value = index;
    activeClass.value = `-translate-x-[${index * 100}%]`;
  };

  const prevImage = () => {};

  const nextImage = () => {};

  // Loading Images
  // onMounted(() => {
  //   images.forEach((image) => (new Image().src = image));
  // });
</script>

<!-- duration-[500ms] -->

<template>
  <div class="overflow-hidden">
    <div
      :style="`transform: translateX(${translationLength}px)`"
      class="relative flex aspect-video w-full shadow-lg"
    >
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        class="sticky left-0 w-full object-cover"
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
