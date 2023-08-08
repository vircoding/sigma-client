<script setup>
  import { RouterLink } from "vue-router";
  import { useUserStore } from "../stores/user.js";
  import { useRoute } from "vue-router";
  import { computed } from "vue";
  import { useLayoutStore } from "../stores/layout";

  const userStore = useUserStore();
  const layoutStore = useLayoutStore();

  const route = useRoute();

  const actualPath = computed(() => {
    return route.name;
  });

  const menuInteraction = () => {
    layoutStore.hideSideMenu();
  };
</script>

<template>
  <nav class="z-50 flex h-screen w-1/2 flex-col items-end text-sgray-400">
    <img
      src="../assets/close-icon.svg"
      class="text-shadow relative right-4 w-9 py-4 lg:hidden"
      @click="menuInteraction"
    />
    <div class="h-[1px] w-full bg-sgray-100"></div>
    <ul class="flex flex-col items-end gap-6 pr-6 pt-10">
      <li v-if="userStore.isLoggedIn">
        <RouterLink to="/find" class="text-shadow font-poppins text-lg">Compra</RouterLink>
      </li>
      <li v-if="userStore.isLoggedIn">
        <RouterLink to="/find" class="text-shadow font-poppins text-lg">Renta</RouterLink>
      </li>
      <li v-if="userStore.isLoggedIn">
        <RouterLink to="/insert" class="text-shadow font-poppins text-lg">Vende</RouterLink>
      </li>
      <li>
        <RouterLink to="/support/help" class="text-shadow font-poppins text-lg">Ayuda</RouterLink>
      </li>
      <li v-if="!userStore.isLoggedIn">
        <RouterLink to="/support/contact" class="text-shadow font-poppins text-lg"
          >Contáctanos</RouterLink
        >
      </li>
      <li v-if="!userStore.isLoggedIn">
        <RouterLink to="/auth/register/client" class="text-shadow font-poppins text-lg"
          >Registrarse</RouterLink
        >
      </li>
      <li v-if="!userStore.isLoggedIn">
        <RouterLink to="/auth/login" class="text-shadow font-poppins text-lg font-bold"
          >Ingresar</RouterLink
        >
      </li>
      <li v-if="userStore.isLoggedIn">
        <RouterLink to="/account" class="text-shadow font-poppins text-lg font-bold"
          >Mi Cuenta</RouterLink
        >
      </li>
    </ul>
  </nav>
</template>
