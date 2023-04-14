<script setup>
  import { ref } from "vue";

  const props = defineProps({
    type: String,
  });

  const inputValue = ref("");
  const errorVisibility = ref(false);

  const inputType = {
    email: "email",
    password: "password",
    repassword: "password",
  };

  const placeholders = {
    email: "Correo Electrónico",
    password: "Contraseña",
    repassword: "Repita La Contraseña",
  };
</script>

<template>
  <div class="flex flex-col">
    <input
      :type="inputType"
      v-model="inputValue"
      class="rounded-md border border-sgray-100 bg-transparent px-4 py-2 text-lg font-medium ring-sigma transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1"
      :class="
        errorVisibility
          ? 'border-transparent ring-2 ring-alert hover:border-transparent focus:border-transparent focus:ring-2'
          : ''
      "
      placeholder="Correo Electrónico"
    />
    <span
      class="text-shadow px-4 font-archivo text-sm italic text-alert"
      :class="errorVisibility ? 'visible' : 'invisible'"
      >Error Message</span
    >
  </div>
</template>
