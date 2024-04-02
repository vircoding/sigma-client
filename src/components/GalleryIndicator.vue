<script setup>
  const props = defineProps(["enable", "size"]);
</script>

<template>
  <!-- Min -->
  <div
    v-if="props.size === 'min'"
    class="h-2 w-2 rounded-full border"
    :class="props.enable ? 'border-white-500 bg-white' : 'border-white bg-transparent'"
  ></div>

  <!-- Max -->
  <div
    v-else-if="props.size === 'max'"
    class="h-3 w-3 rounded-full border"
    :class="props.enable ? 'border-white bg-white' : 'border-sgray-300 bg-transparent'"
  ></div>
</template>
