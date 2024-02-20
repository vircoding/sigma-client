<script setup>
  import SigmaVerticalIcon from "./icons/SigmaVerticalIcon.vue";
  import FeatureIcon from "./icons/FeatureIcon.vue";
  import { formatAmount } from "../utils/formatAmount.js";
  import BooleanIcon from "./icons/BooleanIcon.vue";

  const props = defineProps(["sale"]);

  const defineFeatureStyles = (count) => {
    let fill;
    if (Boolean(count)) fill = "fill-sigma";
    else fill = "fill-sgray-200";
    return `h-[15px] w-[15px] min-[400px]:h-[18px] min-[400px]:w-[18px] ${fill}`;
  };
</script>

<template>
  <div class="text-shadow w-full overflow-hidden rounded-md shadow-md">
    <div class="relative">
      <img :src="sale.images[0]" alt="Foto de la casa" />
      <div class="absolute right-0 top-0 p-1">
        <SigmaVerticalIcon class="text-shadow w-14 fill-white" />
      </div>
    </div>
    <div class="flex h-[60px] w-full items-center">
      <!-- Clip -->
      <div class="clip flex h-44 w-[85px] flex-shrink-0 flex-col items-center bg-sigma pt-[45px]">
        <h2 class="font-extrabold text-white">VENTA</h2>
        <span class="relative top-[1px] text-lg font-semibold leading-tight text-white">{{
          formatAmount(props.sale.amount_details.amount, true)
        }}</span>
        <span class="uppercase text-white">{{ props.sale.amount_details.currency }}</span>
      </div>

      <!-- Address -->
      <div class="flex h-[60px] flex-grow items-center py-[6px] pl-[5px]">
        <span
          v-if="props.sale.property_details[0].address.province === 'Isla de la Juventud'"
          class="text-xs font-semibold text-sgray-300"
          >{{ props.sale.property_details[0].address.province }}</span
        >
        <span v-else class="text-xs font-semibold text-sgray-300"
          >{{ props.sale.property_details[0].address.municipality }},
          {{ props.sale.property_details[0].address.province }}</span
        >
      </div>

      <!-- Features -->
      <div class="feature-container grid h-full flex-shrink-0 grid-cols-3 grid-rows-2 gap-x-1">
        <!-- Bed Room -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon
            :classes="defineFeatureStyles(props.sale.property_details[0].features.bed_room)"
            icon="bed_room"
          />
          <span
            class="text-shadow text-xs"
            :class="
              props.sale.property_details[0].features.bed_room > 0
                ? 'text-sgray-400'
                : 'text-sgray-200'
            "
            >x{{ props.sale.property_details[0].features.bed_room }}</span
          >
        </div>
        <!-- Bath Room -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon
            :classes="defineFeatureStyles(props.sale.property_details[0].features.bath_room)"
            icon="bath_room"
          />
          <span
            class="text-shadow text-xs"
            :class="
              props.sale.property_details[0].features.bath_room > 0
                ? 'text-sgray-400'
                : 'text-sgray-200'
            "
            >x{{ props.sale.property_details[0].features.bath_room }}</span
          >
        </div>
        <!-- Garage -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon
            :classes="defineFeatureStyles(props.sale.property_details[0].features.garage)"
            icon="garage"
          />
          <BooleanIcon :icon="props.sale.property_details[0].features.garage" :weigth="'ligth'" />
        </div>
        <!-- Garden -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon
            :classes="defineFeatureStyles(props.sale.property_details[0].features.garden)"
            icon="garden"
          />
          <BooleanIcon :icon="props.sale.property_details[0].features.garden" :weigth="'ligth'" />
        </div>
        <!-- Pool -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon
            :classes="defineFeatureStyles(props.sale.property_details[0].features.pool)"
            icon="pool"
          />
          <BooleanIcon :icon="props.sale.property_details[0].features.pool" :weigth="'ligth'" />
        </div>
        <!-- Furnished -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon
            :classes="defineFeatureStyles(props.sale.property_details[0].features.furnished)"
            icon="furnished"
          />
          <BooleanIcon
            :icon="props.sale.property_details[0].features.furnished"
            :weigth="'ligth'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .clip {
    clip-path: polygon(42% 21%, 100% 0, 100% 100%, 0 100%, 0 10%);
  }

  .feature-container {
    width: 100px;
    padding-top: 6px;
    padding-right: 6px;
    padding-bottom: 6px;
  }

  @media (min-width: 400px) {
    .feature-container {
      width: 120px;
      padding-left: 6px;
    }

    .clip {
      margin-left: 8px;
    }
  }
</style>
