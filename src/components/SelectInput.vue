<script setup>
  defineProps(["modelValue", "type", "optionsList"]);
  defineEmits(["update:modelValue"]);
</script>

<template>
  <select
    :name="type"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="w-full appearance-none rounded-md border border-sgray-100 bg-transparent px-4 py-2 font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:text-lg"
  >
    <option v-if="type === 'municipality'" disabled value="">Municipio</option>
    <option v-for="(item, index) in optionsList" :key="index" :value="item">{{ item }}</option>
  </select>
</template>
