<script setup>
  import { RouterView } from "vue-router";
  import { useUserStore } from "./stores/userStore.js";
  import { useLayoutStore } from "./stores/layoutStore.js";
  import SideMenu from "./components/SideMenu.vue";
  import Loading from "./components/Loading.vue";
  import FormSpinner from "./components/FormSpinner.vue";

  const userStore = useUserStore();
  const layoutStore = useLayoutStore();

  const cancelMove = (event) => {
    if (
      (layoutStore.sideMenu || layoutStore.spinnerLoading || layoutStore.logoLoading) &&
      event.cancelable
    ) {
      event.preventDefault();
    }
  };
</script>

<template>
  <div class="h-screen" @touchmove="cancelMove($event)">
    <SideMenu
      class="side-menu fixed right-0 z-30 translate-x-full bg-white will-change-transform lg:hidden"
      :class="layoutStore.sideMenu ? 'visible transition' : 'invisible'"
    />

    <Loading :class="layoutStore.logoLoading ? 'block' : 'hidden'" class="h-screen w-screen" />
    <div
      :class="`${layoutStore.logoLoading ? 'hidden' : 'block'} 
      ${layoutStore.sideMenu ? 'blur' : ''}
      ${layoutStore.spinnerLoading ? 'blur' : ''}
      `"
      class="router-view font-poppins text-sm text-sgray-400 lg:text-base"
    >
      <RouterView />
    </div>
    <!-- Overlay -->
    <div
      @click.prevent="layoutStore.hideSideMenu"
      class="overlay"
      :class="layoutStore.sideMenu ? 'visible' : 'invisible'"
    ></div>
    <FormSpinner :class="layoutStore.sideMenu ? 'block' : 'hidden'" class="z-30" />
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
