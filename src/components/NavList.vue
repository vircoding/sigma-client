<script setup>
  import { RouterLink } from "vue-router";
  import { useUserStore } from "../stores/userStore.js";
  import { usePostStore } from "../stores/postStore.js";
  import { useLayoutStore } from "../stores/layoutStore.js";
  import { useRouter, useRoute } from "vue-router";
  import { computed } from "vue";

  const userStore = useUserStore();
  const layoutStore = useLayoutStore();
  const postStore = usePostStore();
  const router = useRouter();
  const route = useRoute();

  const goToFindRent = () => {
    postStore.setFindingRents();
    console.log("here");
    // router.push("/find");
  };

  const actualPath = computed(() => {
    return route.name;
  });

  const menuInteraction = () => {
    layoutStore.unhideSideMenu();
  };
</script>

<template>
  <ul v-if="!userStore.isLoggedIn" class="hidden space-x-8 text-sm lg:flex lg:text-lg">
    <li>
      <RouterLink to="/support/help" class="nav-link text-shadow">Ayuda</RouterLink>
    </li>
    <li>
      <RouterLink to="/support/contact" class="nav-link text-shadow">Contáctanos</RouterLink>
    </li>
  </ul>
  <ul v-if="!userStore.isLoggedIn" class="hidden items-center space-x-2 text-sm lg:flex lg:text-lg">
    <li>
      <RouterLink
        v-if="
          actualPath !== 'register-client' &&
          actualPath !== 'register-agent' &&
          actualPath !== 'login'
        "
        to="/auth/register/client"
        class="nav-cta text-shadow bg-transparent hover:bg-transparent hover:text-black hover:shadow-[0_2px_10px_rgba(0,_0,_0,_0.2)]"
      >
        Registrarse
      </RouterLink>
    </li>
    <li>
      <RouterLink
        v-if="actualPath === 'login'"
        to="/auth/register/client"
        class="nav-cta bg-sgray-400 text-sgray-100 shadow-[0_0_10px_rgba(0,_0,_0,_0.4)] hover:bg-black hover:text-white hover:shadow-[0_2px_10px_rgba(0,_0,_0,_0.5)]"
      >
        Registrarse
      </RouterLink>
    </li>
    <li>
      <RouterLink
        v-if="actualPath !== 'login'"
        to="/auth/login"
        class="nav-cta bg-sgray-400 text-sgray-100 shadow-[0_0_10px_rgba(0,_0,_0,_0.4)] hover:bg-black hover:text-white hover:shadow-[0_2px_10px_rgba(0,_0,_0,_0.5)]"
      >
        Ingresar
      </RouterLink>
    </li>
  </ul>
  <ul v-if="userStore.isLoggedIn" class="hidden space-x-8 text-sm lg:flex lg:text-lg">
    <li>
      <RouterLink to="/find" class="nav-link text-shadow">Compra</RouterLink>
    </li>
    <li>
      <span @click.prevent="goToFindRent" class="nav-link text-shadow">Renta</span>
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
  <img src="../assets/menu-icon.svg" class="text-shadow w-5 lg:hidden" @click="menuInteraction" />
</template>
