<script setup>
  import NavBar from "../components/NavBar.vue";
  import LoginForm from "../components/LoginForm.vue";
  import FooterSection from "../components/FooterSection.vue";
</script>

<template>
  <div class="lg:px-2.5">
    <div class="flex h-screen flex-col lg:py-2.5">
      <header>
        <div class="relative overflow-hidden bg-background">
          <NavBar class="z-20" />
        </div>
      </header>
      <main class="grow bg-background">
        <LoginForm />
      </main>
    </div>
    <footer class="lg:mb-2.5">
      <FooterSection />
    </footer>
  </div>
</template>
