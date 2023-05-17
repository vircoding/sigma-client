<script setup>
  defineProps(["modelValue", "type", "optionsList"]);
  defineEmits(["update:modelValue"]);
</script>

<template>
  <select :name="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
    <option v-if="type === 'municipality'" disabled value="">Municipio</option>
    <option v-for="(item, index) in optionsList" :key="index" :value="item">{{ item }}</option>
  </select>
</template>
