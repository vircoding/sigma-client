<script setup>
  import { computed, ref } from "vue";
  import router from "../router";
  import { useUserStore } from "../stores/user.js";

  const prevUsername = ref("new_user");
  const username = ref("new_user");

  const editedInputs = ref({
    username: false,
  });

  const editInput = () => {
    setTimeout(() => {
      editedInputs.value.username = true;
    }, 3000);
  };

  const usernameError = computed(() => {
    if (editedInputs.value.username && !(username.value.length >= 3 && username.value.length <= 20))
      return true;
    return false;
  });

  const disableSubmit = computed(() => {
    if (!editedInputs.value.username) {
      return true;
    }
    if (usernameError.value) {
      return true;
    }
    return false;
  });

  const logoutEvent = async () => {
    const userStore = useUserStore();
    try {
      await userStore.logoutUser();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
</script>

<template>
  <div class="h-full w-full p-4 lg:p-14">
    <div class="flex w-full flex-row items-center gap-10">
      <input
        @focus="editInput"
        type="text"
        v-model.trim="username"
        class="rounded-md border border-sgray-100 bg-transparent px-4 py-2 text-2xl font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:w-1/2"
        :class="
          usernameError
            ? 'border-transparent ring-2 ring-alert hover:border-transparent focus:border-transparent focus:ring-2'
            : 'ring-sigma'
        "
        placeholder="Nombre de Usuario"
      />
      <div class="flex grow flex-row gap-3">
        <button
          class="h-9 w-[170px] rounded-md bg-sgray-400 text-lg text-white"
          @click="logoutEvent"
        >
          Cerrar Sesión
        </button>
        <button class="h-9 w-[170px] rounded-md bg-sgray-400 text-lg text-white">
          Eliminar Cuenta
        </button>
      </div>
    </div>
    <span
      class="text-shadow top-1 px-4 font-archivo text-sm italic text-alert"
      :class="usernameError ? 'visible' : 'invisible'"
      >Error Message</span
    >
  </div>
</template>
