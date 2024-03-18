<script setup>
  import { computed, ref, watch } from "vue";
  import { useUserStore } from "../stores/userStore.js";
  import { useLayoutStore } from "../stores/layoutStore";
  import EmailInput from "./EmailInput.vue";
  import PasswordInput from "./PasswordInput.vue";
  import CodeInput from "./CodeInput.vue";
  import PhoneInput from "./PhoneInput.vue";
  import TextInput from "./TextInput.vue";
  import BioTextAreaInput from "./BioTextAreaInput.vue";
  import parsePhoneNumber from "libphonenumber-js";
  import router from "../router";

  // Stores
  const userStore = useUserStore();
  const layoutStore = useLayoutStore();

  // Refs
  const fileInput = ref(null);
  const email = ref("");
  const password = ref("");
  const repassword = ref("");
  const agent = ref({
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

  const filledInputs = ref({
    email: false,
    password: false,
    repassword: false,
    firstname: false,
    lastname: false,
    public_email: false,
    phone: false,
  });

  const emailError = computed(() => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) return true;

    return false;
  });

  const passwordError = computed(() => {
    if (!(password.value.length >= 6 && password.value.length <= 16)) return true;

    return false;
  });

  const repasswordError = computed(() => {
    if (!(password.value === repassword.value)) return true;

    return false;
  });

  const firstnameError = computed(() => {
    if (agent.value.info.firstname.length < 1 || agent.value.info.firstname.length > 20)
      return true;

    return false;
  });

  const lastnameError = computed(() => {
    if (agent.value.info.lastname.length < 1 || agent.value.info.lastname.length > 20) return true;

    return false;
  });

  const publicEmailError = computed(() => {
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        agent.value.contact_details.public_email
      )
    )
      return true;
    return false;
  });

  const codeError = computed(() => {
    const regex = /^\+\d+$/;
    if (agent.value.contact_details.whatsapp.code.length > 4) return true;
    else if (!regex.test(agent.value.contact_details.whatsapp.code)) return true;
    else return false;
  });

  const phoneError = ref(true);

  const formattedPhone = computed(() => {
    return agent.value.contact_details.whatsapp.code + agent.value.contact_details.whatsapp.phone;
  });

  watch(formattedPhone, () => {
    try {
      const parsedPhoneNumber = parsePhoneNumber(formattedPhone.value);
      if (!parsedPhoneNumber.isValid()) {
        throw new Error("Non-valid Phone Number");
      } else {
        phoneError.value = false;
      }
    } catch (error) {
      phoneError.value = true;
    }
  });

  const bioError = computed(() => {
    if (agent.value.info.bio.length > 250) return true;
    else return false;
  });

  const avatarError = computed(() => {
    return !layoutStore.avatarURLState;
  });

  const anyError = computed(() => {
    if (
      avatarError.value ||
      emailError.value ||
      passwordError.value ||
      repasswordError.value ||
      firstnameError.value ||
      lastnameError.value ||
      codeError.value ||
      phoneError.value ||
      publicEmailError.value ||
      bioError.value
    )
      return true;
    else return false;
  });

  // Methods
  const disableSubmit = computed(() => {
    if (anyError.value) return true;

    return false;
  });

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

  const buildUser = () => {
    return {
      role: "agent",
      email: email.value,
      password: password.value,
      repassword: repassword.value,
      info: {
        firstname: agent.value.info.firstname,
        lastname: agent.value.info.lastname,
        bio: agent.value.info.bio,
      },
      contact_details: {
        public_email: agent.value.contact_details.public_email,
        whatsapp: {
          code: agent.value.contact_details.whatsapp.code,
          phone: agent.value.contact_details.whatsapp.phone,
        },
      },
    };
  };

  const fillInput = (input) => {
    setTimeout(() => {
      switch (input) {
        case "email":
          filledInputs.value.email = true;
          break;
        case "password":
          filledInputs.value.password = true;
          break;
        case "repassword":
          filledInputs.value.repassword = true;
          break;
        case "firstname":
          filledInputs.value.firstname = true;
          break;
        case "lastname":
          filledInputs.value.lastname = true;
          break;
        case "public_email":
          filledInputs.value.public_email = true;
          break;
        case "phone":
          filledInputs.value.phone = true;
          break;
      }
    }, 2500);
  };

  const resetComponent = () => {
    email.value = "";
    password.value = "";
    repassword.value = "";
    agent.value = {
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
    };

    filledInputs.value.email = false;
    filledInputs.value.password = false;
    filledInputs.value.repassword = false;
    filledInputs.value.firstname = false;
    filledInputs.value.lastname = false;
    filledInputs.value.public_email = false;
    filledInputs.value.phone = false;
  };

  const formSubmit = async () => {
    layoutStore.unhideSpinnerLoading();

    try {
      const avatar = layoutStore.avatarURLState.file;
      await userStore.register(buildUser(), avatar);

      await router.push("/");

      resetComponent();

      layoutStore.hideSpinnerLoading();
    } catch (error) {
      console.log(error);
      layoutStore.hideSpinnerLoading();
    }
  };
</script>

