<script setup>
  const props = defineProps(["enable"]);
</script>

<template>
  <div
    class="h-2 w-2 rounded-full border"
    :class="props.enable ? 'border-sgray-400 bg-sgray-400' : 'border-sgray-300 bg-transparent'"
  ></div>
</template>
