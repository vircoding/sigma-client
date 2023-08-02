<script setup>
  import { ref, onMounted } from "vue";
  import cardImg from "../assets/card-img.jpg";
  import cardImg2 from "../assets/card-img2.jpg";
  import cardImg3 from "../assets/card-img3.jpg";
  import cardImg4 from "../assets/card-img4.jpg";
  import cardImg5 from "../assets/card-img5.jpg";

  const images = [cardImg, cardImg2, cardImg3, cardImg4, cardImg5];

  const activeIndex = ref(0);
  const activeClass = ref("-translate-x-[0%]");

  // Swipe
  const startSwipe = (event) => {};

  const moveSwipe = (event) => {};

  const endSwipe = (event) => {};

  const directMove = (index) => {
    activeIndex.value = index;
    activeClass.value = `-translate-x-[${index * 100}%]`;
  };

  // Loading Images
  // onMounted(() => {
  //   images.forEach((image) => (new Image().src = image));
  // });
</script>

<template>
  <div class="overflow-hidden">
    <div
      :class="activeClass"
      class="relative flex aspect-video w-full transition-transform duration-[500ms]"
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

<style scoped>
  .slider {
    aspect-ratio: 16 / 9;
    width: 100%;
    position: relative;
    display: flex;
    overflow: scroll;
    scroll-snap-type: x mandatory;
  }

  .slider img {
    width: 100%;
    left: 0;
    position: sticky;
    object-fit: cover;
    scroll-snap-align: center;
  }
</style>
