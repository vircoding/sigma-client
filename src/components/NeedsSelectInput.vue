<script setup>
  defineProps(["modelValue"]);
  defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex flex-col">
    <label for="offers" class="pl-2 font-medium text-sblue-500">Necesitas</label>
    <select
      name="needs"
      id="needs"
      :value="modelValue"
      @input="$emit('update:modelValue', parseInt($event.target.value))"
      class="w-full appearance-none rounded-md border border-sgray-100 bg-transparent px-4 pb-[5px] pt-[7px] outline-none transition-colors duration-200 focus:border-sblue-500 focus:bg-white"
    >
      <option value="0">Sin especificar</option>
      <option value="1">1 Propiedad</option>
      <option value="2">2 Propiedades</option>
      <option value="3">3 Propiedades</option>
    </select>
  </div>
</template>
