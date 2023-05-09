<script setup>
  import { RouterView } from "vue-router";
  import { useUserStore } from "./stores/user";

  const userStore = useUserStore();
</script>

<template>
  <div class="font-poppins text-xs text-sgray-400 lg:text-base">
    <RouterView />
  </div>
</template>
