<script setup>
  import SigmaVerticalIcon from "./icons/SigmaVerticalIcon.vue";
  import FeatureIcon from "./icons/FeatureIcon.vue";
  import BooleanIcon from "./icons/BooleanIcon.vue";

  const props = defineProps(["exchange"]);

  const defineFeatureStyles = (count) => {
    let fill;
    if (Boolean(count)) fill = "fill-solive-300";
    else fill = "fill-sgray-200";
    return `h-[15px] w-[15px] min-[400px]:h-[18px] min-[400px]:w-[18px] ${fill}`;
  };

  const defineClipHeight = (length) => {
    if (length === 1) return "h-[120px] pt-[21px]";
    else if (length === 2) return "h-[178px] pt-7";
    else if (length === 3) return "h-[238px] pt-8";
    else return "h-0";
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
    <div
      v-for="(item, index) in props.exchange.property_details"
      :key="index"
      class="relative flex h-[60px] w-full items-center"
    >
      <!-- Clip -->
      <div
        v-if="props.exchange.offer_details.offers === 1"
        class="clip flex h-44 w-[85px] flex-shrink-0 flex-col items-center bg-solive-300 pt-[45px]"
      >
        <h2 class="font-extrabold text-white">PERMUTA</h2>
        <div
          v-if="props.exchange.offer_details.needs.enable"
          class="flex flex-col items-center gap-[2px]"
        >
          <span class="relative top-[1px] text-lg font-semibold leading-tight text-white">
            {{ props.exchange.offer_details.offers }} x
            {{ props.exchange.offer_details.needs.count }}
          </span>
          <span class="text-xs text-white">propiedades</span>
        </div>
        <div
          v-else-if="!props.exchange.offer_details.needs.enable"
          class="flex flex-col items-center gap-[2px]"
        >
          <span class="relative top-[1px] text-lg font-semibold leading-tight text-white">
            {{ props.exchange.offer_details.offers }}
          </span>
          <span class="text-xs text-white">propiedades</span>
        </div>
      </div>
      <!-- Clip Region -->
      <div v-else class="clip-region invisible h-full w-[85px] flex-shrink-0 pt-[45px]"></div>

      <!-- Address -->
      <div class="flex h-[60px] flex-grow items-center py-[6px] pl-[5px]">
        <span
          v-if="item.address.province === 'Isla de la Juventud'"
          class="text-xs font-semibold text-sgray-300"
          >{{ item.address.province }}</span
        >
        <span v-else class="text-xs font-semibold text-sgray-300"
          >{{ item.address.municipality }}, {{ item.address.province }}</span
        >
      </div>

      <!-- Features -->
      <div class="feature-container grid h-full flex-shrink-0 grid-cols-3 grid-rows-2 gap-x-1">
        <!-- Bed Room -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon :classes="defineFeatureStyles(item.features.bed_room)" icon="bed_room" />
          <span
            class="text-shadow text-xs"
            :class="item.features.bed_room > 0 ? 'text-sgray-400' : 'text-sgray-200'"
            >x{{ item.features.bed_room }}</span
          >
        </div>
        <!-- Bath Room -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon :classes="defineFeatureStyles(item.features.bath_room)" icon="bath_room" />
          <span
            class="text-shadow text-xs"
            :class="item.features.bed_room > 0 ? 'text-sgray-400' : 'text-sgray-200'"
            >x{{ item.features.bath_room }}</span
          >
        </div>
        <!-- Garage -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon :classes="defineFeatureStyles(item.features.garage)" icon="garage" />
          <BooleanIcon :icon="item.features.garage" :weigth="'ligth'" />
        </div>
        <!-- Garden -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon :classes="defineFeatureStyles(item.features.garden)" icon="garden" />
          <BooleanIcon :icon="item.features.garden" :weigth="'ligth'" />
        </div>
        <!-- Pool -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon :classes="defineFeatureStyles(item.features.pool)" icon="pool" />
          <BooleanIcon :icon="item.features.pool" :weigth="'ligth'" />
        </div>
        <!-- Furnished -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon :classes="defineFeatureStyles(item.features.furnished)" icon="furnished" />
          <BooleanIcon :icon="item.features.furnished" :weigth="'ligth'" />
        </div>
      </div>
    </div>

    <!-- Clip -->

    <div
      v-if="props.exchange.offer_details.offers !== 1"
      class="clip absolute bottom-0 flex w-[85px] flex-shrink-0 flex-col items-center justify-center bg-solive-300"
      :class="defineClipHeight(props.exchange.property_details.length)"
    >
      <h2 class="font-extrabold text-white">PERMUTA</h2>
      <div
        v-if="props.exchange.offer_details.needs.enable"
        class="flex flex-col items-center gap-[2px]"
      >
        <span class="relative top-[1px] text-lg font-semibold leading-tight text-white">
          {{ props.exchange.offer_details.offers }} x
          {{ props.exchange.offer_details.needs.count }}
        </span>
        <span class="text-xs text-white">propiedades</span>
      </div>
      <div
        v-else-if="!props.exchange.offer_details.needs.enable"
        class="flex flex-col items-center gap-[2px]"
      >
        <span class="relative top-[1px] text-lg font-semibold leading-tight text-white">
          {{ props.exchange.offer_details.offers }}
        </span>
        <span class="text-xs text-white">propiedades</span>
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

    .clip-region {
      margin-left: 8px;
    }

    .clip {
      margin-left: 8px;
    }
  }
</style>
