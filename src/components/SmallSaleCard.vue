<script setup>
  import { ref } from "vue";
  import ShareButton from "./ShareButton.vue";
  import FeatureIcon from "./icons/FeatureIcon.vue";
  import { formatAmount } from "../utils/formatAmount.js";
  import BooleanIcon from "./icons/BooleanIcon.vue";

  const props = defineProps(["index", "favorite", "sale"]);
  defineEmits(["delete"]);

  const defineFeatureStyles = (count) => {
    let fill;
    if (Boolean(count)) fill = "fill-sigma";
    else fill = "fill-sgray-200";
    return `h-[20px] w-[20px] ${fill}`;
  };
</script>

<template>
  <div class="text-shadow w-full overflow-hidden rounded-md">
    <!-- Top -->
    <div class="flex h-[80px] w-full items-center justify-center bg-white">
      <!-- Sale Info -->
      <div
        class="flex h-full w-[28%] flex-col items-center justify-center bg-sigma px-2 py-3 text-center text-white"
      >
        <span class="font-extrabold">VENTA</span>
        <span class="relative top-[1px] text-base font-semibold leading-tight">{{
          formatAmount(props.sale.amount_details.amount, true)
        }}</span>
        <span class="uppercase">{{ props.sale.amount_details.currency }}</span>
      </div>

      <!-- Features -->
      <div class="flex h-full flex-grow items-center justify-center px-2 py-3">
        <div class="grid h-full grid-cols-3 grid-rows-2 gap-x-3">
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

      <!-- Buttons -->
      <div class="flex h-full w-[28%] flex-col items-center justify-center gap-2 px-2 py-3">
        <div class="flex items-center justify-center gap-2">
          <!-- Edit -->
          <RouterLink v-if="!props.favorite" :to="`/post/edit/${props.sale.id}`">
            <img src="../assets/edit-icon.svg" class="h-[18px] w-[18px]" />
          </RouterLink>

          <!-- Share -->
          <ShareButton :url="`http://localhost:5173/post/${props.sale.id}`" />

          <!-- Delete Post -->
          <img
            v-if="!props.favorite"
            @click.prevent="$emit('delete', props.sale.id)"
            src="../assets/delete-icon.svg"
            class="h-[18px] w-[18px]"
          />

          <!-- Remove Favorite -->
          <img
            v-else
            @click.prevent="removeFavorite"
            src="../assets/close-icon.svg"
            class="h-[16px] w-[16px]"
          />
        </div>

        <!-- Sell -->
        <button
          v-if="!props.favorite"
          class="gradient w-full rounded-md bg-sigma py-[3px] text-sm font-semibold"
        >
          <span class="text-shadow text-white">VENDIDA</span>
        </button>
      </div>
    </div>
  </div>
</template>
