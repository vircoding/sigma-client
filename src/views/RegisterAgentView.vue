<script setup>
  import { onBeforeUnmount } from "vue";
  import { useLayoutStore } from "../stores/layoutStore.js";
  import NavBar from "../components/NavBar.vue";
  import RegisterAgentForm from "../components/RegisterAgentForm.vue";
  import FooterSection from "../components/FooterSection.vue";
  import AvatarCropper from "../components/AvatarCropper.vue";

  const layoutStore = useLayoutStore();

  onBeforeUnmount(() => {
    layoutStore.resetEditAvatar();
    layoutStore.resetSingleAvatarURLState();
    layoutStore.resetAvatarURL();
  });
</script>

<template>
  <div :class="layoutStore.imageCropper ? 'h-screen' : ''">
    <!-- Avatar Cropper -->
    <div v-if="layoutStore.imageCropper" class="overlay">
      <AvatarCropper />
    </div>

    <!-- Main -->
    <div :class="layoutStore.imageCropper ? 'blur' : ''">
      <div class="flex min-h-screen flex-col">
        <!-- Header -->
        <header class="relative z-20 h-[68px] w-full shadow-md">
          <NavBar class="absolute" />
        </header>

        <!-- Form -->
        <main class="flex grow flex-col items-center justify-center">
          <RegisterAgentForm />
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
../components/OLDRegisterAgentForm.vue/index.js
