<script setup>
  import { computed, ref, watch } from "vue";
  import { useUserStore } from "../stores/user.js";
  import { usePostStore } from "../stores/post";
  import SigmaIsotypeIcon from "./icons/SigmaIsotypeIcon.vue";
  import PostTableItem from "./PostTableItem.vue";
  import parsePhoneNumber from "libphonenumber-js";

  const userStore = useUserStore();
  const postStore = usePostStore();

  const myPostsController = ref(true);

  const parsedPhoneNumber = parsePhoneNumber(userStore.userState.info.phone);
  const phoneInput = ref(parsedPhoneNumber.nationalNumber);
  const callCodeInput = ref(`+${parsedPhoneNumber.countryCallingCode}`);

  const newUser = ref({
    firstname: userStore.userState.info.firstname,
    lastname: userStore.userState.info.lastname,
    public_email: userStore.userState.info.public_email,
    bio: userStore.userState.info.bio,
  });

  const formattedPhone = computed(() => {
    return callCodeInput.value + phoneInput.value;
  });

  const invalidPhone = ref(false);

  watch(formattedPhone, () => {
    try {
      const parsedPhoneNumber = parsePhoneNumber(formattedPhone.value);
      if (!parsedPhoneNumber.isValid()) {
        invalidPhone.value = true;
      } else {
        invalidPhone.value = false;
      }
    } catch (error) {}
  });

  const firstnameError = computed(() => {
    if (!(newUser.value.firstname.length >= 1)) return true;
    return false;
  });

  const lastnameError = computed(() => {
    if (!(newUser.value.lastname.length >= 1)) return true;
    return false;
  });

  const codeError = computed(() => {
    if (!/^\+\d+$/.test(callCodeInput.value) || !(callCodeInput.value.length <= 4)) return true;
    return false;
  });

  const phoneError = computed(() => {
    if (invalidPhone.value) return true;
    return false;
  });

  const public_emailError = computed(() => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newUser.value.public_email))
      return true;
    return false;
  });

  const disableSubmit = computed(() => {
    if (
      firstnameError.value ||
      lastnameError.value ||
      codeError.value ||
      phoneError.value ||
      public_emailError.value
    )
      return true;
    if (
      newUser.value.firstname === userStore.userState.info.firstname &&
      newUser.value.lastname === userStore.userState.info.lastname &&
      formattedPhone.value === userStore.userState.info.phone &&
      newUser.value.public_email === userStore.userState.info.public_email &&
      newUser.value.bio === userStore.userState.info.bio
    )
      return true;
    return false;
  });

  const logoutEvent = async () => {
    try {
      await userStore.logoutUser();
    } catch (error) {
      console.log(error);
    }
  };

  const $reset = () => {
    newUser.value = {
      firstname: userStore.userState.info.firstname,
      lastname: userStore.userState.info.lastname,
      public_email: userStore.userState.info.public_email,
      bio: userStore.userState.info.bio,
    };
  };

  const formSubmit = async () => {
    newUser.value.phone = formattedPhone.value;
    try {
      await userStore.updateAgent(newUser.value);
    } catch (error) {
      console.log(error);
    }
  };

  const myPostEvent = () => {
    myPostsController.value = true;
  };

  const favoritesEvent = async () => {
    myPostsController.value = false;
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

  const removeUnavailableFavorite = async (index) => {
    try {
      await postStore.removeFavorite(userStore.userAccountState.favorites.favorites[index]._id);
      if(userStore.userAccountState.favorites.favorites.length === 1 &&
        userStore.userAccountState.favorites.page > 1) {
          await userStore.loadUserFavorites(userStore.userAccountState.favorites.page - 1)
        } else {
          await userStore.loadUserFavorites(userStore.userAccountState.favorites.page)
        }
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
      <!-- First Name -->
      <div class="col-start-2 row-start-1 mb-2 flex flex-col lg:mb-0">
        <input
          type="text"
          v-model.trim="newUser.firstname"
          class="rounded-md border border-sgray-100 bg-transparent px-4 py-2 font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:text-lg"
          :class="
            firstnameError
              ? 'border-transparent ring-2 ring-alert hover:border-transparent focus:border-transparent focus:ring-2'
              : 'ring-sigma'
          "
          placeholder="Nombre"
        />
        <span
          class="text-shadow relative top-1 px-4 font-archivo text-sm italic text-alert"
          :class="firstnameError ? 'visible' : 'invisible'"
          >Error Message</span
        >
      </div>
      <!-- Last Name -->
      <div class="col-start-2 row-start-2 mb-2 flex flex-col lg:mb-0">
        <input
          type="text"
          v-model.trim="newUser.lastname"
          class="rounded-md border border-sgray-100 bg-transparent px-4 py-2 font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:text-lg"
          :class="
            lastnameError
              ? 'border-transparent ring-2 ring-alert hover:border-transparent focus:border-transparent focus:ring-2'
              : 'ring-sigma'
          "
          placeholder="Apellidos"
        />
        <span
          class="text-shadow relative top-1 px-4 font-archivo text-sm italic text-alert"
          :class="lastnameError ? 'visible' : 'invisible'"
          >Error Message</span
        >
      </div>
      <!-- Phone -->
      <div class="relative col-start-2 row-start-3 mb-2 flex flex-col lg:mb-0">
        <div class="flex w-full items-center gap-2 lg:gap-4">
          <input
            type="text"
            v-model.trim="callCodeInput"
            class="inline-block w-[70px] rounded-md border border-sgray-100 bg-transparent py-2 text-center font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:text-lg"
            :class="
              codeError
                ? 'border-transparent ring-2 ring-alert hover:border-transparent focus:border-transparent focus:ring-2'
                : 'ring-sigma'
            "
            placeholder="+53"
          />
          <!-- Phone Number -->
          <input
            type="tel"
            v-model.trim="phoneInput"
            class="grow rounded-md border border-sgray-100 bg-transparent px-4 py-2 font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:text-lg"
            :class="
              phoneError
                ? 'border-transparent ring-2 ring-alert hover:border-transparent focus:border-transparent focus:ring-2'
                : 'ring-sigma'
            "
            placeholder="Número De Teléfono"
          />
        </div>
        <span
          class="text-shadow relative top-1 px-4 font-archivo text-sm italic text-alert"
          :class="phoneError ? 'visible' : 'invisible'"
          >Error Message</span
        >
      </div>
      <!-- Public Email -->
      <div class="col-start-2 row-start-4 mb-2 flex flex-col lg:mb-0">
        <input
          type="email"
          v-model.trim="newUser.public_email"
          class="rounded-md border border-sgray-100 bg-transparent px-4 py-2 font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:text-lg"
          :class="
            public_emailError
              ? 'border-transparent ring-2 ring-alert hover:border-transparent focus:border-transparent focus:ring-2'
              : 'ring-sigma'
          "
          placeholder="Correo Electrónico Público"
        />
        <span
          class="text-shadow relative top-1 px-4 font-archivo text-sm italic text-alert"
          :class="public_emailError ? 'visible' : 'invisible'"
          >Error Message</span
        >
      </div>
      <!-- Bio -->
      <div class="col-start-1 row-span-2 row-start-4 mb-2 flex flex-col lg:mb-0">
        <textarea
          maxlength="160"
          v-model.trim="newUser.bio"
          class="h-[120px] resize-none rounded-md border border-sgray-100 bg-transparent px-4 py-2 font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:h-full lg:text-lg"
          placeholder="Biografía (160 carácteres máximo)"
        ></textarea>
        <span
          class="text-shadow invisible relative top-1 px-4 font-archivo text-sm italic text-alert"
          >Error Message</span
        >
      </div>
      <!-- Action Buttons -->
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
      <div class="flex items-center">
        <!-- Post Title -->
        <div
          class="w-1/2 rounded-t-md py-2 text-center"
          :class="myPostsController ? 'bg-white font-semibold' : 'bg-transparent'"
          @click.prevent="myPostEvent"
        >
          <h3>Publicaciones</h3>
        </div>
        <!-- Favorites Title -->
        <div
          class="w-1/2 rounded-t-md py-2 text-center"
          :class="!myPostsController ? 'bg-white font-semibold' : 'bg-transparent'"
          @click.prevent="favoritesEvent"
        >
          <h3>Favoritos</h3>
        </div>
      </div>
      <!-- Table -->
      <div
        class="z-50 min-h-[264px] w-full rounded-b-md bg-white px-3 py-[18px]"
        :class="myPostsController ? 'rounded-tr-md' : 'rounded-tl-md'"
      >
        <!-- Posts -->
        <ul v-if="myPostsController" class="space-y-4">
          <li v-for="(item, index) in userStore.userAccountState.posts.posts" :key="index">
            <RouterLink :to="`/post/${item._id}`">
              <PostTableItem :post="item" />
            </RouterLink>
          </li>
          <li
            v-if="userStore.userAccountState.posts.total_posts === 0"
            class="flex h-[282px] w-full flex-col items-center justify-center gap-2"
          >
            <span>Aún no tienes publicaciones</span>
            <RouterLink to="/insert" class="underline">Publica</RouterLink>
          </li>
          <li
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
          </li>
        </ul>
        <!-- Favorites -->
        <ul v-else class="space-y-4">
          <li v-for="(item, index) in userStore.userAccountState.favorites.favorites" :key="index">
            <div
              v-if="item.status === 'deleted'"
              class="flex h-[80px] w-full flex-col items-center justify-center rounded-md border border-sgray-100 bg-background p-6"
            >
              <span>Esta publicacion se eliminó</span>
              <img
                @click.prevent="removeUnavailableFavorite(index)"
                src="../assets/close-icon.svg"
                class="h-[40px] w-[40px]"
              />
            </div>
            <RouterLink v-else :to="`/post/${item._id}`">
              <PostTableItem :post="item" />
            </RouterLink>
          </li>
          <li
            v-if="userStore.userAccountState.favorites.total_favorites === 0"
            class="flex h-[282px] w-full flex-col items-center justify-center gap-2"
          >
            <span>Aún no tienes favoritos</span>
          </li>
          <li
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
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
