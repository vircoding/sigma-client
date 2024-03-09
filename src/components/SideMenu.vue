<script setup>
  import { RouterLink } from "vue-router";
  import { useUserStore } from "../stores/userStore.js";
  import { useLayoutStore } from "../stores/layoutStore.js";
  import { usePostStore } from "../stores/postStore.js";
  import { useRoute, useRouter } from "vue-router";
  import { computed } from "vue";

  const userStore = useUserStore();
  const layoutStore = useLayoutStore();
  const postStore = usePostStore();

  const route = useRoute();
  const router = useRouter();

  const actualPath = computed(() => {
    return route.name;
  });

  const goToFindRent = () => {
    postStore.setFindingRents();
    router.push("/find");
  };

  const menuInteraction = () => {
    layoutStore.hideSideMenu();
  };
</script>

<template>
  <nav class="z-50 flex h-screen w-3/5 flex-col items-end text-sgray-400">
    <div class="flex h-[68px] items-center p-4 lg:hidden">
      <img src="../assets/close-icon.svg" class="text-shadow w-5" @click="menuInteraction" />
    </div>
    <div class="h-[1px] w-full bg-sgray-100"></div>
    <ul class="flex flex-col items-end gap-6 pr-5 pt-10">
      <!-- Contact -->
      <li class="flex w-full items-center justify-end gap-[6px]">
        <span class="text-shadow relative font-poppins text-lg font-semibold text-sblue-500"
          >Contáctanos</span
        >
        <img src="../assets/side-menu-contact-icon.svg" class="w-6" />
      </li>

      <!-- Help -->
      <li class="flex w-full items-center justify-end gap-[6px]">
        <span class="text-shadow relative font-poppins text-lg font-semibold text-sblue-500"
          >Ayuda</span
        >
        <img src="../assets/side-menu-help-icon.svg" class="w-6" />
      </li>

      <!-- Register -->
      <li class="flex w-full items-center justify-end gap-[6px]">
        <span class="text-shadow relative font-poppins text-lg font-semibold text-sblue-500"
          >Registrarse</span
        >
        <img src="../assets/side-menu-register-icon.svg" class="w-6" />
      </li>

      <!-- Login -->
      <li class="flex w-full items-center justify-end gap-[6px]">
        <span class="text-shadow relative font-poppins text-lg font-semibold text-sblue-500"
          >Iniciar Sesión</span
        >
        <img src="../assets/side-menu-login-icon.svg" class="w-6" />
      </li>

      <!-- Home -->
      <li class="flex w-full items-center gap-[6px]">
        <RouterLink
          to="/home"
          class="text-shadow relative top-[2px] font-poppins text-lg font-semibold text-sblue-500"
          >Página Principal</RouterLink
        >
        <img src="../assets/side-menu-home-icon.svg" class="w-6" />
      </li>

      <!-- <li v-if="userStore.isLoggedIn">
        <RouterLink to="/find" class="text-shadow font-poppins text-lg">Compra</RouterLink>
      </li>
      <li v-if="userStore.isLoggedIn">
        <span @click.prevent="goToFindRent" class="text-shadow font-poppins text-lg">Renta</span>
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
      </li> -->
    </ul>
  </nav>
</template>
