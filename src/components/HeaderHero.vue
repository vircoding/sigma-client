<template>
  <div class="my-20 flex w-full flex-col items-center px-[6%] text-base">
    <!-- Hero -->
    <div class="text-shadow mb-5 flex w-full flex-col items-center justify-center">
      <h1 class="mb-5 w-full text-center text-4xl font-extrabold uppercase">
        Encuentra tu <span class="text-sigma">casa ideal</span>, un click
        <span class="text-sigma">más cerca</span>
      </h1>
      <p class="w-full text-center font-archivo text-sgray-300">
        ¿Sueñas con encontrar la casa perfecta? En Sigma, lo hacemos realidad
      </p>
    </div>

    <RouterLink to="/find" class="w-full">
      <div
        class="text-shadow flex w-full items-center justify-between overflow-hidden rounded-lg border border-sgray-200 px-5 py-1"
      >
        <span class="relative top-[1px]">Descubre nuestras casas</span>
        <img src="../assets/find-icon.svg" />
      </div>
    </RouterLink>
  </div>
</template>
