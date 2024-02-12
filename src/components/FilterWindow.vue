<script setup>
  import { ref, computed, watch } from "vue";
  import { usePostStore } from "../stores/postStore.js";
  import { useLayoutStore } from "../stores/layoutStore.js";
  import TypeRadioInput from "./TypeRadioInput.vue";
  import ProvinceFilter from "./ProvinceFilter.vue";
  import MuncipalityFilter from "./MunicipalityFilter.vue";
  import CurrencyRadioInput from "./CurrencyRadioInput.vue";
  import AmountInput from "./AmountInput.vue";
  import FrequencyRadioInput from "./FrequencyRadioInput.vue";
  import OffersSelectInput from "./OffersSelectInput.vue";
  import NeedsSelectInput from "./NeedsSelectInput.vue";

  const postStore = usePostStore();
  const layoutStore = useLayoutStore();

  const type = ref("sale");

  const saleFilters = ref({
    province: "none",
    municipality: "none",
  });

  const rentFilters = ref({
    province: "none",
    municipality: "none",
  });

  const exchangeFilters = ref({
    province: "none",
    municipality: "none",
  });

  const getSaleProvince = computed(() => {
    return saleFilters.value.province;
  });

  const getRentProvince = computed(() => {
    return rentFilters.value.province;
  });

  const getExchangeProvince = computed(() => {
    return exchangeFilters.value.province;
  });

  watch(type, () => {
    postStore.setFilterType(type.value);
  });

  watch(getSaleProvince, () => {
    saleFilters.value.municipality = "none";
  });

  watch(getRentProvince, () => {
    rentFilters.value.municipality = "none";
  });

  watch(getExchangeProvince, () => {
    exchangeFilters.value.municipality = "none";
  });

  const reset = () => {
    if (type.value === "sale") {
      saleFilters.value = {
        province: "none",
        municipality: "none",
      };
    } else if (type.value === "rent") {
      rentFilters.value = {
        province: "none",
        municipality: "none",
      };
    } else if (type.value === "exchange") {
      exchangeFilters.value = {
        province: "none",
        municipality: "none",
      };
    }
  };

  const findPosts = async () => {
    try {
      layoutStore.unhideSpinnerLoading();

      // Sales
      if (postStore.filterTypeState === "sale")
        await postStore.findPosts(1, saleFilters.value.province, saleFilters.value.municipality);

      // Rents
      if (postStore.filterTypeState === "rent")
        await postStore.findPosts(1, rentFilters.value.province, rentFilters.value.municipality);

      // Exchanges
      if (postStore.filterTypeState === "exchange")
        await postStore.findPosts(
          1,
          exchangeFilters.value.province,
          exchangeFilters.value.municipality
        );

      layoutStore.hideSpinnerLoading();
    } catch (error) {
      console.log(error);
      layoutStore.hideSpinnerLoading();
    }
  };
</script>

<template>
  <form
    @submit.prevent="findPosts"
    class="text-shadow flex w-full flex-col items-center justify-center gap-3 rounded-md border border-sgray-100 p-5"
  >
    <!-- Type -->
    <div class="flex w-full flex-row items-center justify-start">
      <TypeRadioInput v-model="type" />
    </div>

    <!-- Sales Filters -->
    <div v-if="postStore.filterTypeState === 'sale'" class="mb-[10px] flex w-full flex-col gap-3">
      <!-- Province -->
      <ProvinceFilter v-model="saleFilters.province" />

      <!-- Municipality -->
      <MuncipalityFilter v-model="saleFilters.municipality" :province="saleFilters.province" />
    </div>

    <!-- Rents Filters -->
    <div
      v-else-if="postStore.filterTypeState === 'rent'"
      class="mb-[10px] flex w-full flex-col gap-3"
    >
      <!-- Province -->
      <ProvinceFilter v-model="rentFilters.province" />

      <!-- Municipality -->
      <MuncipalityFilter v-model="rentFilters.municipality" :province="rentFilters.province" />
    </div>

    <!-- Exchanges Filters -->
    <div
      v-else-if="postStore.filterTypeState === 'exchange'"
      class="mb-[10px] flex w-full flex-col gap-3"
    >
      <!-- Province -->
      <ProvinceFilter v-model="exchangeFilters.province" />

      <!-- Municipality -->
      <MuncipalityFilter
        v-model="exchangeFilters.municipality"
        :province="exchangeFilters.province"
      />
    </div>

    <!-- Actions -->
    <div class="flex w-full items-center justify-center gap-2">
      <!-- Find -->
      <button type="submit" class="w-1/2 rounded-md bg-sgray-400 py-[7px] text-white">
        Buscar
      </button>
      <!-- Reset -->
      <button
        @click.prevent="reset"
        class="flex w-1/2 items-center justify-center gap-2 rounded-md py-[6px]"
      >
        <img src="../assets/close-icon.svg" class="w-3" />
        <span class="relative -top-[1px] underline underline-offset-4">Restablecer</span>
      </button>
    </div>
  </form>
</template>
