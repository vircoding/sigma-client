<script setup>
  import { RouterLink } from "vue-router";
  import SigmaIcon from "./icons/SigmaIcon.vue";
  import BrandIcon from "./icons/BrandIcon.vue";
</script>

<template>
  <div class="bg-sigma px-7 pb-12 pt-10 font-archivo text-sm lg:text-lg">
    <SigmaIcon class="lg:mb- mx-auto mb-8 w-36 fill-white lg:w-56" />
    <div class="scoped-width mx-auto mb-8 lg:mb-5 lg:grid lg:grid-cols-2">
      <div class="mb-3 flex flex-col">
        <h4 class="font-bold">INFORMACIÓN DE LA EMPRESA</h4>
        <RouterLink to="/support/about" class="text-white hover:underline"
          >¿Quiénes somos?</RouterLink
        >
        <!-- TODO: Add an id ref to HelpView to FAQ section -->
        <RouterLink to="/support/help" class="text-white hover:underline"
          >Preguntas Frequentes</RouterLink
        >
      </div>
      <div class="mb-3 flex flex-col lg:place-self-end lg:text-right">
        <h4 class="font-bold">AYUDA</h4>
        <!-- TODO: Insert the original video link -->
        <a href="https://www.youtube.com/" class="text-white hover:underline">
          ¿Cómo funciona el sitio? (Tutorial)
        </a>
        <!-- TODO: Add an id ref to HelpView to Encontrar agente -->
        <RouterLink to="/support/help" class="text-white hover:underline"
          >Quiero contratar un agente</RouterLink
        >
      </div>
      <!-- TODO: Insert content to this section -->
      <div class="mb-3 flex flex-col">
        <h4 class="font-bold">POWERED BY</h4>
        <p class="text-white hover:underline">/Insert some info..../</p>
      </div>
      <div class="mb-3 flex flex-col lg:place-self-end lg:text-right">
        <h4 class="font-bold">CONTÁCTANOS</h4>
        <!-- TODO: Check about send and post emails directly or maybe copy the email to the clipboard -->
        <span class="text-white hover:underline">hola@sigmacuba.com</span>
        <!-- TODO: Insert the original whatsapp chat link and icon -->
        <a href="#" class="text-white hover:underline">W +53 5-000-6233</a>
      </div>
    </div>
    <!-- TODO: improve border and hover -->
    <nav class="flex justify-center gap-2">
      <a href="https://www.instagram.com/">
        <BrandIcon icon="instagram" />
      </a>
      <a href="https://es-la.facebook.com/">
        <BrandIcon icon="facebook" />
      </a>
      <a href="https://www.tiktok.com/es/">
        <BrandIcon icon="tiktok" />
      </a>
      <a href="https://www.youtube.com/">
        <BrandIcon icon="youtube" />
      </a>
    </nav>
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
