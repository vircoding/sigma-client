<script setup>
  const props = defineProps(["post", "color"]);
</script>

<template>
  <div
    class="flex h-96 w-[300px] flex-col overflow-hidden rounded-2xl min-[420px]:w-[350px] lg:w-[300px] xl:w-80"
  >
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
              :class="props.post.__t === 'sale' ? 'text-sblue-100' : 'text-sgreen-100'"
              >EN {{ props.post.__t === "sale" ? "VENTA" : "RENTA" }}</span
            >
          </div>
          <div class="scoped-font-condensed flex flex-col items-center text-xl font-extralight">
            <div v-if="props.post.__t === 'sale'" class="flex flex-col">
              <span>{{ props.post.price }}</span>
              <span class="text-base uppercase">{{ props.post.currency }}</span>
            </div>
            <div v-else class="flex flex-col">
              <span>{{ props.post.tax }}</span>
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
      <div
        class="absolute right-0 flex h-full w-[188px] flex-col px-2 pb-4 pt-2 min-[420px]:w-[238px] lg:w-[188px] xl:w-52"
      >
        <div
          class="flex items-center gap-1 pl-1 font-poppins font-extrabold"
          :class="props.post.__t === 'sale' ? 'text-sigma' : 'text-sgreen-300'"
        >
          <h3 class="text-2xl tracking-wide">SOBRE</h3>
          <div class="text-xs leading-none">
            <h4>La</h4>
            <h4>Propiedad</h4>
          </div>
        </div>
        <div
          class="scoped-font-condensed scoped-font-10px flex h-8 items-center pl-1 text-xs font-semibold leading-none text-sgray-200"
        >
          <span class="relative -top-[1px]"
            >{{ props.post.address.municipality }}, {{ props.post.address.province }}.</span
          >
        </div>
        <!-- Features -->
        <div
          class="relative left-[5px] top-2 grid grow grid-cols-3 grid-rows-2 gap-y-2 font-semibold min-[420px]:w-[90%] min-[420px]:gap-y-0"
        >
          <!-- Bed Room -->
          <div class="flex h-5 gap-[2px] place-self-start min-[420px]:gap-1 lg:gap-[2px]">
            <div
              class="h-6 w-6 rounded-md"
              :class="props.post.features.bed_room > 0 ? props.color : 'bg-sgray-100'"
            ></div>
            <span
              class="scoped-font-condensed relative left-[2px]"
              :class="props.post.features.bed_room > 0 ? 'text-sgray-300' : 'text-sgray-100'"
              >x{{ props.post.features.bed_room }}</span
            >
          </div>
          <!-- Bath Room -->
          <div class="flex h-5 gap-[2px] place-self-start min-[420px]:gap-1 lg:gap-[2px]">
            <div
              class="h-6 w-6 rounded-md"
              :class="props.post.features.bath_room > 0 ? props.color : 'bg-sgray-100'"
            ></div>
            <span
              class="scoped-font-condensed relative left-[2px]"
              :class="props.post.features.bath_room > 0 ? 'text-sgray-300' : 'text-sgray-100'"
              >x{{ props.post.features.bath_room }}</span
            >
          </div>
          <!-- Garage -->
          <div class="flex h-5 gap-[2px] place-self-start min-[420px]:gap-1 lg:gap-[2px]">
            <div
              class="h-6 w-6 rounded-md"
              :class="props.post.features.garage ? props.color : 'bg-sgray-100'"
            ></div>
            <img
              class="relative -left-[2px]"
              v-if="props.post.features.garage"
              src="../assets/true-icon.svg"
            />
            <img class="relative -left-[2px]" v-else src="../assets/false-icon.svg" />
          </div>
          <!-- Garden -->
          <div class="flex h-5 gap-[2px] place-self-start min-[420px]:gap-1 lg:gap-[2px]">
            <div
              class="h-6 w-6 rounded-md"
              :class="props.post.features.garden ? props.color : 'bg-sgray-100'"
            ></div>
            <img
              class="relative -left-[2px]"
              v-if="props.post.features.garden"
              src="../assets/true-icon.svg"
            />
            <img class="relative -left-[2px]" v-else src="../assets/false-icon.svg" />
          </div>
          <!-- Pool -->
          <div class="flex h-5 gap-[2px] place-self-start min-[420px]:gap-1 lg:gap-[2px]">
            <div
              class="h-6 w-6 rounded-md"
              :class="props.post.features.pool ? props.color : 'bg-sgray-100'"
            ></div>
            <img
              class="relative -left-[2px]"
              v-if="props.post.features.pool"
              src="../assets/true-icon.svg"
            />
            <img class="relative -left-[2px]" v-else src="../assets/false-icon.svg" />
          </div>
          <!--Furnished -->
          <div class="flex h-5 gap-[2px] place-self-start min-[420px]:gap-1 lg:gap-[2px]">
            <div
              class="h-6 w-6 rounded-md"
              :class="props.post.features.furnished ? props.color : 'bg-sgray-100'"
            ></div>
            <img
              class="relative -left-[2px]"
              v-if="props.post.features.furnished"
              src="../assets/true-icon.svg"
            />
            <img class="relative -left-[2px]" v-else src="../assets/false-icon.svg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .scoped-font-condensed {
    font-stretch: condensed;
  }

  .scoped-font-10px {
    font-size: 12px;
  }
</style>
