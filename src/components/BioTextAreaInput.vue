<script setup>
  import { computed } from "vue";

  const props = defineProps(["modelValue", "error", "edit"]);
  defineEmits(["update:modelValue"]);

  const valueLength = computed(() => {
    return props.modelValue.length;
  });
</script>

<template>
  <div class="flex w-full flex-col">
    <div class="flex w-full justify-between">
      <label
        v-if="!props.error"
        for="bio"
        class="flex items-center gap-[6px] pl-2 font-medium text-sblue-500"
      >
        <img v-if="props.edit" src="../assets/edit-icon.svg" class="w-[14px]" />
        <span>Biografía</span>
      </label>
      <label v-else for="bio" class="flex items-center gap-[3px] pl-2 font-medium text-alert">
        <img src="../assets/warning-icon.svg" class="relative bottom-[1px] w-[19px]" />
        <span>No más de 250 caracteres</span>
      </label>
      <span v-if="!props.error" class="relative top-[2px] pr-2 text-sm font-medium text-sblue-500"
        >{{ valueLength }}/250 caracteres</span
      >
      <span v-else class="relative top-[2px] pr-2 text-sm font-medium text-alert"
        >{{ valueLength }}/250</span
      >
    </div>
    <textarea
      id="bio"
      name="bio"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="h-[300px] w-full resize-none rounded-lg border bg-transparent px-4 pb-[5px] pt-[7px] outline-none transition-colors duration-200 focus:bg-white"
      :class="props.error ? 'border-alert' : 'border-sgray-200 focus:border-sigma'"
    ></textarea>
  </div>
</template>

<style scoped>
  textarea {
    color: #011b33;
  }
</style>
