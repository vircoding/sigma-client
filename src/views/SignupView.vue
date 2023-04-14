<script setup>
  import NavBar from "../components/NavBar.vue";
  import SignupForm from "../components/SignupForm.vue";
</script>

<template>
  <div class="flex h-screen flex-col p-2.5">
    <header>
      <div class="relative overflow-hidden bg-background">
        <NavBar class="z-20" />
      </div>
    </header>
    <main class="grow bg-background">
      <SignupForm />
    </main>
  </div>
</template>
