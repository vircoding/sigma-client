<script setup>
  import { useLayoutStore } from "../stores/layoutStore.js";
  import { useUserStore } from "../stores/userStore.js";
  import TypeRadioInput from "./TypeRadioInput.vue";
  import CurrencyRadioInput from "./CurrencyRadioInput.vue";
  import FrequencyRadioInput from "./FrequencyRadioInput.vue";
  import AmountInput from "./AmountInput.vue";
  import NumberInput from "./NumberInput.vue";
  import RadioInput from "./RadioInput.vue";
  import SelectInput from "./SelectInput.vue";
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
    needs: {
      enable: true,
      count: 1,
    },
  });

  const formSubmit = async () => {
    layoutStore.unhideSpinnerLoading();
    try {
      await userStore.login(user.value);

      await router.push("/");

      user.value.email = "";
      user.value.password = "";

      editedInputs.value.email = false;
      editedInputs.value.password = false;

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
          <!-- Inputs Here... -->
        </div>
      </div>
    </form>
  </div>
</template>
