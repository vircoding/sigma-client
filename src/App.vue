<script setup>
  import { RouterView } from "vue-router";
  import { useUserStore } from "./stores/user";
  import { useLayoutStore } from "./stores/layout";
  import SideMenu from "./components/SideMenu.vue";

  const userStore = useUserStore();
  const layoutStore = useLayoutStore();
</script>

<template>
  <SideMenu
    class="absolute right-0 z-20 bg-white lg:hidden"
    :class="layoutStore.sideMenuVisibility ? 'visiblle' : 'invisible'"
  />
  <div class="font-poppins text-sm text-sgray-400 lg:text-base">
    <RouterView />
  </div>
</template>
