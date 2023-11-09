<script setup>
  import { ref, watch, computed } from "vue";
  import { useUserStore } from "../stores/userStore.js";

  defineEmits(["logout"]);

  const userStore = useUserStore();

  const newUser = ref({
    username: userStore.userState.info.username,
  });

  const usernameError = computed(() => {
    if (!(newUser.value.username.length >= 3 && newUser.value.username.length <= 20)) return true;
    return false;
  });

  const disableSubmit = computed(() => {
    return usernameError.value || newUser.value.username === userStore.userState.info.username;
  });

  const formSubmit = async () => {
    try {
      await userStore.updateClient(newUser.value);
    } catch (error) {
      console.log(error);
    }
  };
</script>

<template>
  <form
    id="update_client_form"
    @submit.prevent="formSubmit"
    novalidate
    class="mb-7 flex w-full grid-cols-2 grid-rows-6 flex-col lg:mb-0 lg:grid lg:gap-x-8 lg:gap-y-2"
  >
    <!-- Username -->
    <div class="mb-1 w-full">
      <input
        id="username"
        autocomplete="username"
        type="text"
        v-model.trim="newUser.username"
        class="w-full rounded-md border border-sgray-100 bg-transparent px-4 py-2 font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:text-lg"
        :class="
          usernameError
            ? 'border-transparent ring-2 ring-alert hover:border-transparent focus:border-transparent focus:ring-2'
            : 'ring-sigma'
        "
        placeholder="Nombre de Usuario"
      />
      <span
        :class="usernameError ? 'visible' : 'invisible'"
        class="text-shadow top-1 px-4 font-archivo text-sm italic text-alert"
        >Nombre de usuario Inválido</span
      >
    </div>
    <div class="flex grow flex-row gap-3">
      <button
        class="flex h-[38px] w-full items-center justify-center rounded-md border border-sgray-400 bg-sgray-400 text-center font-semibold text-sgray-100 shadow-[0_0_10px_rgba(0,_0,_0,_0.4)] transition-all duration-200 ease-out hover:bg-black hover:text-white hover:shadow-[0_2px_10px_rgba(0,_0,_0,_0.5)] disabled:border disabled:border-sgray-100 disabled:bg-transparent disabled:font-normal disabled:text-sgray-200 disabled:shadow-[0_0_10px_rgba(0,_0,_0,_0)] lg:h-10 lg:w-44 lg:text-lg"
        @click.prevent="$emit('logout')"
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
</template>
