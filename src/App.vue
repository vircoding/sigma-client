<script setup>
  import { RouterView } from "vue-router";
  import { useUserStore } from "./stores/user.js";

  const userStore = useUserStore();

  const refreshToken = async () => {
    const res = await userStore.refreshTokenAction();
    console.log(res);
  };

  refreshToken();
</script>

<template>
  <div class="font-poppins text-sgray-400">
    <RouterView />
  </div>
</template>
