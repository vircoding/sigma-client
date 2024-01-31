<script setup>
  import NavBar from "../components/NavBar.vue";
  import WhoSection from "../components/WhoSection.vue";
  import TeamSection from "../components/TeamSection.vue";
  import ReviewsSection from "../components/ReviewsSection.vue";
  import FooterSection from "../components/FooterSection.vue";
  import AboutAgentSection from "../components/AboutAgentSection.vue";
</script>

<template>
  <div class="lg:px-2.5">
    <div class="flex min-h-screen flex-col lg:h-screen lg:py-2.5">
      <header>
        <div class="relative overflow-hidden bg-background">
          <NavBar class="z-20" />
        </div>
      </header>
      <main class="mb-[5px] flex grow flex-col bg-background lg:mb-0">
        <!-- Who Section -->
        <WhoSection />

        <!-- Team Section -->
        <TeamSection />

        <!-- Agent Section -->
        <AboutAgentSection />

        <!-- Reviews Section -->
        <ReviewsSection />
      </main>
    </div>
    <footer class="lg:mb-2.5">
      <FooterSection background="#333333" text="#dcdcdc" title="#ffffff" />
    </footer>
  </div>
</template>
