<script setup>
  const props = defineProps(["modelValue", "type", "error", "edit"]);
  defineEmits(["update:modelValue", "focused"]);
</script>

<template>
  <div class="flex flex-col">
    <label
      v-if="!props.error"
      :for="props.type"
      class="flex items-center gap-[6px] pl-2 font-medium text-sblue-500"
    >
      <img v-if="props.edit" src="../assets/edit-icon.svg" class="w-[14px]" />
      <span>{{
        props.type === "email" ? "Correo Electrónico" : "Correo Electrónico Público"
      }}</span>
    </label>
    <label v-else :for="props.type" class="flex items-center gap-[3px] pl-2 font-medium text-alert">
      <img src="../assets/warning-icon.svg" class="relative bottom-[1px] w-[19px]" />
      <span>Correo Electrónico no válido</span>
    </label>
    <input
      type="email"
      :id="props.type"
      :name="props.type"
      :value="props.modelValue"
      autocomplete="email"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="$emit('focused')"
      class="w-full rounded-lg border bg-transparent px-4 pb-[5px] pt-[7px] outline-none transition-colors duration-200 focus:bg-white"
      :class="props.error ? 'border-alert' : 'border-sgray-200 focus:border-sigma'"
    />
  </div>
</template>

<style scoped>
  input {
    color: #011b33;
  }
</style>
