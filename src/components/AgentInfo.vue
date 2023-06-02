<script setup>
  import { computed, ref, watch } from "vue";
  import router from "../router";
  import { useUserStore } from "../stores/user.js";
  import { usePostStore } from "../stores/post";
  import SigmaIsotypeIcon from "./icons/SigmaIsotypeIcon.vue";
  import PostTableItem from "./PostTableItem.vue";
  import parsePhoneNumber from "libphonenumber-js";

  const postStore = usePostStore();
  const userStore = useUserStore();

  const alertVisibility = ref(false);

  const posts = ref([]);

  const prevUser = ref({
    firstname: "",
    lastname: "",
    phone: "",
    public_email: "",
    bio: "",
  });

  const newUser = ref({
    firstname: "",
    lastname: "",
    phone: "",
    public_email: "",
    bio: "",
  });

  const phoneInput = ref("");
  const callCodeInput = ref("+53");

  const formattedPhone = computed(() => {
    return callCodeInput.value + phoneInput.value;
  });

  const invalidPhone = ref(true);

  watch(phoneInput, () => {
    try {
      const parsedPhoneNumber = parsePhoneNumber(formattedPhone.value);
      if (!parsedPhoneNumber.isValid()) {
        throw new Error("Non-valid Phone Number");
      } else {
        invalidPhone.value = false;
      }
    } catch (error) {
      invalidPhone.value = true;
    }
  });

  const editedInputs = ref({
    firstname: false,
    lastname: false,
    code: false,
    phone: false,
    public_email: false,
    bio: false,
  });

  const editInput = (input) => {
    switch (input) {
      case "firstname":
        editedInputs.value.firstname = true;
        break;
      case "lastname":
        editedInputs.value.lastname = true;
        break;
      case "code":
        editedInputs.value.code = true;
        break;
      case "phone":
        editedInputs.value.phone = true;
        break;
      case "public_email":
        editedInputs.value.public_email = true;
        break;
      case "bio":
        editedInputs.value.public_email = true;
        break;
      default:
        break;
    }
  };

  const firstnameError = computed(() => {
    if (editedInputs.value.firstname && !(newUser.value.firstname.length >= 1)) return true;
    return false;
  });

  const lastnameError = computed(() => {
    if (editedInputs.value.lastname && !(newUser.value.lastname.length >= 1)) return true;
    return false;
  });

  const codeError = computed(() => {
    if (
      editedInputs.value.code &&
      (!/^\+\d+$/.test(callCodeInput.value) || !(callCodeInput.value.length <= 4))
    )
      return true;
    return false;
  });

  const phoneError = computed(() => {
    if (editedInputs.value.phone && invalidPhone.value) return true;
    return false;
  });

  const public_emailError = computed(() => {
    if (
      editedInputs.value.public_email &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newUser.value.public_email)
    )
      return true;
    return false;
  });

  const disableSubmit = computed(() => {
    if (
      !editedInputs.value.firstname &&
      !editedInputs.value.lastname &&
      !editedInputs.value.code &&
      !editedInputs.value.phone &&
      !editedInputs.value.public_email &&
      !editedInputs.value.bio
    ) {
      return true;
    }
    if (
      firstnameError.value ||
      lastnameError.value ||
      codeError.value ||
      phoneError.value ||
      public_emailError.value
    )
      return true;
    if (
      newUser.value.firstname === prevUser.value.firstname &&
      newUser.value.lastname === prevUser.value.lastname &&
      formattedPhone.value === prevUser.value.phone &&
      newUser.value.public_email === prevUser.value.public_email &&
      newUser.value.bio === prevUser.value.bio
    )
      return true;
    return false;
  });

  const logoutEvent = async () => {
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
      prevUser.value.firstname = res.firstname;
      prevUser.value.lastname = res.lastname;
      prevUser.value.phone = res.phone;
      prevUser.value.public_email = res.public_email;
      prevUser.value.bio = res.bio;

      // New User
      newUser.value.firstname = res.firstname;
      newUser.value.lastname = res.lastname;
      newUser.value.phone = res.phone;
      newUser.value.public_email = res.public_email;
      newUser.value.bio = res.bio;

      // Code and Phone Setup
      const parsedPhoneNumber = parsePhoneNumber(res.phone);

      callCodeInput.value = "+" + parsedPhoneNumber.countryCallingCode;
      phoneInput.value = parsedPhoneNumber.nationalNumber;
    } catch (error) {
      console.log(error);
    }
  };

  const formSubmit = async () => {
    newUser.value.phone = formattedPhone.value;
    try {
      await userStore.updateAgent(newUser.value);

      await getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const selectedPostID = ref("");

  const showAlert = (id) => {
    alertVisibility.value = true;
    selectedPostID.value = id;
  };

  const hideAlert = () => {
    alertVisibility.value = false;
  };

  const deletePost = async () => {
    try {
      await postStore.deletePost(selectedPostID.value);

      alertVisibility.value = false;
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  getUser();
  getPosts();
</script>

<template>
  <div
    class="fixed left-1/2 top-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 rounded-3xl border border-sigma bg-white p-4"
    :class="alertVisibility ? 'flex' : 'hidden'"
  >
    <span>Estás seguro que deseas eliminar esta publicación?</span>
    <div class="flex gap-4">
      <button
        @click.prevent="deletePost"
        class="w-20 rounded-md bg-sigma px-4 py-1 text-center text-white"
      >
        Sí
      </button>
      <button @click.prevent="hideAlert" class="w-20 rounded-md bg-sgray-200 px-4 py-1 text-center">
        No
      </button>
    </div>
  </div>
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
          @focus="editInput('firstname')"
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
          @focus="editInput('lastname')"
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
            @focus="editInput('code')"
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
            @focus="editInput('phone')"
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
          @focus="editInput('public_email')"
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
          @focus="editInput('phone')"
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
            <PostTableItem :post="item" @delete-post="showAlert" />
          </RouterLink>
        </li>
      </ul>
    </section>
  </div>
</template>
