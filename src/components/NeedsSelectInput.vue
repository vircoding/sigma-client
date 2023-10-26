<script setup>
  defineProps(["modelValue"]);
  defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex flex-col">
    <label for="offers" class="pl-2 font-medium text-sgray-300">Necesitas:</label>
    <select
      name="needs"
      id="needs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full appearance-none rounded-md border border-sgray-100 bg-transparent px-4 pb-[5px] pt-[7px] font-medium outline-none transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-sgray-300 focus:border-transparent focus:bg-white focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:text-lg"
    >
      <option value="0">No es importante</option>
      <option value="1">1 Propiedad</option>
      <option value="2">2 Propiedades</option>
      <option value="3">3 Propiedades</option>
    </select>
  </div>
</template>
