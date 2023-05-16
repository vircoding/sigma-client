<script setup>
  import { useUserStore } from "../stores/user.js";
  import NavBar from "../components/NavBar.vue";
  import ClientInfo from "../components/ClientInfo.vue";
  import AgentInfo from "../components/AgentInfo.vue";
  import FooterSection from "../components/FooterSection.vue";

  const userStore = useUserStore();
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
        <!-- <ClientInfo /> -->
        <AgentInfo />
      </main>
    </div>
    <footer class="mb-2.5">
      <FooterSection />
    </footer>
  </div>
</template>
