<script setup>
import NavBar from "../components/NavBar.vue";
</script>

<template>
  <header class="h-[500px] scoped-gradient">
    <NavBar />
  </header>
</template>

<style scoped>
.scoped-gradient {
  background: rgb(220, 220, 220);
  background: -moz-linear-gradient(
    162deg,
    rgba(220, 220, 220, 0.5) 0%,
    rgba(149, 149, 149, 0.5) 77%
  );
  background: -webkit-linear-gradient(
    162deg,
    rgba(220, 220, 220, 0.5) 0%,
    rgba(149, 149, 149, 0.5) 77%
  );
  background: linear-gradient(162deg, rgba(220, 220, 220, 0.5) 0%, rgba(149, 149, 149, 0.5) 77%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#dcdcdc",endColorstr="#959595",GradientType=1);
}
</style>
