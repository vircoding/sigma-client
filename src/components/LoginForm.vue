import SigmaIcon from './icons/SigmaIcon.vue';

<script setup>
  import AuthInput from "./AuthInput.vue";
  import SigmaVerticalIcon from "./icons/SigmaVerticalIcon.vue";
</script>

<template>
  <div class="relative -top-6 grid h-full w-full grid-cols-16 place-items-center px-32">
    <SigmaVerticalIcon class="text-shadow col-span-6 fill-sgray-200" />
    <div class="invisible h-3/5 w-[1px] bg-sgray-100"></div>
    <form class="col-span-8 flex w-full flex-col gap-7">
      <div class="text-shadow">
        <h1 class="text-4xl font-extrabold">Bienvenido de nuevo!</h1>
        <span class="text-lg text-sgray-300">Inicia sesión para continuar</span>
      </div>
      <div class="flex flex-col gap-2">
        <AuthInput type="email" />
        <AuthInput type="password" />
      </div>
      <div class="relative -top-3 flex items-center justify-start gap-7">
        <button
          type="submit"
          class="flex h-10 w-44 items-center justify-center rounded-md bg-sgray-400 text-center text-lg font-semibold text-sgray-100 shadow-[0_0_10px_rgba(0,_0,_0,_0.4)] transition-all duration-200 ease-out hover:bg-black hover:text-white hover:shadow-[0_2px_10px_rgba(0,_0,_0,_0.5)]"
        >
          Ingresar
        </button>
        <a
          href="#"
          class="text-shadow transition-all duration-200 after:block after:h-px after:w-0 after:bg-black after:drop-shadow-[0_0_5px_rgba(0,_0,_0,_0.3)] after:transition-[width] after:duration-200 after:ease-in-out hover:text-black hover:drop-shadow-[0_0_5px_rgba(0,_0,_0,_0.3)] hover:after:w-full"
          >Olvidaste tu contraseña?</a
        >
      </div>
    </form>
  </div>
</template>
