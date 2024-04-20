<script setup>
  import { ref, computed, watch } from "vue";
  import { usePostStore } from "../stores/postStore.js";
  import { useLayoutStore } from "../stores/layoutStore.js";
  import { defaultMunicipality } from "../utils/provinces.js";
  import parsePhoneNumber from "libphonenumber-js";
  import CurrencyRadioInput from "./CurrencyRadioInput.vue";
  import AmountInput from "./AmountInput.vue";
  import FrequencyRadioInput from "./FrequencyRadioInput.vue";
  import OffersSelectInput from "./OffersSelectInput.vue";
  import NeedsSelectInput from "./NeedsSelectInput.vue";
  import ProvinceSelectInput from "./ProvinceSelectInput.vue";
  import MunicipalitySelectInput from "./MunicipalitySelectInput.vue";
  import FeatureNumberInput from "./FeatureNumberInput.vue";
  import FeatureCheckboxInput from "./FeatureCheckboxInput.vue";
  import DescriptionTextAreaInput from "./DescriptionTextAreaInput.vue";
  import CodeInput from "./CodeInput.vue";
  import PhoneInput from "./PhoneInput.vue";
  import WhatsappCheckboxInput from "./WhatsappCheckboxInput.vue";

  const postStore = usePostStore();
  const layoutStore = useLayoutStore();

  const newPost = ref({
    description: postStore.postState.description,
    contact_details: {
      contact: {
        code: postStore.postState.contact_details.contact.code,
        phone: postStore.postState.contact_details.contact.phone,
      },
      contact_types: {
        phone: postStore.postState.contact_details.contact_types.phone,
        whatsapp: postStore.postState.contact_details.contact_types.whatsapp,
      },
    },
    amount_details: {
      amount: postStore.postState.amount_details.amount,
      currency: postStore.postState.amount_details.currency,
      frequency: postStore.postState.amount_details.frequency,
    },
    property_details: postStore.postState.property_details.map((item) => item),
  });

  // Errors
  const amountError = computed(() => {
    if (newPost.value.amount_details.amount < 1 || newPost.value.amount_details.amount > 999999999)
      return true;
    else return false;
  });

  const bedRoomError = computed(() => {
    if (
      newPost.value.property_details[0].features.bed_room === "" ||
      newPost.value.property_details[0].features.bed_room < 0 ||
      newPost.value.property_details[0].features.bed_room > 9
    )
      return true;
    else return false;
  });

  const bathRoomError = computed(() => {
    if (
      newPost.value.property_details[0].features.bath_room === "" ||
      newPost.value.property_details[0].features.bath_room < 0 ||
      newPost.value.property_details[0].features.bath_room > 9
    )
      return true;
    else return false;
  });

  const descriptionError = computed(() => {
    if (newPost.value.description.length > 1200) return true;
    else return false;
  });

  const codeError = computed(() => {
    const regex = /^\+\d+$/;
    if (newPost.value.contact_details.contact.code.length > 4) return true;
    else if (!regex.test(newPost.value.contact_details.contact.code)) return true;
    else return false;
  });

  const phoneError = ref(false);

  const formattedPhone = computed(() => {
    return newPost.value.contact_details.contact.code + newPost.value.contact_details.contact.phone;
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

  // Methods
  const getProvince = computed(() => {
    return newPost.value.property_details[0].address.province;
  });

  watch(getProvince, () => {
    newPost.value.property_details[0].address.municipality = defaultMunicipality(
      newPost.value.property_details[0].address.province
    );
  });

  const anyModif = computed(() => {
    if (
      newPost.value.description !== postStore.postState.description ||
      newPost.value.contact_details.contact_types.phone !==
        postStore.postState.contact_details.contact_types.phone ||
      newPost.value.contact_details.contact_types.whatsapp !==
        postStore.postState.contact_details.contact_types.whatsapp ||
      formattedPhone.value !==
        postStore.postState.contact_details.contact.code +
          postStore.postState.contact_details.contact.phone ||
      newPost.value.amount_details.amount !== postStore.postState.amount_details.amount ||
      newPost.value.amount_details.currency !== postStore.postState.amount_details.currency ||
      newPost.value.amount_details.frequency !== postStore.postState.amount_details.frequency ||
      newPost.value.property_details[0].address.province !==
        postStore.postState.property_details[0].address.province ||
      newPost.value.property_details[0].address.municipality !==
        postStore.postState.property_details[0].address.municipality ||
      newPost.value.property_details[0].features.bed_room !==
        postStore.postState.property_details[0].features.bed_room ||
      newPost.value.property_details[0].features.bath_room !==
        postStore.postState.property_details[0].features.bath_room ||
      newPost.value.property_details[0].features.garage !==
        postStore.postState.property_details[0].features.garage ||
      newPost.value.property_details[0].features.garden !==
        postStore.postState.property_details[0].features.garden ||
      newPost.value.property_details[0].features.pool !==
        postStore.postState.property_details[0].features.pool ||
      newPost.value.property_details[0].features.furnished !==
        postStore.postState.property_details[0].features.furnished
    )
      return true;
    else return false;
  });

  const anyError = computed(() => {
    if (
      amountError.value ||
      bedRoomError.value ||
      bathRoomError.value ||
      descriptionError.value ||
      codeError.value ||
      phoneError.value
    )
      return true;
    else return false;
  });
</script>

<template>
  <div
    class="flex h-full w-full flex-col items-center gap-7 py-10 max-[1023px]:px-[10%] max-[499px]:px-[5%]"
  >
    <!-- Hero -->
    <div class="flex w-full flex-col gap-2 px-5 text-center">
      <h1 class="text-shadow w-full font-ubuntu text-4xl font-bold text-sblue-500">
        Actualiza tu anuncio
      </h1>
      <p class="text-shadow w-full px-2 text-sm text-sgray-300">
        Crea tu cuenta como Propietario si deseas vender o rentar tu casa.
      </p>
    </div>

    <!-- Form -->
    <form @submit.prevent="formSubmit" novalidate class="flex w-full flex-col text-base">
      <!-- Rent Details -->
      <div
        class="mb-4 flex h-[160px] w-full flex-col items-center justify-center rounded-lg border border-sgray-200 px-5 py-3 max-[345px]:px-3"
      >
        <!-- Currency -->
        <div class="mb-1 flex w-full flex-row">
          <CurrencyRadioInput v-model="newPost.amount_details.currency" />
        </div>

        <!-- Frequency -->
        <div class="mb-1 flex w-full flex-row gap-2">
          <FrequencyRadioInput v-model="newPost.amount_details.frequency" />
        </div>

        <!-- Amount -->
        <AmountInput
          v-model="newPost.amount_details.amount"
          type="sale"
          :error="amountError"
          class="w-full"
        />
      </div>

      <!-- Property Details -->
      <div
        class="mb-4 flex w-full flex-col rounded-lg border border-sgray-200 px-5 pb-5 pt-4 max-[345px]:px-3"
      >
        <!-- Province -->
        <ProvinceSelectInput
          v-model="newPost.property_details[0].address.province"
          :index="0"
          class="mb-2 w-full"
        />

        <!-- Municipality -->
        <MunicipalitySelectInput
          v-model="newPost.property_details[0].address.municipality"
          :index="0"
          :province="newPost.property_details[0].address.province"
          class="mb-[14px] w-full"
        />

        <!-- Features -->
        <div
          class="flex w-full flex-row items-center rounded-lg border border-sgray-200 px-5 pb-[18px] pt-3"
        >
          <!-- Number Inputs -->
          <div class="flex w-[80px] flex-col space-y-1">
            <!-- Bed Room -->
            <FeatureNumberInput
              v-model="newPost.property_details[0].features.bed_room"
              :index="0"
              feature="bed_room"
              string="Cuartos"
              :error="bedRoomError"
            />

            <!-- Bathroom -->
            <FeatureNumberInput
              v-model="newPost.property_details[0].features.bath_room"
              :index="0"
              feature="bath_room"
              string="Baños"
              :error="bathRoomError"
            />
          </div>

          <!-- Checkboxs -->
          <div class="relative flex flex-grow flex-col pl-5 min-[400px]:pl-12">
            <!-- Garage -->
            <FeatureCheckboxInput
              v-model="newPost.property_details[0].features.garage"
              :index="0"
              feature="garage"
              string="Garage"
            />

            <!-- Garden -->
            <FeatureCheckboxInput
              v-model="newPost.property_details[0].features.garden"
              :index="0"
              feature="garden"
              string="Jardín"
            />

            <!-- Pool -->
            <FeatureCheckboxInput
              v-model="newPost.property_details[0].features.pool"
              :index="0"
              feature="pool"
              string="Piscina"
            />

            <!-- Furnished -->
            <FeatureCheckboxInput
              v-model="newPost.property_details[0].features.furnished"
              :index="0"
              feature="furnished"
              string="Amueblada"
            />
          </div>
        </div>
      </div>

      <!-- Description -->
      <div
        class="mb-4 flex w-full flex-col rounded-lg border border-sgray-200 px-5 pb-5 pt-4 max-[345px]:px-3"
      >
        <DescriptionTextAreaInput v-model.trim="newPost.description" :error="descriptionError" />
      </div>

      <!-- Contact -->
      <div
        class="mb-4 flex w-full flex-col rounded-lg border border-sgray-200 px-5 py-4 max-[345px]:px-3"
      >
        <label
          v-if="codeError || phoneError"
          for="phone"
          class="flex items-center gap-[3px] pl-2 font-medium text-alert"
        >
          <img src="../assets/warning-icon.svg" class="relative bottom-[1px] w-[19px]" />
          <span>Teléfono no válido</span>
        </label>
        <label v-else for="phone" class="pl-2 font-medium text-sblue-500">Teléfono</label>
        <div class="mb-[8px] flex w-full gap-2">
          <CodeInput v-model="newPost.contact_details.contact.code" :error="codeError" />
          <PhoneInput v-model="newPost.contact_details.contact.phone" :error="phoneError" />
        </div>
        <WhatsappCheckboxInput v-model="newPost.contact_details.contact_types.whatsapp" />
      </div>

      <!-- Submit Button -->
      <button
        :disabled="!anyModif || anyError"
        type="submit"
        class="mb-4 flex h-[38px] w-full items-center justify-center rounded-lg border border-sigma bg-sigma pt-[2px] text-center text-white transition-all duration-200 ease-out disabled:border disabled:border-sgray-100 disabled:bg-transparent disabled:font-normal disabled:text-sgray-200"
      >
        Actualizar
      </button>
    </form>
  </div>
</template>
