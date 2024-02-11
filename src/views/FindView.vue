<script setup>
  import { usePostStore } from "../stores/postStore.js";
  import { onBeforeUnmount } from "vue";
  import NavBar from "../components/NavBar.vue";
  import FooterSection from "../components/FooterSection.vue";
  import FilterWindow from "../components/FilterWindow.vue";
  import FindedPosts from "../components/FindedPosts.vue";

  const postStore = usePostStore();

  onBeforeUnmount(() => {
    postStore.resetFindedPosts();
    postStore.resetFilterType();
  });
</script>

<template>
  <div class="lg:px-2.5">
    <div class="flex min-h-screen flex-col lg:h-screen lg:py-2.5">
      <header>
        <div class="text-shadow relative overflow-hidden bg-background">
          <NavBar class="z-20" />
        </div>
      </header>
      <main class="gradient mb-[5px] grow lg:mb-0">
        <FilterWindow class="sticky top-[0] z-20" />
        <!-- FindedPosts -->
        <FindedPosts class="absolute -top-[18px]" />
      </main>
    </div>
    <footer class="lg:mb-2.5">
      <FooterSection background="#333333" text="#dcdcdc" title="#ffffff" />
    </footer>
  </div>
</template>

<style scoped>
  .gradient {
    background: rgb(255, 255, 255);
    background: -moz-linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 30%,
      rgba(237, 237, 237, 1) 100%
    );
    background: -webkit-linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 30%,
      rgba(237, 237, 237, 1) 100%
    );
    background: linear-gradient(180deg, rgba(255, 255, 255, 1) 30%, rgba(237, 237, 237, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#ededed",GradientType=1);
  }
</style>
