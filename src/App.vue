<script setup>
  import { RouterView } from "vue-router";
  import { useUserStore } from "./stores/user";

  const userStore = useUserStore();
</script>

<template>
  <p>{{ userStore.isLoggedIn }}</p>
  <div class="font-poppins text-sgray-400">
    <RouterView />
  </div>
</template>
