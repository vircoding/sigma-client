<script setup>
import SigmaIcon from "./icons/SigmaIcon.vue";
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

  <ul v-if="!userStore.logedState" class="flex items-center text-lg space-x-2">
    <li>
      <a
        href="#"
        class="first-button flex items-center justify-center h-8 px-5 bg-transparent text-sgray-400 hover:bg-transparent hover:text-black rounded text-center"
        >Ingresar</a
      >
    </li>
    <li>
      <a
        href="#"
        class="second-button flex items-center justify-center h-8 px-5 bg-sgray-400 text-sgray-100 hover:bg-black hover:text-white rounded text-center"
        >Registrarse</a
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

<style scoped>
.nav-link {
  position: relative;
  top: 4px;
  transition: filter 0.2s ease-in-out, color 0.2s ease-out;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.1));
}

.nav-link:hover {
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.3));
  color: #000000;
}

.nav-link::after {
  content: "";
  display: block;
  height: 2px;
  width: 0;
  background-color: #000000;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.3));
  transition: width 0.2s ease-in-out;
}

.nav-link:hover::after {
  width: 100%;
}

.first-button {
  position: relative;
  top: 4px;
  transition: filter 0.2s ease-in-out, color 0.2s ease-out, background-color 0.2s ease-out,
    box-shadow 0.2s ease-in-out;
}

.first-button:hover {
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.1));
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.second-button {
  position: relative;
  top: 4px;
  transition: filter 0.2s ease-in-out, color 0.2s ease-out, background-color 0.2s ease-out,
    box-shadow 0.2s ease-in-out;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
}

.second-button:hover {
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.1));
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}
</style>
