<script setup>
  import NavBar from "../components/NavBar.vue";
  import PostInfo from "../components/PostInfo.vue";
  import FooterSection from "../components/FooterSection.vue";
</script>

<template>
  <!-- TODO: Para agregar boton de llamada fijado abajo del todo -->
  <!-- <a href="tel:+5354017747">Llamarme</a> -->
  <div class="lg:px-2.5">
    <div class="flex h-screen flex-col lg:py-2.5">
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
</template>
