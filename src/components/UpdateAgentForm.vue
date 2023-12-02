<script setup>
  import { ref, computed, watch } from "vue";
  import { useUserStore } from "../stores/userStore.js";
  import parsePhoneNumber from "libphonenumber-js";
  import TextInput from "./TextInput.vue";
  import CodeInput from "./CodeInput.vue";
  import PhoneInput from "./PhoneInput.vue";
  import EmailInput from "./EmailInput.vue";
  import BioTextAreaInput from "./BioTextAreaInput.vue";

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

  const firstnameError = computed(() => {
    if (newAgent.value.info.firstname.length < 1 || newAgent.value.info.firstname.length > 20)
      return true;
    return false;
  });

  const lastnameError = computed(() => {
    if (newAgent.value.info.lastname.length < 1 || newAgent.value.info.lastname.length > 20)
      return true;
    return false;
  });

  const publicEmailError = computed(() => {
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        newAgent.value.contact_details.public_email
      )
    )
      return true;
    return false;
  });

  const codeError = computed(() => {
    const regex = /^\+\d+$/;
    if (newAgent.value.contact_details.whatsapp.code.length > 4) return true;
    else if (!regex.test(newAgent.value.contact_details.whatsapp.code)) return true;
    else return false;
  });

  const phoneError = ref(false);

  const formattedPhone = computed(() => {
    return (
      newAgent.value.contact_details.whatsapp.code + newAgent.value.contact_details.whatsapp.phone
    );
  });

  watch(formattedPhone, () => {
    try {
      const parsedPhoneNumber = parsePhoneNumber(formattedPhone.value);
      if (!parsedPhoneNumber.isValid()) {
        throw new Error("Non-valid Phone Number");
      } else {
        phoneError.value = false;
      }
    } catch (error) {
      phoneError.value = true;
    }
  });

  const bioError = computed(() => {
    if (newAgent.value.info.bio.length > 250) return true;
    else return false;
  });

  const disableSubmit = computed(() => {
    return true;
  });

  const formSubmit = async () => {
    console.log("Guardar Cambios");
  };
</script>

<template>
  <form
    @submit.prevent="formSubmit"
    class="flex w-full flex-col items-center justify-center text-base"
  >
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
          :error="firstnameError"
          class="mb-4 w-full"
        />

        <!-- Lastname -->
        <TextInput
          v-model="newAgent.info.lastname"
          type="lastname"
          :edit="true"
          :error="lastnameError"
          class="w-full"
        />
      </div>
    </div>

    <!-- Whatsapp -->
    <div class="mb-4 flex w-full flex-col">
      <label
        v-if="codeError || phoneError"
        for="phone"
        class="mb-1 pl-2 font-medium italic text-alert"
        >Whatsapp no válido</label
      >
      <label v-else for="phone" class="mb-1 flex flex-row items-center gap-[6px] pl-2">
        <img src="../assets/edit-icon.svg" class="w-[14px]" />
        <span>Whatsapp</span>
      </label>
      <div class="flex w-full items-center gap-4">
        <CodeInput v-model="newAgent.contact_details.whatsapp.code" :error="codeError" />
        <PhoneInput v-model="newAgent.contact_details.whatsapp.phone" :error="phoneError" />
      </div>
    </div>

    <!-- Public Email -->
    <EmailInput
      v-model.trim="newAgent.contact_details.public_email"
      type="public"
      :edit="true"
      :error="publicEmailError"
      class="mb-4 w-full"
    />

    <!-- Bio -->
    <BioTextAreaInput
      v-model.trim="newAgent.info.bio"
      :edit="true"
      :error="bioError"
      class="mb-4"
    />

    <!-- Buttons -->
    <div class="flex w-full items-center justify-center gap-2">
      <!-- Logout -->
      <button
        class="flex h-[38px] w-full items-center justify-center rounded-md border border-sgray-400 bg-sgray-400 pt-[2px] text-center text-white transition-all duration-200 ease-out hover:bg-black hover:text-white lg:h-10 lg:w-44 lg:text-lg"
      >
        Cerrar Sesión
      </button>

      <!-- Save -->
      <button
        type="submit"
        :disabled="disableSubmit"
        class="flex h-[38px] w-full items-center justify-center rounded-md border border-sgray-400 bg-sgray-400 pt-[2px] text-center text-white transition-all duration-200 ease-out hover:bg-black hover:text-white disabled:border disabled:border-sgray-100 disabled:bg-transparent disabled:font-normal disabled:text-sgray-200 lg:h-10 lg:w-44 lg:text-lg"
      >
        Guardar
      </button>
    </div>
  </form>
</template>
