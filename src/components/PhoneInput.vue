<script setup>
  const props = defineProps(["modelValue", "error"]);
  defineEmits(["update:modelValue", "focused"]);
</script>

<template>
  <input
    type="tel"
    id="phone"
    name="phone"
    autocomplete="tel"
    :value="props.modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    @focus="$emit('focused')"
    class="w-full rounded-lg border bg-transparent px-4 pb-[5px] pt-[7px] outline-none transition-colors duration-200 focus:bg-white"
    :class="props.error ? 'border-alert' : 'border-sgray-100 focus:border-sblue-500'"
  />
</template>
