<script setup>
  import { onBeforeUnmount } from "vue";
  import { useLayoutStore } from "../stores/layoutStore.js";
  import NavBar from "../components/NavBar.vue";
  import InsertForm from "../components/InsertForm.vue";
  import FooterSection from "../components/FooterSection.vue";
  import ImageCropper from "../components/ImageCropper.vue";

  const layoutStore = useLayoutStore();

  onBeforeUnmount(() => {
    layoutStore.resetEditImage();
    layoutStore.resetSingleImageURLState();
    layoutStore.resetPostImagesURL();
  });
</script>

<template>
  <div class="lg:px-2.5" :class="layoutStore.imageCropper ? 'h-screen' : ''">
    <div class="overlay" v-if="layoutStore.imageCropper">
      <ImageCropper />
    </div>
    <div :class="layoutStore.imageCropper ? 'blur' : ''">
      <div class="flex min-h-screen flex-col lg:h-screen lg:py-2.5">
        <header>
          <div class="relative overflow-hidden bg-background">
            <NavBar class="z-20" />
          </div>
        </header>
        <main class="mb-[5px] grow bg-background lg:mb-0">
          <InsertForm />
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
