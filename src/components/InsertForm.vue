<script setup>
  import { useUserStore } from "../stores/user";
  import { usePostStore } from "../stores/post";
  import NumberInput from "./NumberInput.vue";
  import RadioInput from "./RadioInput.vue";
  import SelectInput from "./SelectInput.vue";
  import { provinceList, municipalityList } from "../utils/provinces";
  import { ref, computed, watch } from "vue";
  import parsePhoneNumber from "libphonenumber-js";

  const userStore = useUserStore();
  const postStore = usePostStore();

  const post = ref({
    type: "sale",
    address: {
      province: "La Habana",
      municipality: "",
    },
    features: {
      living_room: 0,
      bed_room: 0,
      bath_room: 0,
      dinning_room: 0,
      kitchen: 0,
      garage: 0,
      garden: 0,
      pool: 0,
    },
    phone: "",
    description: "",
    currency: "mn",
    frequency: "",
    amount: "",
  });

  const activeProvince = computed(() => post.value.address.province);
  const activeType = computed(() => post.value.type);

  watch(activeProvince, () => {
    post.value.address.municipality = "";
  });

  watch(activeType, () => {
    if (activeType.value === "rent") {
      post.value.frequency = "monthly";
    } else {
      post.value.frequency = "";
    }
  });

  const phoneInput = ref("");
  const callCodeInput = ref("+53");

  const formattedPhone = computed(() => {
    return callCodeInput.value + phoneInput.value;
  });

  const invalidPhone = ref(true);

  watch(phoneInput, () => {
    try {
      const parsedPhoneNumber = parsePhoneNumber(formattedPhone.value);
      if (!parsedPhoneNumber.isValid()) {
        throw new Error("Non-valid Phone Number");
      } else {
        invalidPhone.value = false;
      }
    } catch (error) {
      invalidPhone.value = true;
    }
  });

  const editedInputs = ref({
    code: false,
    phone: false,
  });

  const editInput = (input) => {
    setTimeout(() => {
      switch (input) {
        case "code":
          editedInputs.value.code = true;
          break;
        case "phone":
          editedInputs.value.phone = true;
          break;
        default:
          break;
      }
    }, 2000);
  };

  const codeError = computed(() => {
    if (
      editedInputs.value.code &&
      (!/^\+\d+$/.test(callCodeInput.value) || !(callCodeInput.value.length <= 4))
    )
      return true;
    return false;
  });

  const phoneError = computed(() => {
    if (editedInputs.value.phone && invalidPhone.value) return true;
    return false;
  });

  const disableSubmit = computed(() => {
    if (!editedInputs.value.phone) {
      return true;
    }
    if (codeError.value || phoneError.value) {
      return true;
    }
    return false;
  });

  const formSubmit = async () => {
    post.value.phone = formattedPhone.value;
    try {
      await postStore.insertPost(post.value, userStore.token);

      post.value.address.province = "La Habana";
      post.value.address.municipality = "";
      post.value.features.living_room = 0;
      post.value.features.bed_room = 0;
      post.value.features.bath_room = 0;
      post.value.features.dinning_room = 0;
      post.value.features.kitchen = 0;
      post.value.features.garage = 0;
      post.value.features.garden = 0;
      post.value.features.pool = 0;
      post.value.phone = "";
      post.value.description = "";
      post.value.amount = "";

      phoneInput.value = "";
      callCodeInput.value = "+53";

      invalidPhone.value = true;

      editedInputs.value.code = false;
      editedInputs.value.phone = false;
    } catch (error) {
      console.log(error);
    }
  };
</script>

<template>
  {{ post.type }}
  {{ post.currency }}
  {{ post.frequency }}
  {{ post.address }}
  <form novalidate @submit.prevent="formSubmit" class="flex w-1/4 flex-col gap-4 pl-4">
    <!-- Type -->
    <RadioInput v-model="post.type" type="type" />

    <!-- Currency -->
    <RadioInput v-model="post.currency" type="currency" />

    <!-- Frequency -->
    <RadioInput v-if="post.type === 'rent'" v-model="post.frequency" type="frequency" />

    <!-- Province -->
    <SelectInput v-model="post.address.province" type="province" :options-list="provinceList" />

    <!-- Municipality -->
    <SelectInput
      v-model="post.address.municipality"
      type="municipality"
      :options-list="municipalityList[activeProvince]"
    />

    <!-- Bed Room -->
    <NumberInput v-model="post.features.bed_room" />

    <!-- Dinning Room -->
    <NumberInput v-model="post.features.dinning_room" />

    <!-- Kitchen -->
    <NumberInput v-model="post.features.kitchen" />

    <!-- Garage -->
    <NumberInput v-model="post.features.garage" />

    <!-- Bathroom -->
    <NumberInput v-model="post.features.bath_room" />

    <!-- Livingroom -->
    <NumberInput v-model="post.features.living_room" />

    <!-- Garden -->
    <NumberInput v-model="post.features.garden" />

    <!-- Pool -->
    <NumberInput v-model="post.features.pool" />

    <!-- Amount -->
    <input type="number" min="1" v-model="post.amount" />

    <!-- Phone -->
    <!-- <input type="text" placeholder="Número de Teléfono (Requerido)" name="phone" /> -->
    <div class="relative col-start-2 row-start-3 flex flex-col">
      <div class="flex w-full items-center gap-4">
        <input
          @focus="editInput('code')"
          type="text"
          v-model.trim="callCodeInput"
          class="inline-block w-[70px] rounded-md border border-sgray-100 bg-transparent py-2 text-center text-lg font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1"
          :class="
            codeError
              ? 'border-transparent ring-2 ring-alert hover:border-transparent focus:border-transparent focus:ring-2'
              : 'ring-sigma'
          "
          placeholder="+53"
        />
        <!-- Phone Number -->
        <input
          @focus="editInput('phone')"
          type="tel"
          v-model.trim="phoneInput"
          class="grow rounded-md border border-sgray-100 bg-transparent px-4 py-2 text-lg font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1"
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
        >Error Message</span
      >
    </div>

    <!-- Submit -->
    <button
      :disabled="disableSubmit"
      type="submit"
      class="flex h-10 w-44 items-center justify-center rounded-md border border-sgray-400 bg-sgray-400 text-center text-lg font-semibold text-sgray-100 shadow-[0_0_10px_rgba(0,_0,_0,_0.4)] transition-all duration-200 ease-out hover:bg-black hover:text-white hover:shadow-[0_2px_10px_rgba(0,_0,_0,_0.5)] disabled:border disabled:border-sgray-100 disabled:bg-transparent disabled:font-normal disabled:text-sgray-200 disabled:shadow-[0_0_10px_rgba(0,_0,_0,_0)]"
    >
      Publicar
    </button>
  </form>
</template>
