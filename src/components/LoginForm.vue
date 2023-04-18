<script setup>
  import { ref } from "vue";
  import { useUserStore } from "../stores/user.js";
  import SigmaVerticalIcon from "./icons/SigmaVerticalIcon.vue";

  const userStore = useUserStore();

  const user = ref({
    email: "",
    password: "",
  });

  const errors = ref({
    email: false,
    password: false,
    credentials: false,
    server: false,
  });

  const formSubmit = async () => {
    try {
      errors.value.email = false;
      errors.value.password = false;
      errors.value.credentials = false;
      errors.value.server = false;

      await userStore.loginUserAction(user.value);

      user.value.email = "";
      user.value.password = "";
    } catch (error) {
      if (error.message === "Email error") {
        errors.value.email = true;
      }
      if (error.message === "Password error") {
        errors.value.password = true;
      }
      if (error.message === "Email and Password error") {
        errors.value.email = true;
        errors.value.password = true;
      }
      if (error.message === "Invalid credentials") {
        // logoAlertMessage.value = "El correo electrónico o la contraseña no son válidos";
        errors.value.credentials = true;
      }
      if (error.message === "Server Error") {
        // logoAlertMessage.value = "Error de servidor, por favor recargue el sitio";
        errors.value.server = true;
      }
    }
  };
</script>

<template>
  <div class="relative -top-6 grid h-full w-full grid-cols-16 place-items-center px-32">
    <div class="text-shadow col-span-6">
      <SigmaVerticalIcon class="w-full" />
    </div>
    <div class="invisible h-3/5 w-[1px] bg-sgray-100"></div>
    <!-- Form -->
    <form @submit.prevent="formSubmit" novalidate class="col-span-8 flex w-full flex-col gap-7">
      <div class="text-shadow">
        <h1 class="text-4xl font-extrabold">Bienvenido de nuevo!</h1>
        <span class="block text-lg text-sgray-300">Inicia sesión para continuar</span>
      </div>
      <div class="flex flex-col gap-2">
        <!-- Email -->
        <div class="flex flex-col">
          <input
            type="email"
            v-model="user.email"
            class="rounded-md border border-sgray-100 bg-transparent px-4 py-2 text-lg font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1"
            :class="
              errors.email
                ? 'border-transparent ring-2 ring-alert hover:border-transparent focus:border-transparent focus:ring-2'
                : 'ring-sigma'
            "
            placeholder="Correo Electrónico"
          />
          <span
            class="text-shadow relative top-1 px-4 font-archivo text-sm italic text-alert"
            :class="errors.email ? 'visible' : 'invisible'"
            >Error Message</span
          >
        </div>
        <!-- Password -->
        <div class="flex flex-col">
          <input
            type="password"
            v-model="user.password"
            class="rounded-md border border-sgray-100 bg-transparent px-4 py-2 text-lg font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1"
            :class="
              errors.password
                ? 'border-transparent ring-2 ring-alert hover:border-transparent focus:border-transparent focus:ring-2'
                : 'ring-sigma'
            "
            placeholder="Contraseña"
          />
          <span
            class="text-shadow relative top-1 px-4 font-archivo text-sm italic text-alert"
            :class="errors.password ? 'visible' : 'invisible'"
            >Error Message</span
          >
        </div>
      </div>
      <div class="relative -top-3 flex items-center justify-start gap-7">
        <button
          type="submit"
          class="flex h-10 w-44 items-center justify-center rounded-md bg-sgray-400 text-center text-lg font-semibold text-sgray-100 shadow-[0_0_10px_rgba(0,_0,_0,_0.4)] transition-all duration-200 ease-out hover:bg-black hover:text-white hover:shadow-[0_2px_10px_rgba(0,_0,_0,_0.5)]"
        >
          Ingresar
        </button>
        <a
          href="#"
          class="text-shadow transition-all duration-200 after:block after:h-px after:w-0 after:bg-black after:drop-shadow-[0_0_5px_rgba(0,_0,_0,_0.3)] after:transition-[width] after:duration-200 after:ease-in-out hover:text-black hover:drop-shadow-[0_0_5px_rgba(0,_0,_0,_0.3)] hover:after:w-full"
          >Olvidaste tu contraseña?</a
        >
      </div>
    </form>
  </div>
</template>
