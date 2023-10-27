<script setup>
  const props = defineProps(["modelValue"]);
  defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    type="tel"
    id="phone"
    name="phone"
    :value="props.modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="w-full rounded-md border border-sgray-100 bg-transparent px-4 pb-[5px] pt-[7px] outline-none transition-colors duration-200 focus:border-sgray-300 focus:bg-white"
  />
</template>
