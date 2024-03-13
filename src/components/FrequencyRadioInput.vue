<script setup>
  import { computed } from "vue";
  import CheckboxIcon from "./icons/CheckboxIcon.vue";

  const props = defineProps(["modelValue"]);
  defineEmits(["update:modelValue"]);

  const checkDaily = computed(() => {
    return props.modelValue === "daily";
  });

  const checkMonthly = computed(() => {
    return props.modelValue === "monthly";
  });
</script>

<template>
  <!-- Daily (Default) -->
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
  <label for="frequency-daily" class="flex w-[70px] flex-row items-center gap-1">
    <CheckboxIcon :status="checkDaily" />
    <span class="font-medium text-sblue-500">Diario</span>
  </label>

  <!-- Monthly -->
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
  <label for="frequency-monthly" class="flex w-[70px] flex-row items-center gap-1">
    <CheckboxIcon :status="checkMonthly" />
    <span class="font-medium text-sblue-500">Mensual</span>
  </label>
</template>
