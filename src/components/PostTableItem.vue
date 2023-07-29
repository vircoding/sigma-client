<script setup>
  import ShareButton from "./ShareButton.vue";
  import { ref } from "vue";
  import { usePostStore } from "../stores/post.js";

  const props = defineProps({
    post: Object,
  });

  const postStore = usePostStore();

  const alertVisibility = ref(false);

  const unhideAlert = () => {
    alertVisibility.value = true;
  };

  const hideAlert = () => {
    alertVisibility.value = false;
  };

  const deletePost = async () => {
    try {
      hideAlert();
      await postStore.deletePost(props.post._id);
    } catch (error) {
      console.log(error);
    }
  };
</script>

<template>
  <div
    class="fixed left-1/2 top-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 rounded-3xl border border-sigma bg-white p-4"
    :class="alertVisibility ? 'flex' : 'hidden'"
  >
    <span>Estás seguro que deseas eliminar esta publicación?</span>
    <div class="flex gap-4">
      <button
        @click.prevent="deletePost"
        class="w-20 rounded-md bg-sigma px-4 py-1 text-center text-white"
      >
        Sí
      </button>
      <button @click.prevent="hideAlert" class="w-20 rounded-md bg-sgray-200 px-4 py-1 text-center">
        No
      </button>
    </div>
  </div>
  <div class="flex flex-col items-center gap-2 rounded-md border border-sgray-100 bg-white p-2">
    <div class="flex w-full items-center justify-evenly gap-3">
      <!-- Type -->
      <!-- Sale -->
      <div v-if="post.__t === 'sale'" class="flex flex-col">
        <span class="font-semibold">Venta</span>
        <span class=""
          >{{ post.price }} <span class="uppercase">{{ post.currency }}</span></span
        >
      </div>
      <!-- Rent -->
      <div v-if="post.__t === 'rent'" class="flex flex-col">
        <span class="font-semibold"
          >Renta
          <span class="font-normal">{{
            post.frequency === "monthly" ? "Mensual" : "Diaria"
          }}</span></span
        >
        <span class=""
          >{{ post.tax }} <span class="uppercase">{{ post.currency }}</span></span
        >
      </div>

      <!-- Features -->
      <div class="grid w-[190px] grid-cols-3 grid-rows-2 place-items-center">
        <!-- Bed Room -->
        <div class="flex items-center">
          <img src="../assets/bed-room-icon.svg" />
          <span>x{{ post.features.bed_room }}</span>
        </div>
        <!-- Bath Room -->
        <div class="flex items-center">
          <img src="../assets/bed-room-icon.svg" />
          <span>x{{ post.features.bath_room }}</span>
        </div>
        <!-- Garage -->
        <div class="flex items-center">
          <img src="../assets/bed-room-icon.svg" />
          <img v-if="post.features.garage" src="../assets/true-icon.svg" />
          <img v-else src="../assets/false-icon.svg" />
        </div>
        <!-- Garden -->
        <div class="flex items-center">
          <img src="../assets/bed-room-icon.svg" />
          <img v-if="post.features.garden" src="../assets/true-icon.svg" />
          <img v-else src="../assets/false-icon.svg" />
        </div>
        <!-- Pool -->
        <div class="flex items-center">
          <img src="../assets/bed-room-icon.svg" />
          <img v-if="post.features.pool" src="../assets/true-icon.svg" />
          <img v-else src="../assets/false-icon.svg" />
        </div>
        <!-- Furnished -->
        <div class="flex items-center">
          <img src="../assets/bed-room-icon.svg" />
          <img v-if="post.features.furnished" src="../assets/true-icon.svg" />
          <img v-else src="../assets/false-icon.svg" />
        </div>
      </div>

      <!-- Actions -->
      <div class="flex">
        <RouterLink :to="`/post/edit/${post._id}`">
          <img src="../assets/edit-icon.svg" />
        </RouterLink>
        <ShareButton :url="`http://localhost:5173/post/${post._id}`" />
        <img @click.prevent="unhideAlert" src="../assets/delete-icon.svg" />
      </div>
    </div>
    <div class="h-[1px] w-[97%] border-t border-sgray-200"></div>
    <div class="w-full px-4">
      <span v-if="post.description.length === 0" class="w-full">Sin Descripción</span>
      <span v-else class="block w-full break-words"
        >{{ post.description.slice(0, 90)
        }}<span v-if="post.description.length > 90">...</span></span
      >
    </div>
  </div>
</template>
