<script setup>
  const props = defineProps(["url"]);
  defineEmits(["remove", "edit"]);
</script>

<template>
  <div
    class="text-shadow flex w-full items-center justify-center rounded-md border border-sgray-100 bg-background p-2"
  >
    <!-- <span class="text-sm text-sgray-400">{{ props.path }}</span> -->
    <img :src="props.url" class="w-[90%]" />
    <!-- Actions -->
    <div class="flex w-[10%] flex-col items-center justify-center gap-4 pl-2">
      <img src="../assets/close-icon.svg" class="w-full max-w-[24px]" @click="$emit('remove')" />
      <img src="../assets/edit-icon.svg" class="w-full max-w-[24px]" @click="$emit('edit')" />
    </div>
  </div>
</template>
