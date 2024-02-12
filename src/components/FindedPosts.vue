<script setup>
  import { usePostStore } from "../stores/postStore.js";
  import SigmaIsotypeIcon from "./icons/SigmaIsotypeIcon.vue";
  import FilterWindow from "./FilterWindow.vue";
  import PostCard from "./PostCard.vue";

  const postStore = usePostStore();
</script>

<template>
  <div
    class="relative flex h-full w-full grid-cols-16 flex-col place-items-center items-center justify-start max-[1023px]:px-[10%] max-[499px]:px-[5%] lg:-top-6 lg:grid lg:gap-0 lg:px-24 xl:px-32 2xl:px-44"
  >
    <!-- Logo -->
    <div class="text-shadow col-span-6">
      <SigmaIsotypeIcon class="h-[100px] w-[320px] fill-sgray-200 lg:hidden" />
    </div>

    <!-- Filter -->
    <FilterWindow class="mb-7" />

    <!-- Horizontal Line -->
    <div class="mb-7 w-[90%] border-b border-sgray-100"></div>

    <!-- Posts -->
    <div class="flex flex-col items-center justify-center gap-8 lg:flex-row">
      <RouterLink
        :to="`/post/${item.id}`"
        v-for="(item, index) in postStore.findedPostsState.posts"
        :key="index"
      >
        <PostCard :post="item" />
      </RouterLink>
    </div>
  </div>
</template>
