<script setup>
  import ShareButton from "./ShareButton.vue";

  defineEmits(["deletePost"]);

  const props = defineProps({
    post: Object,
  });
</script>

<template>
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
      <div class="grid w-[190px] grid-cols-4 grid-rows-2 place-items-center">
        <div class="flex items-center">
          <img src="../assets/bed-room-icon.svg" />
          <span>x{{ post.features.bed_room }}</span>
        </div>
        <div class="flex items-center">
          <img src="../assets/bed-room-icon.svg" />
          <span>x{{ post.features.living_room }}</span>
        </div>
        <div class="flex items-center">
          <img src="../assets/bed-room-icon.svg" />
          <span>x{{ post.features.bath_room }}</span>
        </div>
        <div class="flex items-center">
          <img src="../assets/bed-room-icon.svg" />
          <span>x{{ post.features.dinning_room }}</span>
        </div>
        <div class="flex items-center">
          <img src="../assets/bed-room-icon.svg" />
          <span>x{{ post.features.kitchen }}</span>
        </div>
        <div class="flex items-center">
          <img src="../assets/bed-room-icon.svg" />
          <span>x{{ post.features.garage }}</span>
        </div>
        <div class="flex items-center">
          <img src="../assets/bed-room-icon.svg" />
          <span>x{{ post.features.garden }}</span>
        </div>
        <div class="flex items-center">
          <img src="../assets/bed-room-icon.svg" />
          <span>x{{ post.features.pool }}</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex">
        <RouterLink :to="`/post/edit/${post._id}`">
          <img src="../assets/edit-icon.svg" />
        </RouterLink>
        <!-- <img src="../assets/share-icon.svg" /> -->
        <ShareButton :url="`http://localhost:5173/post/${post._id}`" />
        <img @click.prevent="$emit('deletePost', post._id)" src="../assets/delete-icon.svg" />
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
