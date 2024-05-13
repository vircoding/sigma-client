<script setup>
  import { usePostStore } from "../stores/postStore.js";
  import { onBeforeUnmount, ref } from "vue";
  import NavBar from "../components/NavBar.vue";
  import FooterSection from "../components/FooterSection.vue";
  import FindedPosts from "../components/FindedPosts.vue";
  import FilterWindow from "../components/FilterWindow.vue";
  import router from "../router";

  const postStore = usePostStore();

  const filtersVisibility = ref(false);

  const unhideFilters = () => {
    filtersVisibility.value = true;
  };

  const hideFilters = () => {
    filtersVisibility.value = false;
  };

  const navigateToPost = async (id) => {
    postStore.setSaveFilterData();
    await router.push(`/post/${id}`);
  };

  onBeforeUnmount(() => {
    if (!postStore.saveFilterDataState) {
      postStore.resetFindedPosts();
      postStore.resetFilterOptions();
    } else postStore.resetSaveFilterData();
  });
</script>

<template>
  <!-- Filter Window -->
  <div
    :class="filtersVisibility ? 'overlay' : 'hidden'"
    class="fixed z-50 flex h-screen w-full flex-col items-center justify-center px-6"
  >
    <img
      @click.prevent="hideFilters"
      src="../assets/exit-fullscreen-icon.svg"
      class="absolute right-4 top-6 w-5"
    />
    <FilterWindow @hide-window="hideFilters" />
  </div>

  <!-- View -->
  <div :class="filtersVisibility ? 'h-screen' : ''">
    <div class="flex min-h-screen flex-col" :class="filtersVisibility ? 'blur' : ''">
      <!-- Header -->
      <header class="relative z-20 h-[68px] w-full shadow-md">
        <NavBar class="absolute" />
      </header>

      <!-- Posts -->
      <main class="flex grow flex-col items-center justify-start">
        <FindedPosts @unhide="unhideFilters" @navigate="navigateToPost" />
      </main>
    </div>

    <!-- Footer -->
    <footer>
      <FooterSection background="#011b33" title="#ffffff" text="#ffffff" />
    </footer>
  </div>
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

  .blur {
    filter: blur(2px);
  }

  .overlay {
    will-change: transform;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 20;
  }
</style>
