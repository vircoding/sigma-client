<script setup>
  import SmallSaleCard from "./SmallSaleCard.vue";
  import SmallRentCard from "./SmallRentCard.vue";
  import SmallExchangeCard from "./SmallExchangeCard.vue";

  const props = defineProps(["index", "favorite", "post"]);
</script>

<template>
  <SmallSaleCard
    v-if="props.post.type === 'sale'"
    :index="props.index"
    :favorite="props.favorite"
    :sale="props.post"
  />
  <SmallRentCard
    v-else-if="props.post.type === 'rent'"
    :index="props.index"
    :favorite="props.favorite"
    :rent="props.post"
  />
  <SmallExchangeCard
    v-else-if="props.post.type === 'exchange'"
    :index="props.index"
    :favorite="props.favorite"
    :exchange="props.post"
  />
</template>
