<script setup>
  import { RouterView } from "vue-router";
  import { useUserStore } from "./stores/user";
  import { useLayoutStore } from "./stores/layout";
  import SideMenu from "./components/SideMenu.vue";
  import Loading from "./components/Loading.vue";
  import FormSpinner from "./components/FormSpinner.vue";

  const userStore = useUserStore();
  const layoutStore = useLayoutStore();
</script>

<template>
  <div
    class="h-screen"
    :class="
      layoutStore.sideMenuVisibility || layoutStore.spinnerVisibility ? 'overflow-hidden' : ''
    "
  >
    <SideMenu
      class="side-menu fixed right-0 z-30 translate-x-full bg-white lg:hidden"
      :class="layoutStore.sideMenuVisibility ? 'visiblle transition' : 'invisible'"
    />

    <Loading :class="layoutStore.isLoading ? 'block' : 'hidden'" class="h-screen w-screen" />
    <div
      :class="`${layoutStore.isLoading ? 'hidden' : 'block'} ${
        layoutStore.sideMenuVisibility ? 'blur' : ''
      }`"
      class="router-view font-poppins text-sm text-sgray-400 lg:text-base"
    >
      <RouterView />
    </div>
    <!-- Overlay -->
    <div
      @click.prevent="layoutStore.hideSideMenu"
      class="overlay"
      :class="layoutStore.sideMenuVisibility ? 'visiblle' : 'invisible'"
    ></div>
    <FormSpinner :class="layoutStore.spinnerVisibility ? 'block' : 'hidden'" class="z-30" />
  </div>
</template>

<style scoped>
  .side-menu {
    transition: all 0.1s linear;
    will-change: transform;
  }

  .transition {
    transform: translateX(0);
  }

  .router-view {
    transition: filter 0.1s linear;
  }

  .blur {
    filter: blur(2px);
  }

  .overlay {
    will-change: transform;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 20;
  }
</style>
