<script setup>
  import { computed, ref } from "vue";
  import { useUserStore } from "../stores/userStore.js";
  import { useLayoutStore } from "../stores/layoutStore";
  import router from "../router";
  import SigmaVerticalIcon from "./icons/SigmaVerticalIcon.vue";
  import SigmaIsotypeIcon from "./icons/SigmaIsotypeIcon.vue";

  const userStore = useUserStore();
  const layoutStore = useLayoutStore();

  const user = ref({
    role: "client",
    email: "",
    password: "",
    repassword: "",
    info: {
      username: "",
    },
  });

  const editedInputs = ref({
    username: false,
    email: false,
    password: false,
    repassword: false,
  });

  const editInput = (input) => {
    setTimeout(() => {
      switch (input) {
        case "username":
          editedInputs.value.username = true;
          break;
        case "email":
          editedInputs.value.email = true;
          break;
        case "password":
          editedInputs.value.password = true;
          break;
        case "repassword":
          editedInputs.value.repassword = true;
          break;
        default:
          break;
      }
    }, 3000);
  };

  const usernameError = computed(() => {
    if (
      editedInputs.value.username &&
      !(user.value.info.username.length >= 3 && user.value.info.username.length <= 20)
    )
      return true;
    return false;
  });

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

  const disableSubmit = computed(() => {
    if (
      !editedInputs.value.username ||
      !editedInputs.value.email ||
      !editedInputs.value.password ||
      !editedInputs.value.repassword
    ) {
      return true;
    }
    if (usernameError.value || emailError.value || passwordError.value || repasswordError.value) {
      return true;
    }
    return false;
  });

  const formSubmit = async () => {
    layoutStore.unhideSpinnerLoading();
    try {
      await userStore.register(user.value);

      await router.push("/");

      user.value.info.username = "";
      user.value.email = "";
      user.value.password = "";
      user.value.repassword = "";

      editedInputs.value.username = false;
      editedInputs.value.email = false;
      editedInputs.value.password = false;
      editedInputs.value.repassword = false;

      layoutStore.hideSpinnerLoading();
    } catch (error) {
      console.log(error);
      layoutStore.hideSpinnerLoading();
    }
  };
</script>

<template>
  <div
    class="relative flex h-full w-full grid-cols-16 flex-col place-items-center items-center justify-start gap-0 max-[1023px]:px-[10%] max-[499px]:px-[5%] lg:-top-6 lg:grid lg:gap-0 lg:px-24 xl:px-32 2xl:px-44"
  >
    <div class="text-shadow col-span-6">
      <SigmaVerticalIcon class="hidden w-full fill-sgray-200 lg:block" />
      <SigmaIsotypeIcon class="h-[100px] w-[320px] fill-sgray-200 lg:hidden" />
    </div>
    <div class="invisible hidden h-3/5 w-[1px] bg-sgray-100 lg:block"></div>
    <!-- Form -->
    <form @submit.prevent="formSubmit" novalidate class="col-span-8 flex w-full flex-col gap-7">
      <div class="text-shadow">
        <h1
          class="mb-2 text-center text-4xl font-extrabold max-[1023px]:text-4xl max-[505px]:text-3xl lg:mb-0 lg:text-left lg:text-4xl"
        >
          Bienvenido a Sigma!
        </h1>
        <span class="block text-center text-sgray-300 lg:text-left lg:text-lg"
          >Crea un nuevo usuario para continuar</span
        >
      </div>
      <div class="flex flex-col gap-2">
        <!-- Username -->
        <div class="flex flex-col">
          <input
            @focus="editInput('username')"
            type="text"
            v-model.trim="user.info.username"
            class="rounded-md border border-sgray-100 bg-transparent px-4 py-2 font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:text-lg"
            :class="
              usernameError
                ? 'border-transparent ring-2 ring-alert hover:border-transparent focus:border-transparent focus:ring-2'
                : 'ring-sigma'
            "
            placeholder="Nombre de Usuario"
          />
          <span
            class="text-shadow relative top-1 px-4 font-archivo text-sm italic text-alert"
            :class="usernameError ? 'visible' : 'invisible'"
            >Error Message</span
          >
        </div>
        <!-- Email -->
        <div class="flex flex-col">
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
        <div class="flex flex-col">
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
        <div class="flex flex-col">
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
      </div>
      <div
        class="relative -top-5 flex flex-col items-center justify-start gap-7 lg:-top-3 lg:flex-row"
      >
        <button
          type="submit"
          :disabled="disableSubmit"
          class="flex h-[38px] w-full items-center justify-center rounded-md border border-sgray-400 bg-sgray-400 text-center font-semibold text-sgray-100 shadow-[0_0_10px_rgba(0,_0,_0,_0.4)] transition-all duration-200 ease-out hover:bg-black hover:text-white hover:shadow-[0_2px_10px_rgba(0,_0,_0,_0.5)] disabled:border disabled:border-sgray-100 disabled:bg-transparent disabled:font-normal disabled:text-sgray-200 disabled:shadow-[0_0_10px_rgba(0,_0,_0,_0)] lg:h-10 lg:w-44 lg:text-lg"
        >
          Registrarse
        </button>
        <RouterLink
          to="/auth/register/agent"
          class="text-shadow transition-all duration-200 after:block after:h-px after:w-0 after:bg-black after:drop-shadow-[0_0_5px_rgba(0,_0,_0,_0.3)] after:transition-[width] after:duration-200 after:ease-in-out hover:text-black hover:drop-shadow-[0_0_5px_rgba(0,_0,_0,_0.3)] hover:after:w-full"
          >Eres agente?</RouterLink
        >
      </div>
      <span class="relative -top-5 block text-center text-xs text-sgray-300 lg:text-left"
        >Al registrarte en nuestro sitio, aceptas nuestras
        <a class="font-semibold text-black" href="#">políticas de cookies</a> y
        <a class="font-semibold text-black" href="#">privacidad</a>.</span
      >
    </form>
  </div>
</template>
