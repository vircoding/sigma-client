<script setup>
  import { usePostStore } from "../stores/post";

  const postStore = usePostStore();
</script>

<template>
  <div class="p-10">
    <h1>Post View</h1>
    <h1>ID: {{ postStore.postState._id }}</h1>
    <h1>Type: {{ postStore.postState.__t }}</h1>
    <h1 v-if="postStore.postState.__t === 'sale'">
      Price: {{ postStore.postState.price }}
      <span class="uppercase">{{ postStore.postState.currency }}</span>
    </h1>
    <h1 v-else>
      Tax: {{ postStore.postState.tax }}
      <span class="uppercase">{{ postStore.postState.currency }}</span> /
      <span v-if="postStore.postState.frequency === 'daily'">Día</span><span v-else>Mes</span>
    </h1>
    <h1>
      Dirección: {{ postStore.postState.address.municipality }},
      {{ postStore.postState.address.province }}
    </h1>
    <h1>Cuartos: {{ postStore.postState.features.bed_room }}</h1>
    <h1>Baños: {{ postStore.postState.features.bath_room }}</h1>
    <h1>Garages: {{ postStore.postState.features.garage }}</h1>
    <h1>Jardines: {{ postStore.postState.features.garden }}</h1>
    <h1>Piscinas: {{ postStore.postState.features.pool }}</h1>
    <h1>Amueblada: {{ postStore.postState.features.furnished }}</h1>
    <h1 class="break-words">Descripción: {{ postStore.postState.description }}</h1>
    <h1>Teléfono a contactar: {{ postStore.postState.phone }}</h1>
    <h1>Visitas: {{ postStore.postState.visits_count }}</h1>
  </div>
</template>
