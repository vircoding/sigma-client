<script setup>
  import { useUserStore } from "../stores/userStore.js";
  import SigmaIsotypeIcon from "./icons/SigmaIsotypeIcon.vue";
  import UpdateAgentForm from "./UpdateAgentForm.vue";
  import PostAndFavoritesSection from "./PostAndFavoritesSection.vue";
</script>

<template>
  <div
    class="flex h-full w-full flex-col items-center max-[1023px]:px-[10%] max-[499px]:px-[5%] lg:items-start lg:justify-center lg:gap-7 lg:px-24 xl:px-32 2xl:px-44"
  >
    <!-- Sigma Logo -->
    <div class="text-shadow col-span-6">
      <SigmaIsotypeIcon class="h-[100px] w-[320px] fill-sgray-200 lg:hidden" />
    </div>

    <!-- Update Form -->
    <UpdateAgentForm class="mb-12" />

    <!-- Horizontal Line -->
    <div class="mb-8 h-[1px] w-5/6 bg-sgray-100"></div>

    <!-- Post/Favorites Section -->
    <PostAndFavoritesSection />
  </div>
</template>
