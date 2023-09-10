<script setup>
  import { ref, watch, computed } from "vue";
  import { useUserStore } from "../stores/user";
  import parsePhoneNumber from "libphonenumber-js";

  defineEmits(["logout"]);

  const userStore = useUserStore();

  const newUser = ref({
    firstname: userStore.userState.info.firstname,
    lastname: userStore.userState.info.lastname,
    public_email: userStore.userState.info.public_email,
    bio: userStore.userState.info.bio,
  });

  const parsedPhoneNumber = parsePhoneNumber(userStore.userState.info.phone);
  const phoneInput = ref(parsedPhoneNumber.nationalNumber);
  const callCodeInput = ref(`+${parsedPhoneNumber.countryCallingCode}`);

  const formattedPhone = computed(() => {
    return callCodeInput.value + phoneInput.value;
  });

  const invalidPhone = ref(false);

  watch(formattedPhone, () => {
    try {
      const parsedPhoneNumber = parsePhoneNumber(formattedPhone.value);
      if (!parsedPhoneNumber.isValid()) {
        invalidPhone.value = true;
      } else {
        invalidPhone.value = false;
      }
    } catch (error) {}
  });

  const firstnameError = computed(() => {
    if (!(newUser.value.firstname.length >= 1)) return true;
    return false;
  });

  const lastnameError = computed(() => {
    if (!(newUser.value.lastname.length >= 1)) return true;
    return false;
  });

  const codeError = computed(() => {
    if (!/^\+\d+$/.test(callCodeInput.value) || !(callCodeInput.value.length <= 4)) return true;
    return false;
  });

  const phoneError = computed(() => {
    if (invalidPhone.value) return true;
    return false;
  });

  const public_emailError = computed(() => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newUser.value.public_email))
      return true;
    return false;
  });

  const disableSubmit = computed(() => {
    if (
      firstnameError.value ||
      lastnameError.value ||
      codeError.value ||
      phoneError.value ||
      public_emailError.value
    )
      return true;
    if (
      newUser.value.firstname === userStore.userState.info.firstname &&
      newUser.value.lastname === userStore.userState.info.lastname &&
      formattedPhone.value === userStore.userState.info.phone &&
      newUser.value.public_email === userStore.userState.info.public_email &&
      newUser.value.bio === userStore.userState.info.bio
    )
      return true;
    return false;
  });

  const formSubmit = async () => {
    newUser.value.phone = formattedPhone.value;
    try {
      await userStore.updateAgent(newUser.value);
    } catch (error) {
      console.log(error);
    }
  };
</script>

<template>
  <form
    id="update_agent_form"
    @submit.prevent="formSubmit"
    novalidate
    class="mb-7 flex w-full grid-cols-2 grid-rows-6 flex-col lg:mb-0 lg:grid lg:gap-x-8 lg:gap-y-2"
  >
    <!-- First Name -->
    <div class="col-start-2 row-start-1 mb-2 flex flex-col lg:mb-0">
      <input
        id="firstname"
        autocomplete="name"
        type="text"
        v-model.trim="newUser.firstname"
        class="rounded-md border border-sgray-100 bg-transparent px-4 py-2 font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:text-lg"
        :class="
          firstnameError
            ? 'border-transparent ring-2 ring-alert hover:border-transparent focus:border-transparent focus:ring-2'
            : 'ring-sigma'
        "
        placeholder="Nombre"
      />
      <span
        class="text-shadow relative top-1 px-4 font-archivo text-sm italic text-alert"
        :class="firstnameError ? 'visible' : 'invisible'"
        >Nombre inválido</span
      >
    </div>
    <!-- Last Name -->
    <div class="col-start-2 row-start-2 mb-2 flex flex-col lg:mb-0">
      <input
        id="lastname"
        autocomplete="family-name"
        type="text"
        v-model.trim="newUser.lastname"
        class="rounded-md border border-sgray-100 bg-transparent px-4 py-2 font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:text-lg"
        :class="
          lastnameError
            ? 'border-transparent ring-2 ring-alert hover:border-transparent focus:border-transparent focus:ring-2'
            : 'ring-sigma'
        "
        placeholder="Apellidos"
      />
      <span
        class="text-shadow relative top-1 px-4 font-archivo text-sm italic text-alert"
        :class="lastnameError ? 'visible' : 'invisible'"
        >Apellidos inválidos</span
      >
    </div>
    <!-- Phone -->
    <div class="relative col-start-2 row-start-3 mb-2 flex flex-col lg:mb-0">
      <div class="flex w-full items-center gap-2 lg:gap-4">
        <input
          id="code"
          autocomplete="tel-country-code"
          type="text"
          v-model.trim="callCodeInput"
          class="inline-block w-[70px] rounded-md border border-sgray-100 bg-transparent py-2 text-center font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:text-lg"
          :class="
            codeError
              ? 'border-transparent ring-2 ring-alert hover:border-transparent focus:border-transparent focus:ring-2'
              : 'ring-sigma'
          "
          placeholder="+53"
        />
        <!-- Phone Number -->
        <input
          id="phone"
          autocomplete="tel-national"
          type="tel"
          v-model.trim="phoneInput"
          class="grow rounded-md border border-sgray-100 bg-transparent px-4 py-2 font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:text-lg"
          :class="
            phoneError
              ? 'border-transparent ring-2 ring-alert hover:border-transparent focus:border-transparent focus:ring-2'
              : 'ring-sigma'
          "
          placeholder="Número De Teléfono"
        />
      </div>
      <span
        class="text-shadow relative top-1 px-4 font-archivo text-sm italic text-alert"
        :class="phoneError ? 'visible' : 'invisible'"
        >Teléfono inválido</span
      >
    </div>
    <!-- Public Email -->
    <div class="col-start-2 row-start-4 mb-2 flex flex-col lg:mb-0">
      <input
        id="public_email"
        autocomplete="email"
        type="email"
        v-model.trim="newUser.public_email"
        class="rounded-md border border-sgray-100 bg-transparent px-4 py-2 font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:text-lg"
        :class="
          public_emailError
            ? 'border-transparent ring-2 ring-alert hover:border-transparent focus:border-transparent focus:ring-2'
            : 'ring-sigma'
        "
        placeholder="Correo Electrónico Público"
      />
      <span
        class="text-shadow relative top-1 px-4 font-archivo text-sm italic text-alert"
        :class="public_emailError ? 'visible' : 'invisible'"
        >Correo Electrónico inválido</span
      >
    </div>
    <!-- Bio -->
    <div class="col-start-1 row-span-2 row-start-4 mb-2 flex flex-col lg:mb-0">
      <textarea
        id="bio"
        autocomplete="off"
        maxlength="160"
        v-model.trim="newUser.bio"
        class="h-[120px] resize-none rounded-md border border-sgray-100 bg-transparent px-4 py-2 font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:h-full lg:text-lg"
        placeholder="Biografía (160 carácteres máximo)"
      ></textarea>
      <span class="text-shadow invisible relative top-1 px-4 font-archivo text-sm italic text-alert"
        >Biografía incorrecta</span
      >
    </div>
    <!-- Action Buttons -->
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
