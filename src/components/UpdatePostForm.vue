<script setup>
  import { ref } from "vue";
  import { usePostStore } from "../stores/postStore.js";
  import { useLayoutStore } from "../stores/layoutStore.js";
  import CurrencyRadioInput from "./CurrencyRadioInput.vue";
  import AmountInput from "./AmountInput.vue";
  import FrequencyRadioInput from "./FrequencyRadioInput.vue";
  import OffersSelectInput from "./OffersSelectInput.vue";
  import NeedsSelectInput from "./NeedsSelectInput.vue";
  import ProvinceSelectInput from "./ProvinceSelectInput.vue";
  import MunicipalitySelectInput from "./MunicipalitySelectInput.vue";

  const postStore = usePostStore();
  const layoutStore = useLayoutStore();

  const newPost = ref(null);

  const buildNewPost = () => {
    newPost.value = {
      type: postStore.postState.type,
      description: postStore.postState.description,
      contact_details: {
        contact_types: {
          phone: postStore.postState.contact_details.contact_types.phone,
          whatsapp: postStore.postState.contact_details.contact_types.whatsapp,
        },
        contact: {
          code: postStore.postState.contact_details.contact.code,
          phone: postStore.postState.contact_details.contact.phone,
        },
      },
    };

    if (postStore.postState.type === "sale") {
      newPost.value.amount_details = {
        amount: postStore.postState.amount_details.amount,
        currency: postStore.postState.amount_details.currency,
      };
      newPost.value.property_details = [postStore.postState.property_details[0]];
    } else if (postStore.postState.type === "rent") {
      newPost.value.amount_details = {
        amount: postStore.postState.amount_details.amount,
        currency: postStore.postState.amount_details.currency,
        frequency: postStore.postState.amount_details.frequency,
      };
      newPost.value.property_details = [postStore.postState.property_details[0]];
    } else if (postStore.postState.type === "exchange") {
      newPost.value.offer_details = {
        offers: postStore.postState.offer_details.offers,
        needs: {
          enable: postStore.postState.offer_details.needs.enable,
          count: postStore.postState.offer_details.needs.count,
        },
      };
      newPost.value.property_details = postStore.postState.property_details;
    }
  };

  buildNewPost();
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
      <!-- Sale Details -->
      <div
        v-if="postStore.postState.type === 'sale'"
        class="mb-4 flex h-[160px] w-full flex-col items-center justify-center rounded-lg border border-sgray-200 px-5 py-3 max-[345px]:px-3"
      >
        <!-- Currency -->
        <div class="mb-1 flex w-full flex-row">
          <CurrencyRadioInput v-model="newPost.amount_details.currency" />
        </div>

        <!-- Amount -->
        <AmountInput
          v-model="newPost.amount_details.amount"
          type="sale"
          :error="false"
          class="w-full"
        />
      </div>

      <!-- Rent Details -->
      <div
        v-if="postStore.postState.type === 'rent'"
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
          :error="false"
          class="w-full"
        />
      </div>

      <!-- Exchange Details -->
      <div
        v-if="postStore.postState.type === 'exchange'"
        class="mb-4 flex h-[160px] w-full flex-col items-center justify-center rounded-lg border border-sgray-200 px-5 py-3 max-[345px]:px-3"
      >
        <OffersSelectInput v-model="newPost.offer_details.offers" class="mb-1 w-full" />
        <NeedsSelectInput v-model="newPost.offer_details.needs.count" class="w-full" />
      </div>

      <!-- Property Details -->
      <div
        v-for="(item, index) in newPost.property_details"
        :key="index"
        class="mb-4 flex w-full flex-col rounded-lg border border-sgray-200 px-5 pb-5 pt-4 max-[345px]:px-3"
      >
        <!-- Province -->
        <ProvinceSelectInput v-model="item.address.province" :index="index" class="mb-2 w-full" />

        <!-- Municipality -->
        <MunicipalitySelectInput
          v-model="item.address.municipality"
          :index="index"
          :province="item.address.province"
          class="mb-[14px] w-full"
        />
      </div>
    </form>
  </div>
</template>
