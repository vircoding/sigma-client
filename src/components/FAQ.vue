<script setup>
  import { ref } from "vue";

  const activeIndex = ref(0);

  const activateQuestion = (index) => {
    if (activeIndex.value === index) activeIndex.value = 0;
    else activeIndex.value = index;
  };
</script>

<template>
  <div
    class="mb-[5px] overflow-hidden bg-background text-center max-[1023px]:px-[10%] max-[499px]:px-[5%]"
  >
    <!-- Hero -->
    <div class="py-10">
      <h2
        class="text-shadow mb-5 text-center text-4xl font-extrabold max-[1023px]:text-4xl max-[505px]:text-3xl lg:mb-0 lg:text-left lg:text-4xl"
      >
        ¿Quiéres contratar un agente?
      </h2>
      <p class="text-shadow block text-center text-sgray-300 lg:text-left lg:text-lg">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, aliquid.
      </p>
    </div>

    <!-- FAQs -->
    <ul
      class="text-shadow mb-12 flex w-full flex-col justify-center rounded-2xl border border-sgray-100 bg-white px-7 text-left"
    >
      <!-- Item -->
      <li class="w-full">
        <div
          @click.prevent="activateQuestion(1)"
          class="flex w-full items-center justify-between border-b border-sgray-100 pb-3 pt-4"
        >
          <h2 class="text-base font-semibold text-sgray-400">¿Pregunta frecuente?</h2>
          <!-- Right Arrow -->
          <img
            src="../assets/right-arrow-icon.svg"
            class="w-3"
            :class="activeIndex === 1 ? 'hidden' : 'block'"
          />

          <!-- Down Arrow -->
          <img
            src="../assets/down-arrow-icon.svg"
            class="w-3"
            :class="activeIndex === 1 ? 'block' : 'hidden'"
          />
        </div>
        <div
          class="flex w-full flex-col items-center justify-center py-3"
          :class="activeIndex === 1 ? 'block' : 'hidden'"
        >
          <p>
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
          <h2 class="text-base font-semibold text-sgray-400">¿Pregunta frecuente?</h2>
          <!-- Right Arrow -->
          <img
            src="../assets/right-arrow-icon.svg"
            class="w-3"
            :class="activeIndex === 2 ? 'hidden' : 'block'"
          />

          <!-- Down Arrow -->
          <img
            src="../assets/down-arrow-icon.svg"
            class="w-3"
            :class="activeIndex === 2 ? 'block' : 'hidden'"
          />
        </div>
        <div
          class="flex w-full flex-col items-center justify-center py-3"
          :class="activeIndex === 2 ? 'block' : 'hidden'"
        >
          <p>
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
          <h2 class="text-base font-semibold text-sgray-400">¿Pregunta frecuente?</h2>
          <!-- Right Arrow -->
          <img
            src="../assets/right-arrow-icon.svg"
            class="w-3"
            :class="activeIndex === 3 ? 'hidden' : 'block'"
          />

          <!-- Down Arrow -->
          <img
            src="../assets/down-arrow-icon.svg"
            class="w-3"
            :class="activeIndex === 3 ? 'block' : 'hidden'"
          />
        </div>
        <div
          class="flex w-full flex-col items-center justify-center py-3"
          :class="activeIndex === 3 ? 'block' : 'hidden'"
        >
          <p>
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
          <h2 class="text-base font-semibold text-sgray-400">¿Pregunta frecuente?</h2>
          <!-- Right Arrow -->
          <img
            src="../assets/right-arrow-icon.svg"
            class="w-3"
            :class="activeIndex === 4 ? 'hidden' : 'block'"
          />

          <!-- Down Arrow -->
          <img
            src="../assets/down-arrow-icon.svg"
            class="w-3"
            :class="activeIndex === 4 ? 'block' : 'hidden'"
          />
        </div>
        <div
          class="flex w-full flex-col items-center justify-center py-3"
          :class="activeIndex === 4 ? 'block' : 'hidden'"
        >
          <p>
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
          <h2 class="text-base font-semibold text-sgray-400">¿Pregunta frecuente?</h2>
          <!-- Right Arrow -->
          <img
            src="../assets/right-arrow-icon.svg"
            class="w-3"
            :class="activeIndex === 5 ? 'hidden' : 'block'"
          />

          <!-- Down Arrow -->
          <img
            src="../assets/down-arrow-icon.svg"
            class="w-3"
            :class="activeIndex === 5 ? 'block' : 'hidden'"
          />
        </div>
        <div
          class="flex w-full flex-col items-center justify-center py-3"
          :class="activeIndex === 5 ? 'block' : 'hidden'"
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eveniet qui libero
            dolorem vitae amet consectetur, blanditiis, pariatur, corrupti nisi voluptates id.
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
