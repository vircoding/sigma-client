<script setup>
  import { computed, ref } from "vue";
  import { useUserStore } from "../stores/userStore.js";
  import { useLayoutStore } from "../stores/layoutStore";
  import EmailInput from "./EmailInput.vue";
  import PasswordInput from "./PasswordInput.vue";
  import router from "../router";

  // Stores
  const userStore = useUserStore();
  const layoutStore = useLayoutStore();

  // Refs
  const email = ref("");
  const password = ref("");

  const filledInputs = ref({
    email: false,
    password: false,
  });

  // Errors
  const emailError = computed(() => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) return true;

    return false;
  });

  const passwordError = computed(() => {
    if (!(password.value.length >= 6 && password.value.length <= 16)) return true;

    return false;
  });

  // Methods
  const buildUser = () => {
    return {
      email: email.value,
      password: password.value,
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
      }
    }, 2500);
  };

  const disableSubmit = computed(() => {
    if (emailError.value || passwordError.value) return true;

    return false;
  });

  const resetComponent = () => {
    email.value = "";
    password.value = "";

    filledInputs.value.email = false;
    filledInputs.value.password = false;
  };

  const formSubmit = async () => {
    layoutStore.unhideSpinnerLoading();
    try {
      const user = buildUser();

      await userStore.login(user);

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
    class="relative flex h-full w-full grid-cols-16 flex-col place-items-center items-center justify-start gap-3 max-[1023px]:px-[10%] max-[499px]:px-[5%]"
  >
    <!-- Form -->
    <form @submit.prevent="formSubmit" novalidate class="col-span-8 flex w-full flex-col gap-7">
      <!-- Hero -->
      <div class="flex w-full flex-col gap-2 px-5 text-center">
        <h1 class="text-shadow w-full font-ubuntu text-4xl font-bold text-sblue-500">
          Iniciar Sesión
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
      </div>

      <!-- CTAs -->
      <div class="relative -top-5 flex flex-col items-center justify-start gap-7">
        <button
          type="submit"
          :disabled="disableSubmit"
          class="flex h-[38px] w-full items-center justify-center rounded-lg border border-sigma bg-sigma text-center text-white transition-all duration-200 ease-out disabled:border disabled:border-sgray-100 disabled:bg-transparent disabled:font-normal disabled:text-sgray-200 disabled:shadow-[0_0_10px_rgba(0,_0,_0,_0)]"
        >
          Ingresar
        </button>
        <!-- Links -->
        <div class="flex flex-col items-center justify-center gap-1">
          <RouterLink
            to="/auth/register/client"
            class="text-shadow w-fit text-sblue-500 transition-all duration-200 after:block after:h-px after:w-0 after:bg-sblue-500 after:drop-shadow-[0_0_5px_rgba(0,_0,_0,_0.3)] after:transition-[width] after:duration-200 after:ease-in-out hover:text-sblue-500 hover:drop-shadow-[0_0_5px_rgba(0,_0,_0,_0.3)] hover:after:w-full"
            >¿Aún no tienes cuenta?</RouterLink
          >
        </div>
      </div>
    </form>
  </div>
</template>
