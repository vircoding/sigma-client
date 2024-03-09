<script setup>
  import { useUserStore } from "../stores/userStore.js";
  import NavBar from "../components/NavBar.vue";
  import FooterSection from "../components/FooterSection.vue";
  import { onBeforeUnmount } from "vue";
  import AgentAccount from "../components/AgentAccount.vue";
  import ClientAccount from "../components/ClientAccount.vue";

  const userStore = useUserStore();

  onBeforeUnmount(() => {
    userStore.resetMyAccount();
  });
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background">
    <!-- NavBar -->
    <header class="relative z-20 h-[68px] w-full shadow-md">
      <NavBar class="absolute" />
    </header>
    <main class="flex grow flex-col items-center justify-center">
      <ClientAccount v-if="userStore.credentialsState.role === 'client'" />
      <AgentAccount v-if="userStore.credentialsState.role === 'agent'" />
    </main>
  </div>
  <footer class="lg:mb-2.5">
    <FooterSection background="#011b33" title="#ffffff" text="#ffffff" />
  </footer>
</template>
