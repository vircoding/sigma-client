<script setup>
  import { useUserStore } from "../stores/user";
  import PostCard from "./PostCard.vue";

  const userStore = useUserStore();
</script>

<template>
  <section>
    <ul class="p-5">
      <li v-for="(item, index) in userStore.agentDataState.posts.posts" :key="index">
        <RouterLink :to="`/post/${item._id}`">
          <PostCard :post="item" :color="item.__t === 'sale' ? 'bg-sigma' : 'bg-sgreen-300'" />
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
