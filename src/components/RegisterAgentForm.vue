<script setup>
  import { computed, ref } from "vue";
  import { useUserStore } from "../stores/userStore.js";
  import { useLayoutStore } from "../stores/layoutStore.js";
  import router from "../router";
  import parsePhoneNumber from "libphonenumber-js";
  import SigmaIsotypeIcon from "./icons/SigmaIsotypeIcon.vue";

  const userStore = useUserStore();
  const layoutStore = useLayoutStore();

  const user = ref({
    role: "agent",
    email: "",
    password: "",
    repassword: "",
    info: {
      firstname: "",
      lastname: "",
      bio: "",
    },
    contact_details: {
      public_email: "",
      whatsapp: {
        code: "+53",
        phone: "",
      },
    },
  });

  const editedInputs = ref({
    email: false,
    password: false,
    repassword: false,
    firstname: false,
    lastname: false,
    phone: false,
    public_email: false,
  });

  const editInput = (input) => {
    setTimeout(() => {
      switch (input) {
        case "email":
          editedInputs.value.email = true;
          break;
        case "password":
          editedInputs.value.password = true;
          break;
        case "repassword":
          editedInputs.value.repassword = true;
          break;
        case "firstname":
          editedInputs.value.firstname = true;
          break;
        case "lastname":
          editedInputs.value.lastname = true;
          break;
        case "phone":
          editedInputs.value.phone = true;
          break;
        case "public_email":
          editedInputs.value.public_email = true;
          break;
        default:
          break;
      }
    }, 3000);
  };

  const emailError = computed(() => {
    if (
      editedInputs.value.email &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.value.email)
    )
      return true;
    return false;
  });

  const passwordError = computed(() => {
    if (
      editedInputs.value.password &&
      !(user.value.password.length >= 6 && user.value.password.length <= 16)
    )
      return true;
    return false;
  });

  const repasswordError = computed(() => {
    if (editedInputs.value.repassword && !(user.value.password === user.value.repassword))
      return true;
    return false;
  });

  const firstnameError = computed(() => {
    if (editedInputs.value.firstname && !(user.value.info.firstname.length >= 1)) return true;
    return false;
  });

  const lastnameError = computed(() => {
    if (editedInputs.value.lastname && !(user.value.info.lastname.length >= 1)) return true;
    return false;
  });

  const codeError = computed(() => {
    if (
      editedInputs.value.code &&
      (!/^\+\d+$/.test(user.value.contact_details.whatsapp.code) ||
        !(user.value.contact_details.whatsapp.code.length <= 4))
    )
      return true;
    return false;
  });

  const phoneError = computed(() => {
    try {
      const parsedPhoneNumber = parsePhoneNumber(
        user.value.contact_details.whatsapp.code + user.value.contact_details.whatsapp.phone
      );
      if (!parsedPhoneNumber.isValid()) {
        throw new Error("Non-valid Phone Number");
      }

      return false;
    } catch (error) {
      if (editedInputs.value.phone) return true;
      return false;
    }
  });

  const public_emailError = computed(() => {
    if (
      editedInputs.value.public_email &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.value.contact_details.public_email)
    )
      return true;
    return false;
  });

  const avatarError = computed(() => {
    return !layoutStore.avatarURLState;
  });

  const disableSubmit = computed(() => {
    if (avatarError.value) return true;
    if (
      !editedInputs.value.email ||
      !editedInputs.value.password ||
      !editedInputs.value.repassword ||
      !editedInputs.value.firstname ||
      !editedInputs.value.lastname ||
      !editedInputs.value.phone
    ) {
      return true;
    }
    if (
      emailError.value ||
      passwordError.value ||
      repasswordError.value ||
      firstnameError.value ||
      lastnameError.value ||
      codeError.value ||
      phoneError.value ||
      public_emailError.value
    ) {
      return true;
    }
    return false;
  });

  const resetComponent = () => {
    user.value.email = "";
    user.value.password = "";
    user.value.repassword = "";
    user.value.info.firstname = "";
    user.value.info.lastname = "";
    user.value.info.bio = "";
    user.value.contact_details.public_email = "";
    user.value.contact_details.whatsapp.phone = "";
    user.value.contact_details.whatsapp.code = "+53";

    editedInputs.value.email = false;
    editedInputs.value.password = false;
    editedInputs.value.repassword = false;
    editedInputs.value.firstname = false;
    editedInputs.value.lastname = false;
    editedInputs.value.phone = false;
    editedInputs.value.public_email = false;
  };

  const formSubmit = async () => {
    layoutStore.unhideSpinnerLoading();

    try {
      const avatar = layoutStore.avatarURLState.file;
      await userStore.register(user.value, avatar);

      await router.push("/");

      resetComponent();

      layoutStore.hideSpinnerLoading();
    } catch (error) {
      console.log(error);
      layoutStore.hideSpinnerLoading();
    }
  };

  const fileInput = ref(null);

  const openImageDialog = () => {
    fileInput.value.click();
  };

  const loadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      layoutStore.setSingleAvatarURLState(imageURL);
      layoutStore.unhideImageCropper();
    }
    event.target.value = null;
  };

  const editImage = () => {
    layoutStore.setEditAvatar();
    layoutStore.setSingleAvatarURLState(layoutStore.avatarURLState.original);
    layoutStore.unhideImageCropper();
  };
