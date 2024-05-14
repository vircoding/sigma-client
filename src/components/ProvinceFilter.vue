<script setup>
  import { provinceList } from "../utils/provinces.js";

  defineProps(["modelValue"]);
  defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="relative flex flex-col">
    <label for="province" class="pl-2 font-medium text-sblue-500">Provincia</label>
    <select
      name="province"
      id="province"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full appearance-none rounded-lg border border-sgray-200 bg-transparent px-4 pb-[5px] pt-[7px] outline-none transition-colors duration-200 focus:border-sigma focus:bg-white"
    >
      <option value="none">Sin especificar</option>
      <option v-for="(item, index) in provinceList" :key="index" :value="item">{{ item }}</option>
    </select>
    <img src="../assets/down-arrow-icon.svg" class="absolute right-4 top-[34px] w-5" />
  </div>
</template>

<style scoped>
  select {
    color: #011b33;
  }
</style>
