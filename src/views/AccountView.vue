<script setup>
  import router from "../router";
  import { useUserStore } from "../stores/user.js";

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
  <button class="ml-10 mt-10 bg-black text-white" @click="logoutEvent">Logout</button>
</template>
