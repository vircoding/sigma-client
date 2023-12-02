<script setup>
  import { ref } from "vue";
  import { useUserStore } from "../stores/userStore.js";
  import parsePhoneNumber from "libphonenumber-js";
  import TextInput from "./TextInput.vue";
  import CodeInput from "./CodeInput.vue";
  import PhoneInput from "./PhoneInput.vue";
  import EmailInput from "./EmailInput.vue";

  const userStore = useUserStore();

  const newAgent = ref({
    role: "agent",
    info: {
      firstname: userStore.userState.info.firstname,
      lastname: userStore.userState.info.lastname,
      bio: userStore.userState.info.bio,
    },
    contact_details: {
      public_email: userStore.userState.contact_details.public_email,
      whatsapp: {
        code: userStore.userState.contact_details.whatsapp.code,
        phone: userStore.userState.contact_details.whatsapp.phone,
      },
    },
  });
</script>

<template>
  <form class="flex w-full flex-col items-center justify-center text-base">
    <!-- Top -->
    <div class="mb-4 flex w-full">
      <!-- Avatar -->
      <div class="flex w-[40%] items-center justify-center pr-4">
        <div class="relative w-full">
          <!-- Image -->
          <img
            class="text-shadow w-full rounded-full border border-sgray-100"
            src="../assets/agent-avatar.jpg"
            alt="Avatar del agente"
          />

          <!-- Edit -->
          <div
            class="text-shadow absolute bottom-0 right-0 rounded-full border border-sgray-100 bg-white p-2"
          >
            <img src="../assets/edit-icon.svg" class="w-[15px]" />
          </div>
        </div>
      </div>
      <!-- Rigth -->
      <div class="flex w-[60%] flex-col items-center justify-center">
        <!-- Firstname -->
        <TextInput
          v-model="newAgent.info.firstname"
          type="firstname"
          :edit="true"
          class="mb-4 w-full"
        />

        <!-- Lastname -->
        <TextInput v-model="newAgent.info.lastname" type="lastname" :edit="true" class="w-full" />
      </div>
    </div>

    <!-- Whatsapp -->
    <div class="mb-4 flex w-full flex-col">
      <label for="phone" class="mb-1 flex flex-row items-center gap-[6px] pl-2 font-medium">
        <img src="../assets/edit-icon.svg" class="w-[14px]" />
        <span>Whatsapp</span>
      </label>
      <div class="flex w-full items-center gap-4">
        <CodeInput v-model="newAgent.contact_details.whatsapp.code" />
        <PhoneInput v-model="newAgent.contact_details.whatsapp.phone" />
      </div>
    </div>

    <!-- Public Email -->
    <div class="w-full">
      <EmailInput
        v-model.trim="newAgent.contact_details.public_email"
        type="public"
        :edit="true"
        class="mb-2 w-full"
      />
    </div>
  </form>
</template>
