<script setup>
  const props = defineProps(["modelValue", "error", "edit"]);
  defineEmits(["update:modelValue", "focused"]);
</script>

<template>
  <div class="flex flex-col">
    <label
      v-if="!props.error"
      for="username"
      class="flex items-center gap-[6px] pl-2 font-medium text-sblue-500"
    >
      <img v-if="props.edit" src="../assets/edit-icon.svg" class="w-[14px]" />
      <span>Nombre de usuario</span>
    </label>
    <label v-else for="username" class="pl-2 font-medium italic text-alert"
      >Nombre de usuario Inválido</label
    >
    <input
      autocomplete="name"
      type="text"
      id="username"
      name="username"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="$emit('focused')"
      class="w-full rounded-lg border bg-transparent px-4 pb-[5px] pt-[7px] outline-none transition-colors duration-200 focus:bg-white"
      :class="props.error ? 'border-alert' : 'border-sgray-100 focus:border-sblue-500'"
    />
  </div>
</template>
