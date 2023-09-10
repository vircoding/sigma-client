<script setup>
  import { computed, ref, watch } from "vue";
  import { useUserStore } from "../stores/user.js";
  import { usePostStore } from "../stores/post";
  import { useLayoutStore } from "../stores/layout";
  import SigmaIsotypeIcon from "./icons/SigmaIsotypeIcon.vue";
  import SmallPostCard from "./SmallPostCard.vue";

  const userStore = useUserStore();
  const postStore = usePostStore();
  const layoutStore = useLayoutStore();

  const myPostsController = ref(true);
  const updateFavoritesController = ref(true);

  const favoritesList = computed(() => {
    return userStore.userState.favorites;
  });

  watch(favoritesList, async () => {
    if (updateFavoritesController.value) await userStore.loadUserFavorites();
  });

  const newUser = ref({
    username: userStore.userState.info.username,
  });

  const usernameError = computed(() => {
    if (!(newUser.value.username.length >= 3 && newUser.value.username.length <= 20)) return true;
    return false;
  });

  const disableSubmit = computed(() => {
    if (usernameError.value) {
      return true;
    }
    if (newUser.value.username === userStore.userState.info.username) return true;
    return false;
  });

  const logoutEvent = async () => {
    try {
      updateFavoritesController.value = false;
      await userStore.logoutUser();
      updateFavoritesController.value = true;
    } catch (error) {
      console.log(error);
    }
  };

  const $reset = () => {
    newUser.value = {
      username: userStore.userState.info.username,
    };
  };

  const formSubmit = async () => {
    try {
      await userStore.updateClient(newUser.value);
    } catch (error) {
      console.log(error);
    }
  };

  const myPostEvent = () => {
    if (!layoutStore.tableSpinnerVisibility) myPostsController.value = true;
  };

  const favoritesEvent = async () => {
    if (!layoutStore.tableSpinnerVisibility) myPostsController.value = false;
  };

  const prevPostsPageEvent = async () => {
    if (userStore.userAccountState.posts.page !== 1) {
      await userStore.loadUserPosts(userStore.userAccountState.posts.page - 1);
    }
  };

  const nextPostsPageEvent = async () => {
    if (userStore.userAccountState.posts.page < userStore.userAccountState.posts.total_pages) {
      await userStore.loadUserPosts(userStore.userAccountState.posts.page + 1);
    }
  };

  const prevFavoritesPageEvent = async () => {
    if (userStore.userAccountState.favorites.page !== 1) {
      await userStore.loadUserFavorites(userStore.userAccountState.favorites.page - 1);
    }
  };

  const nextFavoritesPageEvent = async () => {
    if (
      userStore.userAccountState.favorites.page < userStore.userAccountState.favorites.total_pages
    ) {
      await userStore.loadUserFavorites(userStore.userAccountState.favorites.page + 1);
    }
  };

  const removeFavorite = async (index) => {
    try {
      layoutStore.unhideTableSpinner();
      await postStore.removeFavorite(userStore.userAccountState.favorites.favorites[index]._id);
      if (
        userStore.userAccountState.favorites.favorites.length === 1 &&
        userStore.userAccountState.favorites.page > 1
      ) {
        await userStore.loadUserFavorites(userStore.userAccountState.favorites.page - 1);
      } else {
        await userStore.loadUserFavorites(userStore.userAccountState.favorites.page);
      }
      layoutStore.hideTableSpinner();
    } catch (error) {
      console.log(error);
    }
  };
</script>

