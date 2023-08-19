<script setup>
  import SigmaVerticalIcon from "./icons/SigmaVerticalIcon.vue";
  import FeatureIcon from "./icons/FeatureIcon.vue";

  const props = defineProps(["post", "color"]);
</script>

<template>
  <div class="text-shadow w-full overflow-hidden rounded-md shadow-md">
    <div class="relative">
      <img src="../assets/card-img4.jpg" alt="Una Casa" />
      <div class="absolute right-0 top-0 p-1">
        <SigmaVerticalIcon class="text-shadow w-14 fill-white" />
      </div>
    </div>
    <div class="flex h-[60px] w-full items-center">
      <!-- Clip -->
      <div
        v-if="props.post.__t === 'sale'"
        class="clip flex h-44 w-[85px] flex-shrink-0 flex-col items-center bg-sigma pt-[45px]"
      >
        <h2 class="font-extrabold text-white">VENTA</h2>
        <span class="text-lg font-semibold leading-tight text-white">{{ props.post.price }}</span>
        <span class="uppercase text-white">{{ props.post.currency }}</span>
      </div>
      <div
        v-else
        class="clip flex h-44 w-[85px] flex-shrink-0 flex-col items-center bg-sgreen-300 pt-[45px]"
      >
        <h2 class="font-extrabold text-white">RENTA</h2>
        <span class="text-lg font-semibold leading-tight text-white">{{ props.post.tax }}</span>
        <span class="uppercase text-white"
          >{{ props.post.currency }} /
          <span class="lowercase">{{
            props.post.frequency === "daily" ? "día" : "mes"
          }}</span></span
        >
      </div>
      <div class="flex h-[60px] flex-grow items-center py-[6px] pl-[5px]">
        <span
          v-if="props.post.address.province === 'Isla de la Juventud'"
          class="text-xs font-semibold text-sgray-300"
          >{{ props.post.address.province }}</span
        >
        <span v-else class="text-xs font-semibold text-sgray-300"
          >{{ props.post.address.municipality }}, {{ props.post.address.province }}</span
        >
      </div>
      <div
        class="feature-container grid h-[60px] flex-shrink-0 grid-cols-3 grid-rows-2 place-items-center"
      >
        <div class="flex items-center gap-[2px]">
          <FeatureIcon :role="props.post.__t" icon="bed_room" />
          <span class="text-xs text-sgray-400">x2</span>
        </div>
        <div class="flex items-center gap-[2px]">
          <FeatureIcon :role="props.post.__t" icon="bath_room" />
          <span class="text-xs text-sgray-400">x2</span>
        </div>
        <div class="flex items-center gap-[2px]">
          <FeatureIcon :role="props.post.__t" icon="garage" />
          <span class="text-xs text-sgray-400">x2</span>
        </div>
        <div class="flex items-center gap-[2px]">
          <FeatureIcon :role="props.post.__t" icon="garden" />
          <span class="text-xs text-sgray-400">x2</span>
        </div>
        <div class="flex items-center gap-[2px]">
          <FeatureIcon :role="props.post.__t" icon="pool" />
          <span class="text-xs text-sgray-400">x2</span>
        </div>
        <div class="flex items-center gap-[2px]">
          <FeatureIcon :role="props.post.__t" icon="furnished" />
          <span class="text-xs text-sgray-400">x2</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .clip {
    clip-path: polygon(42% 21%, 100% 0, 100% 100%, 0 100%, 0 10%);
  }

  .feature-container {
    width: 100px;
    padding-top: 6px;
    padding-right: 6px;
    padding-bottom: 6px;
  }

  @media (min-width: 400px) {
    .feature-container {
      width: 120px;
      padding-left: 6px;
    }

    .clip {
      margin-left: 8px;
    }
  }
</style>
