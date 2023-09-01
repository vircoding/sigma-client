<script setup>
  import NavBar from "../components/NavBar.vue";
  import PostInfo from "../components/PostInfo.vue";
  import FooterSection from "../components/FooterSection.vue";
  import FullScreenGallery from "../components/FullScreenGallery.vue";
  import { useLayoutStore } from "../stores/layout.js";
  import { usePostStore } from "../stores/post.js";
  import { onBeforeUnmount } from "vue";

  const postStore = usePostStore();
  const layoutStore = useLayoutStore();

  onBeforeUnmount(() => {
    postStore.$reset();
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
        <main class="mb-[5px] grow bg-background lg:mb-0">
          <PostInfo />
        </main>
      </div>
      <footer class="lg:mb-2.5">
        <FooterSection />
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
