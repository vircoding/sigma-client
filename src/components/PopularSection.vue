<script setup>
  import PostCard from "../components/PostCard.vue";

  defineProps({
    buy: Boolean,
  });

  const salePost = {
    address: {
      province: "La Habana",
      municipality: "Playa",
    },
    features: {
      bed_room: 2,
      bath_room: 2,
      living_room: 2,
      dinning_room: 2,
      kitchen: 2,
      garage: 2,
      garden: 2,
      pool: 2,
    },
    amount: 24000,
    currency: "usd",
    frequency: "",
    type: "sale",
  };

  const rentPost = {
    address: {
      province: "La Habana",
      municipality: "Cerro",
    },
    features: {
      bed_room: 2,
      bath_room: 2,
      living_room: 2,
      dinning_room: 2,
      kitchen: 2,
      garage: 0,
      garden: 0,
      pool: 0,
    },
    amount: 5000,
    currency: "usd",
    frequency: "monthly",
    type: "rent",
  };
</script>

<template>
  <div
    class="text-shadow flex w-full flex-col items-center justify-center gap-4 px-[6%] text-center lg:px-[6%]"
  >
    <h2 class="text-3xl font-extrabold uppercase">
      Descubre nuestras casas en {{ buy ? "venta" : "renta" }}
    </h2>
    <p class="font-archivo">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, necessitatibus!
    </p>
  </div>
  <div class="flex flex-col items-center justify-center py-20">
    <div class="flex flex-col items-center justify-center gap-8 lg:flex-row">
      <PostCard :post="salePost" :color="salePost.type === 'sale' ? 'bg-sigma' : 'bg-sgreen-300'" />
      <PostCard :post="rentPost" :color="rentPost.type === 'sale' ? 'bg-sigma' : 'bg-sgreen-300'" />
      <PostCard :post="salePost" :color="salePost.type === 'sale' ? 'bg-sigma' : 'bg-sgreen-300'" />
    </div>
    <RouterLink class="nav-link mt-14 block text-xl font-extrabold" to="/find">Ver Más</RouterLink>
  </div>
</template>
