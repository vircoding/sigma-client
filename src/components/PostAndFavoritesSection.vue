<script setup>
  import { ref } from "vue";
  import { useUserStore } from "../stores/userStore.js";
  import { useLayoutStore } from "../stores/layoutStore.js";
  import SmallPostCard from "./SmallPostCard.vue";

  const userStore = useUserStore();
  const layoutStore = useLayoutStore();

  const postsActive = ref(true);
  const alertVisibility = ref(false);
  const deletePostId = ref(null);
  const startPositionY = ref(null);

  const switchEvent = (isPost) => {
    if (!layoutStore.tableSpinner) {
      if (isPost) postsActive.value = true;
      else postsActive.value = false;
    }
  };

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

  const prevPostsPageEvent = async () => {
    layoutStore.unhideSpinnerLoading();
    if (userStore.myAccountState.posts.page !== 1) {
      await userStore.getMyAccountPosts(userStore.myAccountState.posts.page - 1);
    }
    layoutStore.hideSpinnerLoading();
  };

  const nextPostsPageEvent = async () => {
    layoutStore.unhideSpinnerLoading();
    if (userStore.myAccountState.posts.page < userStore.myAccountState.posts.total_pages) {
      await userStore.getMyAccountPosts(userStore.myAccountState.posts.page + 1);
    }
    layoutStore.hideSpinnerLoading();
  };

  const prevFavoritesPageEvent = async () => {
    layoutStore.unhideSpinnerLoading();
    if (userStore.myAccountState.favorites.page !== 1) {
      await userStore.getMyAccountFavorites(userStore.myAccountState.favorites.page - 1);
    }
    layoutStore.hideSpinnerLoading();
  };

  const nextFavoritesPageEvent = async () => {
    layoutStore.unhideSpinnerLoading();
    if (userStore.myAccountState.favorites.page < userStore.myAccountState.favorites.total_pages) {
      await userStore.getMyAccountFavorites(userStore.myAccountState.favorites.page + 1);
    }
    layoutStore.hideSpinnerLoading();
  };

  const unhideAlert = (id) => {
    alertId.value = id;
    alertVisibility.value = true;
  };

  const hideAlert = () => {
    alertVisibility.value = false;
  };

  const deletePost = async () => {
    hideAlert();
    layoutStore.unhideSpinnerLoading();
    try {
      await userStore.deletePost(deletePostId.value);
      if (
        userStore.myAccountState.posts.posts.length === 1 &&
        userStore.myAccountState.posts.page > 1
      ) {
        await userStore.getMyAccountPosts(userStore.myAccountState.posts.page - 1);
      } else {
        await userStore.getMyAccountPosts(userStore.myAccountState.posts.page);
      }
      await userStore.getMyAccountFavorites(userStore.myAccountState.favorites.page);
      alertId.value = null;
      layoutStore.hideSpinnerLoading();
    } catch (error) {
      console.log(error);
      layoutStore.hideSpinnerLoading();
    }
  };

  const removeFavorite = async (id) => {
    layoutStore.unhideSpinnerLoading();
    try {
      await userStore.addToFavorites(id);
      if (
        userStore.myAccountState.favorites.favorites.length === 1 &&
        userStore.myAccountState.favorites.page
      ) {
        await userStore.getMyAccountFavorites(userStore.myAccountState.favorites.page - 1);
      } else {
        await userStore.getMyAccountFavorites(userStore.myAccountState.favorites.page);
      }
      layoutStore.hideSpinnerLoading();
    } catch (error) {
      console.log(error);
      layoutStore.hideSpinnerLoading();
    }
  };
</script>

