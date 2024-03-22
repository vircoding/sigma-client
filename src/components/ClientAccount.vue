<script setup>
  import { useLayoutStore } from "../stores/layoutStore.js";
  import { useUserStore } from "../stores/userStore.js";
  import PostAndFavoritesSection from "./PostAndFavoritesSection.vue";
  import router from "../router";

  const layoutStore = useLayoutStore();
  const userStore = useUserStore();

  const logout = async () => {
    layoutStore.unhideLogoLoading();
    try {
      await userStore.logout();

      await router.push("/");

      layoutStore.hideLogoLoading();
    } catch (error) {
      console.log(error);
      layoutStore.hideLogoLoading();
    }
  };
</script>

<template>
  <div class="flex h-full w-full flex-col items-center">
    <!-- Hero -->
    <div class="flex w-full flex-col gap-2 pt-10 text-center">
      <h2 class="text-shadow w-full font-ubuntu text-3xl font-bold text-sblue-500">
        ¿Quieres publicar más anuncios?
      </h2>
      <p class="text-shadow w-full text-sm text-sgray-300">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam inventore voluptatibus
        corporis distinctio impedit veritatis?<span class="font-bold text-sblue-500"
          >nuestros términos</span
        >
      </p>
    </div>

    <div class="flex w-full items-center justify-center gap-2 px-5 pb-10 pt-5">
      <button @click.prevent="logout" class="h-[40px] w-[50%] rounded-lg bg-sblue-500 text-white">
        Cerrar Sesion
      </button>
      <button class="h-[40px] w-[50%] rounded-lg bg-sigma text-white">Agente</button>
    </div>

    <!-- Horizontal Line -->
    <div class="w-full border-b border-sgray-100"></div>

    <!-- Post/Favorites Section -->
    <PostAndFavoritesSection role="client" />
  </div>
</template>
