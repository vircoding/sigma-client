<script setup>
  import NavBar from "../components/NavBar.vue";
  import { onBeforeUnmount } from "vue";
  import PostInfo from "../components/PostInfo.vue";
  import FooterSection from "../components/FooterSection.vue";
  import FullScreenGallery from "../components/FullScreenGallery.vue";
  import { useLayoutStore } from "../stores/layoutStore.js";
  import { usePostStore } from "../stores/postStore.js";
  import { useAgentStore } from "../stores/agentStore.js";
  import { onBeforeRouteLeave } from "vue-router";

  const postStore = usePostStore();
  const agentStore = useAgentStore();
  const layoutStore = useLayoutStore();

  onBeforeUnmount(() => {
    postStore.resetPost();
    agentStore.resetAuthor();
    layoutStore.resetActiveImageIndex();
  });

  onBeforeRouteLeave((to, from, next) => {
    if (to.name !== "find") {
      postStore.resetFindedPosts();
      postStore.resetFilterOptions();
    }
    next();
  });
</script>

<template>
  <div class="lg:px-2.5" :class="layoutStore.fullScreenGallery ? 'h-screen overflow-hidden' : ''">
    <div class="overlay" :class="layoutStore.fullScreenGallery ? 'visible' : 'invisible'">
      <FullScreenGallery />
    </div>
    <div :class="layoutStore.fullScreenGallery ? 'blur' : ''">
      <div class="flex flex-col lg:h-screen lg:py-2.5">
        <header>
          <div class="relative overflow-hidden bg-background">
            <NavBar class="z-20" />
          </div>
        </header>
        <main class="grow bg-background lg:mb-0">
          <PostInfo />
        </main>
      </div>
      <!-- Footer -->
      <footer>
        <FooterSection background="#011b33" title="#ffffff" text="#ffffff" />
      </footer>
    </div>
  </div>
</template>

<style scoped>
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
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 20;
  }
</style>
