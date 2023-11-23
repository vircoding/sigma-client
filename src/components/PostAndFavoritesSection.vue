<script setup>
  import { ref } from "vue";
  import { useUserStore } from "../stores/userStore";
  import SmallPostCard from "./SmallPostCard.vue";

  const userStore = useUserStore();

  const postsActive = ref(true);

  const switchEvent = (isPost) => {
    if (isPost) postsActive.value = true;
    else postsActive.value = false;
  };
</script>

<template>
  <section class="mb-20 w-full">
    <div class="text-shadow mb-7 flex items-center rounded-md bg-sgray-100">
      <!-- Posts Table Button -->
      <div
        class="w-1/2 rounded-md py-2 text-center tracking-wide"
        :class="postsActive ? 'bg-sgray-400 text-white' : 'bg-transparent'"
        @click.prevent="switchEvent(true)"
      >
        <h3>Publicaciones</h3>
      </div>

      <!-- Favorites Table Button -->
      <div
        class="w-1/2 rounded-md py-2 text-center tracking-wide"
        :class="!postsActive ? 'bg-sgray-400 text-white' : 'bg-transparent'"
        @click.prevent="switchEvent(false)"
      >
        <h3>Favoritos</h3>
      </div>
    </div>

    <!-- Posts -->
    <ul class="space-y-4">
      <li v-for="(item, index) in userStore.myAccountState.posts.posts" :key="index">
        <RouterLink :to="`/post/${item.id}`">
          <SmallPostCard :index="index" :favorite="false" :post="item" />
        </RouterLink>
      </li>
      <li
        v-if="userStore.myAccountState.posts.total_posts === 0"
        class="flex h-[282px] w-full flex-col items-center justify-center gap-2"
      >
        <span>Aún no tienes publicaciones</span>
        <RouterLink to="/insert" class="underline">Publica</RouterLink>
      </li>
      <div
        v-if="!(userStore.myAccountState.posts.total_posts === 0)"
        class="flex w-full items-center justify-center gap-2"
      >
        <button class="select-none">{{ "<" }}</button>
        <div>
          <span
            >{{ userStore.myAccountState.posts.page }} /
            {{ userStore.myAccountState.posts.total_pages }}</span
          >
        </div>
        <button @click.prevent="nextPostsPageEvent" class="select-none">{{ ">" }}</button>
      </div>
    </ul>
  </section>
</template>
