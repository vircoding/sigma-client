<script setup>
  import SaleCard from "./SaleCard.vue";
  import RentCard from "./RentCard.vue";
  import ExchangeCard from "./ExchangeCard.vue";

  const props = defineProps(["post"]);
</script>

<template>
  <SaleCard v-if="props.post.type === 'sale'" :sale="props.post" />
  <RentCard v-else-if="props.post.type === 'rent'" :rent="props.post" />
  <ExchangeCard v-else-if="props.post.type === 'exchange'" :exchange="props.post" />
</template>
