<template>
  <div class="relative w-full bg-white pt-10">
    <!-- Hero -->
    <div class="mb-6 flex w-full flex-col gap-2 px-5 text-center">
      <h2 class="text-shadow w-full text-2xl font-extrabold uppercase text-sblue-500">
        ¿Aún no tienes cuenta?
      </h2>
      <p class="text-shadow w-full px-2 text-sm text-sgray-300">
        Crea tu cuenta como Propietario si deseas vender o rentar tu casa. Crea tu cuenta como
        Agente si deseas vender o rentar hasta 10 casas
      </p>
    </div>

    <!-- Main -->
    <div class="relative w-full">
      <!-- Figure -->
      <figure class="text-shadow h-[320px] w-[85%] overflow-hidden rounded-tr-[45%] bg-sgray-300">
        <img src="../assets/register-here.jpg" class="w-[200%]" />
      </figure>

      <!-- Buttons -->
      <div class="absolute bottom-8 right-5 flex flex-col gap-[10px]">
        <!-- Client -->
        <RouterLink
          to="auth/register/client"
          class="text-shadow flex w-32 items-center justify-center rounded-lg bg-sblue-500 py-2"
        >
          <span class="text-sm font-semibold uppercase text-sgray-100">Propietario</span>
        </RouterLink>

        <!-- Agent -->
        <RouterLink
          to="auth/register/agent"
          class="text-shadow flex w-32 items-center justify-center rounded-lg bg-sigma py-2"
        >
          <span class="text-sm font-semibold uppercase text-sgray-100">Agente</span>
        </RouterLink>
      </div>
    </div>

    <!-- Terms -->
    <div class="flex w-full items-center justify-between bg-sblue-500 px-5 py-4">
      <span class="font-semibold text-sgray-100"
        >Lee nuestros <span class="text-sigma">términos</span></span
      >
      <RouterLink to="/find" class="rounded-md border border-sigma p-3 py-[2px]">
        <span class="text-sm font-semibold text-sgray-100">ADELANTE</span>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
  .client {
    background-color: rgba(17, 131, 234, 0.95);
  }

  .agent {
    background-color: rgba(1, 27, 51, 0.95);
  }
</style>
