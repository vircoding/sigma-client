<script setup>
  import { ref } from "vue";
  import { useUserStore } from "../stores/userStore.js";
  import { useLayoutStore } from "../stores/layoutStore.js";
  import SmallPostCard from "./SmallPostCard.vue";

  const userStore = useUserStore();
  const layoutStore = useLayoutStore();

  const postsActive = ref(true);

  const switchEvent = (isPost) => {
    if (isPost) postsActive.value = true;
    else postsActive.value = false;
  };

  const prevPostsPageEvent = async () => {
    layoutStore.unhideTableSpinner();
    if (userStore.myAccountState.posts.page !== 1) {
      await userStore.getMyAccountPosts(userStore.myAccountState.posts.page - 1);
    }
    layoutStore.hideTableSpinner();
  };

  const nextPostsPageEvent = async () => {
    layoutStore.unhideTableSpinner();
    if (userStore.myAccountState.posts.page < userStore.myAccountState.posts.total_pages) {
      await userStore.getMyAccountPosts(userStore.myAccountState.posts.page + 1);
    }
    layoutStore.hideTableSpinner();
  };

  const prevFavoritesPageEvent = async () => {
    layoutStore.unhideTableSpinner();
    if (userStore.myAccountState.favorites.page !== 1) {
      await userStore.getMyAccountFavorites(userStore.myAccountState.favorites.page - 1);
    }
    layoutStore.hideTableSpinner();
  };

  const nextFavoritesPageEvent = async () => {
    layoutStore.unhideTableSpinner();
    if (userStore.myAccountState.favorites.page < userStore.myAccountState.favorites.total_pages) {
      await userStore.getMyAccountFavorites(userStore.myAccountState.favorites.page + 1);
    }
    layoutStore.hideTableSpinner();
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

    <!-- Posts -->
    <ul v-if="postsActive" class="space-y-4" :class="layoutStore.tableSpinner ? 'scoped-blur' : ''">
      <li v-for="(item, index) in userStore.myAccountState.posts.posts" :key="index">
        <RouterLink :to="`/post/${item.id}`">
          <SmallPostCard :index="index" :favorite="false" :post="item" />
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
    <ul v-else class="space-y-4">
      <li v-for="(item, index) in userStore.myAccountState.favorites.favorites" :key="index">
        <!-- Deleted Post -->
        <div
          v-if="userStore.userFavoritesState[index].status === 'deleted'"
          class="flex h-[80px] w-full flex-col items-center justify-center rounded-md border border-sgray-100 bg-background p-6"
        >
          <span>Esta publicacion se eliminó</span>
          <img
            @click.prevent="removeFavorite(index)"
            src="../assets/close-icon.svg"
            class="h-[40px] w-[40px]"
          />
        </div>
        <RouterLink v-else :to="`/post/${item.id}`">
          <SmallPostCard :index="index" :favorite="true" :post="item" />
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
      class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center"
      :class="layoutStore.tableSpinner ? 'block' : 'hidden'"
    >
      <div
        class="spinner h-[35px] w-[35px] rounded-full border-4 border-solid border-x-sgray-200 border-b-sgray-200 border-t-white"
      ></div>
    </div>
  </section>
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
