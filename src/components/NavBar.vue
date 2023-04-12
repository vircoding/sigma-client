<script setup>
import SigmaIcon from "./icons/SigmaIcon.vue";
import NavList from "./NavList.vue";
import { RouterLink } from "vue-router";
</script>

<template>
  <nav
    class="font-poppins font-semibold text-sgray-400 py-4 px-14 flex justify-between items-center w-full top-0 z-10"
  >
    <RouterLink to="/">
      <SigmaIcon class="h-9 fill-sgray-400 hover:fill-black nav-logo" />
    </RouterLink>
    <NavList />
  </nav>
</template>

<style scoped>
.nav-logo {
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.15));
  transition: filter 0.2s ease-out, fill 0.2s ease-out;
}

.nav-logo:hover {
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.5));
}
</style>
