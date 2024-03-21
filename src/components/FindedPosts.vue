<script setup>
  import { ref } from "vue";
  import { usePostStore } from "../stores/postStore.js";
  import SigmaIsotypeIcon from "./icons/SigmaIsotypeIcon.vue";
  import FilterWindow from "./FilterWindow.vue";
  import PostCard from "./PostCard.vue";
  import PostsPagination from "./PostsPagination.vue";

  const postStore = usePostStore();

  const scrollElement = ref(null);

  const scrollView = () => {
    if (scrollElement.value) {
      scrollElement.value.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };
</script>

<template>
  <div
    class="flex h-full w-full flex-col items-center justify-start py-10 max-[1023px]:px-[10%] max-[499px]:px-[5%]"
  >
    <!-- Filter -->
    <FilterWindow @scroll="scrollView" />

    <!-- Horizontal Line -->
    <!-- <div class="mb-7 w-[90%] border-b border-sgray-100"></div> -->

    <!-- Results Info -->
    <div ref="scrollElement" class="flex w-full items-center gap-1 py-7 pl-5">
      <img src="../assets/down-arrow-icon.svg" class="w-8" />

      <!-- 0 Results -->
      <span
        v-if="postStore.findedPostsState.total_posts === 0"
        class="text-shadow w-full text-left text-lg text-sblue-500"
        >Sin Resultados</span
      >

      <!-- Any Result -->
      <span v-else class="text-shadow w-full text-left text-lg text-sblue-500"
        >{{ postStore.findedPostsState.total_posts }}
        {{ postStore.findedPostsState.total_posts === 1 ? "Resultado:" : "Resultados:" }}</span
      >
    </div>

    <!-- Posts -->
    <div
      v-if="postStore.findedPostsState.total_posts !== 0"
      class="mb-8 flex flex-col items-center justify-center gap-8 lg:flex-row"
    >
      <RouterLink
        :to="`/post/${item.id}`"
        v-for="(item, index) in postStore.findedPostsState.posts"
        :key="index"
      >
        <PostCard :post="item" />
      </RouterLink>
    </div>

    <!-- Pagination -->
    <div v-if="postStore.findedPostsState.total_posts !== 0" class="w-full">
      <PostsPagination @scroll="scrollView" />
    </div>
  </div>
</template>
