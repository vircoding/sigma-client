<script setup>
  import { computed } from 'vue';
  import { RouterLink } from 'vue-router';
  import SigmaIcon from './icons/SigmaIcon.vue';
  import BrandIcon from './icons/BrandIcon.vue';
  import WhatsappIcon from './icons/WhatsappIcon.vue';

  const props = defineProps(['background', 'title', 'text']);

  const sigmaIconFill = computed(() => {
    if (props.title === '#333333') return 'fill-sgray-400';
    else return 'fill-white';
  });

  const year = new Date().getFullYear();
</script>

<template>
  <div class="w-full">
    <!-- Info -->
    <div
      class="w-full px-6 pt-10"
      :style="`color: ${props.text}; background-color: ${props.background}`"
    >
      <!-- Top -->
      <div class="mb-10 flex w-full items-center justify-start gap-y-6">
        <!-- Left -->
        <div class="w-3/5 space-y-4">
          <!-- Company -->
          <div class="flex w-full flex-col">
            <RouterLink to="/support/about" class="text-lg font-semibold tracking-wide"
              >EMPRESA</RouterLink
            >
            <RouterLink to="/support/about#who" class="hover:underline">¿Quiénes somos?</RouterLink>
            <RouterLink to="/support/about#team" class="hover:underline">Nuestro equipo</RouterLink>
            <!-- <RouterLink to="/support/about#agent" class="hover:underline"
              >¿Quieres ser agente?</RouterLink
            > -->
          </div>

          <!-- Help -->
          <div class="flex w-full flex-col">
            <RouterLink to="/support/help" class="text-lg font-semibold tracking-wide"
              >AYUDA</RouterLink
            >
            <RouterLink to="/support/help#videotut" class="hover:underline"
              >¿Cómo funciona el sitio?</RouterLink
            >
            <RouterLink to="/support/help#findagent" class="hover:underline"
              >¿Quieres ser agente?</RouterLink
            >
            <RouterLink to="/support/help#faq" class="hover:underline"
              >Preguntas frecuentes</RouterLink
            >
          </div>

          <!-- Contact Us -->
          <div class="flex w-full flex-col">
            <RouterLink to="/support/contact" class="text-lg font-semibold tracking-wide"
              >CONTÁCTANOS</RouterLink
            >
            <a
              href="mailto:sigmacuba2023@gmail.com"
              class="flex items-center gap-1 hover:underline"
            >
              <img src="../assets/email-icon.svg" class="w-6" />
              <span class="relative top-[1px]">Correo Electrónico</span>
            </a>
            <a href="https://wa.me/+5350009047" class="flex items-center gap-1 hover:underline">
              <WhatsappIcon :color="sigmaIconFill" />
              <span class="relative top-[1px]">Whatsapp</span>
            </a>
          </div>
        </div>

        <!-- Rigth -->
        <div class="flex w-2/5 flex-col items-center justify-center">
          <!-- Socials -->
          <div class="w-full pl-6 text-center">
            <h6 class="mb-3 text-lg font-semibold tracking-wide">SÍGUENOS</h6>
            <div class="grid grid-cols-3 grid-rows-2 place-items-center gap-y-2">
              <!-- Instagram -->
              <a href="https://www.instagram.com/sigmacuba/">
                <BrandIcon icon="instagram" :color="props.title" />
              </a>

              <!-- Facebook -->
              <a href="https://m.facebook.com/groups/249539844657857">
                <BrandIcon icon="facebook" :color="props.title" />
              </a>

              <!-- YouTube -->
              <a href="https://www.youtube.com/@SigmaCasasCuba">
                <BrandIcon icon="youtube" :color="props.title" />
              </a>

              <!-- Twitter-X -->
              <a href="https://twitter.com/">
                <BrandIcon icon="twitter-x" :color="props.title" />
              </a>

              <!-- TikTok -->
              <a href="https://www.tiktok.com/">
                <BrandIcon icon="tiktok" :color="props.title" />
              </a>

              <!-- Threads -->
              <a href="https://www.threads.net/@sigmacuba">
                <BrandIcon icon="threads" :color="props.title" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- Copyrigths -->
      <div
        class="flex w-full items-center justify-evenly pb-12"
        :style="`color: ${props.text}; background-color: ${props.background}`"
      >
        <SigmaIcon class="w-20 lg:w-56" :class="sigmaIconFill" />
        <div class="h-[25px] border-r" :style="`border-color: ${props.title}`"></div>
        <div class="text-center">
          <span :style="`color: ${props.title}`" class="relative text-xs"
            >© {{ year }}, La Habana, Cuba</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
