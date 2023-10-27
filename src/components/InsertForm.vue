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
  import NumberInput from "./NumberInput.vue";
  import FeatureCheckboxInput from "./FeatureCheckboxInput.vue";
  import { provinceList, municipalityList } from "../utils/provinces";
  import { ref, computed, watch } from "vue";
  import parsePhoneNumber from "libphonenumber-js";
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
        bed_room: 0,
        bath_room: 0,
        garage: true,
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
        bed_room: 0,
        bath_room: 0,
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
        bed_room: 0,
        bath_room: 0,
        garage: false,
        garden: false,
        pool: false,
        furnished: false,
      },
    },
  ]);

  const propertyLength = computed(() => {
    if (type.value === "sale") return 1;
    else if (type.value === "rent") return 1;
    else if (type.value === "exchange") return parseInt(exchangeDetails.value.offers);
  });

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
      <span class="block text-center text-sgray-300 lg:text-left lg:text-lg"
        >Define si vendes, permutas, o rentas tu casa y agrega los datos requeridos</span
      >
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
        class="mb-4 flex w-full flex-col rounded-md border border-sgray-100 px-5 py-3"
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
          class="flex items-center justify-between rounded-md border border-sgray-100 px-5 pb-1 pt-2"
        >
          <!-- Number Inputs -->
          <div class="mb-4 flex flex-col gap-1">
            <!-- Bed Room -->
            <div class="flex w-[73px] flex-col text-xs min-[420px]:w-[83px] min-[420px]:text-sm">
              <span>Cuartos:</span>
              <NumberInput v-model="propertyDetails[index].features.bed_room" />
            </div>

            <!-- Bathroom -->
            <div class="flex w-[73px] flex-col text-xs min-[420px]:w-[83px] min-[420px]:text-sm">
              <span>Baños:</span>
              <NumberInput v-model="propertyDetails[index].features.bath_room" />
            </div>
          </div>

          <!-- Vertical Line -->
          <div class="h-[100px] w-0 border-e border-sgray-100"></div>

          <!-- Checkboxs -->
          <div class="relative bottom-[2px] flex flex-col">
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
        <!-- Inputs Here -->
      </div>
    </form>
  </div>
</template>
