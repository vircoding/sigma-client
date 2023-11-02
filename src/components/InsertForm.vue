<script setup>
  import { useLayoutStore } from "../stores/layoutStore.js";
  import { useUserStore } from "../stores/userStore.js";
  import TypeRadioInput from "./TypeRadioInput.vue";
  import CurrencyRadioInput from "./CurrencyRadioInput.vue";
  import FrequencyRadioInput from "./FrequencyRadioInput.vue";
  import AmountInput from "./AmountInput.vue";
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
  import PhotoBoxInput from "./PhotoBoxInput.vue";
  import { ref, computed } from "vue";
  import router from "../router";

  const layoutStore = useLayoutStore();
  const userStore = useUserStore();

  const type = ref("sale");

  const saleDetails = ref({
    currency: "usd",
    amount: "",
  });

  const rentDetails = ref({
    currency: "usd",
    amount: "",
    frequency: "daily",
  });

  const exchangeDetails = ref({
    offers: 1,
    needs: 1,
  });

  const propertyDetails = ref([
    {
      address: {
        municipality: "La Habana Vieja",
        province: "La Habana",
      },
      features: {
        bed_room: "0",
        bath_room: "0",
        garage: false,
        garden: false,
        pool: false,
        furnished: false,
      },
    },
    {
      address: {
        municipality: "La Habana Vieja",
        province: "La Habana",
      },
      features: {
        bed_room: "0",
        bath_room: "0",
        garage: false,
        garden: false,
        pool: false,
        furnished: false,
      },
    },
    {
      address: {
        municipality: "La Habana Vieja",
        province: "La Habana",
      },
      features: {
        bed_room: "0",
        bath_room: "0",
        garage: false,
        garden: false,
        pool: false,
        furnished: false,
      },
    },
  ]);

  const postDetails = ref({
    description: "",
    contact_details: {
      contact: {
        code: "+53",
        phone: "",
      },
      contact_types: {
        phone: true,
        whatsapp: true,
      },
    },
  });

  const propertyLength = computed(() => {
    if (type.value === "sale") return 1;
    else if (type.value === "rent") return 1;
    else if (type.value === "exchange") return parseInt(exchangeDetails.value.offers);
  });

  const photos = ref([]);

  const addPhoto = () => {
    photos.value.push("img_001.jpg");
  };

  const removePhoto = (index) => {
    console.log("removed", index);
    photos.value.splice(index, 1);
  };

  const formSubmit = async () => {
    layoutStore.unhideSpinnerLoading();
    try {
      // await userStore.login(user.value);

      // Reset Refs Here...

      await router.push("/");

      layoutStore.hideSpinnerLoading();
    } catch (error) {
      console.log(error);
      layoutStore.hideSpinnerLoading();
    }
  };
</script>

