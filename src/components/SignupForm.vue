<script setup>
  import { computed, ref } from "vue";
  import { useUserStore } from "../stores/user.js";
  import router from "../router";
  import SigmaVerticalIcon from "./icons/SigmaVerticalIcon.vue";

  const userStore = useUserStore();

  const user = ref({
    username: "",
    email: "",
    password: "",
    repassword: "",
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
      !(user.value.username.length >= 3 && user.value.username.length <= 20)
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
    try {
      await userStore.registerUserAction(user.value);

      user.value.username = "";
      user.value.email = "";
      user.value.password = "";
      user.value.repassword = "";

      editedInputs.value.username = false;
      editedInputs.value.email = false;
      editedInputs.value.password = false;
      editedInputs.value.repassword = false;

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
</script>

<template>
  <div
    class="relative -top-6 grid h-full w-full grid-cols-16 place-items-center px-24 xl:px-32 2xl:px-44"
  >
    <div class="text-shadow col-span-6">
      <SigmaVerticalIcon class="w-full fill-sgray-200" />
    </div>
    <div class="invisible h-3/5 w-[1px] bg-sgray-100"></div>
    <!-- Form -->
    <form @submit.prevent="formSubmit" novalidate class="col-span-8 flex w-full flex-col gap-7">
      <div class="text-shadow">
        <h1 class="text-4xl font-extrabold">Bienvenido de nuevo!</h1>
        <span class="block text-lg text-sgray-300">Inicia sesión para continuar</span>
      </div>
      <div class="flex flex-col gap-2">
        <!-- Username -->
        <div class="flex flex-col">
          <input
            @focus="editInput('username')"
            type="text"
            v-model.trim="user.username"
            class="rounded-md border border-sgray-100 bg-transparent px-4 py-2 text-lg font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1"
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
            class="rounded-md border border-sgray-100 bg-transparent px-4 py-2 text-lg font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1"
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
            class="rounded-md border border-sgray-100 bg-transparent px-4 py-2 text-lg font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1"
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
            class="rounded-md border border-sgray-100 bg-transparent px-4 py-2 text-lg font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1"
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
      <div class="relative -top-3 flex items-center justify-start gap-7">
        <button
          type="submit"
          :disabled="disableSubmit"
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
