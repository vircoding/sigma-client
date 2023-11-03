<script setup>
  const props = defineProps(["modelValue", "type", "error"]);
  defineEmits(["update:modelValue", "focused"]);

  const parseValue = (value) => {
    if (parseInt(value) >= 1) return parseInt(value);
    else return "";
  };
</script>

<template>
  <div class="flex flex-col">
    <label
      v-if="!props.error"
      :for="props.type === 'sale' ? 'sale-amount' : 'rent-amount'"
      class="pl-2 font-medium"
      >{{ props.type === "sale" ? "Precio" : "Tarifa" }}</label
    >
    <label
      v-else
      :for="props.type === 'sale' ? 'sale-amount' : 'rent-amount'"
      class="pl-2 font-medium italic text-alert"
      >Máx. 999 999 999</label
    >
    <input
      type="number"
      :id="props.type === 'sale' ? 'sale-amount' : 'rent-amount'"
      name="amount"
      min="1"
      :value="props.modelValue"
      @input="$emit('update:modelValue', parseValue($event.target.value))"
      @focus="$emit('focused')"
      class="w-full rounded-md border bg-transparent px-4 pb-[5px] pt-[7px] outline-none transition-colors duration-200 focus:bg-white"
      :class="props.error ? 'border-alert' : 'border-sgray-100 focus:border-sgray-300'"
    />
  </div>
</template>
