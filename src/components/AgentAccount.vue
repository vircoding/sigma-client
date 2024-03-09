<script setup>
  import SigmaIsotypeIcon from "./icons/SigmaIsotypeIcon.vue";
  import UpdateAgentForm from "./UpdateAgentForm.vue";
  import PostAndFavoritesSection from "./PostAndFavoritesSection.vue";
</script>

<template>
  <div class="flex h-full w-full flex-col items-center">
    <!-- Update Form -->
    <UpdateAgentForm class="py-10" />

    <!-- Horizontal Line -->
    <div class="w-full border-b border-sgray-100"></div>

    <!-- Post/Favorites Section -->
    <PostAndFavoritesSection />
  </div>
</template>
