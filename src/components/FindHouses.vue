<script setup>
  import { useRouter } from "vue-router";
  import { usePostStore } from "../stores/postStore.js";

  const postStore = usePostStore();
  const router = useRouter();

  const goFind = (type) => {
    postStore.setFilterType(type);
    router.push("/find");
  };
</script>

<template>
  <div class="flex w-full items-center justify-between bg-sblue-500 px-5 py-4">
    <span class="font-semibold text-sgray-100"
      >Descubre nuestras <span class="text-sigma">casas</span></span
    >
    <button @click.prevent="goFind('sale')" class="rounded-md border border-sigma p-3 py-[2px]">
      <span class="text-sm font-semibold text-sgray-100">ADELANTE</span>
    </button>
  </div>
</template>