<template>
  <div
    class="flex h-full w-full flex-col items-center py-7 max-[1023px]:px-[10%] max-[499px]:px-[5%] lg:items-start lg:justify-center lg:gap-7 lg:px-24 lg:py-0 xl:px-32 2xl:px-44"
  >
    <div class="text-shadow mb-4 lg:mb-0">
      <h1
        class="mb-2 text-center text-4xl font-extrabold max-[1023px]:text-4xl max-[505px]:text-3xl lg:mb-0 lg:text-left lg:text-4xl"
      >
        Publica tu casa!
      </h1>
      <p class="block text-center text-sgray-300 lg:text-left lg:text-lg">
        Define si vendes, permutas, o rentas tu casa y agrega los datos requeridos
      </p>
    </div>
    <form @submit.prevent="formSubmit" novalidate class="flex w-full flex-col text-base">
      <!-- Amount/Offer Details -->
      <div
        class="mb-4 flex h-[160px] w-full flex-row items-center rounded-md border border-sgray-100 px-5 py-3"
      >
        <!-- Type -->
        <div class="flex w-[35%] flex-col">
          <TypeRadioInput v-model="type" />
        </div>

        <!-- Sale Details -->
        <div v-if="type === 'sale'" class="flex flex-grow flex-col">
          <!-- Currency -->
          <div class="mb-1 flex w-full flex-row">
            <CurrencyRadioInput v-model="saleDetails.currency" />
          </div>

          <!-- Amount -->
          <AmountInput v-model="saleDetails.amount" type="sale" />
        </div>

        <!-- Rent Details -->
        <div v-else-if="type === 'rent'" class="flex flex-grow flex-col">
          <!-- Currency -->
          <div class="flex w-full flex-row gap-2">
            <CurrencyRadioInput v-model="rentDetails.currency" />
          </div>

          <!-- Frequency -->
          <div class="mb-1 flex w-full flex-row gap-2">
            <FrequencyRadioInput v-model="rentDetails.frequency" />
          </div>

          <!-- Amount -->
          <AmountInput v-model="rentDetails.amount" type="rent" />
        </div>

        <!-- Exchange Details -->
        <div v-else-if="type === 'exchange'" class="flex flex-grow flex-col">
          <OffersSelectInput v-model="exchangeDetails.offers" class="mb-1" />
          <NeedsSelectInput v-model="exchangeDetails.needs" />
        </div>
      </div>

      <!-- Property Details -->
      <div
        v-for="(item, index) in new Array(propertyLength)"
        :key="index"
        class="mb-4 flex w-full flex-col rounded-md border border-sgray-100 px-5 pb-5 pt-4"
      >
        <!-- Province -->
        <ProvinceSelectInput
          v-model="propertyDetails[index].address.province"
          :index="index"
          class="mb-2 w-full"
        />

        <!-- Municipality -->
        <MunicipalitySelectInput
          v-model="propertyDetails[index].address.municipality"
          :index="index"
          :province="propertyDetails[index].address.province"
          class="mb-[14px] w-full"
        />

        <!-- Features -->
        <div
          class="flex w-full flex-row items-center rounded-md border border-sgray-100 px-5 pb-[18px] pt-3"
        >
          <!-- Number Inputs -->
          <div class="flex w-[80px] flex-col space-y-1">
            <!-- Bed Room -->
            <FeatureNumberInput
              v-model="propertyDetails[index].features.bed_room"
              :index="index"
              feature="bed_room"
              string="Cuartos"
            />

            <!-- Bathroom -->
            <FeatureNumberInput
              v-model="propertyDetails[index].features.bath_room"
              :index="index"
              feature="bath_room"
              string="Baños"
            />
          </div>

          <!-- Checkboxs -->
          <div class="relative flex flex-grow flex-col pl-5 min-[400px]:pl-12">
            <!-- Garage -->
            <FeatureCheckboxInput
              v-model="propertyDetails[index].features.garage"
              :index="index"
              feature="garage"
              string="Garage"
            />

            <!-- Garden -->
            <FeatureCheckboxInput
              v-model="propertyDetails[index].features.garden"
              :index="index"
              feature="garden"
              string="Jardín"
            />

            <!-- Pool -->
            <FeatureCheckboxInput
              v-model="propertyDetails[index].features.pool"
              :index="index"
              feature="pool"
              string="Piscina"
            />

            <!-- Furnished -->
            <FeatureCheckboxInput
              v-model="propertyDetails[index].features.furnished"
              :index="index"
              feature="furnished"
              string="Amueblada"
            />
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="mb-4 flex w-full flex-col rounded-md border border-sgray-100 px-5 pb-5 pt-4">
        <DescriptionTextAreaInput v-model.trim="postDetails.description" />
      </div>

      <!-- Contact -->
      <div class="mb-4 flex w-full flex-col rounded-md border border-sgray-100 px-5 py-4">
        <label for="phone" class="mb-1 pl-2 font-medium">Teléfono</label>
        <div class="mb-[8px] flex w-full gap-2">
          <CodeInput v-model="postDetails.contact_details.contact.code" />
          <PhoneInput v-model="postDetails.contact_details.contact.phone" />
        </div>
        <WhatsappCheckboxInput v-model="postDetails.contact_details.contact_types.whatsapp" />
      </div>

      <!-- Photos -->
      <div class="mb-4 flex w-full flex-col rounded-md border border-sgray-100 px-5 py-4">
        <span class="mb-1 pl-2 font-medium"
          >Fotos <span v-if="photos.length">{{ photos.length }}/10</span></span
        >
        <div class="flex w-full flex-wrap gap-x-2 gap-y-1">
          <PhotoBoxInput
            v-for="(item, index) in photos"
            :key="index"
            :path="item"
            @remove="removePhoto(index)"
          />

          <!-- Add with Text -->
          <div
            v-if="!photos.length"
            class="flex items-center gap-[10px] rounded-md bg-sgray-400 px-2 py-[5px]"
            @click.prevent="addPhoto"
          >
            <span class="text-sm text-sgray-100">Añadir foto</span>
            <img
              src="../assets/exit-fullscreen-icon.svg"
              class="h-[14px] w-[14px] rotate-[135deg]"
            />
          </div>

          <!-- Add without Text -->
          <div
            v-if="photos.length > 0 && photos.length < 10"
            class="flex h-[30px] w-[30px] items-center justify-center gap-[10px] rounded-md bg-sgray-400"
          >
            <img
              src="../assets/exit-fullscreen-icon.svg"
              class="h-[14px] w-[14px] rotate-[135deg]"
              @click.prevent="addPhoto"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        class="mb-5 flex h-[38px] w-full items-center justify-center rounded-md border border-sgray-400 bg-sgray-400 pt-[2px] text-center font-semibold text-sgray-100 transition-all duration-200 ease-out hover:bg-black hover:text-white disabled:border disabled:border-sgray-100 disabled:bg-transparent disabled:font-normal disabled:text-sgray-200 lg:h-10 lg:w-44 lg:text-lg"
      >
        Publicar
      </button>
    </form>
  </div>
</template>
