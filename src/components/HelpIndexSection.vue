<template>
  <!-- Container -->
  <div class="bg-background text-center max-[1023px]:px-[10%] max-[499px]:px-[5%]">
    <!-- Index -->
    <ul
      class="text-shadow mb-12 flex w-full flex-col justify-center rounded-2xl border border-sgray-100 bg-white px-7 text-left"
    >
      <li class="flex w-full items-center justify-between border-b border-sgray-100 pb-3 pt-5">
        <h2 class="text-base font-semibold text-sblue-500">Índice</h2>
        <img src="../assets/down-arrow-icon.svg" class="w-6" />
      </li>

      <!-- Video Tutorial -->
      <li class="w-full border-b border-sgray-100 py-3">
        <RouterLink to="/support/help#videotut" class="text-base text-sgray-300"
          ><span class="font-semibold text-sblue-500">1.</span> Video Tutorial</RouterLink
        >
      </li>

      <!-- Tutorial Paso a Paso -->
      <li class="w-full border-b border-sgray-100 py-3">
        <RouterLink to="/support/help#texttut" class="text-base text-sgray-300"
          ><span class="font-semibold text-sblue-500">2.</span> Tutorial Paso a Paso</RouterLink
        >
      </li>

      <!-- Contratar a un agente -->
      <li class="w-full border-b border-sgray-100 py-3">
        <RouterLink to="/support/help#findagent" class="text-base text-sgray-300"
          ><span class="font-semibold text-sblue-500">3.</span> Contrata a un agente</RouterLink
        >
      </li>

      <!-- Preguntas frecuentes -->
      <li class="w-full border-b border-sgray-100 pb-4 pt-3">
        <RouterLink to="/support/help#faq" class="text-base text-sgray-300"
          ><span class="font-semibold text-sblue-500">4.</span> Preguntas frecuentes</RouterLink
        >
      </li>
    </ul>
  </div>
</template>
