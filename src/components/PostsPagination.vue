<script setup>
  import { ref, computed } from "vue";
  import { usePostStore } from "../stores/postStore.js";
  import { useLayoutStore } from "../stores/layoutStore.js";
  import NextArrow from "./icons/NextArrow.vue";

  const emits = defineEmits(["scroll"]);

  const postStore = usePostStore();
  const layoutStore = useLayoutStore();
  const activeStyles = "bg-sgray-400 font-semibold text-white";

  const pagesBuck = ref(1);
  const activePage = ref(1);

  const activatePage = async (page) => {
    try {
      if (page !== activePage.value) {
        activePage.value = page;
        layoutStore.unhideSpinnerLoading();
        await postStore.findPosts(
          postStore.lastFilterState.type,
          page,
          postStore.lastFilterState.province,
          postStore.lastFilterState.municipality,
          postStore.lastFilterState.currency,
          postStore.lastFilterState.infl,
          postStore.lastFilterState.supl,
          postStore.lastFilterState.frequency
        );
        // spinnerVisibility.value = false;
        layoutStore.hideSpinnerLoading();
        emits("scroll");
      }
    } catch (error) {
      console.log(error);
      layoutStore.hideSpinnerLoading();
    }
  };

  const prevPageBuck = () => {
    if (pagesBuck.value > 1) pagesBuck.value -= 1;
  };

  const nextPageBuck = () => {
    if (pagesBuck.value < Math.ceil(postStore.findedPostsState.total_pages / 5))
      pagesBuck.value += 1;
  };

  const prevArrowDisabled = computed(() => {
    if (pagesBuck.value > 1) return false;
    return true;
  });

  const nextArrowDisabled = computed(() => {
    if (pagesBuck.value < Math.ceil(postStore.findedPostsState.total_pages / 5)) return false;
    return true;
  });
</script>

<template>
  <!-- Pages -->
  <div class="mb-10 mt-3 h-8">
    <ul class="flex h-full items-center justify-center px-4">
      <div class="flex h-full items-center justify-center rounded-lg bg-sgray-100 shadow-md">
        <li
          @click.prevent="prevPageBuck"
          class="flex h-full w-8 items-center justify-center rounded-lg bg-sgray-100"
        >
          <NextArrow
            :color="prevArrowDisabled ? 'fill-white' : 'fill-sgray-400'"
            class="w-5 rotate-180"
          />
        </li>
        <div
          class="h-full"
          v-for="(item, index) in postStore.findedPostsState.total_pages"
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
</template>
