<script setup>
  import { computed, ref } from "vue";
  import router from "../router";
  import { useUserStore } from "../stores/user.js";
  import { usePostStore } from "../stores/post";
  import SigmaIsotypeIcon from "./icons/SigmaIsotypeIcon.vue";
  import PostTableItem from "./PostTableItem.vue";

  const postStore = usePostStore();
  const userStore = useUserStore();

  const posts = ref([]);

  const prevUser = ref({
    username: "",
  });

  const newUser = ref({
    username: "",
  });

  const editedInputs = ref({
    username: false,
  });

  const editInput = () => {
    setTimeout(() => {
      editedInputs.value.username = true;
    }, 3000);
  };

  const usernameError = computed(() => {
    if (
      editedInputs.value.username &&
      !(newUser.value.username.length >= 3 && newUser.value.username.length <= 20)
    )
      return true;
    return false;
  });

  const disableSubmit = computed(() => {
    if (!editedInputs.value.username) {
      return true;
    }
    if (usernameError.value) {
      return true;
    }
    if (newUser.value.username === prevUser.value.username) return true;
    return false;
  });

  const logoutEvent = async () => {
    const userStore = useUserStore();
    try {
      await userStore.logoutUser();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getPosts = async () => {
    try {
      posts.value = await postStore.getUserPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const res = await userStore.getUserInfo();

      // Previous User
      prevUser.value.username = res.username;

      // New User
      newUser.value.username = res.username;
    } catch (error) {
      console.log(error);
    }
  };

  const formSubmit = async () => {
    try {
      await userStore.updateClient(newUser.value);

      await getUser();
    } catch (error) {
      console.log(error);
    }
  };

  getUser();
  getPosts();
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
          @focus="editInput"
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
          @click="logoutEvent"
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

    <!-- My Posts -->
    <section class="mb-20 w-full">
      <div class="mb-4 flex w-full items-center gap-3">
        <h3 class="text-base font-semibold">Tus publicaciones</h3>
        <div class="h-[1px] grow border-t border-black"></div>
      </div>
      <ul class="space-y-4">
        <li v-for="(item, index) in posts" :key="index">
          <RouterLink :to="`/post/${item._id}`">
            <PostTableItem :post="item" />
          </RouterLink>
        </li>
      </ul>
    </section>
  </div>
</template>
