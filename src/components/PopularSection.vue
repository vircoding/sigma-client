<script setup>
  import PopularSales from "./PopularSales.vue";
  import PopularRents from "./PopularRents.vue";
  import PopularExchanges from "./PopularExchanges.vue";

  const props = defineProps(["type"]);
</script>

<template>
  <!-- Sales -->
  <PopularSales v-if="props.type === 'sales'" />
  <!-- Rents -->
  <PopularRents v-else-if="props.type === 'rents'" />
  <!-- Exchanges -->
  <PopularExchanges v-else-if="props.type === 'exchanges'" />
</template>
