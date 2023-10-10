<script setup>
  import { usePostStore } from "../stores/postStore.js";
  import PostCard from "./PostCard.vue";

  const postStore = usePostStore();
</script>

<template>
  <div
    class="text-shadow flex w-full flex-col items-center justify-center gap-4 px-[6%] text-center lg:px-[6%]"
  >
    <h2 class="text-3xl font-extrabold uppercase">Descubre nuestras casas en venta</h2>
    <p class="font-archivo">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, necessitatibus!
    </p>
  </div>
  <div class="flex flex-col items-center justify-center px-5 py-20">
    <div class="flex flex-col items-center justify-center gap-8 lg:flex-row">
      <RouterLink
        :to="`/post/${item.id}`"
        v-for="(item, index) in postStore.popularSalesState.sales"
        :key="index"
      >
        <PostCard :post="item" />
      </RouterLink>
    </div>
    <RouterLink class="nav-link mt-14 block text-xl font-extrabold" to="/find">Ver Más</RouterLink>
  </div>
</template>
