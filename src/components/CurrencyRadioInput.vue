<script setup>
  import { computed } from "vue";
  import CheckboxIcon from "./icons/CheckboxIcon.vue";

  const props = defineProps(["modelValue"]);
  defineEmits(["update:modelValue"]);

  const checkUSD = computed(() => {
    return props.modelValue === "usd";
  });

  const checkCUP = computed(() => {
    return props.modelValue === "cup";
  });
</script>

<template>
  <!-- USD (Default) -->
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
  <label for="currency-usd" class="flex w-[70px] flex-row items-center gap-1">
    <CheckboxIcon :status="checkUSD" />
    <span class="font-medium lg:text-lg">USD</span>
  </label>

  <!-- CUP -->
  <input
    type="radio"
    id="currency-cup"
    :checked="props.modelValue === 'cup'"
    name="currency"
    value="cup"
    :value="props.modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="hidden"
  />
  <label for="currency-cup" class="flex w-[70px] flex-row items-center gap-1">
    <CheckboxIcon :status="checkCUP" />
    <span class="font-medium lg:text-lg">CUP</span>
  </label>
</template>
