<script setup>
  import { computed, ref } from "vue";
  import { useUserStore } from "../stores/user";
  import PostCard from "./PostCard.vue";
  import NextArrow from "./icons/NextArrow.vue";
  import { useRoute } from "vue-router";

  const userStore = useUserStore();
  const route = useRoute();

  const pagesBuck = ref(1);
  const activePage = ref(1);

  const activeStyles = "bg-sigma font-semibold text-white";

  const activatePage = async (page) => {
    if (page !== pagesBuck) {
      activePage.value = page;
      await userStore.loadAgentData(route.params.id, page);
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
          <PostCard :post="item" :color="item.__t === 'sale' ? 'fill-sigma' : 'fill-sgreen-300'" />
        </RouterLink>
      </li>
    </ul>
    <!-- Pages -->
    <div class="mb-7 mt-3 h-9">
      <ul class="flex h-full items-center justify-center px-4">
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
    </div>
  </section>
</template>
