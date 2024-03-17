<script setup>
  const props = defineProps(["modelValue", "error"]);
  defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    type="text"
    id="code"
    name="code"
    :value="props.modelValue"
    placeholder="+53"
    @input="$emit('update:modelValue', $event.target.value)"
    class="w-[80px] rounded-lg border bg-transparent px-4 pb-[5px] pt-[7px] text-center outline-none transition-colors duration-200 focus:bg-white"
    :class="props.error ? 'border-alert' : 'border-sgray-200 focus:border-sigma'"
  />
</template>
