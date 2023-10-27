<script setup>
  const props = defineProps(["modelValue", "index", "feature", "string"]);
  defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex flex-col">
    <label :for="props.feature + '-' + props.index" class="pl-2 font-medium text-sgray-300"
      >{{ string }}:</label
    >
    <input
      type="number"
      :id="props.feature + '-' + props.index"
      :name="props.feature"
      min="0"
      max="10"
      pattern="[0-9]*"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full rounded-md border border-sgray-100 bg-transparent px-4 pb-[5px] pt-[7px] outline-none transition-colors duration-200 focus:border-sgray-300 focus:bg-white"
    />
  </div>
</template>
