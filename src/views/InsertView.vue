<script setup>
  import NavBar from "../components/NavBar.vue";
  import InsertForm from "../components/InsertForm.vue";
  import FooterSection from "../components/FooterSection.vue";
</script>

<template>
  <div class="px-2.5">
    <div class="flex h-screen flex-col py-2.5">
      <header>
        <div class="relative overflow-hidden bg-background">
          <NavBar class="z-20" />
        </div>
      </header>
      <main class="grow bg-background">
        <InsertForm />
      </main>
    </div>
    <footer class="mb-2.5">
      <FooterSection />
    </footer>
  </div>
</template>
