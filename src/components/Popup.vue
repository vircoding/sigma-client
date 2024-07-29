<script setup>
  import { ref } from 'vue';
  import { useUserStore } from '../stores/userStore.js';
  import { useLayoutStore } from '../stores/layoutStore.js';

  const userStore = useUserStore();
  const layoutStore = useLayoutStore();

  const startPositionY = ref(null);

  const startSwipe = (event) => {
    startPositionY.value = event.touches[0].clientY;
  };

  const moveSwipe = (event) => {
    const movePosY = event.touches[0].clientY;
    const diffY = Math.abs(movePosY - startPositionY.value);

    if (diffY > 0) {
      if (event.cancelable) {
        event.preventDefault();
      }
    }
  };

  const cancel = () => {
    layoutStore.hidePopup();
  };

  const deletePost = async () => {
    layoutStore.hidePopup();
    layoutStore.unhideSpinnerLoading();
    try {
      await userStore.deletePost(layoutStore.deletePostId);
      await userStore.getFavorites();
      if (
        userStore.myAccountState.posts.posts.length === 1 &&
        userStore.myAccountState.posts.page > 1
      ) {
        await userStore.getMyAccountPosts(userStore.myAccountState.posts.page - 1);
      } else {
        await userStore.getMyAccountPosts(userStore.myAccountState.posts.page);
      }
      await userStore.getMyAccountFavorites(userStore.myAccountState.favorites.page);
      layoutStore.resetDeletePostId();
      layoutStore.hideSpinnerLoading();
    } catch (error) {
      console.log(error);
      layoutStore.hideSpinnerLoading();
    }
  };
</script>

