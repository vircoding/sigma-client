<script setup>
  import { ref } from 'vue';

  const activeIndex = ref(0);

  const activateQuestion = (index) => {
    if (activeIndex.value === index) activeIndex.value = 0;
    else activeIndex.value = index;
  };
</script>

<template>
  <div class="overflow-hidden bg-background py-10 text-center">
    <!-- Hero -->
    <div class="mb-6 flex w-full flex-col gap-2 px-5 text-center">
      <h2 class="text-shadow w-full font-ubuntu text-3xl font-bold text-sblue-500">
        Preguntas frecuentes
      </h2>
      <p class="text-shadow w-full px-2 text-sm text-sgray-300">
        A continuación te presentamos una serie de preguntas que nuestros usuarios han presentado y
        te podrían servir de utilidad.
      </p>
    </div>

    <!-- FAQs -->
    <div class="w-full px-5">
      <ul
        class="text-shadow flex w-full flex-col justify-center rounded-2xl border border-sgray-100 bg-white px-7 text-left"
      >
        <!-- Item -->
        <li class="w-full">
          <div
            @click.prevent="activateQuestion(1)"
            class="flex w-full items-center justify-between border-b border-sgray-100 pb-3 pt-4"
          >
            <h2 class="text-base font-semibold text-sblue-500">¿Pregunta frecuente?</h2>
            <!-- Right Arrow -->
            <img
              src="../assets/right-arrow-icon.svg"
              class="w-6"
              :class="activeIndex === 1 ? 'hidden' : 'block'"
            />

            <!-- Down Arrow -->
            <img
              src="../assets/down-arrow-icon.svg"
              class="w-6"
              :class="activeIndex === 1 ? 'block' : 'hidden'"
            />
          </div>
          <div
            class="flex w-full flex-col items-center justify-center py-3"
            :class="activeIndex === 1 ? 'block' : 'hidden'"
          >
            <p class="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eveniet qui libero
              dolorem vitae amet consectetur, blanditiis, pariatur, corrupti nisi voluptates id.
            </p>
          </div>
        </li>

        <!-- Item -->
        <li class="w-full">
          <div
            @click.prevent="activateQuestion(2)"
            class="flex w-full items-center justify-between border-b border-sgray-100 pb-3 pt-4"
          >
            <h2 class="text-base font-semibold text-sblue-500">¿Pregunta frecuente?</h2>
            <!-- Right Arrow -->
            <img
              src="../assets/right-arrow-icon.svg"
              class="w-6"
              :class="activeIndex === 2 ? 'hidden' : 'block'"
            />

            <!-- Down Arrow -->
            <img
              src="../assets/down-arrow-icon.svg"
              class="w-6"
              :class="activeIndex === 2 ? 'block' : 'hidden'"
            />
          </div>
          <div
            class="flex w-full flex-col items-center justify-center py-3"
            :class="activeIndex === 2 ? 'block' : 'hidden'"
          >
            <p class="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eveniet qui libero
              dolorem vitae amet consectetur, blanditiis, pariatur, corrupti nisi voluptates id.
            </p>
          </div>
        </li>

        <!-- Item -->
        <li class="w-full">
          <div
            @click.prevent="activateQuestion(3)"
            class="flex w-full items-center justify-between border-b border-sgray-100 pb-3 pt-4"
          >
            <h2 class="text-base font-semibold text-sblue-500">¿Pregunta frecuente?</h2>
            <!-- Right Arrow -->
            <img
              src="../assets/right-arrow-icon.svg"
              class="w-6"
              :class="activeIndex === 3 ? 'hidden' : 'block'"
            />

            <!-- Down Arrow -->
            <img
              src="../assets/down-arrow-icon.svg"
              class="w-6"
              :class="activeIndex === 3 ? 'block' : 'hidden'"
            />
          </div>
          <div
            class="flex w-full flex-col items-center justify-center py-3"
            :class="activeIndex === 3 ? 'block' : 'hidden'"
          >
            <p class="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eveniet qui libero
              dolorem vitae amet consectetur, blanditiis, pariatur, corrupti nisi voluptates id.
            </p>
          </div>
        </li>

        <!-- Item -->
        <li class="w-full">
          <div
            @click.prevent="activateQuestion(4)"
            class="flex w-full items-center justify-between border-b border-sgray-100 pb-3 pt-4"
          >
            <h2 class="text-base font-semibold text-sblue-500">¿Pregunta frecuente?</h2>
            <!-- Right Arrow -->
            <img
              src="../assets/right-arrow-icon.svg"
              class="w-6"
              :class="activeIndex === 4 ? 'hidden' : 'block'"
            />

            <!-- Down Arrow -->
            <img
              src="../assets/down-arrow-icon.svg"
              class="w-6"
              :class="activeIndex === 4 ? 'block' : 'hidden'"
            />
          </div>
          <div
            class="flex w-full flex-col items-center justify-center py-3"
            :class="activeIndex === 4 ? 'block' : 'hidden'"
          >
            <p class="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eveniet qui libero
              dolorem vitae amet consectetur, blanditiis, pariatur, corrupti nisi voluptates id.
            </p>
          </div>
        </li>

        <!-- Item -->
        <li class="w-full">
          <div
            @click.prevent="activateQuestion(5)"
            class="flex w-full items-center justify-between border-sgray-100 pb-4 pt-4"
            :class="activeIndex === 5 ? 'border-b' : ''"
          >
            <h2 class="text-base font-semibold text-sblue-500">¿Pregunta frecuente?</h2>
            <!-- Right Arrow -->
            <img
              src="../assets/right-arrow-icon.svg"
              class="w-6"
              :class="activeIndex === 5 ? 'hidden' : 'block'"
            />

            <!-- Down Arrow -->
            <img
              src="../assets/down-arrow-icon.svg"
              class="w-6"
              :class="activeIndex === 5 ? 'block' : 'hidden'"
            />
          </div>
          <div
            class="flex w-full flex-col items-center justify-center py-3"
            :class="activeIndex === 5 ? 'block' : 'hidden'"
          >
            <p class="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eveniet qui libero
              dolorem vitae amet consectetur, blanditiis, pariatur, corrupti nisi voluptates id.
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
