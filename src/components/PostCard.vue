<script setup>
  const props = defineProps(["post", "color"]);
</script>

<template>
  <div class="flex h-96 w-[300px] flex-col overflow-hidden rounded-2xl xl:w-80">
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
            :class="props.color"
          >
            <img
              src="../assets/full-vertical-logo.svg"
              class="relative translate-x-0.5"
              width="48"
            />
          </div>
        </div>
        <div class="flex h-48 w-28 flex-col px-3 py-5 text-center text-white" :class="props.color">
          <div class="mt-8 flex flex-grow flex-col items-center font-poppins font-extrabold">
            <span class="text-3xl leading-none">CASA</span>
            <span
              class="text-sm leading-none tracking-wider"
              :class="props.post.type === 'sale' ? 'text-sblue-100' : 'text-sgreen-100'"
              >EN {{ props.post.type === "sale" ? "VENTA" : "RENTA" }}</span
            >
          </div>
          <div class="scoped-font-condensed flex flex-col items-center text-xl font-extralight">
            <div v-if="props.post.type === 'sale'" class="flex flex-col">
              <span>{{ props.post.amount }}</span>
              <span class="text-base uppercase">{{ props.post.currency }}</span>
            </div>
            <div v-else class="flex flex-col">
              <span>{{ props.post.amount }}</span>
              <span class="text-base uppercase"
                >{{ props.post.currency }}
                <span class="text-base lowercase"
                  >/ {{ props.post.frequency === "daily" ? "día" : "mes" }}</span
                ></span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="absolute right-0 flex h-full w-[188px] flex-col px-2 pb-4 pt-2 xl:w-52">
        <div
          class="flex items-center gap-1 pl-1 font-poppins font-extrabold"
          :class="props.post.type === 'sale' ? 'text-sigma' : 'text-sgreen-300'"
        >
          <h3 class="text-2xl tracking-wide">SOBRE</h3>
          <div class="text-xs leading-none">
            <h4>La</h4>
            <h4>Propiedad</h4>
          </div>
        </div>
        <div
          class="scoped-font-condensed scoped-font-10px flex h-6 items-center pl-1 text-xs font-semibold leading-none text-sgray-200"
        >
          <span class="relative -top-[1px]"
            >{{ props.post.address.municipality }}, {{ props.post.address.province }}.</span
          >
        </div>
        <div class="grid grow grid-cols-4 grid-rows-2 gap-y-2 font-semibold">
          <div
            v-for="(value, property) in props.post.features"
            :key="property"
            class="scoped-gap flex h-5 place-self-center"
          >
            <div class="h-5 w-5 rounded-md" :class="value > 0 ? props.color : 'bg-sgray-100'"></div>
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
