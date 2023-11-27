<script setup>
  import { computed } from "vue";
  import SigmaHouseIcon from "./icons/SigmaHouseIcon.vue";
  import CheckboxIcon from "./icons/CheckboxIcon.vue";

  const props = defineProps(["modelValue"]);
  defineEmits(["update:modelValue"]);

  const checkSale = computed(() => {
    return props.modelValue === "sale";
  });

  const checkRent = computed(() => {
    return props.modelValue === "rent";
  });

  const checkExchange = computed(() => {
    return props.modelValue === "exchange";
  });
</script>

<template>
  <div class="flex flex-col gap-1">
    <!-- Sale (Default) -->
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
    <label for="type-sale" class="flex w-[70px] flex-row items-center gap-1">
      <CheckboxIcon :status="checkSale" />
      <span class="font-medium text-sgray-300 lg:text-lg">Venta</span>
    </label>
    <!-- Exchange -->
    <input
      type="radio"
      id="type-exchange"
      :checked="props.modelValue === 'exchange'"
      name="type"
      value="exchange"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="hidden"
    />
    <label for="type-exchange" class="flex w-[70px] flex-row items-center gap-1">
      <CheckboxIcon :status="checkExchange" />
      <span class="font-medium text-sgray-300 lg:text-lg">Permuta</span>
    </label>
    <!-- Rent -->
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
    <label for="type-rent" class="flex w-[70px] flex-row items-center gap-1">
      <CheckboxIcon :status="checkRent" />
      <span class="font-medium text-sgray-300 lg:text-lg">Renta</span>
    </label>
  </div>
</template>
