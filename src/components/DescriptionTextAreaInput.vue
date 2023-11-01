<script setup>
  import { computed } from "vue";

  const props = defineProps(["modelValue"]);
  defineEmits(["update:modelValue"]);

  const valueLength = computed(() => {
    return props.modelValue.length;
  });
</script>

<template>
  <div class="flex w-full flex-col">
    <div class="flex w-full justify-between">
      <label for="description" class="mb-1 pl-2 font-medium">Descripción</label>
      <span class="relative top-[2px] pr-2 text-sm font-medium"
        >{{ valueLength }}/1500 caracteres</span
      >
    </div>
    <textarea
      id="description"
      name="description"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="h-[300px] w-full resize-none rounded-md border border-sgray-100 bg-transparent px-4 pb-[5px] pt-[7px] outline-none transition-colors duration-200 focus:border-sgray-300 focus:bg-white"
    ></textarea>
  </div>
</template>
