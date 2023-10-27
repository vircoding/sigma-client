<script setup>
  import CheckboxIcon from "./icons/CheckboxIcon.vue";

  const props = defineProps(["modelValue"]);
  defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex gap-2 pl-[10px]">
    <input
      type="checkbox"
      id="whatsapp"
      name="whatsapp"
      :value="props.modelValue"
      @input="$emit('update:modelValue', !props.modelValue)"
      class="hidden"
    />
    <label for="whatsapp" class="flex w-full flex-row items-center gap-1">
      <CheckboxIcon :status="props.modelValue" />
      <span class="relative font-medium lg:text-lg">Contactar por Whatsapp</span>
    </label>
  </div>
</template>
