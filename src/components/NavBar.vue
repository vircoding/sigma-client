<script setup>
  import { RouterLink } from "vue-router";
  import SigmaNavBarIcon from "./icons/SigmaNavBarIcon.vue";
  import NavList from "./NavList.vue";
</script>

<template>
  <nav class="top-0 flex w-full items-center justify-between px-4 py-4 font-semibold lg:px-14">
    <RouterLink to="/">
      <!-- Beta -->
      <SigmaNavBarIcon
        class="h-9 fill-sblue-500 drop-shadow-[0_0_5px_rgba(0,_0,_0,_0.15)] transition-[fill,_filter] duration-200 ease-out hover:fill-black hover:drop-shadow-[0_0_5px_rgba(0,_0,_0,_0.5)]"
      />
    </RouterLink>
    <NavList />
  </nav>
</template>