</script>

<template>
  <div
    class="flex h-full w-full flex-col items-center max-[1023px]:px-[10%] max-[499px]:px-[5%] lg:items-start lg:justify-center lg:gap-7 lg:px-24 xl:px-32 2xl:px-44"
  >
    <div class="text-shadow col-span-6">
      <SigmaIsotypeIcon class="h-[100px] w-[320px] fill-sgray-200 lg:hidden" />
    </div>
    <div class="text-shadow mb-7 lg:mb-0">
      <h1
        class="mb-2 text-center text-4xl font-extrabold max-[1023px]:text-4xl max-[505px]:text-3xl lg:mb-0 lg:text-left lg:text-4xl"
      >
        Sé parte de Sigma!
      </h1>
      <span class="block text-center text-sgray-300 lg:text-left lg:text-lg"
        >Forma parte de nuestra comunidad de agentes</span
      >
    </div>
    <form
      @submit.prevent="formSubmit"
      novalidate
      class="flex w-full grid-cols-2 grid-rows-6 flex-col lg:grid lg:gap-x-8 lg:gap-y-2"
    >
      <!-- Email -->
      <div class="col-start-1 row-start-1 mb-2 flex flex-col lg:mb-0">
        <input
          @focus="editInput('email')"
          type="email"
          v-model.trim="user.email"
          class="rounded-md border border-sgray-100 bg-transparent px-4 py-2 font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:text-lg"
          :class="
            emailError
              ? 'border-transparent ring-2 ring-alert hover:border-transparent focus:border-transparent focus:ring-2'
              : 'ring-sigma'
          "
          placeholder="Correo Electrónico"
        />
        <span
          class="text-shadow relative top-1 px-4 font-archivo text-sm italic text-alert"
          :class="emailError ? 'visible' : 'invisible'"
          >Error Message</span
        >
      </div>
      <!-- Password -->
      <div class="col-start-1 row-start-2 mb-2 flex flex-col lg:mb-0">
        <input
          @focus="editInput('password')"
          type="password"
          v-model.trim="user.password"
          class="rounded-md border border-sgray-100 bg-transparent px-4 py-2 font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:text-lg"
          :class="
            passwordError
              ? 'border-transparent ring-2 ring-alert hover:border-transparent focus:border-transparent focus:ring-2'
              : 'ring-sigma'
          "
          placeholder="Contraseña"
        />
        <span
          class="text-shadow relative top-1 px-4 font-archivo text-sm italic text-alert"
          :class="passwordError ? 'visible' : 'invisible'"
          >Error Message</span
        >
      </div>
      <!-- Repassword -->
      <div class="col-start-1 row-start-3 mb-2 flex flex-col lg:mb-0">
        <input
          @focus="editInput('repassword')"
          type="password"
          v-model.trim="user.repassword"
          class="rounded-md border border-sgray-100 bg-transparent px-4 py-2 font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:text-lg"
          :class="
            repasswordError
              ? 'border-transparent ring-2 ring-alert hover:border-transparent focus:border-transparent focus:ring-2'
              : 'ring-sigma'
          "
          placeholder="Repetir Contraseña"
        />
        <span
          class="text-shadow relative top-1 px-4 font-archivo text-sm italic text-alert"
          :class="repasswordError ? 'visible' : 'invisible'"
          >Error Message</span
        >
      </div>

      <div class="mb-7 flex w-full items-center">
        <!-- Avatar -->
        <div class="relative w-[35%]">
          <!-- File Input (Hidden) -->
          <input type="file" @change="loadImage" class="hidden" ref="fileInput" accept="image/*" />

          <!-- Default Image -->
          <img src="../assets/user-icon.svg" class="w-full rounded-full border border-sgray-100" />

          <!-- Image Preview -->
          <img
            v-if="layoutStore.avatarURLState"
            :src="layoutStore.avatarURLState.cropped"
            class="absolute bottom-0 left-0 right-0 top-0 w-full rounded-full border border-sgray-100"
          />

          <!-- Add Button -->
          <button
            @click.prevent="openImageDialog"
            class="text-shadow absolute bottom-1 right-1 rounded-full border border-sgray-100 bg-white p-2"
          >
            <img src="../assets/edit-icon.svg" class="w-3" />
          </button>
        </div>
        <!-- Names -->
        <div class="relative top-[10px] flex w-[65%] flex-col justify-center pl-3">
          <!-- First Name -->
          <div class="col-start-2 row-start-1 mb-2 flex flex-col lg:mb-0">
            <input
              @focus="editInput('firstname')"
              type="text"
              v-model.trim="user.info.firstname"
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
          <div class="col-start-2 row-start-2 flex flex-col lg:mb-0">
            <input
              @focus="editInput('lastname')"
              type="text"
              v-model.trim="user.info.lastname"
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
        </div>
      </div>
      <!-- Phone -->
      <div class="relative col-start-2 row-start-3 mb-2 flex flex-col lg:mb-0">
        <div class="flex w-full items-center gap-2 lg:gap-4">
          <input
            type="text"
            v-model.trim="user.contact_details.whatsapp.code"
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
            v-model.trim="user.contact_details.whatsapp.phone"
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
          v-model.trim="user.contact_details.public_email"
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
          v-model.trim="user.info.bio"
          class="h-[120px] resize-none rounded-md border border-sgray-100 bg-transparent px-4 py-2 font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:h-full lg:text-lg"
          placeholder="Biografía (160 carácteres máximo)"
        ></textarea>
        <span
          class="text-shadow invisible relative top-1 px-4 font-archivo text-sm italic text-alert"
          >Error Message</span
        >
      </div>
      <!-- Submit Button -->
      <div
        class="relative mb-7 flex flex-col items-center justify-start gap-7 lg:-top-3 lg:mb-0 lg:flex-row"
      >
        <button
          type="submit"
          :disabled="disableSubmit"
          class="flex h-[38px] w-full items-center justify-center rounded-md border border-sgray-400 bg-sgray-400 text-center font-semibold text-sgray-100 shadow-[0_0_10px_rgba(0,_0,_0,_0.4)] transition-all duration-200 ease-out hover:bg-black hover:text-white hover:shadow-[0_2px_10px_rgba(0,_0,_0,_0.5)] disabled:border disabled:border-sgray-100 disabled:bg-transparent disabled:font-normal disabled:text-sgray-200 disabled:shadow-[0_0_10px_rgba(0,_0,_0,_0)] lg:h-10 lg:w-44 lg:text-lg"
        >
          Registrarse
        </button>
        <RouterLink
          to="/auth/register/client"
          class="text-shadow transition-all duration-200 after:block after:h-px after:w-0 after:bg-black after:drop-shadow-[0_0_5px_rgba(0,_0,_0,_0.3)] after:transition-[width] after:duration-200 after:ease-in-out hover:text-black hover:drop-shadow-[0_0_5px_rgba(0,_0,_0,_0.3)] hover:after:w-full"
          >No estás interesado?</RouterLink
        >
      </div>
      <span
        class="relative col-start-2 row-start-6 mb-10 block text-center text-xs text-sgray-300 lg:-top-3 lg:mb-0 lg:text-left"
        >Al registrarte en nuestro sitio, aceptas nuestras
        <a class="font-semibold text-black" href="#">políticas de cookies</a> y
        <a class="font-semibold text-black" href="#">privacidad</a>.</span
      >
    </form>
  </div>
</template>
