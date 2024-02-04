<script setup>
  const props = defineProps(["url"]);
  defineEmits(["remove"]);
</script>

<template>
  <div
    class="text-shadow flex w-full items-center justify-center rounded-md border border-sgray-100 bg-background px-2 py-[5px]"
  >
    <!-- <span class="text-sm text-sgray-400">{{ props.path }}</span> -->
    <img :src="props.url" class="w-[90%]" />
    <img src="../assets/close-icon.svg" class="w-[10%] pl-3" @click="$emit('remove')" />
  </div>
</template>