<template>
  <div
    class="relative flex h-full w-full grid-cols-16 flex-col place-items-center items-center justify-start gap-3 py-10 max-[1023px]:px-[10%] max-[499px]:px-[5%]"
  >
    <!-- Form -->
    <form @submit.prevent="formSubmit" novalidate class="col-span-8 flex w-full flex-col gap-7">
      <!-- Hero -->
      <div class="flex w-full flex-col gap-2 px-5 text-center">
        <h1 class="text-shadow w-full font-ubuntu text-4xl font-bold text-sblue-500">
          Regístrate como Agente
        </h1>
        <p class="text-shadow w-full px-2 text-sm text-sgray-300">
          Crea tu cuenta como Propietario si deseas vender o rentar tu casa.
        </p>
      </div>

      <!-- Inputs -->
      <div class="flex flex-col items-center justify-center">
        <!-- Email -->
        <EmailInput
          v-model.trim="email"
          type="email"
          :error="filledInputs.email && emailError"
          class="mb-4 w-full"
          @focused="fillInput('email')"
        />

        <!-- Password -->
        <PasswordInput
          v-model.trim="password"
          type="password"
          :error="filledInputs.password && passwordError"
          class="mb-4 w-full"
          @focused="fillInput('password')"
        />

        <!-- Repassword -->
        <PasswordInput
          v-model.trim="repassword"
          type="repassword"
          :error="filledInputs.repassword && repasswordError"
          class="mb-4 w-full"
          @focused="fillInput('repassword')"
        />

        <!-- Avatar & Names -->
        <div class="mb-3 flex w-full items-center justify-center">
          <!-- Avatar -->
          <div class="relative top-1 w-[35%]">
            <!-- File Input (Hidden) -->
            <input
              type="file"
              @change="loadImage"
              class="hidden"
              ref="fileInput"
              accept="image/*"
            />

            <!-- Default Image -->
            <img
              src="../assets/user-icon.svg"
              class="w-full rounded-full border border-sgray-200"
            />

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
          <div class="flex w-[65%] flex-col justify-center pl-3">
            <!-- Firstname -->
            <TextInput
              v-model.trim="agent.info.firstname"
              type="firstname"
              :error="filledInputs.firstname && firstnameError"
              class="mb-4 w-full"
              @focused="fillInput('firstname')"
            />

            <!-- Lastname -->
            <TextInput
              v-model.trim="agent.info.lastname"
              type="lastname"
              :error="filledInputs.lastname && lastnameError"
              class="w-full"
              @focused="fillInput('lastname')"
            />
          </div>
        </div>

        <!-- Whatsapp -->
        <div class="mb-4 flex w-full flex-col">
          <label
            v-if="codeError || (filledInputs.phone && phoneError)"
            for="phone"
            class="flex items-center gap-[3px] pl-2 font-medium text-alert"
          >
            <img src="../assets/warning-icon.svg" class="relative bottom-[1px] w-[19px]" />
            <span>Whatsapp no válido</span>
          </label>
          <label
            v-else
            for="phone"
            class="flex flex-row items-center gap-[6px] pl-2 font-medium text-sblue-500"
          >
            <span>Whatsapp</span>
          </label>
          <div class="flex w-full items-center gap-4">
            <CodeInput v-model.trim="agent.contact_details.whatsapp.code" :error="codeError" />
            <PhoneInput
              v-model.trim="agent.contact_details.whatsapp.phone"
              :error="filledInputs.phone && phoneError"
              @focused="fillInput('phone')"
            />
          </div>
        </div>

        <!-- Public Email -->
        <EmailInput
          v-model.trim="agent.contact_details.public_email"
          type="public"
          :error="filledInputs.public_email && publicEmailError"
          class="mb-4 w-full"
          @focused="fillInput('public_email')"
        />

        <!-- Bio -->
        <BioTextAreaInput v-model.trim="agent.info.bio" :error="bioError" class="mb-4" />
      </div>

      <!-- CTAs -->
      <div class="relative -top-5 flex flex-col items-center justify-start gap-7">
        <div class="space-y-4">
          <button
            type="submit"
            :disabled="disableSubmit"
            class="flex h-[38px] w-full items-center justify-center rounded-lg border border-sigma bg-sigma text-center text-white transition-all duration-200 ease-out disabled:border disabled:border-sgray-100 disabled:bg-transparent disabled:font-normal disabled:text-sgray-200 disabled:shadow-[0_0_10px_rgba(0,_0,_0,_0)]"
          >
            Registrarse
          </button>

          <!-- Terms -->
          <span class="block text-center text-xs text-sgray-300"
            >Al registrarte en nuestro sitio, aceptas nuestras
            <a class="font-semibold text-sblue-500" href="#">políticas de cookies</a> y
            <a class="font-semibold text-sblue-500" href="#">privacidad</a>, así como nuestros
            <a class="font-semibold text-sblue-500" href="#">términos de agente</a></span
          >
        </div>

        <!-- Links -->
        <div class="flex flex-col items-center justify-center gap-1">
          <RouterLink
            to="/auth/login"
            class="text-shadow w-fit text-sblue-500 transition-all duration-200 after:block after:h-px after:w-0 after:bg-sblue-500 after:drop-shadow-[0_0_5px_rgba(0,_0,_0,_0.3)] after:transition-[width] after:duration-200 after:ease-in-out hover:text-sblue-500 hover:drop-shadow-[0_0_5px_rgba(0,_0,_0,_0.3)] hover:after:w-full"
            >¿Ya tienes cuenta?</RouterLink
          >
          <RouterLink
            to="/auth/register/client"
            class="text-shadow w-fit text-sblue-500 transition-all duration-200 after:block after:h-px after:w-0 after:bg-sblue-500 after:drop-shadow-[0_0_5px_rgba(0,_0,_0,_0.3)] after:transition-[width] after:duration-200 after:ease-in-out hover:text-sblue-500 hover:drop-shadow-[0_0_5px_rgba(0,_0,_0,_0.3)] hover:after:w-full"
            >¿No eres agente?</RouterLink
          >
        </div>
      </div>
    </form>
  </div>
</template>
