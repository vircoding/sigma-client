<script setup>
  const props = defineProps(["modelValue"]);
  defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    type="text"
    id="code"
    name="code"
    :value="props.modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="w-[80px] rounded-md border border-sgray-100 bg-transparent px-4 pb-[5px] pt-[7px] text-center outline-none transition-colors duration-200 focus:border-sgray-300 focus:bg-white"
    placeholder="+53"
  />
</template>
