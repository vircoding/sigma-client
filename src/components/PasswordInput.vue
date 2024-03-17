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
      <span>{{ props.type === "password" ? "Contraseña" : "Repetir Contraseña" }}</span>
    </label>
    <label v-else :for="props.type" class="flex items-center gap-[3px] pl-2 font-medium text-alert">
      <img src="../assets/warning-icon.svg" class="relative bottom-[1px] w-[19px]" />
      <span v-if="props.type === 'password'">Contraseña inválida</span>
      <span v-else-if="props.type === 'repassword'">Las contraseñas deben coincidir</span>
    </label>
    <input
      type="password"
      :id="props.type"
      :name="props.type"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="$emit('focused')"
      class="w-full rounded-lg border bg-transparent px-4 pb-[5px] pt-[7px] text-sgray-400 outline-none transition-colors duration-200 focus:bg-white"
      :class="props.error ? 'border-alert' : 'border-sgray-200 focus:border-sigma'"
    />
  </div>
</template>

<style scoped>
  input {
    color: #011b33;
  }
</style>
