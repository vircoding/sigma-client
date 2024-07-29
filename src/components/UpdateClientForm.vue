<script setup>
  import { ref, computed } from 'vue';
  import { useUserStore } from '../stores/userStore.js';
  import { useLayoutStore } from '../stores/layoutStore.js';
  import UsernameInput from './UsernameInput.vue';
  import router from '../router';

  const userStore = useUserStore();
  const layoutStore = useLayoutStore();

  const newClient = ref({
    role: 'client',
    info: {
      username: userStore.userState.info.username,
    },
  });

  const usernameError = computed(() => {
    if (newClient.value.info.username.length < 3 || newClient.value.info.username.length > 20)
      return true;
    return false;
  });

  const anyModific = computed(() => {
    if (newClient.value.info.username !== userStore.userState.info.username) return true;
    else return false;
  });

  const disableSubmit = computed(() => {
    if (anyModific.value && !usernameError.value) return false;
    else return true;
  });

  const resetComponent = () => {
    newClient.value = {
      info: {
        username: userStore.userState.info.username,
      },
    };
  };

  const formSubmit = async () => {
    layoutStore.unhideSpinnerLoading();
    try {
      await userStore.updateUser(newClient.value);
      layoutStore.hideSpinnerLoading();
    } catch (error) {
      if (error.message === 'User Not Founded') {
        layoutStore.unhidePopup('source-not-founded');
      } else if (error.message === 'Bad Request') {
        layoutStore.unhidePopup('bad-request');
      } else {
        layoutStore.unhidePopup('server-error');
      }
      layoutStore.hideSpinnerLoading();
    }
  };

  const logout = async () => {
    layoutStore.unhideLogoLoading();
    try {
      await userStore.logout();

      await router.push('/');

      layoutStore.hideLogoLoading();
    } catch (error) {
      if (error.message === 'Server Error') {
        layoutStore.unhidePopup('server-error');
      }
      layoutStore.hideLogoLoading();
    }
  };
</script>

<template>
  <form
    @submit.prevent="formSubmit"
    class="flex w-full flex-col items-center justify-center bg-background px-5"
  >
    <!-- Username -->
    <UsernameInput v-model="newClient.info.username" :error="usernameError" class="mb-7 w-full" />

    <!-- Buttons -->
    <div class="flex w-full items-center justify-center gap-2">
      <!-- Logout -->
      <button
        @click.prevent="logout"
        class="flex h-[38px] w-full items-center justify-center rounded-md border border-sblue-500 bg-sblue-500 pt-[2px] text-center text-white transition-all duration-200 ease-out hover:bg-black hover:text-white lg:h-10 lg:w-44 lg:text-lg"
      >
        Cerrar Sesión
      </button>

      <!-- Save -->
      <button
        type="submit"
        :disabled="disableSubmit"
        class="flex h-[38px] w-full items-center justify-center rounded-md border border-sigma bg-sigma pt-[2px] text-center text-white transition-all duration-200 ease-out hover:bg-black hover:text-white disabled:border disabled:border-sgray-100 disabled:bg-transparent disabled:font-normal disabled:text-sgray-200 lg:h-10 lg:w-44 lg:text-lg"
      >
        Guardar
      </button>
    </div>
  </form>
</template>
