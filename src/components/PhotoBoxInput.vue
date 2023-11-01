<script setup>
  const props = defineProps(["path"]);
  defineEmits(["remove"]);
</script>

<template>
  <div class="flex items-center gap-[10px] rounded-md bg-sgray-200 px-2 py-[5px]">
    <span class="text-sm text-sgray-400">{{ props.path }}</span>
    <img src="../assets/close-icon.svg" class="h-[16px] w-[16px]" @click="$emit('remove')" />
  </div>
</template>
