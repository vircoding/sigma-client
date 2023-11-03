<script setup>
  const props = defineProps(["modelValue", "index", "feature", "string"]);
  defineEmits(["update:modelValue"]);

  const parseValue = (value) => {
    if (parseInt(value) >= 0) return parseInt(value);
    else return "";
  };
</script>

<template>
  <div class="flex flex-col">
    <label :for="props.feature + '-' + props.index" class="pl-[6px] font-medium">{{
      string
    }}</label>
    <input
      type="number"
      :id="props.feature + '-' + props.index"
      :name="props.feature"
      min="0"
      max="10"
      pattern="[0-9]*"
      :value="modelValue"
      @input="$emit('update:modelValue', parseValue($event.target.value))"
      class="w-full rounded-md border border-sgray-100 bg-transparent px-4 pb-[5px] pt-[7px] outline-none transition-colors duration-200 focus:border-sgray-300 focus:bg-white"
    />
  </div>
</template>
