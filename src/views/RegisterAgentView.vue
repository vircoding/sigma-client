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
  <div class="lg:px-2.5" :class="layoutStore.imageCropper ? 'h-screen' : ''">
    <div class="overlay" v-if="layoutStore.imageCropper">
      <AvatarCropper />
    </div>
    <div :class="layoutStore.imageCropper ? 'blur' : ''">
      <div class="flex min-h-screen flex-col lg:h-screen lg:py-2.5">
        <header>
          <div class="relative overflow-hidden bg-background">
            <NavBar class="z-20" />
          </div>
        </header>
        <main class="mb-[5px] grow bg-background lg:mb-0">
          <RegisterAgentForm />
        </main>
      </div>
      <footer class="lg:mb-2.5">
        <FooterSection background="#333333" text="#dcdcdc" title="#ffffff" />
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
