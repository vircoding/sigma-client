<script setup>
  import { useUserStore } from "../stores/user";
  import PostCard from "./PostCard.vue";

  const userStore = useUserStore();
</script>

<template>
  <!-- Info -->
  <section class="w-full px-5">
    <!-- Avatar and Contact -->
    <div class="w-1/3">
      <img
        class="text-shadow rounded-full border-2 border-sgray-100"
        src="../assets/agent-avatar.jpg"
        alt="Avatar del agente"
      />
    </div>
    <div class="px-5">
      <p>firstname: {{ userStore.agentDataState.info.firstname }}</p>
      <p>lastname: {{ userStore.agentDataState.info.lastname }}</p>
      <p>phone: {{ userStore.agentDataState.info.phone }}</p>
      <p>email: {{ userStore.agentDataState.info.public_email }}</p>
      <p>bio: {{ userStore.agentDataState.info.bio }}</p>
    </div>
  </section>
  <section>
    <ul>
      <li v-for="(item, index) in userStore.agentDataState.posts.posts" :key="index">
        <RouterLink :to="`/post/${item._id}`">
          <PostCard :post="item" :color="item.__t === 'sale' ? 'bg-sigma' : 'bg-sgreen-300'" />
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