<template>
  <!-- Pre Insert -->
  <div
    v-if="layoutStore.popup.preInsert"
    @touchstart="startSwipe($event)"
    @touchmove="moveSwipe($event)"
    :class="layoutStore.isPopup ? 'inline-block' : 'hidden'"
    class="text-shadow fixed left-[50vw] top-[50vh] z-50 flex w-[85vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-5 rounded-md bg-white px-5 py-10 text-center"
  >
    <h4 class="text-2xl font-semibold">¿Necesitas ayuda para publicar?</h4>
    <p class="mb-2">
      Puedes <span class="font font-semibold">publicar</span> tu anuncio por ti mismo pero si
      necesitas de un <span class="font font-semibold">agente</span> contáctanos a nuestro
      <span class="font font-semibold">WhatsApp</span>
    </p>
    <!-- Buttons -->
    <div class="flex w-full items-center justify-evenly">
      <a
        href="https://wa.me/+5350009047"
        class="flex min-w-[120px] items-center justify-center gap-1 rounded-md bg-sigma px-1 py-[5px] font-semibold text-white"
      >
        <img src="../assets/whatsapp-icon.svg" />
        <span>AGENTE</span>
      </a>
      <button @click.prevent="cancel" class="min-w-[120px] rounded-md bg-sgray-100 px-1 py-[5px]">
        PUBLICAR
      </button>
    </div>
  </div>

  <!-- Delete Post -->
  <div
    v-if="layoutStore.popup.deletePost"
    @touchstart="startSwipe($event)"
    @touchmove="moveSwipe($event)"
    :class="layoutStore.isPopup ? 'inline-block' : 'hidden'"
    class="text-shadow fixed left-[50vw] top-[50vh] z-50 flex w-[85vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-5 rounded-md bg-white px-5 py-10 text-center"
  >
    <h4 class="text-2xl font-semibold">Eliminar publicación</h4>

    <p class="mb-2">
      ¿Estás seguro de que deseas <span class="font font-semibold">eliminar</span> esta
      <span class="font font-semibold">publicación</span>? Esta acción
      <span class="font font-semibold">no</span> se puede
      <span class="font font-semibold">deshacer</span>
    </p>
    <!-- Buttons -->
    <div class="flex w-full items-center justify-evenly">
      <button
        @click.prevent="deletePost"
        class="flex min-w-[120px] items-center justify-center gap-1 rounded-md bg-sblue-500 px-1 py-[5px] font-semibold text-white"
      >
        <span>CONFIRMAR</span>
      </button>
      <button @click.prevent="cancel" class="min-w-[120px] rounded-md bg-sgray-100 px-1 py-[5px]">
        CANCELAR
      </button>
    </div>
  </div>

  <!-- Invalid Credentials -->
  <div
    v-if="layoutStore.popup.invalidCredentials"
    @touchstart="startSwipe($event)"
    @touchmove="moveSwipe($event)"
    :class="layoutStore.isPopup ? 'inline-block' : 'hidden'"
    class="text-shadow fixed left-[50vw] top-[50vh] z-50 flex w-[85vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-md bg-white px-5 py-6"
  >
    <h4 class="mb-1 w-full text-2xl font-semibold text-alert">Credenciales Incorrectas</h4>

    <p class="mb-2 leading-tight text-sgray-300">
      El correo electrónico o la contraseña son incorrectos
    </p>

    <button
      @click.prevent="cancel"
      class="mr-3 place-self-end rounded-lg border border-alert bg-alert px-3 py-1 font-semibold text-white"
    >
      Aceptar
    </button>
  </div>

  <!-- Bad Request -->
  <div
    v-if="layoutStore.popup.badRequest"
    @touchstart="startSwipe($event)"
    @touchmove="moveSwipe($event)"
    :class="layoutStore.isPopup ? 'inline-block' : 'hidden'"
    class="text-shadow fixed left-[50vw] top-[50vh] z-50 flex w-[85vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-md bg-white px-5 py-6"
  >
    <h4 class="mb-1 w-full text-2xl font-semibold text-alert">Datos Incorrectos</h4>

    <p class="mb-2 leading-tight text-sgray-300">
      Se detectaron errores en los datos que proporcionaste, por favor, revísalos antes de
      reenviarlos
    </p>

    <button
      @click.prevent="cancel"
      class="mr-3 place-self-end rounded-lg border border-alert bg-alert px-3 py-1 font-semibold text-white"
    >
      Aceptar
    </button>
  </div>

  <!-- User Already Exists -->
  <div
    v-if="layoutStore.popup.userExists"
    @touchstart="startSwipe($event)"
    @touchmove="moveSwipe($event)"
    :class="layoutStore.isPopup ? 'inline-block' : 'hidden'"
    class="text-shadow fixed left-[50vw] top-[50vh] z-50 flex w-[85vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-md bg-white px-5 py-6"
  >
    <h4 class="mb-1 w-full text-2xl font-semibold text-alert">Este usuario ya existe</h4>

    <p class="mb-2 leading-tight text-sgray-300">
      Intentas registrarte con una dirección de correo ya registrada
    </p>

    <button
      @click.prevent="cancel"
      class="mr-3 place-self-end rounded-lg border border-alert bg-alert px-3 py-1 font-semibold text-white"
    >
      Aceptar
    </button>
  </div>

  <!-- Server Error -->
  <div
    v-if="layoutStore.popup.serverError"
    @touchstart="startSwipe($event)"
    @touchmove="moveSwipe($event)"
    :class="layoutStore.isPopup ? 'inline-block' : 'hidden'"
    class="text-shadow fixed left-[50vw] top-[50vh] z-50 flex w-[85vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-md bg-white px-5 py-6"
  >
    <h4 class="mb-1 w-full text-2xl font-semibold text-alert">Error de servidor</h4>

    <p class="mb-2 leading-tight text-sgray-300">
      Estamos afrontando problemas en nuestros servidores, por favor, pruebe más tarde
    </p>

    <button
      @click.prevent="cancel"
      class="mr-3 place-self-end rounded-lg border border-alert bg-alert px-3 py-1 font-semibold text-white"
    >
      Aceptar
    </button>
  </div>
</template>
