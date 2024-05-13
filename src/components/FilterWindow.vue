<script setup>
  import { ref, computed, watch } from "vue";
  import { usePostStore } from "../stores/postStore.js";
  import { useLayoutStore } from "../stores/layoutStore.js";
  import TypeRadioInput from "./TypeRadioInput.vue";
  import ProvinceFilter from "./ProvinceFilter.vue";
  import MuncipalityFilter from "./MunicipalityFilter.vue";
  import CurrencyFilter from "./CurrencyFilter.vue";
  import FrequencyFilter from "./FrequencyFilter.vue";
  import LimitsFilter from "./LimitsFilter.vue";

  const emits = defineEmits(["hide-window"]);

  const postStore = usePostStore();
  const layoutStore = useLayoutStore();

  const type = ref(postStore.filterOptions.type);
  const stopWatches = ref(false);

  const saleFilters = ref({
    province: "none",
    municipality: "none",
    currency: "none",
    infl: "",
    supl: "",
  });

  const rentFilters = ref({
    province: "none",
    municipality: "none",
    currency: "none",
    frequency: "none",
    infl: "",
    supl: "",
  });

  const exchangeFilters = ref({
    province: "none",
    municipality: "none",
  });

  // const saleInflError = computed(() => {
  //   if (saleFilters.value.infl < 1 && saleFilters.value.infl > 999999999) return true;
  //   else return false;
  // });

  // const saleSuplError = computed(() => {
  //   if (saleFilters.value.supl < 1 && saleFilters.value.supl > 999999999) return true;
  //   else return false;
  // });

  // const rentInflError = computed(() => {
  //   if (rentFilters.value.infl < 1 && rentFilters.value.infl > 999999999) return true;
  //   else return false;
  // });

  // const rentSuplError = computed(() => {
  //   if (rentFilters.value.supl < 1 && rentFilters.value.supl > 999999999) return true;
  //   else return false;
  // });

  const getSaleProvince = computed(() => {
    return saleFilters.value.province;
  });

  const getRentProvince = computed(() => {
    return rentFilters.value.province;
  });

  const getExchangeProvince = computed(() => {
    return exchangeFilters.value.province;
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

  const resetButton = () => {
    if (type.value === "sale") {
      saleFilters.value = {
        province: "none",
        municipality: "none",
        currency: "none",
        infl: "",
        supl: "",
      };
    } else if (type.value === "rent") {
      rentFilters.value = {
        province: "none",
        municipality: "none",
        currency: "none",
        frequency: "none",
        infl: "",
        supl: "",
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
      if (type.value === "sale") {
        let reqInfl, reqSupl;

        if (saleFilters.value.currency === "none") {
          reqInfl = undefined;
          reqSupl = undefined;
        } else {
          // Inf. Limit Validations
          if (saleFilters.value.infl < 1 || saleFilters.value.infl > 999999999) reqInfl = undefined;
          else reqInfl = saleFilters.value.infl;

          // Sup. Limit Validations
          if (saleFilters.value.supl < 1 || saleFilters.value.infl > 999999999) reqSupl = undefined;
          else reqSupl = saleFilters.value.supl;

          // Sorter Validation
          if (reqInfl && reqSupl) {
            if (reqInfl > reqSupl) {
              [reqInfl, reqSupl] = [reqSupl, reqInfl];
            }
          }
        }

        await postStore.findPosts(
          "sale",
          1,
          saleFilters.value.province,
          saleFilters.value.municipality,
          saleFilters.value.currency,
          reqInfl,
          reqSupl
        );
      }

      // Rents
      if (type.value === "rent") {
        let reqInfl, reqSupl;

        if (rentFilters.value.currency === "none" || rentFilters.value.frequency === "none") {
          reqInfl = undefined;
          reqSupl = undefined;
        } else {
          // Inf. Limit Validations
          if (rentFilters.value.infl < 1 || rentFilters.value.infl > 999999999) reqInfl = undefined;
          else reqInfl = rentFilters.value.infl;

          // Sup. Limit Validations
          if (rentFilters.value.supl < 1 || rentFilters.value.infl > 999999999) reqSupl = undefined;
          else reqSupl = rentFilters.value.supl;

          // Sorter Validation
          if (reqInfl && reqSupl) {
            if (reqInfl > reqSupl) {
              [reqInfl, reqSupl] = [reqSupl, reqInfl];
            }
          }
        }

        await postStore.findPosts(
          "rent",
          1,
          rentFilters.value.province,
          rentFilters.value.municipality,
          rentFilters.value.currency,
          reqInfl,
          reqSupl,
          rentFilters.value.frequency
        );
      }

      // Exchanges
      if (type.value === "exchange")
        await postStore.findPosts(
          "exchange",
          1,
          exchangeFilters.value.province,
          exchangeFilters.value.municipality
        );

      layoutStore.hideSpinnerLoading();
      emits("hide-window");
      emits("scroll");
    } catch (error) {
      console.log(error);
      layoutStore.hideSpinnerLoading();
    }
  };

  const pendingRefresh = computed(() => {
    return postStore.pendingRefreshFilterState;
  });

  watch(pendingRefresh, () => {
    if (pendingRefresh) {
      updateFilters();
      postStore.resetPendingRefreshFilter();
    }
  });

  // Reset Filter State After Load
  // postStore.setFilterType("sale");

  const updateFilters = () => {
    reset();

    stopWatches.value = true;

    if (postStore.filterOptions.type === "sale") {
      saleFilters.value = {
        province: postStore.filterOptions.province ? postStore.filterOptions.province : "none",
        municipality: postStore.filterOptions.municipality
          ? postStore.filterOptions.municipality
          : "none",
        currency: postStore.filterOptions.currency ? postStore.filterOptions.currency : "none",
        supl: postStore.filterOptions.supl ? postStore.filterOptions.supl : "",
        infl: postStore.filterOptions.infl ? postStore.filterOptions.infl : "",
      };
    } else if (postStore.filterOptions.type === "rent") {
      rentFilters.value = {
        province: postStore.filterOptions.province ? postStore.filterOptions.province : "none",
        municipality: postStore.filterOptions.municipality
          ? postStore.filterOptions.municipality
          : "none",
        currency: postStore.filterOptions.currency ? postStore.filterOptions.currency : "none",
        frequency: postStore.filterOptions.frequency ? postStore.filterOptions.frequency : "none",
        supl: postStore.filterOptions.supl ? postStore.filterOptions.supl : "",
        infl: postStore.filterOptions.infl ? postStore.filterOptions.infl : "",
      };
    } else if (postStore.filterOptions.type === "exchange") {
      exchangeFilters.value = {
        province: postStore.filterOptions.province ? postStore.filterOptions.province : "none",
        municipality: postStore.filterOptions.municipality
          ? postStore.filterOptions.municipality
          : "none",
      };
    }

    stopWatches.value = false;
  };

  const reset = () => {
    stopWatches.value = true;

    type.value = postStore.filterOptions.type;

    saleFilters.value = {
      province: "none",
      municipality: "none",
      currency: "none",
      infl: "",
      supl: "",
    };

    rentFilters.value = {
      province: "none",
      municipality: "none",
      currency: "none",
      frequency: "none",
      infl: "",
      supl: "",
    };

    exchangeFilters.value = {
      province: "none",
      municipality: "none",
    };

    stopWatches.value = false;
  };
</script>

<template>
  <form
    @submit.prevent="findPosts"
    class="text-shadow z-50 flex w-full flex-col items-center justify-center gap-3 rounded-md border border-sgray-200 bg-white px-5 py-7"
  >
    <!-- Type -->
    <div class="flex w-full flex-row items-center justify-start gap-3">
      <TypeRadioInput v-model="type" />
    </div>

    <!-- Sales Filters -->
    <div v-if="type === 'sale'" class="mb-[10px] flex w-full flex-col gap-3">
      <!-- Province -->
      <ProvinceFilter v-model="saleFilters.province" />

      <!-- Municipality -->
      <MuncipalityFilter v-model="saleFilters.municipality" :province="saleFilters.province" />

      <!-- Currency -->
      <div class="flex w-full flex-col">
        <!-- Label -->
        <span class="mb-1 pl-2 font-medium text-sblue-500">Moneda</span>

        <!-- Input -->
        <div class="p flex w-full items-center justify-start gap-3">
          <CurrencyFilter v-model="saleFilters.currency" />
        </div>
      </div>

      <!-- Limits -->
      <div v-if="saleFilters.currency !== 'none'" class="flex w-full gap-2">
        <!-- Inf. -->
        <LimitsFilter v-model="saleFilters.infl" type="infl" :error="false" />

        <!-- Sup. -->
        <LimitsFilter v-model="saleFilters.supl" type="supl" :error="false" />
      </div>
    </div>

    <!-- Rents Filters -->
    <div v-else-if="type === 'rent'" class="mb-[10px] flex w-full flex-col gap-3">
      <!-- Province -->
      <ProvinceFilter v-model="rentFilters.province" />

      <!-- Municipality -->
      <MuncipalityFilter v-model="rentFilters.municipality" :province="rentFilters.province" />

      <!-- Currency -->
      <div class="flex w-full flex-col">
        <!-- Label -->
        <span class="mb-1 pl-2 font-medium text-sblue-500">Moneda</span>

        <!-- Input -->
        <div class="p flex w-full items-center justify-start gap-3">
          <CurrencyFilter v-model="rentFilters.currency" />
        </div>
      </div>

      <!-- Frequency -->
      <div class="flex w-full flex-col">
        <!-- Label -->
        <span class="mb-1 pl-2 font-medium text-sblue-500">Frecuencia</span>

        <!-- Input -->
        <div class="p flex w-full items-center justify-start gap-3">
          <FrequencyFilter v-model="rentFilters.frequency" />
        </div>
      </div>

      <!-- Limits -->
      <div
        v-if="rentFilters.currency !== 'none' && rentFilters.frequency !== 'none'"
        class="flex w-full gap-2"
      >
        <!-- Inf. -->
        <LimitsFilter v-model="rentFilters.infl" type="infl" :error="false" />

        <!-- Sup. -->
        <LimitsFilter v-model="rentFilters.supl" type="supl" :error="false" />
      </div>
    </div>

    <!-- Exchanges Filters -->
    <div v-else-if="type === 'exchange'" class="mb-[10px] flex w-full flex-col gap-3">
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
      <!-- Reset -->
      <button
        @click.prevent="resetButton"
        class="bg-sgblue-400 w-1/2 rounded-md bg-sblue-500 py-[7px] text-white"
      >
        Restablecer
      </button>
      <!-- Find -->
      <button type="submit" class="bg-sgblue-400 w-1/2 rounded-md bg-sigma py-[7px] text-white">
        Buscar
      </button>
    </div>
  </form>
</template>