<template>
  <section class="mb-20 w-full">
    <div class="text-shadow mb-7 flex items-center rounded-md bg-sgray-100">
      <!-- Posts Table Button -->
      <div
        class="w-1/2 rounded-md py-2 text-center tracking-wide"
        :class="postsActive ? 'bg-sgray-400 text-white' : 'bg-transparent'"
        @click.prevent="switchEvent(true)"
      >
        <h3 :class="layoutStore.tableSpinner ? 'scoped-blur' : ''">Publicaciones</h3>
      </div>

      <!-- Favorites Table Button -->
      <div
        class="w-1/2 rounded-md py-2 text-center tracking-wide"
        :class="!postsActive ? 'bg-sgray-400 text-white' : 'bg-transparent'"
        @click.prevent="switchEvent(false)"
      >
        <h3 :class="layoutStore.tableSpinner ? 'scoped-blur' : ''">Favoritos</h3>
      </div>
    </div>

    <div class="relative">
      <!-- Posts -->
      <ul
        v-if="postsActive"
        class="relative space-y-4"
        :class="layoutStore.tableSpinner ? 'scoped-blur' : ''"
      >
        <li v-for="(item, index) in userStore.myAccountState.posts.posts" :key="index">
          <RouterLink class="select-none outline-none" :to="`/post/${item.id}`">
            <SmallPostCard @delete="unhideAlert" :index="index" :favorite="false" :post="item" />
          </RouterLink>
        </li>
        <li
          v-if="userStore.myAccountState.posts.total_posts === 0"
          class="flex h-[282px] w-full flex-col items-center justify-center gap-2"
        >
          <span>Aún no tienes publicaciones</span>
          <RouterLink to="/insert" class="underline">Publica</RouterLink>
        </li>
        <div
          v-if="!(userStore.myAccountState.posts.total_posts === 0)"
          class="flex w-full items-center justify-center gap-2"
        >
          <button @click.prevent="prevPostsPageEvent" class="select-none">{{ "<" }}</button>
          <div>
            <span
              >{{ userStore.myAccountState.posts.page }} /
              {{ userStore.myAccountState.posts.total_pages }}</span
            >
          </div>
          <button @click.prevent="nextPostsPageEvent" class="select-none">{{ ">" }}</button>
        </div>
      </ul>

      <!-- Favorites -->
      <ul v-else class="relative space-y-4">
        <li v-for="(item, index) in userStore.myAccountState.favorites.favorites" :key="index">
          <!-- Deleted Post -->
          <div
            v-if="userStore.userFavoritesState[index]?.status === 'deleted'"
            class="flex h-[80px] w-full flex-col items-center justify-center rounded-md border border-sgray-100 bg-background p-6"
          >
            <span>Esta publicacion se eliminó</span>
            <img
              @click.prevent="removeFavorite(userStore.userFavoritesState[index].post_id)"
              src="../assets/close-icon.svg"
              class="h-[25px] w-[25px]"
            />
          </div>
          <RouterLink v-else :to="`/post/${item.id}`">
            <SmallPostCard @remove="removeFavorite" :index="index" :favorite="true" :post="item" />
          </RouterLink>
        </li>
        <li
          v-if="userStore.myAccountState.favorites.total_favorites === 0"
          class="flex h-[282px] w-full flex-col items-center justify-center gap-2"
        >
          <span>Aún no tienes favoritos</span>
        </li>
        <div
          v-if="!(userStore.myAccountState.favorites.total_favorites === 0)"
          class="flex w-full items-center justify-center gap-2"
        >
          <button @click.prevent="prevFavoritesPageEvent" class="select-none">{{ "<" }}</button>
          <div>
            <span
              >{{ userStore.myAccountState.favorites.page }} /
              {{ userStore.myAccountState.favorites.total_pages }}</span
            >
          </div>
          <button @click.prevent="nextFavoritesPageEvent" class="select-none">{{ ">" }}</button>
        </div>
      </ul>

      <!-- Spinner -->
      <div
        id="spinner_container"
        class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center"
        :class="layoutStore.tableSpinner ? 'block' : 'hidden'"
      >
        <div
          class="spinner h-[35px] w-[35px] rounded-full border-4 border-solid border-x-sgray-200 border-b-sgray-200 border-t-white"
        ></div>
      </div>
    </div>
  </section>

  <!-- Alert -->
  <div
    v-if="alertVisibility"
    @touchstart="startSwipe($event)"
    @touchmove="moveSwipe($event)"
    class="text-shadow fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
  >
    <div @click.prevent="hideAlert" class="overlay absolute h-full w-full"></div>
    <div
      class="border-md z-20 flex h-[215px] w-[300px] flex-col items-center justify-center gap-5 rounded-md bg-white p-5 text-center text-lg"
    >
      <span
        >¿Estás <span class="font-semibold">seguro</span> que deseas
        <span class="font-semibold">eliminar</span> esta
        <span class="font-semibold">publicación</span>?</span
      >
      <div class="flex w-full items-center justify-evenly">
        <button
          @click.prevent="deletePost"
          class="w-[115px] rounded-md bg-sgray-400 py-1 font-semibold text-white"
        >
          Eliminar
        </button>
        <button @click.prevent="hideAlert" class="w-[115px] rounded-md bg-sgray-100 py-1">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .scoped-blur {
    filter: blur(1px);
  }

  .spinner {
    animation: spin 0.75s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }

  .overlay {
    background-color: rgba(0, 0, 0, 0.45);
    filter: blur(2px);
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(360deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }
</style>
