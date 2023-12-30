<script setup>
  import { ref } from "vue";
  import { useLayoutStore } from "../stores/layoutStore.js";

  const layoutStore = useLayoutStore();
  const props = defineProps(["type"]);

  const startPositionY = ref(null);

  const startSwipe = (event) => {
    startPositionY.value = event.touches[0].clientY;
  };

  const moveSwipe = (event) => {
    const movePosY = event.touches[0].clientY;
    const diffY = Math.abs(movePosY - startPositionY.value);

    if (diffY > 0) {
      if (event.cancelable) {
        event.preventDefault();
      }
    }
  };

  const cancel = () => {
    layoutStore.hidePopup();
  };
</script>

<template>
  <!-- Pre Insert -->
  <div
    v-if="props.type === 'pre-insert'"
    @touchstart="startSwipe($event)"
    @touchmove="moveSwipe($event)"
    :class="layoutStore.isPopup ? 'inline-block' : 'hidden'"
    class="text-shadow fixed left-[50vw] top-[50vh] z-50 flex w-[85vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-5 rounded-md bg-white px-5 py-10 text-center"
  >
    <h4 class="text-2xl font-semibold">¿Necesitas ayuda para publicar?</h4>
    <p class="mb-2">
      Puedes <span class="font font-semibold">publicar</span> tu anuncio por ti mismo pero si
      necesitas de un <span class="font font-semibold">agente</span> contáctanos a nuestro
      <span class="font font-semibold">WhatsApp</span>
    </p>
    <!-- Buttons -->
    <div class="flex w-full items-center justify-evenly">
      <a
        href="https://wa.me/+5350009047"
        class="flex min-w-[120px] items-center justify-center gap-1 rounded-md bg-sigma px-1 py-[5px] font-semibold text-white"
      >
        <img src="../assets/whatsapp-icon.svg" />
        <span>AGENTE</span>
      </a>
      <button @click.prevent="cancel" class="min-w-[120px] rounded-md bg-sgray-100 px-1 py-[5px]">
        PUBLICAR
      </button>
    </div>
  </div>
</template>
