<script setup>
  import { RouterView } from "vue-router";
  import { useUserStore } from "./stores/user";
  import { useLayoutStore } from "./stores/layout";
  import SideMenu from "./components/SideMenu.vue";
  import Loading from "./components/Loading.vue";

  const userStore = useUserStore();
  const layoutStore = useLayoutStore();
</script>

<template>
  <SideMenu
    class="absolute right-0 z-20 bg-white lg:hidden"
    :class="layoutStore.sideMenuVisibility ? 'visiblle' : 'invisible'"
  />
  <Loading :class="layoutStore.isLoading ? 'block' : 'hidden'" class="h-screen w-screen" />
  <div
    :class="layoutStore.isLoading ? 'hidden' : 'block'"
    class="font-poppins text-sm text-sgray-400 lg:text-base"
  >
    <RouterView />
  </div>
</template>
