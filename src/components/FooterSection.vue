<script setup>
  import { RouterLink } from "vue-router";
  import SigmaIcon from "./icons/SigmaIcon.vue";
  import BrandIcon from "./icons/BrandIcon.vue";
  import { computed } from "vue";

  const props = defineProps(["background", "title", "text"]);

  const sigmaIconFill = computed(() => {
    if (props.title === "#333333") return "fill-sgray-400";
    else return "fill-white";
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
      <div class="mb-8 flex w-full items-center justify-start gap-y-6">
        <!-- Left -->
        <div class="w-3/5 space-y-4">
          <!-- Company -->
          <div class="flex w-full flex-col">
            <h6 class="text-base font-semibold tracking-wide">EMPRESA</h6>
            <RouterLink to="/support/about#who" class="hover:underline">¿Quiénes somos?</RouterLink>
            <RouterLink to="/support/about#team" class="hover:underline">Nuestro equipo</RouterLink>
            <RouterLink to="/support/about#agent" class="hover:underline"
              >¿Quieres ser agente?</RouterLink
            >
          </div>

          <!-- Help -->
          <div class="flex w-full flex-col">
            <h6 class="text-base font-semibold tracking-wide">AYUDA</h6>
            <RouterLink to="/support/help#video" class="hover:underline"
              >¿Cómo funciona el sitio?</RouterLink
            >
            <a href="https://wa.me/+5350009047" class="hover:underline"
              >Quiero contratar un agente</a
            >
            <RouterLink to="/support/help#faq" class="hover:underline"
              >Preguntas frecuentes</RouterLink
            >
          </div>

          <!-- Contact Us -->
          <div class="flex w-full flex-col">
            <h6 class="text-base font-semibold tracking-wide">CONTÁCTANOS</h6>
            <a href="mailto:sigmacuba2023@gmail.com">sigmacuba2023@gmail.com</a>
            <a href="https://wa.me/+5350009047" class="flex items-center gap-1 hover:underline">
              <img src="../assets/whatsapp-icon.svg" />
              <span>50009047</span>
            </a>
          </div>
        </div>

        <!-- Rigth -->
        <div class="flex w-2/5 flex-col items-center justify-center">
          <!-- Powered By -->
          <div class="mb-4 w-full pl-6 text-center">
            <h6 class="mb-3 text-base font-semibold tracking-wide">POWERED BY</h6>
            <div class="grid grid-cols-2 grid-rows-4 place-items-center gap-y-2">
              <div class="h-6 w-6 rounded-md bg-stone-300"></div>
              <div class="h-6 w-6 rounded-md bg-stone-300"></div>
              <div class="h-6 w-6 rounded-md bg-stone-300"></div>
              <div class="h-6 w-6 rounded-md bg-stone-300"></div>
              <div class="h-6 w-6 rounded-md bg-stone-300"></div>
              <div class="h-6 w-6 rounded-md bg-stone-300"></div>
              <div class="h-6 w-6 rounded-md bg-stone-300"></div>
              <div class="h-6 w-6 rounded-md bg-stone-300"></div>
            </div>
          </div>

          <!-- Socials -->
          <div class="w-full pl-6 text-center">
            <h6 class="mb-3 text-base font-semibold tracking-wide">SÍGUENOS</h6>
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
        class="flex w-full items-center justify-evenly pb-11"
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
