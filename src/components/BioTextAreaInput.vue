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
      <label v-if="!props.error" for="bio" class="flex items-center gap-[6px] pl-2 font-medium">
        <img v-if="props.edit" src="../assets/edit-icon.svg" class="w-[14px]" />
        <span>Biografía</span>
      </label>
      <label v-else for="bio" class="pl-2 font-medium text-alert">No más de 250 caracteres</label>
      <span v-if="!props.error" class="relative top-[2px] pr-2 text-sm font-medium"
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
      class="h-[300px] w-full resize-none rounded-md border bg-transparent px-4 pb-[5px] pt-[7px] outline-none transition-colors duration-200 focus:bg-white"
      :class="props.error ? 'border-alert' : 'border-sgray-100 focus:border-sgray-300'"
    ></textarea>
  </div>
</template>
