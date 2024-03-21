<script setup>
  import { usePostStore } from "../stores/postStore.js";
  import { onBeforeUnmount } from "vue";
  import NavBar from "../components/NavBar.vue";
  import FooterSection from "../components/FooterSection.vue";
  import FindedPosts from "../components/FindedPosts.vue";

  const postStore = usePostStore();

  onBeforeUnmount(() => {
    postStore.resetFindedPosts();
    postStore.resetLastFilter();
  });
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <!-- Header -->
    <header class="relative z-20 h-[68px] w-full shadow-md">
      <NavBar class="absolute" />
    </header>

    <!-- Form -->
    <main class="flex grow flex-col items-center justify-start">
      <FindedPosts />
    </main>
  </div>

  <!-- Footer -->
  <footer>
    <FooterSection background="#011b33" title="#ffffff" text="#ffffff" />
  </footer>

  <!-- <div class="lg:px-2.5">
    <div class="flex min-h-screen flex-col lg:h-screen lg:py-2.5">
      <header>
        <div class="relative overflow-hidden bg-background">
          <NavBar class="z-20" />
        </div>
      </header>
      <main class="gradient mb-[5px] grow lg:mb-0"> -->
  <!-- FindedPosts -->
  <!-- <FindedPosts />
      </main>
    </div>
    <footer class="lg:mb-2.5">
      <FooterSection background="#333333" text="#dcdcdc" title="#ffffff" />
    </footer>
  </div> -->
</template>

<style scoped>
  .gradient {
    background: rgb(237, 237, 237);
    background: -moz-linear-gradient(
      180deg,
      rgba(237, 237, 237, 1) 30%,
      rgba(255, 255, 255, 1) 100%
    );
    background: -webkit-linear-gradient(
      180deg,
      rgba(237, 237, 237, 1) 30%,
      rgba(255, 255, 255, 1) 100%
    );
    background: linear-gradient(180deg, rgba(237, 237, 237, 1) 30%, rgba(255, 255, 255, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ededed",endColorstr="#ffffff",GradientType=1);
  }
</style>
