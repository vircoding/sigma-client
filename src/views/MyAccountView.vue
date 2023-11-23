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
  <div class="lg:px-2.5">
    <div class="flex min-h-screen flex-col lg:h-screen lg:py-2.5">
      <header>
        <div class="relative overflow-hidden bg-background">
          <NavBar class="z-20" />
        </div>
      </header>
      <main class="mb-[5px] grow bg-background lg:mb-0">
        <ClientAccount v-if="userStore.credentialsState.role === 'client'" />
        <AgentAccount v-if="userStore.credentialsState.role === 'agent'" />
      </main>
    </div>
    <footer class="lg:mb-2.5">
      <FooterSection background="#333333" text="#dcdcdc" title="#ffffff" />
    </footer>
  </div>
</template>
