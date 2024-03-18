<script setup>
  import NavBar from "../components/NavBar.vue";
  import TeamSection from "../components/TeamSection.vue";
  import FooterSection from "../components/FooterSection.vue";
</script>

<template>
  <!-- NavBar -->
  <header class="relative z-20 h-[68px] w-full shadow-md">
    <NavBar class="absolute" />
  </header>

  <main class="w-full">
    <!-- Hero -->
    <div id="who" class="flex w-full flex-col gap-2 px-5 py-10 text-center">
      <h2 class="text-shadow w-full font-ubuntu text-3xl font-bold text-sblue-500">
        ¿Quiénes somos?
      </h2>
      <p class="text-shadow w-full px-2 text-sm text-sgray-300">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio praesentium in reprehenderit
        itaque asperiores repellat unde vitae labore sed odit.
      </p>
    </div>

    <!-- Horizontal Line -->
    <div class="w-full border-b border-sgray-100"></div>

    <section id="team" class="w-full">
      <TeamSection />
    </section>
  </main>

  <!-- Footer -->
  <FooterSection background="#011b33" title="#ffffff" text="#ffffff" />
</template>
