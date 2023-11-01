<script setup>
  import { provinceList } from "../utils/provinces.js";

  defineProps(["modelValue", "index"]);
  defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex flex-col">
    <label :for="'province-' + index" class="pl-2 font-medium">Provincia</label>
    <select
      name="province"
      :id="'province-' + index"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full appearance-none rounded-md border border-sgray-100 bg-transparent px-4 pb-[5px] pt-[7px] font-medium outline-none transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-sgray-300 focus:border-transparent focus:bg-white focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:text-lg"
    >
      <option v-for="(item, index) in provinceList" :key="index" :value="item">{{ item }}</option>
    </select>
  </div>
</template>
