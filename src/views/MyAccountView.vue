<script setup>
  import { useUserStore } from "../stores/userStore.js";
  import { useLayoutStore } from "../stores/layoutStore.js";
  import NavBar from "../components/NavBar.vue";
  import FooterSection from "../components/FooterSection.vue";
  import { onBeforeUnmount } from "vue";
  import AgentAccount from "../components/AgentAccount.vue";
  import ClientAccount from "../components/ClientAccount.vue";
  import AvatarCropper from "../components/AvatarCropper.vue";

  const userStore = useUserStore();
  const layoutStore = useLayoutStore();

  onBeforeUnmount(() => {
    userStore.resetMyAccount();

    layoutStore.resetEditAvatar();
    layoutStore.resetSingleAvatarURLState();
    layoutStore.resetAvatarURL();
  });
</script>

<template>
  <div :class="layoutStore.imageCropper ? 'h-screen' : ''">
    <!-- Avatar Cropper -->
    <div v-if="layoutStore.imageCropper" class="overlay z-50">
      <AvatarCropper />
    </div>

    <!-- Main -->
    <div :class="layoutStore.imageCropper ? 'blur' : ''">
      <div class="flex min-h-screen flex-col bg-background">
        <!-- NavBar -->
        <header class="relative z-20 h-[68px] w-full shadow-md">
          <NavBar class="absolute" />
        </header>

        <!-- Account -->
        <main class="flex grow flex-col items-center justify-center">
          <ClientAccount v-if="userStore.credentialsState.role === 'client'" />
          <AgentAccount v-if="userStore.credentialsState.role === 'agent'" />
        </main>
      </div>

      <!-- Footer -->
      <footer>
        <FooterSection background="#011b33" title="#ffffff" text="#ffffff" />
      </footer>
    </div>
  </div>
</template>

<style scoped>
  .blur {
    filter: blur(2px);
  }

  .overlay {
    will-change: transform;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 20;
  }
</style>
