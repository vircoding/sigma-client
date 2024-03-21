<script setup>
  defineProps(["modelValue"]);
  defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex flex-col">
    <label for="offers" class="pl-2 font-medium text-sblue-500">Ofreces</label>
    <select
      name="offers"
      id="offers"
      :value="modelValue"
      @input="$emit('update:modelValue', parseInt($event.target.value))"
      class="w-full appearance-none rounded-lg border border-sgray-200 bg-transparent px-4 pb-[5px] pt-[7px] outline-none transition-colors duration-200 focus:border-sigma focus:bg-white"
    >
      <option value="1">1 Propiedad</option>
      <option value="2">2 Propiedades</option>
      <option value="3">3 Propiedades</option>
    </select>
  </div>
</template>

<style scoped>
  select {
    color: #011b33;
  }
</style>
