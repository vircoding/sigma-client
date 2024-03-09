<script setup>
  import NavBar from "../components/NavBar.vue";
  import HeroBanner from "../components/HeroBanner.vue";
  import FindHouses from "../components/FindHouses.vue";
  import FeaturesSection from "../components/FeaturesSection.vue";
  import RegisterHereSection from "../components/RegisterHereSection.vue";
  import Cite from "../components/Cite.vue";
  import PoweredBy from "../components/PoweredBy.vue";
  import ReviewsSection from "../components/ReviewsSection.vue";
  import FooterSection from "../components/FooterSection.vue";
  import { useUserStore } from "../stores/userStore.js";
  import { usePostStore } from "../stores/postStore.js";

  const userStore = useUserStore();
  const postStore = usePostStore();
</script>

<template>
  <!-- NavBar -->
  <header class="relative z-20 w-full shadow-md">
    <div class="nav-container absolute h-[68px] w-full"></div>
    <NavBar class="absolute" />
  </header>

  <!-- Hero Banner -->
  <main class="overflow-hidden">
    <HeroBanner />
  </main>

  <!-- Find Houses -->
  <section class="w-full">
    <FindHouses />
  </section>

  <!-- Features Section -->
  <section class="w-full">
    <FeaturesSection />
  </section>

  <!-- Horizontal Line -->
  <div class="w-full border-b border-sgray-100"></div>

  <!-- Register Section -->
  <section v-if="!userStore.isLoggedIn" class="w-full">
    <RegisterHereSection />
  </section>

  <!-- Cite -->
  <section class="w-full">
    <Cite />
  </section>

  <!-- Horizontal Line -->
  <div class="w-full border-b border-sgray-100"></div>

  <!-- Powered By -->
  <section class="w-full">
    <PoweredBy />
  </section>

  <!-- Horizontal Line -->
  <div class="w-full border-b border-sgray-100"></div>

  <!-- Revs -->
  <section class="w-full">
    <ReviewsSection />
  </section>

  <!-- Footer -->
  <FooterSection background="#011b33" title="#ffffff" text="#ffffff" />
</template>

<style scoped>
  .nav-container {
    background-color: rgba(255, 255, 255, 0.5);
  }
</style>
