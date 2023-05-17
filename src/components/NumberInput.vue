<script setup>
  defineProps(["modelValue"]);
  defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    min="0"
    max="5"
    type="number"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
