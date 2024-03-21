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

  const checkNone = computed(() => {
    return props.modelValue === "none";
  });
</script>

<template>
  <!-- none (Default) -->
  <input
    type="radio"
    id="currency-none"
    :checked="props.modelValue === 'none'"
    name="currency"
    value="none"
    :value="props.modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="hidden"
  />
  <label for="currency-none" class="flex flex-row items-center gap-1">
    <CheckboxIcon :status="checkNone" />
    <span class="font-medium text-sblue-500">Cualquiera</span>
  </label>

  <!-- USD -->
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
  <label for="currency-usd" class="flex flex-row items-center gap-1">
    <CheckboxIcon :status="checkUSD" />
    <span class="font-medium text-sblue-500">USD</span>
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
  <label for="currency-cup" class="flex flex-row items-center gap-1">
    <CheckboxIcon :status="checkCUP" />
    <span class="font-medium text-sblue-500">CUP</span>
  </label>
</template>
