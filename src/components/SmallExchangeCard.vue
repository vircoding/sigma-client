<script setup>
  import ShareButton from "./ShareButton.vue";
  import FeatureIcon from "./icons/FeatureIcon.vue";
  import BooleanIcon from "./icons/BooleanIcon.vue";

  const props = defineProps(["index", "favorite", "exchange"]);
  defineEmits(["delete", "remove"]);

  const defineFeatureStyles = (count) => {
    let fill;
    if (Boolean(count)) fill = "fill-sviolet";
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
        class="flex h-full w-[28%] flex-col items-center justify-center bg-sviolet px-2 py-3 text-center text-white"
      >
        <span class="font-extrabold">PERMUTA</span>
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

      <!-- Features -->
      <div class="flex h-full flex-grow items-center justify-center px-2 py-3">
        <div class="grid h-full grid-cols-3 grid-rows-2 gap-x-3">
          <!-- Bed Room -->
          <div class="flex items-center gap-[2px]">
            <FeatureIcon
              :classes="defineFeatureStyles(props.exchange.property_details[0].features.bed_room)"
              icon="bed_room"
            />
            <span
              class="text-shadow text-xs"
              :class="
                props.exchange.property_details[0].features.bed_room > 0
                  ? 'text-sgray-400'
                  : 'text-sgray-200'
              "
              >x{{ props.exchange.property_details[0].features.bed_room }}</span
            >
          </div>

          <!-- Bath Room -->
          <div class="flex items-center gap-[2px]">
            <FeatureIcon
              :classes="defineFeatureStyles(props.exchange.property_details[0].features.bath_room)"
              icon="bath_room"
            />
            <span
              class="text-shadow text-xs"
              :class="
                props.exchange.property_details[0].features.bath_room > 0
                  ? 'text-sgray-400'
                  : 'text-sgray-200'
              "
              >x{{ props.exchange.property_details[0].features.bath_room }}</span
            >
          </div>

          <!-- Garage -->
          <div class="flex items-center gap-[2px]">
            <FeatureIcon
              :classes="defineFeatureStyles(props.exchange.property_details[0].features.garage)"
              icon="garage"
            />
            <BooleanIcon
              :icon="props.exchange.property_details[0].features.garage"
              :weigth="'ligth'"
            />
          </div>

          <!-- Garden -->
          <div class="flex items-center gap-[2px]">
            <FeatureIcon
              :classes="defineFeatureStyles(props.exchange.property_details[0].features.garden)"
              icon="garden"
            />
            <BooleanIcon
              :icon="props.exchange.property_details[0].features.garden"
              :weigth="'ligth'"
            />
          </div>

          <!-- Pool -->
          <div class="flex items-center gap-[2px]">
            <FeatureIcon
              :classes="defineFeatureStyles(props.exchange.property_details[0].features.pool)"
              icon="pool"
            />
            <BooleanIcon
              :icon="props.exchange.property_details[0].features.pool"
              :weigth="'ligth'"
            />
          </div>

          <!-- Furnished -->
          <div class="flex items-center gap-[2px]">
            <FeatureIcon
              :classes="defineFeatureStyles(props.exchange.property_details[0].features.furnished)"
              icon="furnished"
            />
            <BooleanIcon
              :icon="props.exchange.property_details[0].features.furnished"
              :weigth="'ligth'"
            />
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex h-full w-[28%] flex-col items-center justify-center gap-2 px-2 py-3">
        <div class="flex items-center justify-center gap-2">
          <!-- Edit -->
          <RouterLink v-if="!props.favorite" :to="`/post/edit/${props.exchange.id}`">
            <img src="../assets/edit-icon.svg" class="h-[18px] w-[18px]" />
          </RouterLink>

          <!-- Share -->
          <ShareButton :url="`http://localhost:5173/post/${props.exchange.id}`" />

          <!-- Delete Post -->
          <img
            v-if="!props.favorite"
            @click.prevent="$emit('delete', props.exchange.id)"
            src="../assets/delete-icon.svg"
            class="h-[18px] w-[18px]"
          />

          <!-- Remove Favorite -->
          <img
            v-else
            @click.prevent="$emit('remove', props.exchange.id)"
            src="../assets/close-icon.svg"
            class="h-[16px] w-[16px]"
          />
        </div>

        <!-- Sell -->
        <button
          v-if="!props.favorite"
          class="gradient w-full rounded-md bg-sviolet py-[3px] text-sm font-semibold"
        >
          <span class="text-shadow text-white">VENDIDA</span>
        </button>
      </div>
    </div>
  </div>
</template>
