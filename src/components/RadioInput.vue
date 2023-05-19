<script setup>
  defineProps(["modelValue", "type"]);
  defineEmits(["update:modelValue"]);
</script>

<template>
  <div v-if="type === 'type'">
    <input
      type="radio"
      id="type-sale"
      checked
      name="type"
      value="sale"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <label for="type-sale">Venta</label>
    <input
      type="radio"
      id="type-rent"
      name="type"
      value="rent"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <label for="type-rent">Renta</label>
  </div>

  <div v-else-if="type === 'currency'">
    <input
      type="radio"
      id="currency-mn"
      checked
      name="currency"
      value="mn"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <label for="currency-mn">MN</label>
    <input
      type="radio"
      id="currency-usd"
      name="currency"
      value="usd"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <label for="currency-usd">USD</label>
  </div>

  <div v-else-if="type === 'frequency'">
    <input
      type="radio"
      id="frequency-monthly"
      checked
      name="frequency"
      value="monthly"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <label for="frequency-monthly">Mensual</label>
    <input
      type="radio"
      id="frequency-daily"
      name="frequency"
      value="daily"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <label for="frequency-daily">Diario</label>
  </div>
</template>
