<script setup>
  import { ref } from "vue";
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
  <div>
    <div class="text-shadow w-full overflow-hidden rounded-lg border border-sgray-100">
      <!-- Top -->
      <div class="flex h-[80px] w-full items-center justify-center bg-white">
        <!-- Exchange Info -->
        <div
          class="flex h-full w-[28%] flex-col items-center justify-center bg-sviolet text-center text-white"
        >
          <span class="text-base font-extrabold">PERMUTA</span>
          <!-- Needs Enabled -->
          <span
            v-if="props.exchange.offer_details.needs.enable"
            class="relative -top-[2px] font-semibold"
            >{{ props.exchange.offer_details.offers }} x
            {{ props.exchange.offer_details.needs.count }}</span
          >
          <!-- Needs Disabled -->
          <span v-else>{{ props.exchange.offer_details.offers }}</span>
          <!-- Needs Enabled -->
          <span v-if="props.exchange.offer_details.needs.enable" class="text-xs">propiedades</span>
          <!-- Needs Disabled -->
          <span v-else class="text-xs">{{
            props.exchange.offer_details.offers === 1 ? "propiedad" : "propiedades"
          }}</span>
          <!-- <div
            v-if="props.exchange.offer_details.needs.enable"
            class="flex flex-col items-center gap-[2px]"
          >
            <span class="relative top-[1px] text-lg font-semibold leading-tight text-white">
              {{ props.exchange.offer_details.offers }} x
              {{ props.exchange.offer_details.needs.count }}
            </span>
          </div> -->
          <!-- <div
            v-else-if="!props.exchange.offer_details.needs.enable"
            class="flex flex-col items-center gap-[2px]"
          >
            <span class="relative top-[1px] text-lg font-semibold leading-tight text-white">
              {{ props.exchange.offer_details.offers }}
            </span>
            <span class="text-xs text-white">propiedades</span>
          </div> -->
        </div>

        <!-- Features -->
        <div class="flex h-full flex-grow items-center justify-center px-2 py-3">
          <div class="grid h-full grid-cols-3 grid-rows-2 gap-x-3">
            <!-- Bed Room -->
            <div class="flex items-center gap-[2px]">
              <FeatureIcon
                :classes="
                  defineFeatureStyles(
                    props.exchange.property_details[propertyIndex].features.bed_room
                  )
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
                  defineFeatureStyles(
                    props.exchange.property_details[propertyIndex].features.bath_room
                  )
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
                  defineFeatureStyles(
                    props.exchange.property_details[propertyIndex].features.garage
                  )
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
                  defineFeatureStyles(
                    props.exchange.property_details[propertyIndex].features.garden
                  )
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
                  defineFeatureStyles(
                    props.exchange.property_details[propertyIndex].features.furnished
                  )
                "
                icon="furnished"
              />
              <BooleanIcon
                :icon="props.exchange.property_details[propertyIndex].features.furnished"
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
          <!-- <button
            v-if="!props.favorite"
            class="gradient w-full rounded-md bg-sviolet py-[3px] text-sm font-semibold"
          >
            <span class="text-shadow text-white">VENDIDA</span>
          </button> -->
        </div>
      </div>
    </div>
    <div
      v-if="props.exchange.property_details.length > 1"
      class="text-shadow ml-[28%] flex w-fit flex-row overflow-hidden rounded-b"
    >
      <div
        @click.prevent="switchProperty(0)"
        class="w-[30px] text-center"
        :class="activeProperty[0] ? 'bg-white' : 'bg-sgray-100'"
      >
        <span class="text-shadow relative top-[1px]">1</span>
      </div>
      <div
        @click.prevent="switchProperty(1)"
        class="w-[30px] text-center"
        :class="activeProperty[1] ? 'bg-white' : 'bg-sgray-100'"
      >
        <span class="text-shadow relative top-[1px]">2</span>
      </div>
      <div
        v-if="props.exchange.property_details.length > 2"
        @click.prevent="switchProperty(2)"
        class="w-[30px] text-center"
        :class="activeProperty[2] ? 'bg-white' : 'bg-sgray-100'"
      >
        <span class="text-shadow relative top-[1px]">3</span>
      </div>
    </div>
  </div>
</template>
