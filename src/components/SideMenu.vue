<script setup>
  import { RouterLink } from "vue-router";
  import { useUserStore } from "../stores/user.js";
  import { useRoute } from "vue-router";
  import { computed } from "vue";

  const userStore = useUserStore();
  const route = useRoute();

  const actualPath = computed(() => {
    return route.name;
  });
</script>

<template>
  <nav class="h-screen w-1/2 pt-[68px]">
    <div class="h-[1px] w-full bg-sgray-100"></div>
    <ul class="flex flex-col items-end gap-3 p-4 pr-6">
      <li v-if="userStore.isLoggedIn">
        <RouterLink to="/find" class="text-shadow">Compra</RouterLink>
      </li>
      <li v-if="userStore.isLoggedIn">
        <RouterLink to="/find" class="text-shadow">Renta</RouterLink>
      </li>
      <li v-if="userStore.isLoggedIn">
        <RouterLink to="/insert" class="text-shadow">Vende</RouterLink>
      </li>
      <li>
        <RouterLink to="/support/help" class="text-shadow">Ayuda</RouterLink>
      </li>
      <li v-if="!userStore.isLoggedIn">
        <RouterLink to="/support/contact" class="text-shadow">Contáctanos</RouterLink>
      </li>
      <li v-if="!userStore.isLoggedIn">
        <RouterLink to="/auth/register/client" class="text-shadow">Registrarse</RouterLink>
      </li>
      <li v-if="!userStore.isLoggedIn">
        <RouterLink to="/auth/login" class="text-shadow font-bold">Ingresar</RouterLink>
      </li>
      <li v-if="userStore.isLoggedIn">
        <RouterLink to="/account" class="text-shadow font-bold">Mi Cuenta</RouterLink>
      </li>
    </ul>
  </nav>
</template>
