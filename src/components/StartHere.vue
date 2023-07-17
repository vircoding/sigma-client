<script setup>
  const props = defineProps(["role"]);
</script>

<template>
  <div
    class="text-shadow flex w-full flex-col items-center justify-center gap-4 px-[6%] text-center text-white lg:px-[6%]"
  >
    <h2 class="text-3xl font-extrabold uppercase">Comienza Por Aquí</h2>
    <p class="font-archivo">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, necessitatibus!
    </p>
  </div>
  <div
    v-if="props.role === 'agent'"
    class="flex h-full w-full flex-col items-center justify-center gap-10 bg-sigma px-[6%] py-20 lg:flex-row lg:px-24 xl:gap-14 xl:px-32 2xl:px-44"
  >
    <div
      class="flex h-[300px] w-[285px] flex-col items-center justify-center gap-4 rounded-2xl bg-white p-5 text-center lg:h-[362px] lg:w-[300px]"
    >
      <img src="../assets/house-icon.svg" class="text-shadow w-16 xl:w-20" />
      <h3 class="text-shadow text-xl font-extrabold xl:text-3xl">Publica Tu Casa</h3>
      <p class="text-shadow mb-3 font-archivo text-sm tracking-tight text-sgray-200 xl:text-base">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, recusandae magni. Laudantium
        deserunt molestias suscipit.
      </p>
      <RouterLink
        to="/insert"
        class="text-shadow rounded-md border border-sigma px-5 py-2 hover:text-black"
        >Adelante</RouterLink
      >
    </div>
    <div
      class="flex h-[300px] w-[285px] flex-col items-center justify-center gap-4 rounded-2xl bg-white p-5 text-center lg:h-[362px] lg:w-[300px]"
    >
      <img src="../assets/message-icon.svg" class="text-shadow w-16 xl:w-20" />
      <h3 class="text-shadow text-xl font-extrabold xl:text-3xl">Únete a la comunidad</h3>
      <p class="text-shadow mb-3 font-archivo text-sm tracking-tight text-sgray-200 xl:text-base">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, recusandae magni. Laudantium
        deserunt molestias suscipit.
      </p>
      <RouterLink
        to="/insert"
        class="text-shadow rounded-md border border-sigma px-5 py-2 hover:text-black"
        >Adelante</RouterLink
      >
    </div>
    <div
      class="flex h-[300px] w-[285px] flex-col items-center justify-center gap-4 rounded-2xl bg-white p-5 text-center lg:h-[362px] lg:w-[300px]"
    >
      <img src="../assets/bubble-alert-icon.svg" class="text-shadow w-16 xl:w-20" />
      <h3 class="text-shadow text-xl font-extrabold xl:text-3xl">Lee nuestros términos</h3>
      <p class="text-shadow mb-3 font-archivo text-sm tracking-tight text-sgray-200 xl:text-base">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, recusandae magni. Laudantium
        deserunt molestias suscipit.
      </p>
      <RouterLink
        to="/insert"
        class="text-shadow rounded-md border border-sigma px-5 py-2 hover:text-black"
        >Adelante</RouterLink
      >
    </div>
  </div>

  <div
    v-else
    class="flex h-full w-full flex-col items-center justify-center gap-10 bg-sigma px-[6%] py-20 lg:flex-row lg:px-24 xl:gap-14 xl:px-32 2xl:px-44"
  >
    <div
      class="flex h-[300px] w-[285px] flex-col items-center justify-center gap-4 rounded-2xl bg-white p-5 text-center lg:h-[362px] lg:w-[300px]"
    >
      <img src="../assets/house-icon.svg" class="text-shadow w-16 xl:w-20" />
      <h3 class="text-shadow text-xl font-extrabold xl:text-3xl">Publica Tu Casa</h3>
      <p class="text-shadow mb-3 font-archivo text-sm tracking-tight text-sgray-200 xl:text-base">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, recusandae magni. Laudantium
        deserunt molestias suscipit.
      </p>
      <RouterLink
        to="/insert"
        class="text-shadow rounded-md border border-sigma px-5 py-2 hover:text-black"
        >Adelante</RouterLink
      >
    </div>
    <div
      class="flex h-[300px] w-[285px] flex-col items-center justify-center gap-4 rounded-2xl bg-white p-5 text-center lg:h-[362px] lg:w-[300px]"
    >
      <img src="../assets/credit-icon.svg" class="text-shadow w-16 xl:w-20" />
      <h3 class="text-shadow text-xl font-extrabold xl:text-3xl">Descubre Casas</h3>
      <p class="text-shadow mb-3 font-archivo text-sm tracking-tight text-sgray-200 xl:text-base">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, recusandae magni. Laudantium
        deserunt molestias suscipit.
      </p>
      <RouterLink
        to="/find"
        class="text-shadow rounded-md border border-sigma px-5 py-2 hover:text-black"
        >Adelante</RouterLink
      >
    </div>
    <div
      class="flex h-[300px] w-[285px] flex-col items-center justify-center gap-4 rounded-2xl bg-white p-5 text-center lg:h-[362px] lg:w-[300px]"
    >
      <img src="../assets/bed-icon.svg" class="text-shadow w-16 xl:w-20" />
      <h3 class="text-shadow text-xl font-extrabold xl:text-3xl">Consigue Renta</h3>
      <p class="text-shadow mb-3 font-archivo text-sm tracking-tight text-sgray-200 xl:text-base">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, recusandae magni. Laudantium
        deserunt molestias suscipit.
      </p>
      <RouterLink
        to="/find"
        class="text-shadow rounded-md border border-sigma px-5 py-2 hover:text-black"
        >Adelante</RouterLink
      >
    </div>
  </div>
</template>
