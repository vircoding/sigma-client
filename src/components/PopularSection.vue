<script setup>
  import PostCard from "../components/PostCard.vue";

  defineProps({
    buy: Boolean,
  });
</script>

<template>
  <div class="text-shadow flex w-full flex-col items-center justify-center gap-4">
    <h2 class="text-4xl font-extrabold uppercase">Descubre nuestras casas en venta</h2>
    <p class="font-archivo">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, necessitatibus!
    </p>
  </div>
  <div class="flex flex-col items-center justify-center py-20">
    <div class="flex items-center justify-center gap-5">
      <PostCard
        :buy="buy"
        :address="{
          street: 'San Gervasio',
          number: '324',
          firstCorner: 'Virtudes',
          secondCorner: 'Esperanza Gomez',
          residence: 'Diez de Octubre',
          province: 'La Habana',
        }"
        :details="{
          bedroom: 2,
          dininroom: 2,
          kitchen: 2,
          garage: 2,
          bathroom: 3,
          livingroom: 2,
          garden: 2,
          pool: 2,
        }"
        :price="24400"
      />
      <PostCard
        :buy="buy"
        :address="{
          street: 'San Gervasio',
          number: '324',
          firstCorner: 'Virtudes',
          secondCorner: 'Esperanza Gomez',
          residence: 'Diez de Octubre',
          province: 'La Habana',
        }"
        :details="{
          bedroom: 2,
          dininroom: 2,
          kitchen: 2,
          garage: 2,
          bathroom: 3,
          livingroom: 2,
          garden: 2,
          pool: 2,
        }"
        :price="24400"
      />
      <PostCard
        :buy="buy"
        :address="{
          street: 'San Gervasio',
          number: '324',
          firstCorner: 'Virtudes',
          secondCorner: 'Esperanza Gomez',
          residence: 'Diez de Octubre',
          province: 'La Habana',
        }"
        :details="{
          bedroom: 2,
          dininroom: 2,
          kitchen: 2,
          garage: 2,
          bathroom: 3,
          livingroom: 2,
          garden: 2,
          pool: 2,
        }"
        :price="24400"
      />
    </div>
    <RouterLink class="nav-link mt-14 block text-xl font-extrabold" to="/find">Ver Más</RouterLink>
  </div>
</template>
