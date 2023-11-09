<script setup>
  import { computed, ref } from "vue";
  import { useUserStore } from "../stores/userStore.js";
  import PostCard from "./PostCard.vue";
  import NextArrow from "./icons/NextArrow.vue";
  import { useRoute } from "vue-router";

  const userStore = useUserStore();
  const route = useRoute();

  const pagesBuck = ref(1);
  const activePage = ref(1);

  const activeStyles = "bg-sigma font-semibold text-white";

  const spinnerVisibility = ref(false);

  const activatePage = async (page) => {
    if (page !== pagesBuck) {
      activePage.value = page;
      spinnerVisibility.value = true;
      await userStore.loadAgentData(route.params.id, page);
      spinnerVisibility.value = false;
    }
  };

  const prevPageBuck = () => {
    if (pagesBuck.value > 1) pagesBuck.value -= 1;
  };

  const nextPageBuck = () => {
    if (pagesBuck.value < Math.ceil(userStore.agentDataState.posts.total_pages / 5))
      pagesBuck.value += 1;
  };

  const prevArrowDisabled = computed(() => {
    if (pagesBuck.value > 1) return false;
    return true;
  });

  const nextArrowDisabled = computed(() => {
    if (pagesBuck.value < Math.ceil(userStore.agentDataState.posts.total_pages / 5)) return false;
    return true;
  });
</script>

<template>
  <section>
    <ul class="space-y-7 p-5">
      <li v-for="(item, index) in userStore.agentDataState.posts.posts" :key="index">
        <RouterLink :to="`/post/${item._id}`">
          <PostCard :post="item" />
        </RouterLink>
      </li>
    </ul>
    <!-- Pages -->
    <div class="mb-7 mt-3 h-9">
      <ul v-if="!spinnerVisibility" class="flex h-full items-center justify-center px-4">
        <div class="flex h-full items-center justify-center rounded-lg bg-sgray-100">
          <li
            @click.prevent="prevPageBuck"
            class="flex h-full w-9 items-center justify-center rounded-lg bg-sgray-100"
          >
            <NextArrow
              :color="prevArrowDisabled ? 'fill-white' : 'fill-sgray-400'"
              class="w-5 rotate-180"
            />
          </li>
          <div
            class="h-full"
            v-for="(item, index) in userStore.agentDataState.posts.total_pages"
            :key="index"
          >
            <li
              class="flex h-full w-9 items-center justify-center rounded-lg text-xl"
              :class="activePage === index + 1 ? activeStyles : ''"
              @click.prevent="activatePage(index + 1)"
              v-if="index + 1 > (pagesBuck - 1) * 5 && index + 1 <= pagesBuck * 5"
            >
              {{ index + 1 }}
            </li>
          </div>
          <li
            @click.prevent="nextPageBuck"
            class="flex h-full w-9 items-center justify-center rounded-lg bg-sgray-100"
          >
            <NextArrow :color="nextArrowDisabled ? 'fill-white' : 'fill-sgray-400'" class="w-5" />
          </li>
        </div>
      </ul>
      <!-- Spinner Container -->
      <div v-else class="flex items-center justify-center">
        <div
          class="spinner h-[36px] w-[36px] rounded-full border-4 border-solid border-x-sgray-100 border-b-sgray-100 border-t-sigma"
        ></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .scoped-blur {
    filter: blur(1px);
  }

  .spinner {
    animation: spin 0.75s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(360deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }
</style>
