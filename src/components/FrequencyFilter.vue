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

  const checkNone = computed(() => {
    return props.modelValue === "none";
  });
</script>

<template>
  <!-- none (Default) -->
  <input
    type="radio"
    id="frequency-none"
    :checked="props.modelValue === 'none'"
    name="frequency"
    value="none"
    :value="props.modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="hidden"
  />
  <label for="frequency-none" class="flex flex-row items-center gap-1">
    <CheckboxIcon :status="checkNone" />
    <span class="font-medium lg:text-lg">Cualquiera</span>
  </label>

  <!-- Daily -->
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
  <label for="frequency-daily" class="flex flex-row items-center gap-1">
    <CheckboxIcon :status="checkDaily" />
    <span class="font-medium lg:text-lg">Diario</span>
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
  <label for="frequency-monthly" class="flex flex-row items-center gap-1">
    <CheckboxIcon :status="checkMonthly" />
    <span class="font-medium lg:text-lg">Mensual</span>
  </label>
</template>
