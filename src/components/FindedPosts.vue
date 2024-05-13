<script setup>
  import { ref } from "vue";
  import { usePostStore } from "../stores/postStore.js";
  import SigmaIsotypeIcon from "./icons/SigmaIsotypeIcon.vue";
  import FilterWindow from "./FilterWindow.vue";
  import PostCard from "./PostCard.vue";
  import PostsPagination from "./PostsPagination.vue";

  const postStore = usePostStore();

  const emits = defineEmits(["unhide", "navigate"]);
</script>

<template>
  <div
    class="flex h-full w-full flex-col items-center justify-start pb-10 pt-8 max-[1023px]:px-[10%] max-[499px]:px-[5%]"
  >
    <!-- Top Section -->
    <div class="flex w-full items-center justify-between gap-5 px-3 pb-7">
      <!-- Results Info -->
      <div ref="scrollElement" class="flex items-center gap-1 pl-2">
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

      <div class="h-[22px] w-[1px] bg-sgray-300"></div>

      <!-- Filters Button -->
      <button
        @click.prevent="emits('unhide')"
        class="px- flex items-center justify-center gap-[6px] rounded-md border border-sgray-300 px-3 py-1"
      >
        <img src="../assets/filter-2-icon.svg" class="w-6" />
        <span class="text-shadow relative text-lg leading-none text-sblue-500">Filtros</span>
      </button>
    </div>

    <!-- Posts -->
    <div
      v-if="postStore.findedPostsState.total_posts !== 0"
      class="mb-8 flex flex-col items-center justify-center gap-8 lg:flex-row"
    >
      <div
        @click.prevent="$emit('navigate', item.id)"
        v-for="(item, index) in postStore.findedPostsState.posts"
        :key="index"
      >
        <PostCard :post="item" />
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="postStore.findedPostsState.total_posts !== 0" class="w-full">
      <PostsPagination />
    </div>
  </div>
</template>
