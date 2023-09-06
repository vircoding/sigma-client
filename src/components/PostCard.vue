<script setup>
  import { computed } from "vue";
  import SigmaVerticalIcon from "./icons/SigmaVerticalIcon.vue";
  import FeatureIcon from "./icons/FeatureIcon.vue";
  import { formatAmount } from "../utils/formatAmount.js";
  import BooleanIcon from "./icons/BooleanIcon.vue";

  const props = defineProps(["post"]);

  const color = computed(() => {
    if (props.post.__t === "sale") return "fill-sigma";
    else if (props.post.__t === "rent") return "fill-sgreen-300";
    else if (props.post.__t === "exchange") return "fill-solive-300";
  });

  const defineFeatureStyles = (count) => {
    let fill;
    if (Boolean(count)) fill = color.value;
    else fill = "fill-sgray-200";
    return `h-[15px] w-[15px] min-[400px]:h-[18px] min-[400px]:w-[18px] ${fill}`;
  };
</script>

<template>
  <div class="text-shadow w-full overflow-hidden rounded-md shadow-md">
    <div class="relative">
      <img src="../assets/card-img4.jpg" alt="Una Casa" />
      <div class="absolute right-0 top-0 p-1">
        <SigmaVerticalIcon class="text-shadow w-14 fill-white" />
      </div>
    </div>
    <div class="flex h-[60px] w-full items-center">
      <!-- Clip -->
      <div
        v-if="props.post.__t === 'sale'"
        class="clip flex h-44 w-[85px] flex-shrink-0 flex-col items-center bg-sigma pt-[45px]"
      >
        <h2 class="font-extrabold text-white">VENTA</h2>
        <span class="relative top-[1px] text-lg font-semibold leading-tight text-white">{{
          formatAmount(props.post.price)
        }}</span>
        <span class="uppercase text-white">{{ props.post.currency }}</span>
      </div>
      <div
        v-else
        class="clip flex h-44 w-[85px] flex-shrink-0 flex-col items-center bg-sgreen-300 pt-[45px]"
      >
        <h2 class="font-extrabold text-white">RENTA</h2>
        <span class="relative top-[1px] text-lg font-semibold leading-tight text-white">{{
          formatAmount(props.post.tax)
        }}</span>
        <span class="uppercase text-white"
          >{{ props.post.currency }} /
          <span class="lowercase">{{
            props.post.frequency === "daily" ? "día" : "mes"
          }}</span></span
        >
      </div>
      <div class="flex h-[60px] flex-grow items-center py-[6px] pl-[5px]">
        <span
          v-if="props.post.address.province === 'Isla de la Juventud'"
          class="text-xs font-semibold text-sgray-300"
          >{{ props.post.address.province }}</span
        >
        <span v-else class="text-xs font-semibold text-sgray-300"
          >{{ props.post.address.municipality }}, {{ props.post.address.province }}</span
        >
      </div>
      <!-- Features -->
      <div class="feature-container grid h-full flex-shrink-0 grid-cols-3 grid-rows-2 gap-x-1">
        <!-- Bed Room -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon
            :classes="defineFeatureStyles(props.post.features.bed_room)"
            icon="bed_room"
          />
          <span
            class="text-shadow text-xs"
            :class="props.post.features.bed_room > 0 ? 'text-sgray-400' : 'text-sgray-200'"
            >x{{ props.post.features.bed_room }}</span
          >
        </div>
        <!-- Bath Room -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon
            :classes="defineFeatureStyles(props.post.features.bath_room)"
            icon="bath_room"
          />
          <span
            class="text-shadow text-xs"
            :class="props.post.features.bed_room > 0 ? 'text-sgray-400' : 'text-sgray-200'"
            >x{{ props.post.features.bath_room }}</span
          >
        </div>
        <!-- Garage -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon :classes="defineFeatureStyles(props.post.features.garage)" icon="garage" />
          <BooleanIcon :icon="props.post.features.garage" :weigth="'ligth'" />
        </div>
        <!-- Garden -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon :classes="defineFeatureStyles(props.post.features.garden)" icon="garden" />
          <BooleanIcon :icon="props.post.features.garden" :weigth="'ligth'" />
        </div>
        <!-- Pool -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon :classes="defineFeatureStyles(props.post.features.pool)" icon="pool" />
          <BooleanIcon :icon="props.post.features.pool" :weigth="'ligth'" />
        </div>
        <!-- Furnished -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon
            :classes="defineFeatureStyles(props.post.features.furnished)"
            icon="furnished"
          />
          <BooleanIcon :icon="props.post.features.furnished" :weigth="'ligth'" />
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
