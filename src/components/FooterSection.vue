<script setup>
  import { RouterLink } from "vue-router";
  import SigmaIcon from "./icons/SigmaIcon.vue";
  import BrandIcon from "./icons/BrandIcon.vue";

  const props = defineProps(["background", "title", "text"]);

  const year = new Date().getFullYear();
</script>

<template>
  <div
    class="px-7 pb-12 pt-16 font-archivo text-sm lg:text-lg"
    :style="`color: ${props.text}; background-color: ${props.background}`"
  >
    <div class="scoped-width mx-auto mb-8 lg:mb-5 lg:grid lg:grid-cols-2">
      <div class="mb-3 flex flex-col">
        <h4 class="font-bold" :style="`color: ${props.title}`">INFORMACIÓN DE LA EMPRESA</h4>
        <RouterLink to="/support/about" class="hover:underline">¿Quiénes somos?</RouterLink>
        <RouterLink to="/support/help" class="hover:underline">Preguntas Frequentes</RouterLink>
      </div>
      <div class="mb-3 flex flex-col lg:place-self-end lg:text-right">
        <h4 class="font-bold" :style="`color: ${props.title}`">AYUDA</h4>
        <!-- TODO: Insert the original video link -->
        <a href="https://www.youtube.com/" class="hover:underline">
          ¿Cómo funciona el sitio? (Tutorial)
        </a>
        <!-- TODO: Add an id ref to HelpView to Encontrar agente -->
        <RouterLink to="/support/help" class="hover:underline"
          >Quiero contratar un agente</RouterLink
        >
      </div>
      <!-- TODO: Insert content to this section -->
      <div class="mb-3 flex flex-col">
        <h4 class="font-bold" :style="`color: ${props.title}`">POWERED BY</h4>
        <p class="hover:underline">/Insert some info..../</p>
      </div>
      <div class="mb-3 flex flex-col lg:place-self-end lg:text-right">
        <h4 class="font-bold" :style="`color: ${props.title}`">CONTÁCTANOS</h4>
        <span class="hover:underline">hola@sigmacuba.com</span>
        <a href="#" class="hover:underline">W +53 5-000-6233</a>
      </div>
    </div>
    <!-- TODO: improve border and hover -->
    <nav class="flex justify-center gap-2">
      <a href="https://www.instagram.com/">
        <BrandIcon icon="instagram" :role="props.role" />
      </a>
      <a href="https://es-la.facebook.com/">
        <BrandIcon icon="facebook" :role="props.role" />
      </a>
      <a href="https://www.tiktok.com/es/">
        <BrandIcon icon="tiktok" :role="props.role" />
      </a>
      <a href="https://www.youtube.com/">
        <BrandIcon icon="youtube" :role="props.role" />
      </a>
    </nav>
    <div class="mt-5 flex h-[30px] w-full items-center justify-center gap-5">
      <SigmaIcon
        class="w-20 lg:w-56"
        :class="props.role === 'agent' ? 'fill-sgray-400' : 'fill-sgray-100'"
      />
      <div class="h-[25px] border-r" :style="`border-color: ${props.title}`"></div>
      <div class="text-center">
        <span :style="`color: ${props.title}`" class="relative top-[2px] text-xs"
          >© {{ year }}, La Habana, Cuba</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
  @media (min-width: 1024px) {
    .scoped-width {
      width: 600px;
    }
  }

  @media (min-width: 1280px) {
    .scoped-width {
      width: 750px;
    }
  }
</style>
