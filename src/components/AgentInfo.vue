<script setup>
  import { computed, onMounted, ref, watch } from "vue";
  import { useUserStore } from "../stores/user.js";
  import SigmaIsotypeIcon from "./icons/SigmaIsotypeIcon.vue";
  import PostTableItem from "./PostTableItem.vue";
  import parsePhoneNumber from "libphonenumber-js";

  const props = defineProps(["user", "posts"]);

  const userStore = useUserStore();

  const myPostsController = ref(true);

  const parsedPhoneNumber = parsePhoneNumber(props.user.phone);
  const phoneInput = ref(parsedPhoneNumber.nationalNumber);
  const callCodeInput = ref(`+${parsedPhoneNumber.countryCallingCode}`);

  const newUser = ref({
    firstname: props.user.firstname,
    lastname: props.user.lastname,
    public_email: props.user.public_email,
    bio: props.user.bio,
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
      newUser.value.firstname === props.user.firstname &&
      newUser.value.lastname === props.user.lastname &&
      formattedPhone.value === props.user.phone &&
      newUser.value.public_email === props.user.public_email &&
      newUser.value.bio === props.user.bio
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
      firstname: props.user.firstname,
      lastname: props.user.lastname,
      public_email: props.user.public_email,
      bio: props.user.bio,
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
          <li v-for="(item, index) in props.posts" :key="index">
            <RouterLink :to="`/post/${item._id}`">
              <PostTableItem :post="item" />
            </RouterLink>
          </li>
          <li
            v-if="props.posts.length === 0"
            class="flex h-[282px] w-full flex-col items-center justify-center gap-2"
          >
            <span>Aún no tienes publicaciones</span>
            <RouterLink to="/insert" class="underline">Publica</RouterLink>
          </li>
          <li
            v-if="!(props.posts.length === 0)"
            class="flex w-full items-center justify-center gap-2"
          >
            <span>{{ "<" }}</span>
            <div>
              <span>1 / {{ Math.ceil(props.posts.length / 10) }}</span>
            </div>
            <span>{{ ">" }}</span>
          </li>
        </ul>
        <!-- Favorites -->
        <ul v-else class="space-y-4">
          <li v-for="(item, index) in userStore.favoritesPageState.posts" :key="index">
            <RouterLink :to="`/post/${item.post._id}`">
              <PostTableItem :post="item.post" />
            </RouterLink>
          </li>
          <li
            v-if="userStore.favoritesPageState.posts.length === 0"
            class="flex h-[282px] w-full flex-col items-center justify-center gap-2"
          >
            <span>Aún no tienes favoritos</span>
          </li>
          <li
            v-if="!(userStore.favoritesPageState.posts.length === 0)"
            class="flex w-full items-center justify-center gap-2"
          >
            <span>{{ "<" }}</span>
            <div>
              <span
                >{{ userStore.favoritesPageState.page }} /
                {{ Math.ceil(userStore.favoritesPageState.posts.length / 10) }}</span
              >
            </div>
            <span>{{ ">" }}</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
