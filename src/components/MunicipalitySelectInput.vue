<script setup>
  import { municipalityList } from "../utils/provinces.js";

  defineProps(["modelValue", "index", "province"]);
  defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex flex-col">
    <label :for="'municipality-' + index" class="pl-2 font-medium">Municipio</label>
    <select
      name="municipality"
      :id="'municipality-' + index"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full appearance-none rounded-md border border-sgray-100 bg-transparent px-4 pb-[5px] pt-[7px] outline-none transition-colors duration-200 focus:border-sgray-300 focus:bg-white"
    >
      <option v-for="(item, index) in municipalityList[province]" :key="index" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>
