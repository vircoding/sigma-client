<script setup>
  import { computed } from "vue";

  const props = defineProps({
    buy: Boolean,
    address: Object,
    details: Object,
    price: Number,
    contact: String,
  });

  const bgColor = computed(() => {
    return props.buy ? "bg-sigma" : "bg-sgreen-300";
  });
</script>

<template>
  <div class="flex h-96 w-72 flex-col overflow-hidden rounded-2xl xl:w-80">
    <div class="relative h-3/5 w-full">
      <img
        src="../assets/card-img.jpg"
        alt="Una casa"
        class="absolute h-full w-full object-cover"
      />
    </div>
    <div class="relative grow">
      <div class="absolute bottom-0">
        <div class="relative mx-auto h-20 w-20">
          <div
            class="absolute top-1/2 flex h-full w-full items-center justify-center rounded-full"
            :class="bgColor"
          >
            <img
              src="../assets/full-vertical-logo.svg"
              class="relative translate-x-0.5"
              width="48"
            />
          </div>
        </div>
        <div class="flex h-48 w-28 flex-col px-3 py-5 text-center text-white" :class="bgColor">
          <div class="mt-8 flex flex-grow flex-col items-center font-poppins font-extrabold">
            <span class="text-3xl leading-none">CASA</span>
            <span
              class="text-sm leading-none tracking-wider"
              :class="buy ? 'text-sblue-100' : 'text-sgreen-100'"
              >EN {{ buy ? "VENTA" : "RENTA" }}</span
            >
          </div>
          <div
            class="font-bahnschrift scoped-font-condensed flex flex-col items-center text-xl font-extralight"
          >
            <span class="leading-none">Precio</span>
            <span>$ {{ price }}</span>
          </div>
        </div>
      </div>
      <div class="absolute right-0 flex h-full w-44 flex-col px-3 pb-4 pt-2 xl:w-52">
        <div
          class="flex items-center gap-1 font-poppins font-extrabold"
          :class="buy ? 'text-sigma' : 'text-sgreen-300'"
        >
          <h3 class="text-2xl tracking-wide">SOBRE</h3>
          <div class="text-xs leading-none">
            <h4>La</h4>
            <h4>Propiedad</h4>
          </div>
        </div>
        <div
          class="font-bahnschrift scoped-font-condensed scoped-font-10px mb-3 text-xs font-semibold leading-none text-sgray-200"
        >
          <span class="">{{ address.street }} #{{ address.number }}.</span>
          <br />
          <span>{{ address.residence }}. {{ address.province }}.</span>
        </div>
        <div class="font-bahnschrift grid grow grid-cols-4 grid-rows-2 gap-y-2 font-semibold">
          <div
            v-for="(value, index) in details"
            :key="index"
            class="scoped-gap flex h-5 place-self-center"
          >
            <div class="h-5 w-5 rounded-md" :class="value > 0 ? bgColor : 'bg-sgray-100'"></div>
            <span
              class="scoped-font-condensed"
              :class="value > 0 ? 'text-sgray-300' : 'text-sgray-100'"
              >x{{ value }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .scoped-gap {
    gap: 2px;
  }

  .scoped-font-condensed {
    font-stretch: condensed;
  }

  .scoped-font-10px {
    font-size: 12px;
  }
</style>
