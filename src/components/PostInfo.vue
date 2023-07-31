<script setup>
  import { usePostStore } from "../stores/post";

  const postStore = usePostStore();
</script>

<template>
  <!-- Gallery -->
  <div class="w-full">
    <img src="../assets/card-img.jpg" class="h-[250px] shadow-lg" alt="Una Casa" />
  </div>
  <!-- Details -->
  <div class="flex w-full flex-col gap-2 px-5 py-4">
    <!-- Amount -->
    <div class="mb-1">
      <h2 class="text-shadow text-2xl font-extrabold">
        5500 <span class="text-xl font-semibold">USD<span> / día</span></span>
      </h2>
      <h3 class="text-shadow font-normal text-sgray-300">Habana Vieja, La Habana</h3>
    </div>
    <!-- Horizontal Line -->
    <div class="w-full border-t border-sgray-100"></div>
    <!-- Features -->
    <div class="mb-3 mt-1 grid w-4/5 grid-cols-3 grid-rows-2 gap-y-[10px]">
      <!-- Bed Room -->
      <div class="text-shadow flex flex-col gap-[3px] font-semibold">
        <span>Cuartos</span>
        <div class="flex items-center gap-2">
          <div class="text-shadow h-8 w-8 rounded-md bg-sigma"></div>
          <span class="text-shadow">x2</span>
        </div>
      </div>
      <!-- Bath Room -->
      <div class="text-shadow flex flex-col gap-[3px] font-semibold">
        <span>Baños</span>
        <div class="flex items-center gap-2">
          <div class="text-shadow h-8 w-8 rounded-md bg-sigma"></div>
          <span class="text-shadow">x2</span>
        </div>
      </div>
      <!-- Garage -->
      <div class="text-shadow flex flex-col gap-[3px] font-semibold">
        <span>Garage</span>
        <div class="flex items-center gap-2">
          <div class="text-shadow h-8 w-8 rounded-md bg-sigma"></div>
          <span class="text-shadow">x2</span>
        </div>
      </div>
      <!-- Garden -->
      <div class="text-shadow flex flex-col gap-[3px] font-semibold">
        <span>Jardín</span>
        <div class="flex items-center gap-2">
          <div class="text-shadow h-8 w-8 rounded-md bg-sigma"></div>
          <span class="text-shadow">x2</span>
        </div>
      </div>
      <!-- Pool -->
      <div class="text-shadow flex flex-col gap-[3px] font-semibold">
        <span>Piscina</span>
        <div class="flex items-center gap-2">
          <div class="text-shadow h-8 w-8 rounded-md bg-sigma"></div>
          <span class="text-shadow">x2</span>
        </div>
      </div>
      <!-- Furnished -->
      <div class="text-shadow flex flex-col gap-[3px] font-semibold">
        <span>Amueblada</span>
        <div class="flex items-center gap-2">
          <div class="text-shadow h-8 w-8 rounded-md bg-sigma"></div>
          <span class="text-shadow">x2</span>
        </div>
      </div>
    </div>
    <!-- Horizontal Line -->
    <div class="w-full border-t border-sgray-100"></div>
    <!-- Description -->
    <div class="mb-2 mt-1 w-full break-words">
      <p class="text-shadow">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda aut laudantium esse quo
        in aliquam, tenetur quos sapiente! Maxime obcaecati iste nam blanditiis quisquam quas
        reprehenderit, commodi et praesentium? Omnis!
      </p>
    </div>
    <!-- Horizontal Line -->
    <div class="w-full border-t border-sgray-100"></div>
    <!-- Agent -->
    <div class="mt-2 flex w-full justify-between gap-3">
      <!-- Avatar -->
      <div class="w-1/5">
        <img
          src="../assets/agent-avatar.jpg"
          class="text-shadow rounded-full"
          alt="Avatar del agente"
        />
      </div>
      <div class="flex w-4/5 flex-col gap-1">
        <!-- Name -->
        <h4 class="text-shadow">
          Publicado por <span class="font-semibold">Luis Miguel Navarro</span>
        </h4>
        <!-- Horizontal Line -->
        <div class="w-[98%] border-t border-sgray-100"></div>
        <!-- Bio -->
        <span class="text-shadow inline-block w-full">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error explicabo ullam voluptatem
          at temporibus! Sequi, explicabo. Delectus labore reprehenderit quibusdam.
        </span>
      </div>
    </div>
  </div>
  <!-- <div class="p-10">
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
  </div> -->
</template>
