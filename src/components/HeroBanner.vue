<template>
  <div class="relative flex w-full flex-col items-center justify-center">
    <figure class="w-full overflow-hidden">
      <img src="../assets/home-banner.jpg" class="w-full" />
    </figure>
    <div class="absolute z-20 flex w-full flex-col gap-4 px-5 text-left">
      <h1 class="custom-shadow w-full font-ubuntu text-3xl font-bold text-white">
        Encuentra tu casa ideal, un click más cerca
      </h1>
      <p class="custom-shadow w-full text-sm text-white">
        ¿Sueñas con encontrar la casa perfecta? En Sigma, lo hacemos realidad.
      </p>
    </div>
  </div>
</template>

<style scoped>
  .hero-banner {
    background-image: url(../assets/home-banner.jpg);
    z-index: 0;
  }
</style>
