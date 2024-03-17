<script setup>
  import NavBar from "../components/NavBar.vue";
  import LoginForm from "../components/LoginForm.vue";
  import FooterSection from "../components/FooterSection.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <!-- Header -->
    <header class="relative z-20 h-[68px] w-full shadow-md">
      <NavBar class="absolute" />
    </header>

    <!-- Form -->
    <main class="flex grow flex-col items-center justify-center">
      <LoginForm />
    </main>
  </div>

  <!-- Footer -->
  <footer>
    <FooterSection background="#011b33" title="#ffffff" text="#ffffff" />
  </footer>
</template>
