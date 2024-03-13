<script setup>
  import { provinceList } from "../utils/provinces.js";

  defineProps(["modelValue", "index"]);
  defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex flex-col">
    <label :for="'province-' + index" class="pl-2 font-medium text-sblue-500">Provincia</label>
    <select
      name="province"
      :id="'province-' + index"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full appearance-none rounded-lg border border-sgray-100 bg-transparent px-4 pb-[5px] pt-[7px] outline-none transition-colors duration-200 focus:border-sblue-500 focus:bg-white"
    >
      <option v-for="(item, index) in provinceList" :key="index" :value="item">{{ item }}</option>
    </select>
  </div>
</template>
