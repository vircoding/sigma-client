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
    <p class="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, vero.</p>
    <!-- Buttons -->
    <div class="flex w-full items-center justify-evenly">
      <button class="rounded-md bg-sigma px-6 py-[5px] text-white">Ok</button>
      <button class="rounded-md bg-sgray-100 px-6 py-[5px]">No</button>
    </div>
  </div>
</template>
