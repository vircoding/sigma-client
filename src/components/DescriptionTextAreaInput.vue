<script setup>
  import { computed } from "vue";

  const props = defineProps(["modelValue", "error"]);
  defineEmits(["update:modelValue"]);

  const valueLength = computed(() => {
    return props.modelValue.length;
  });
</script>

<template>
  <div class="flex w-full flex-col">
    <div class="flex w-full justify-between">
      <label v-if="!props.error" for="description" class="mb-1 pl-2 font-medium">Descripción</label>
      <label v-else for="description" class="mb-1 pl-2 font-medium text-alert"
        >No más de 1200 caracteres</label
      >
      <span v-if="!props.error" class="relative top-[2px] pr-2 text-sm font-medium"
        >{{ valueLength }}/1200 caracteres</span
      >
      <span v-else class="relative top-[2px] pr-2 text-sm font-medium text-alert"
        >{{ valueLength }}/1200</span
      >
    </div>
    <textarea
      id="description"
      name="description"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="h-[300px] w-full resize-none rounded-md border bg-transparent px-4 pb-[5px] pt-[7px] outline-none transition-colors duration-200 focus:bg-white"
      :class="props.error ? 'border-alert' : 'border-sgray-100 focus:border-sgray-300'"
    ></textarea>
  </div>
</template>
