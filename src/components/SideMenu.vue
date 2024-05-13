<script setup>
  import { RouterLink } from "vue-router";
  import { useUserStore } from "../stores/userStore.js";
  import { useLayoutStore } from "../stores/layoutStore.js";
  import { usePostStore } from "../stores/postStore.js";
  import { useRouter, useRoute } from "vue-router";

  const userStore = useUserStore();
  const layoutStore = useLayoutStore();
  const postStore = usePostStore();
  const router = useRouter();
  const route = useRoute();

  const menuInteraction = () => {
    layoutStore.hideSideMenu();
  };

  const goInsert = async (type) => {
    postStore.setInsertType(type);
    if (route.name === "insert") {
      postStore.setPendingRefreshInsertType();
    }
    router.push("/insert");
    layoutStore.hideSideMenu();
  };

  const goFind = async (type) => {
    // postStore.setFilterType(type);
    layoutStore.hideSideMenu();
    layoutStore.unhideSpinnerLoading();
    try {
      if (type === "rent") {
        await postStore.findPosts(
          "rent",
          1,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined
        );
      } else if (type === "exchange") {
        await postStore.findPosts(
          "exchange",
          1,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined
        );
      } else {
        await postStore.findPosts(
          "sale",
          1,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined
        );
      }
    } catch (error) {
      console.log(error);

      // Prevent Reset
      postStore.resetFilterOptions();
      postStore.resetFindedPosts();

      layoutStore.hideSpinnerLoading();
    }

    if (route.name === "find") postStore.setPendingRefreshFilter();
    else router.push("/find");
    layoutStore.hideSpinnerLoading();
  };
</script>

<template>
  <nav class="z-50 flex h-screen w-3/5 flex-col items-end text-sgray-400">
    <!-- Close Icon -->
    <div class="flex h-[68px] items-center p-4 lg:hidden">
      <img src="../assets/close-icon.svg" class="text-shadow w-5" @click="menuInteraction" />
    </div>

    <!-- Horizontal Line -->
    <div class="h-[1px] w-full bg-sgray-100"></div>

    <!-- Links -->
    <ul class="flex flex-col items-end overflow-y-scroll pr-5 pt-10">
      <!-- Home -->
      <li class="mb-4 flex w-full flex-col items-end justify-center">
        <RouterLink
          to="/"
          @click="menuInteraction"
          class="mb-2 flex w-full items-center justify-end gap-[6px]"
        >
          <span class="text-shadow relative font-poppins text-lg font-semibold text-sblue-500"
            >Página Principal</span
          >
          <img src="../assets/side-menu-home-icon.svg" class="w-6" />
        </RouterLink>
      </li>

      <!-- Help -->
      <li class="mb-4 flex w-full flex-col items-end justify-center">
        <RouterLink
          to="/support/help"
          @click="menuInteraction"
          class="mb-2 flex w-full items-center justify-end gap-[6px]"
        >
          <span class="text-shadow relative font-poppins text-lg font-semibold text-sblue-500"
            >Ayuda</span
          >
          <img src="../assets/side-menu-help-icon.svg" class="w-6" />
        </RouterLink>
        <RouterLink
          to="/support/help#videotut"
          @click="menuInteraction"
          class="w-full text-right text-sblue-500"
          >¿Cómo funciona el sitio?</RouterLink
        >
        <RouterLink
          to="/support/help#faq"
          @click="menuInteraction"
          class="w-full text-right text-sblue-500"
          >Preguntas Frecuentes</RouterLink
        >
      </li>

      <!-- Find -->
      <li class="mb-4 flex w-full flex-col items-end justify-center">
        <button
          @click.prevent="goFind('sale')"
          class="mb-2 flex w-full items-center justify-end gap-[6px]"
        >
          <span class="text-shadow relative font-poppins text-lg font-semibold text-sblue-500"
            >Descubre</span
          >
          <img src="../assets/side-menu-filter-icon.svg" class="w-6" />
        </button>
        <button @click.prevent="goFind('sale')" class="w-full text-right text-sblue-500">
          Ventas
        </button>
        <button @click.prevent="goFind('rent')" class="w-full text-right text-sblue-500">
          Rentas
        </button>
        <button @click.prevent="goFind('exchange')" class="w-full text-right text-sblue-500">
          Permutas
        </button>
      </li>

      <!-- Register -->
      <li v-if="!userStore.isLoggedIn" class="mb-4 flex w-full flex-col items-end justify-center">
        <RouterLink
          to="/auth/register/client"
          @click="menuInteraction"
          class="mb-2 flex w-full items-center justify-end gap-[6px]"
        >
          <span class="text-shadow relative font-poppins text-lg font-semibold text-sblue-500"
            >Registrarse</span
          >
          <img src="../assets/side-menu-register-icon.svg" class="w-6" />
        </RouterLink>
        <RouterLink
          to="/auth/register/client"
          @click="menuInteraction"
          class="w-full text-right text-sblue-500"
          >Propietario</RouterLink
        >
        <RouterLink
          to="/auth/register/agent"
          @click="menuInteraction"
          class="w-full text-right text-sblue-500"
          >Agente</RouterLink
        >
      </li>

      <!-- Login -->
      <li v-if="!userStore.isLoggedIn" class="mb-4 flex w-full flex-col items-end justify-center">
        <RouterLink
          to="/auth/login"
          @click="menuInteraction"
          class="mb-2 flex w-full items-center justify-end gap-[6px]"
        >
          <span class="text-shadow relative font-poppins text-lg font-semibold text-sblue-500"
            >Iniciar Sesión</span
          >
          <img src="../assets/side-menu-login-icon.svg" class="w-6" />
        </RouterLink>
      </li>

      <!-- Insert -->
      <li v-if="userStore.isLoggedIn" class="mb-4 flex w-full flex-col items-end justify-center">
        <button
          @click.prevent="goInsert('sale')"
          class="mb-2 flex w-full items-center justify-end gap-[6px]"
        >
          <span class="text-shadow relative font-poppins text-lg font-semibold text-sblue-500"
            >Publica</span
          >
          <img src="../assets/side-menu-insert-icon.svg" class="w-6" />
        </button>
        <button @click.prevent="goInsert('sale')" class="w-full text-right text-sblue-500">
          Vende
        </button>
        <button @click.prevent="goInsert('rent')" class="w-full text-right text-sblue-500">
          Renta
        </button>
        <button @click.prevent="goInsert('exchange')" class="w-full text-right text-sblue-500">
          Permuta
        </button>
      </li>

      <!-- Account -->
      <li v-if="userStore.isLoggedIn" class="mb-4 flex w-full flex-col items-end justify-center">
        <RouterLink
          to="/account"
          @click="menuInteraction"
          class="mb-2 flex w-full items-center justify-end gap-[6px]"
        >
          <span class="text-shadow relative font-poppins text-lg font-semibold text-sblue-500"
            >Mi cuenta</span
          >
          <img src="../assets/side-menu-account-icon.svg" class="w-6" />
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
