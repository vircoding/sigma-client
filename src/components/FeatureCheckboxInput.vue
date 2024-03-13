<script setup>
  import CheckboxIcon from "./icons/CheckboxIcon.vue";

  const props = defineProps(["modelValue", "index", "feature", "string"]);
  defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex gap-2">
    <input
      type="checkbox"
      :id="props.feature + '-' + props.index"
      :name="props.feature"
      :value="props.modelValue"
      @input="$emit('update:modelValue', !props.modelValue)"
      class="hidden"
    />
    <label
      :for="props.feature + '-' + props.index"
      class="flex w-[70px] flex-row items-center gap-1"
    >
      <CheckboxIcon :status="props.modelValue" />
      <span class="font-medium text-sblue-500">{{ props.string }}</span>
    </label>
  </div>
</template>
