<script setup>
  import { ref } from "vue";
  import SigmaHouseIcon from "./icons/SigmaHouseIcon.vue";

  defineProps(["modelValue", "type"]);
  defineEmits(["update:modelValue"]);

  const checkStatus = ref({
    firstOption: true,
    secondOption: false,
  });

  const switchFill = (option) => {
    if (option === "first") {
      checkStatus.value.firstOption = true;
      checkStatus.value.secondOption = false;
      return;
    }
    if (option === "second") {
      checkStatus.value.secondOption = true;
      checkStatus.value.firstOption = false;
      return;
    }
  };
</script>

<template>
  <div v-if="type === 'type'" class="flex flex-row gap-1">
    <input
      type="radio"
      id="type-sale"
      checked
      name="type"
      value="sale"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="hidden"
    />
    <label @click="switchFill('first')" for="type-sale" class="flex w-[70px] flex-row items-center">
      <SigmaHouseIcon
        class="h-6"
        :class="checkStatus.firstOption ? 'fill-sgray-400' : 'fill-sgray-200'"
      />
      <span class="font-medium text-sgray-300 lg:text-lg">Venta</span>
    </label>
    <input
      type="radio"
      id="type-rent"
      name="type"
      value="rent"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="hidden"
    />
    <label
      @click="switchFill('second')"
      for="type-rent"
      class="flex w-[70px] flex-row items-center"
    >
      <SigmaHouseIcon
        class="h-6"
        :class="checkStatus.secondOption ? 'fill-sgray-400' : 'fill-sgray-200'"
      />
      <span class="font-medium text-sgray-300 lg:text-lg">Renta</span>
    </label>
  </div>

  <div v-else-if="type === 'currency'" class="flex flex-row gap-1">
    <input
      type="radio"
      id="currency-mn"
      checked
      name="currency"
      value="mn"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="hidden"
    />
    <label
      @click="switchFill('first')"
      for="currency-mn"
      class="flex w-[70px] flex-row items-center"
    >
      <SigmaHouseIcon
        class="h-6"
        :class="checkStatus.firstOption ? 'fill-sgray-400' : 'fill-sgray-200'"
      />
      <span class="font-medium text-sgray-300 lg:text-lg">MN</span>
    </label>
    <input
      type="radio"
      id="currency-usd"
      name="currency"
      value="usd"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="hidden"
    />
    <label
      @click="switchFill('second')"
      for="currency-usd"
      class="flex w-[70px] flex-row items-center"
    >
      <SigmaHouseIcon
        class="h-6"
        :class="checkStatus.secondOption ? 'fill-sgray-400' : 'fill-sgray-200'"
      />
      <span class="font-medium text-sgray-300 lg:text-lg">USD</span>
    </label>
  </div>

  <div v-else-if="type === 'frequency'" class="flex flex-row gap-1">
    <input
      type="radio"
      id="frequency-monthly"
      checked
      name="frequency"
      value="monthly"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="hidden"
    />
    <label
      @click="switchFill('first')"
      for="frequency-monthly"
      class="flex w-[85px] flex-row items-center"
    >
      <SigmaHouseIcon
        class="h-6"
        :class="checkStatus.firstOption ? 'fill-sgray-400' : 'fill-sgray-200'"
      />
      <span class="font-medium text-sgray-300 lg:text-lg">Mensual</span>
    </label>
    <input
      type="radio"
      id="frequency-daily"
      name="frequency"
      value="daily"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="hidden"
    />
    <label
      @click="switchFill('second')"
      for="frequency-daily"
      class="flex w-[70px] flex-row items-center"
    >
      <SigmaHouseIcon
        class="h-6"
        :class="checkStatus.secondOption ? 'fill-sgray-400' : 'fill-sgray-200'"
      />
      <span class="font-medium text-sgray-300 lg:text-lg">Diario</span>
    </label>
  </div>
</template>
