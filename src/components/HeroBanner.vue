import { RouterLink } from 'vue-router';
<template>
  <div class="relative flex h-[500px] w-full flex-col items-center justify-center">
    <figure class="hero-banner absolute bottom-0 left-0 right-0 top-0 overflow-hidden">
      <img src="../assets/home-banner.jpg" />
    </figure>
    <div class="relative top-[34px] z-20 flex w-full flex-col gap-2 px-5 text-left">
      <h1 class="custom-shadow w-full text-3xl font-extrabold uppercase text-sgray-100">
        Encuentra tu casa ideal, un click más cerca
      </h1>
      <p class="custom-shadow w-full text-sm text-sgray-100">
        ¿Sueñas con encontrar la casa perfecta? En Sigma, lo hacemos realidad.
      </p>
      <RouterLink to="/auth/login" class=""> </RouterLink>
    </div>
  </div>
</template>

<style scoped>
  .hero-banner {
    background-image: url(../assets/home-banner.jpg);
    z-index: 0;
  }
</style>
