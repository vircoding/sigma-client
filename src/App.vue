<script setup>
  import { RouterView } from "vue-router";
  import { useUserStore } from "./stores/userStore.js";
  import { useLayoutStore } from "./stores/layoutStore.js";
  import { usePostStore } from "./stores/postStore.js";
  import SideMenu from "./components/SideMenu.vue";
  import Loading from "./components/Loading.vue";
  import FormSpinner from "./components/FormSpinner.vue";
  import Popup from "./components/Popup.vue";

  const userStore = useUserStore();
  const layoutStore = useLayoutStore();
  const postStore = usePostStore();

  window.addEventListener("popstate", (event) => {
    if (event.state.current.slice(0, 6) === "/post/" && event.state.back === "/find") {
      postStore.setSaveFilterData();
    }
  });

  const cancelMove = (event) => {
    if (
      (layoutStore.sideMenu ||
        layoutStore.spinnerLoading ||
        layoutStore.logoLoading ||
        layoutStore.isPopup) &&
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
      ${layoutStore.isPopup ? 'blur' : ''}
      `"
      class="router-view bg-background font-poppins text-sgray-400"
    >
      <RouterView />
    </div>
    <!-- Overlay -->
    <div
      @click.prevent="layoutStore.hideSideMenu"
      class="overlay"
      :class="layoutStore.sideMenu || layoutStore.isPopup ? 'visible' : 'invisible'"
    ></div>
    <FormSpinner :class="layoutStore.spinnerLoading ? 'block' : 'hidden'" class="z-30" />
  </div>
  <Popup />
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
