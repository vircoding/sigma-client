<script setup>
  import { ref, computed } from "vue";
  import SigmaHouseIcon from "./icons/SigmaHouseIcon.vue";

  const props = defineProps(["modelValue", "type"]);
  defineEmits(["update:modelValue"]);

  const saleFill = computed(() => {
    return props.modelValue === "sale";
  });

  const rentFill = computed(() => {
    return props.modelValue === "rent";
  });

  const mnFill = computed(() => {
    return props.modelValue === "mn";
  });

  const usdFill = computed(() => {
    return props.modelValue === "usd";
  });

  const monthlyFill = computed(() => {
    return props.modelValue === "monthly";
  });

  const dailyFill = computed(() => {
    return props.modelValue === "daily";
  });
</script>

<template>
  <div v-if="type === 'type'" class="flex flex-row gap-1">
    <input
      type="radio"
      id="type-sale"
      :checked="props.modelValue === 'sale'"
      name="type"
      value="sale"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="hidden"
    />
    <label for="type-sale" class="flex w-[70px] flex-row items-center">
      <SigmaHouseIcon class="h-6" :class="saleFill ? 'fill-sgray-400' : 'fill-sgray-200'" />
      <span class="font-medium text-sgray-300 lg:text-lg">Venta</span>
    </label>
    <input
      type="radio"
      id="type-rent"
      :checked="props.modelValue === 'rent'"
      name="type"
      value="rent"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="hidden"
    />
    <label for="type-rent" class="flex w-[70px] flex-row items-center">
      <SigmaHouseIcon class="h-6" :class="rentFill ? 'fill-sgray-400' : 'fill-sgray-200'" />
      <span class="font-medium text-sgray-300 lg:text-lg">Renta</span>
    </label>
  </div>

  <div v-else-if="type === 'currency'" class="flex flex-row gap-1">
    <input
      type="radio"
      id="currency-mn"
      checked
      :checked="props.modelValue === 'mn'"
      name="currency"
      value="mn"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="hidden"
    />
    <label for="currency-mn" class="flex w-[70px] flex-row items-center">
      <SigmaHouseIcon class="h-6" :class="mnFill ? 'fill-sgray-400' : 'fill-sgray-200'" />
      <span class="font-medium text-sgray-300 lg:text-lg">MN</span>
    </label>
    <input
      type="radio"
      id="currency-usd"
      :checked="props.modelValue === 'usd'"
      name="currency"
      value="usd"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="hidden"
    />
    <label for="currency-usd" class="flex w-[70px] flex-row items-center">
      <SigmaHouseIcon class="h-6" :class="usdFill ? 'fill-sgray-400' : 'fill-sgray-200'" />
      <span class="font-medium text-sgray-300 lg:text-lg">USD</span>
    </label>
  </div>

  <div v-else-if="type === 'frequency'" class="flex flex-row gap-1">
    <input
      type="radio"
      id="frequency-monthly"
      :checked="props.modelValue === 'monthly'"
      name="frequency"
      value="monthly"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="hidden"
    />
    <label for="frequency-monthly" class="flex w-[85px] flex-row items-center">
      <SigmaHouseIcon class="h-6" :class="monthlyFill ? 'fill-sgray-400' : 'fill-sgray-200'" />
      <span class="font-medium text-sgray-300 lg:text-lg">Mensual</span>
    </label>
    <input
      type="radio"
      id="frequency-daily"
      :checked="props.modelValue === 'daily'"
      name="frequency"
      value="daily"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="hidden"
    />
    <label for="frequency-daily" class="flex w-[70px] flex-row items-center">
      <SigmaHouseIcon class="h-6" :class="dailyFill ? 'fill-sgray-400' : 'fill-sgray-200'" />
      <span class="font-medium text-sgray-300 lg:text-lg">Diario</span>
    </label>
  </div>
</template>
