<script setup>
  import { ref } from "vue";
  import SigmaVerticalIcon from "./icons/SigmaVerticalIcon.vue";
  import FeatureIcon from "./icons/FeatureIcon.vue";
  import BooleanIcon from "./icons/BooleanIcon.vue";

  const props = defineProps(["exchange"]);

  const defineFeatureStyles = (count) => {
    let fill;
    if (Boolean(count)) fill = "fill-sviolet";
    else fill = "fill-sgray-200";
    return `h-[15px] w-[15px] min-[400px]:h-[18px] min-[400px]:w-[18px] ${fill}`;
  };

  const activeProperty = ref([true, false, false]);
  const propertyIndex = ref(0);

  const switchProperty = (index) => {
    switch (index) {
      case 0:
        activeProperty.value = [true, false, false];
        propertyIndex.value = 0;
        break;
      case 1:
        activeProperty.value = [false, true, false];
        propertyIndex.value = 1;
        break;
      case 2:
        activeProperty.value = [false, false, true];
        propertyIndex.value = 2;
        break;
      default:
        break;
    }
  };
</script>

<template>
  <div class="text-shadow w-full overflow-hidden rounded-md shadow-md">
    <div class="relative">
      <img :src="exchange.images[0]" alt="Foto de la casa" />
      <div class="absolute right-0 top-0 p-1">
        <SigmaVerticalIcon class="text-shadow w-14 fill-white" />
      </div>
    </div>
    <div class="relative flex h-[60px] w-full items-center bg-white">
      <!-- Clip -->
      <div class="clip flex h-44 w-[85px] flex-shrink-0 flex-col items-center bg-sviolet pt-[45px]">
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

      <!-- Address -->
      <div class="flex h-[60px] flex-grow items-center py-[6px] pl-[5px]">
        <span
          v-if="
            props.exchange.property_details[propertyIndex].address.province ===
            'Isla de la Juventud'
          "
          class="text-xs font-semibold text-sgray-300"
          >{{ props.exchange.property_details[propertyIndex].address.province }}</span
        >
        <span v-else class="text-xs font-semibold text-sgray-300"
          >{{ props.exchange.property_details[propertyIndex].address.municipality }},
          {{ props.exchange.property_details[propertyIndex].address.province }}</span
        >
      </div>

      <!-- Features -->
      <div class="feature-container grid h-full flex-shrink-0 grid-cols-3 grid-rows-2 gap-x-1">
        <!-- Bed Room -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon
            :classes="
              defineFeatureStyles(props.exchange.property_details[propertyIndex].features.bed_room)
            "
            icon="bed_room"
          />
          <span
            class="text-shadow text-xs"
            :class="
              props.exchange.property_details[propertyIndex].features.bed_room > 0
                ? 'text-sgray-400'
                : 'text-sgray-200'
            "
            >x{{ props.exchange.property_details[propertyIndex].features.bed_room }}</span
          >
        </div>
        <!-- Bath Room -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon
            :classes="
              defineFeatureStyles(props.exchange.property_details[propertyIndex].features.bath_room)
            "
            icon="bath_room"
          />
          <span
            class="text-shadow text-xs"
            :class="
              props.exchange.property_details[propertyIndex].features.bath_room > 0
                ? 'text-sgray-400'
                : 'text-sgray-200'
            "
            >x{{ props.exchange.property_details[propertyIndex].features.bath_room }}</span
          >
        </div>
        <!-- Garage -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon
            :classes="
              defineFeatureStyles(props.exchange.property_details[propertyIndex].features.garage)
            "
            icon="garage"
          />
          <BooleanIcon
            :icon="props.exchange.property_details[propertyIndex].features.garage"
            :weigth="'ligth'"
          />
        </div>
        <!-- Garden -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon
            :classes="
              defineFeatureStyles(props.exchange.property_details[propertyIndex].features.garden)
            "
            icon="garden"
          />
          <BooleanIcon
            :icon="props.exchange.property_details[propertyIndex].features.garden"
            :weigth="'ligth'"
          />
        </div>
        <!-- Pool -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon
            :classes="
              defineFeatureStyles(props.exchange.property_details[propertyIndex].features.pool)
            "
            icon="pool"
          />
          <BooleanIcon
            :icon="props.exchange.property_details[propertyIndex].features.pool"
            :weigth="'ligth'"
          />
        </div>
        <!-- Furnished -->
        <div class="flex items-center gap-[2px]">
          <FeatureIcon
            :classes="
              defineFeatureStyles(props.exchange.property_details[propertyIndex].features.furnished)
            "
            icon="furnished"
          />
          <BooleanIcon
            :icon="props.exchange.property_details[propertyIndex].features.furnished"
            :weigth="'ligth'"
          />
        </div>
      </div>

      <!-- Pages -->
      <div
        v-if="props.exchange.property_details.length > 1"
        class="absolute -top-6 left-[85px] flex overflow-hidden rounded-tr-lg min-[400px]:left-[93px]"
      >
        <!-- 1 -->
        <div
          class="flex h-6 w-7 items-center justify-center"
          :class="activeProperty[0] ? 'bg-white' : 'bg-sgray-200'"
          @click.prevent="switchProperty(0)"
        >
          <span class="text-shadow relative top-[1px]">1</span>
        </div>

        <!-- 2 -->
        <div
          class="flex h-6 w-7 items-center justify-center"
          :class="activeProperty[1] ? 'bg-white' : 'bg-sgray-200'"
          @click.prevent="switchProperty(1)"
        >
          <span class="text-shadow relative top-[1px]">2</span>
        </div>

        <!-- 3 -->
        <div
          v-if="props.exchange.property_details.length > 2"
          class="flex h-6 w-7 items-center justify-center"
          :class="activeProperty[2] ? 'bg-white' : 'bg-sgray-200'"
          @click.prevent="switchProperty(2)"
        >
          <span class="text-shadow relative top-[1px]">3</span>
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