<template>
  <div
    class="flex h-full w-full flex-col items-center max-[1023px]:px-[10%] max-[499px]:px-[5%] lg:items-start lg:justify-center lg:gap-7 lg:px-24 xl:px-32 2xl:px-44"
  >
    <div class="text-shadow col-span-6">
      <SigmaIsotypeIcon class="h-[100px] w-[320px] fill-sgray-200 lg:hidden" />
    </div>
    <form
      @submit.prevent="formSubmit"
      novalidate
      class="mb-7 flex w-full grid-cols-2 grid-rows-6 flex-col lg:mb-0 lg:grid lg:gap-x-8 lg:gap-y-2"
    >
      <!-- Username -->
      <div class="mb-1 w-full">
        <input
          type="text"
          v-model.trim="newUser.username"
          class="w-full rounded-md border border-sgray-100 bg-transparent px-4 py-2 font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:text-lg"
          :class="
            usernameError
              ? 'border-transparent ring-2 ring-alert hover:border-transparent focus:border-transparent focus:ring-2'
              : 'ring-sigma'
          "
          placeholder="Nombre de Usuario"
        />
        <span
          class="text-shadow top-1 px-4 font-archivo text-sm italic text-alert"
          :class="usernameError ? 'visible' : 'invisible'"
          >Error Message</span
        >
      </div>
      <div class="flex grow flex-row gap-3">
        <button
          class="flex h-[38px] w-full items-center justify-center rounded-md border border-sgray-400 bg-sgray-400 text-center font-semibold text-sgray-100 shadow-[0_0_10px_rgba(0,_0,_0,_0.4)] transition-all duration-200 ease-out hover:bg-black hover:text-white hover:shadow-[0_2px_10px_rgba(0,_0,_0,_0.5)] disabled:border disabled:border-sgray-100 disabled:bg-transparent disabled:font-normal disabled:text-sgray-200 disabled:shadow-[0_0_10px_rgba(0,_0,_0,_0)] lg:h-10 lg:w-44 lg:text-lg"
          @click.prevent="logoutEvent"
        >
          Cerrar Sesión
        </button>
        <button
          type="submit"
          :disabled="disableSubmit"
          class="flex h-[38px] w-full items-center justify-center rounded-md border border-sgray-400 bg-sgray-400 text-center font-semibold text-sgray-100 shadow-[0_0_10px_rgba(0,_0,_0,_0.4)] transition-all duration-200 ease-out hover:bg-black hover:text-white hover:shadow-[0_2px_10px_rgba(0,_0,_0,_0.5)] disabled:border disabled:border-sgray-100 disabled:bg-transparent disabled:font-normal disabled:text-sgray-200 disabled:shadow-[0_0_10px_rgba(0,_0,_0,_0)] lg:h-10 lg:w-44 lg:text-lg"
        >
          Guardar
        </button>
      </div>
    </form>

    <!-- Posts / Favorites -->
    <section class="mb-20 w-full">
      <div class="text-shadow mb-7 flex items-center rounded-md bg-sgray-100">
        <!-- Post Title -->
        <div
          class="w-1/2 rounded-md py-2 text-center tracking-wide"
          :class="myPostsController ? 'bg-sigma font-semibold text-white' : 'bg-transparent'"
          @click.prevent="myPostEvent"
        >
          <h3 :class="layoutStore.tableSpinnerVisibility ? 'scoped-blur' : ''">Publicaciones</h3>
        </div>
        <!-- Favorites Title -->
        <div
          class="w-1/2 rounded-md py-2 text-center tracking-wide"
          :class="!myPostsController ? 'bg-sigma font-semibold text-white' : 'bg-transparent'"
          @click.prevent="favoritesEvent"
        >
          <h3 :class="layoutStore.tableSpinnerVisibility ? 'scoped-blur' : ''">Favoritos</h3>
        </div>
      </div>
      <!-- Posts -->
      <ul
        v-if="myPostsController"
        class="space-y-4"
        :class="layoutStore.tableSpinnerVisibility ? 'scoped-blur' : ''"
      >
        <li v-for="(item, index) in userStore.userAccountState.posts.posts" :key="index">
          <RouterLink :to="`/post/${item._id}`">
            <!-- <PostTableItem :type="'post'" :post="item" /> -->
            <SmallPostCard :index="index" :type="'post'" :post="item" />
          </RouterLink>
        </li>
        <li
          v-if="userStore.userAccountState.posts.total_posts === 0"
          class="flex h-[282px] w-full flex-col items-center justify-center gap-2"
        >
          <span>Aún no tienes publicaciones</span>
          <RouterLink to="/insert" class="underline">Publica</RouterLink>
        </li>
        <div
          v-if="!(userStore.userAccountState.posts.total_posts === 0)"
          class="flex w-full items-center justify-center gap-2"
        >
          <button @click.prevent="prevPostsPageEvent" class="select-none">{{ "<" }}</button>
          <div>
            <span
              >{{ userStore.userAccountState.posts.page }} /
              {{ userStore.userAccountState.posts.total_pages }}</span
            >
          </div>
          <button @click.prevent="nextPostsPageEvent" class="select-none">{{ ">" }}</button>
        </div>
      </ul>
      <!-- Favorites -->
      <ul :class="layoutStore.tableSpinnerVisibility ? 'scoped-blur' : ''" v-else>
        <div class="relative space-y-4">
          <li v-for="(item, index) in userStore.userAccountState.favorites.favorites" :key="index">
            <div
              v-if="item.status === 'deleted'"
              class="flex h-[80px] w-full flex-col items-center justify-center rounded-md border border-sgray-100 bg-background p-6"
            >
              <span>Esta publicacion se eliminó</span>
              <img
                @click.prevent="removeFavorite(index)"
                src="../assets/close-icon.svg"
                class="h-[40px] w-[40px]"
              />
            </div>
            <RouterLink v-else :to="`/post/${item._id}`">
              <!-- <PostTableItem :index="index" :type="'favorite'" :post="item" /> -->
              <SmallPostCard :index="index" :type="'favorite'" :post="item" />
            </RouterLink>
          </li>
          <li
            v-if="userStore.userAccountState.favorites.total_favorites === 0"
            class="flex h-[282px] w-full flex-col items-center justify-center gap-2"
          >
            <span>Aún no tienes favoritos</span>
          </li>
          <div
            v-if="!(userStore.userAccountState.favorites.total_favorites === 0)"
            class="flex w-full items-center justify-center gap-2"
          >
            <button @click.prevent="prevFavoritesPageEvent">{{ "<" }}</button>
            <div>
              <span
                >{{ userStore.userAccountState.favorites.page }} /
                {{ userStore.userAccountState.favorites.total_pages }}</span
              >
            </div>
            <button @click.prevent="nextFavoritesPageEvent" class="select-none">{{ ">" }}</button>
          </div>
        </div>
      </ul>
      <!-- Spinner Container -->
      <div
        class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center"
        :class="layoutStore.tableSpinnerVisibility ? 'block' : 'hidden'"
      >
        <div
          class="spinner h-[35px] w-[35px] rounded-full border-4 border-solid border-x-sgray-200 border-b-sgray-200 border-t-white"
        ></div>
      </div>
    </section>
  </div>
</template>

<style scoped>
  .scoped-blur {
    filter: blur(1px);
  }

  .spinner {
    animation: spin 0.75s cubic-bezier(0.5, 0, 0.5, 1) infinite;
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
