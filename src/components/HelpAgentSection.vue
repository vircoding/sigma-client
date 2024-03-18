<script setup>
  import WhatsappIcon from "./icons/WhatsappIcon.vue";
</script>

<template>
  <div class="overflow-hidden bg-white py-10 text-center">
    <!-- Hero -->
    <div class="mb-6 flex w-full flex-col gap-2 px-5 text-center">
      <h2 class="text-shadow w-full font-ubuntu text-3xl font-bold text-sblue-500">
        Contratar un agente
      </h2>
      <p class="text-shadow w-full px-2 text-sm text-sgray-300">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ut dolores quo numquam!
      </p>
    </div>

    <!-- Whatsapp -->
    <div class="text-shadow flex w-full items-center justify-center">
      <a
        href="https:/wa.me/+5350009047"
        class="flex w-1/2 items-center justify-center gap-[2px] rounded-xl bg-sigma py-2"
      >
        <WhatsappIcon class="h-6 w-6" :color="'fill-white'" />
        <span class="relative top-[1px] text-white">Whatsapp</span>
      </a>
    </div>
  </div>
</template>
