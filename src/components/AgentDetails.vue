<script setup>
  import { useUserStore } from "../stores/user";
  import AgentCard from "./AgentCard.vue";
  import PostCard from "./PostCard.vue";

  const userStore = useUserStore();
</script>

<template>
  <AgentCard class="mb-[5px] bg-background pb-4" />
  <section>
    <!-- <ul>
      <li v-for="(item, index) in userStore.agentDataState.posts.posts" :key="index">
        <RouterLink :to="`/post/${item._id}`">
          <PostCard :post="item" :color="item.__t === 'sale' ? 'bg-sigma' : 'bg-sgreen-300'" />
        </RouterLink>
      </li>
    </ul> -->
  </section>
</template>
