<script setup>
  import WhatsappIcon from "./icons/WhatsappIcon.vue";
</script>

<template>
  <div
    class="mb-[5px] overflow-hidden bg-white text-center max-[1023px]:px-[10%] max-[499px]:px-[5%]"
  >
    <!-- Hero -->
    <div class="py-10">
      <h2
        class="text-shadow mb-5 text-center text-4xl font-extrabold max-[1023px]:text-4xl max-[505px]:text-3xl lg:mb-0 lg:text-left lg:text-4xl"
      >
        ¿Quiéres ser agente?
      </h2>
      <p class="text-shadow block text-center text-sgray-300 lg:text-left lg:text-lg">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, aliquid.
      </p>
    </div>

    <!-- Whatsapp -->
    <div class="text-shadow mb-11 flex w-full items-center justify-center">
      <a
        href="https:/wa.me/+5350009047"
        class="flex w-1/2 items-center justify-center gap-[1px] rounded-xl bg-sigma py-2"
      >
        <WhatsappIcon class="h-8 w-8" :color="'fill-white'" />
        <span class="relative top-[1px] text-lg text-white">50009047</span>
      </a>
    </div>
  </div>
</template>
