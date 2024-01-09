<script setup>
  import NavBar from "../components/NavBar.vue";
  import FooterSection from "../components/FooterSection.vue";
</script>

<template>
  <div class="lg:px-2.5">
    <div class="flex min-h-screen flex-col lg:h-screen lg:py-2.5">
      <header>
        <div class="relative overflow-hidden bg-background">
          <NavBar class="z-20" />
        </div>
      </header>
      <main class="mb-[5px] grow bg-background lg:mb-0">
        <h6>Index</h6>
        <h6 id="video">Video Tutorial Section</h6>
        <h6 id="tutorial">Text Tutorial Section</h6>
        <h6 id="agent">Agent Section</h6>
        <h6 id="faq">FAQ Section</h6>
      </main>
    </div>
    <footer class="lg:mb-2.5">
      <FooterSection background="#333333" text="#dcdcdc" title="#ffffff" />
    </footer>
  </div>
</template>
