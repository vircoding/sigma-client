<script setup>
  const props = defineProps(["modelValue", "index", "feature", "string", "error"]);
  defineEmits(["update:modelValue"]);

  const parseValue = (value) => {
    if (parseInt(value) >= 0) return parseInt(value);
    else return "";
  };
</script>

<template>
  <div class="flex flex-col">
    <label
      v-if="!props.error"
      :for="props.feature + '-' + props.index"
      class="pl-[6px] font-medium text-sblue-500"
      >{{ props.string }}</label
    >
    <label
      v-else
      :for="props.feature + '-' + props.index"
      class="flex items-center gap-[3px] pl-[6px] font-medium text-alert"
    >
      <img src="../assets/warning-icon.svg" class="relative bottom-[1px] w-[19px]" />
      <span>0-9</span>
    </label>
    <input
      type="number"
      :id="props.feature + '-' + props.index"
      :name="props.feature"
      min="0"
      max="10"
      pattern="[0-9]*"
      :value="modelValue"
      @input="$emit('update:modelValue', parseValue($event.target.value))"
      class="w-full rounded-lg border bg-transparent px-4 pb-[5px] pt-[7px] outline-none transition-colors duration-200 focus:bg-white"
      :class="props.error ? 'border-alert' : 'border-sgray-200 focus:border-sigma'"
    />
  </div>
</template>
