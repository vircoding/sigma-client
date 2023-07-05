<script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { usePostStore } from "../stores/post";
  import { useLayoutStore } from "../stores/layout";

  const postStore = usePostStore();
  const layoutStore = useLayoutStore();

  const route = useRoute();

  const post = ref({
    address: {
      province: "",
      municipality: "",
    },
    features: {
      bath_room: "",
      bed_room: "",
      kitchen: "",
      garage: "",
      garden: "",
      pool: "",
      dinning_room: "",
      living_room: "",
    },
    type: "",
    currency: "",
    price: "",
    frequency: "",
    tax: "",
  });

  const getPost = async (id) => {
    try {
      post.value = await postStore.getPost(id);
      await postStore.visitPost(id);
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(async () => {
    try {
      layoutStore.unhideLoading();
      await getPost(route.params.id);
      layoutStore.hideLoading();
    } catch (error) {
      console.log(error);
    }
  });
</script>

<template>
  <div class="p-10">
    <h1>Post View</h1>
    <h1>ID: {{ $route.params.id }}</h1>
    <h1>Type: {{ post.__t }}</h1>
    <h1 v-if="post.__t === 'sale'">
      Price: {{ post.price }} <span class="uppercase">{{ post.currency }}</span>
    </h1>
    <h1 v-else>
      Tax: {{ post.tax }} <span class="uppercase">{{ post.currency }}</span> /
      <span v-if="post.frequency === 'daily'">Día</span><span v-else>Mes</span>
    </h1>
    <h1>Dirección: {{ post.address.municipality }}, {{ post.address.province }}</h1>
    <h1>Cuartos: {{ post.features.bed_room }}</h1>
    <h1>Baños: {{ post.features.bath_room }}</h1>
    <h1>Salas: {{ post.features.living_room }}</h1>
    <h1>Comedores: {{ post.features.dinning_room }}</h1>
    <h1>Cocinas: {{ post.features.kitchen }}</h1>
    <h1>Garages: {{ post.features.garage }}</h1>
    <h1>Jardines: {{ post.features.garden }}</h1>
    <h1>Piscinas: {{ post.features.pool }}</h1>
    <h1 class="break-words">Descripción: {{ post.description }}</h1>
    <h1>Teléfono a contactar: {{ post.phone }}</h1>
    <h1>Visitas: {{ post.visits_count }}</h1>
  </div>
</template>

<!-- http://localhost:5173/post/64722566b7918fe4efa08a58 -->
