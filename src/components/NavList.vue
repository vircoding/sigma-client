<script setup>
  import { RouterLink } from "vue-router";
  import { useUserStore } from "../stores/user.js";

  const userStore = useUserStore();
</script>

<template>
  <ul v-if="!userStore.isLoggedIn" class="flex space-x-8 text-lg">
    <li>
      <RouterLink to="/support/help" class="nav-link text-shadow">Ayuda</RouterLink>
    </li>
    <li>
      <RouterLink to="/support/contact" class="nav-link text-shadow">Contáctanos</RouterLink>
    </li>
  </ul>
  <ul v-if="!userStore.isLoggedIn" class="flex items-center space-x-2 text-lg">
    <li>
      <RouterLink
        to="/auth/register"
        class="nav-cta text-shadow bg-transparent hover:bg-transparent hover:text-black hover:shadow-[0_2px_10px_rgba(0,_0,_0,_0.2)]"
      >
        Registrarse
      </RouterLink>
    </li>
    <li>
      <RouterLink
        to="/auth/login"
        class="nav-cta bg-sgray-400 text-sgray-100 shadow-[0_0_10px_rgba(0,_0,_0,_0.4)] hover:bg-black hover:text-white hover:shadow-[0_2px_10px_rgba(0,_0,_0,_0.5)]"
      >
        Ingresar
      </RouterLink>
    </li>
  </ul>
  <ul v-if="userStore.isLoggedIn" class="flex space-x-8 text-lg">
    <li>
      <RouterLink to="/find" class="nav-link text-shadow">Compra</RouterLink>
    </li>
    <li>
      <RouterLink to="/find" class="nav-link text-shadow">Renta</RouterLink>
    </li>
    <li>
      <RouterLink to="/insert" class="nav-link text-shadow">Vende</RouterLink>
    </li>
    <li>
      <RouterLink to="/support/help" class="nav-link text-shadow">Ayuda</RouterLink>
    </li>
    <li>
      <RouterLink to="/account" class="nav-link text-shadow">Mi Cuenta</RouterLink>
    </li>
  </ul>
</template>
