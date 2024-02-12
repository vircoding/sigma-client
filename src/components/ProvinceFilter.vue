<script setup>
  import { provinceList } from "../utils/provinces.js";

  defineProps(["modelValue"]);
  defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex flex-col">
    <label for="province" class="pl-2 font-medium">Provincia</label>
    <select
      name="province"
      id="province"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full appearance-none rounded-md border border-sgray-100 bg-transparent px-4 pb-[5px] pt-[7px] outline-none transition-colors duration-200 focus:border-sgray-300 focus:bg-white"
    >
      <option value="none">Sin especificar</option>
      <option v-for="(item, index) in provinceList" :key="index" :value="item">{{ item }}</option>
    </select>
  </div>
</template>
