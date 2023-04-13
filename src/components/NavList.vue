<script setup>
  import { RouterLink } from "vue-router";
  import { useUserStore } from "../stores/user.js";

  const userStore = useUserStore();
</script>

<template>
  <ul v-if="!userStore.logedState" class="flex space-x-8 text-lg">
    <li>
      <a href="#" class="nav-link">Ayuda</a>
    </li>
    <li>
      <a href="#" class="nav-link">Contáctanos</a>
    </li>
  </ul>
  <ul v-if="!userStore.logedState" class="flex items-center space-x-2 text-lg">
    <li>
      <a
        href="#"
        class="nav-cta bg-transparent text-sgray-400 hover:bg-transparent hover:text-black hover:shadow-[0_2px_10px_rgba(0,_0,_0,_0.2)]"
        >Registrarse</a
      >
    </li>
    <li>
      <a
        href="#"
        class="nav-cta bg-sgray-400 text-sgray-100 shadow-[0_0_10px_rgba(0,_0,_0,_0.4)] hover:bg-black hover:text-white hover:shadow-[0_2px_10px_rgba(0,_0,_0,_0.5)]"
        >Ingresar</a
      >
    </li>
  </ul>
  <ul v-if="userStore.logedState" class="flex space-x-8 text-lg">
    <li>
      <RouterLink to="/buy" class="nav-link">Compra</RouterLink>
    </li>
    <li>
      <RouterLink to="/rent" class="nav-link">Renta</RouterLink>
    </li>
    <li>
      <a href="#" class="nav-link">Vende</a>
    </li>
    <li>
      <a href="#" class="nav-link">Ayuda</a>
    </li>
    <li>
      <a href="#" class="nav-link">Mi Cuenta</a>
    </li>
  </ul>
</template>
