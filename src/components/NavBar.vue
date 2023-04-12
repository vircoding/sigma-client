<script setup>
import SigmaIcon from "./icons/SigmaIcon.vue";
import { RouterLink } from "vue-router";
</script>

<template>
  <nav
    class="font-poppins font-semibold text-sgray-400 py-4 px-14 flex justify-between items-center w-full top-0"
  >
    <div>
      <SigmaIcon class="h-8 fill-sgray-400 nav-logo" />
    </div>
    <ul class="flex space-x-8 text-lg">
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
        <a href="#" class="nav-link">Iniciar sesión</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav-logo {
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.15));
  transition: all 0.2s ease-in-out;
}

.nav-logo:hover {
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.3));
}

.nav-link {
  transition: all 0.2s ease-in-out;
}

.nav-link:hover {
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.1));
}

.nav-link::after {
  content: "";
  display: block;
  height: 2px;
  width: 0;
  background-color: #333333;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));

  transition: width 0.2s ease-in-out;
}

.nav-link:hover::after {
  width: 100%;
}
</style>
