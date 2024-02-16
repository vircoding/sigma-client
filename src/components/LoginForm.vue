<script setup>
  import { computed, ref } from "vue";
  import { useUserStore } from "../stores/userStore.js";
  import { useLayoutStore } from "../stores/layoutStore";
  import SigmaVerticalIcon from "./icons/SigmaVerticalIcon.vue";
  import SigmaIsotypeIcon from "./icons/SigmaIsotypeIcon.vue";
  import router from "../router";

  const userStore = useUserStore();
  const layoutStore = useLayoutStore();

  const user = ref({
    email: "",
    password: "",
  });

  const editedInputs = ref({
    email: false,
    password: false,
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

  const disableSubmit = computed(() => {
    if (!editedInputs.value.email || !editedInputs.value.password) {
      return true;
    }
    if (emailError.value || passwordError.value) {
      return true;
    }
    return false;
  });

  const resetComponent = () => {
    user.value.email = "";
    user.value.password = "";

    editedInputs.value.email = false;
    editedInputs.value.password = false;
  };

  const formSubmit = async () => {
    layoutStore.unhideSpinnerLoading();
    try {
      await userStore.login(user.value);

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
    class="relative flex h-full w-full grid-cols-16 flex-col place-items-center items-center justify-start gap-3 max-[1023px]:px-[10%] max-[499px]:px-[5%] lg:-top-6 lg:grid lg:gap-0 lg:px-24 xl:px-32 2xl:px-44"
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
          Bienvenido de nuevo!
        </h1>
        <span class="block text-center text-sgray-300 lg:text-left lg:text-lg"
          >Inicia sesión para continuar</span
        >
      </div>
      <div class="flex flex-col gap-2">
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
            >Correo Electrónico no válido</span
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
            >Contraseña No Válida</span
          >
        </div>
      </div>
      <div
        class="relative -top-5 flex flex-col items-center justify-start gap-7 lg:-top-3 lg:flex-row"
      >
        <button
          type="submit"
          :disabled="disableSubmit"
          class="flex h-9 w-full items-center justify-center rounded-md border border-sgray-400 bg-sgray-400 text-center font-semibold text-sgray-100 shadow-[0_0_10px_rgba(0,_0,_0,_0.4)] transition-all duration-200 ease-out hover:bg-black hover:text-white hover:shadow-[0_2px_10px_rgba(0,_0,_0,_0.5)] disabled:border disabled:border-sgray-100 disabled:bg-transparent disabled:font-normal disabled:text-sgray-200 disabled:shadow-[0_0_10px_rgba(0,_0,_0,_0)] lg:h-10 lg:w-44 lg:text-lg"
        >
          Ingresar
        </button>
        <div class="mb-3 flex flex-col gap-1">
          <a
            href="#"
            class="text-shadow w-fit transition-all duration-200 after:block after:h-px after:w-0 after:bg-black after:drop-shadow-[0_0_5px_rgba(0,_0,_0,_0.3)] after:transition-[width] after:duration-200 after:ease-in-out hover:text-black hover:drop-shadow-[0_0_5px_rgba(0,_0,_0,_0.3)] hover:after:w-full"
            >Olvidaste tu contraseña?</a
          >
          <RouterLink
            to="/auth/register/client"
            class="text-shadow w-fit transition-all duration-200 after:block after:h-px after:w-0 after:bg-black after:drop-shadow-[0_0_5px_rgba(0,_0,_0,_0.3)] after:transition-[width] after:duration-200 after:ease-in-out hover:text-black hover:drop-shadow-[0_0_5px_rgba(0,_0,_0,_0.3)] hover:after:w-full"
            >Aún no tienes cuenta?</RouterLink
          >
        </div>
      </div>
    </form>
  </div>
</template>
