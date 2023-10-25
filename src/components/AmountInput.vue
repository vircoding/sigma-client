<script setup>
  const props = defineProps(["modelValue", "type"]);
  defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex flex-col">
    <label class="pl-2 font-medium text-sgray-300" for="amount"
      >{{ props.type === "sale" ? "Precio" : "Tarifa" }}:</label
    >
    <input
      type="number"
      id="amount"
      name="amount"
      min="1"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full rounded-md border border-sgray-100 bg-transparent px-4 pb-[5px] pt-[7px] outline-none transition-colors duration-200 focus:border-sgray-300 focus:bg-white"
    />
  </div>
</template>
