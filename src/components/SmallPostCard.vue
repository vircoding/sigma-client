<script setup>
  import { ref, computed } from "vue";
  import ShareButton from "./ShareButton.vue";
  import { useUserStore } from "../stores/user";
  import { usePostStore } from "../stores/post.js";
  import { useLayoutStore } from "../stores/layout";
  import { formatAmount } from "../utils/formatAmount.js";
  import FeatureIcon from "./icons/FeatureIcon.vue";
  import BooleanIcon from "./icons/BooleanIcon.vue";

  const props = defineProps(["post", "type", "index"]);

  const postStore = usePostStore();
  const userStore = useUserStore();
  const layoutStore = useLayoutStore();

  const alertVisibility = ref(false);

  const color = computed(() => {
    if (props.post.__t === "sale") return "fill-sigma";
    else if (props.post.__t === "rent") return "fill-sgreen-300";
    else if (props.post.__t === "exchange") return "fill-solive-300";
  });

  const type = computed(() => {
    if (props.post.__t === "sale") return "VENTA";
    else if (props.post.__t === "rent") return "RENTA";
    else if (props.post.__t === "exchange") return "PERMUTA";
  });

  const defineFeatureStyles = (count) => {
    let fill;
    if (Boolean(count)) fill = color.value;
    else fill = "fill-sgray-200";
    return `h-[20px] w-[20px] ${fill}`;
  };

  const descriptionWrap = (description) => {
    if (description.length === 0) return "Sin Descripción";
    return description;
  };

  const unhideAlert = () => {
    alertVisibility.value = true;
  };

  const hideAlert = () => {
    alertVisibility.value = false;
  };

  const deletePost = async () => {
    try {
      hideAlert();
      layoutStore.unhideTableSpinner();
      await postStore.deletePost(props.post._id);
      if (
        userStore.userAccountState.posts.posts.length === 1 &&
        userStore.userAccountState.posts.page > 1
      ) {
        await userStore.loadUserPosts(userStore.userAccountState.posts.page - 1);
      } else {
        await userStore.loadUserPosts(userStore.userAccountState.posts.page);
      }
      layoutStore.hideTableSpinner();
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = async () => {
    try {
      layoutStore.unhideTableSpinner();
      await postStore.removeFavorite(
        userStore.userAccountState.favorites.favorites[props.index]._id
      );
      if (
        userStore.userAccountState.favorites.favorites.length === 1 &&
        userStore.userAccountState.favorites.page > 1
      ) {
        await userStore.loadUserFavorites(userStore.userAccountState.favorites.page - 1);
      } else {
        await userStore.loadUserFavorites(userStore.userAccountState.favorites.page);
      }
      layoutStore.hideTableSpinner();
    } catch (error) {
      console.log(error);
    }
  };
</script>

<template>
  <div class="text-shadow w-full overflow-hidden rounded-md">
    <!-- Top -->
    <div class="flex h-[80px] w-full items-center justify-center bg-white">
      <!-- Sale Info -->
      <div
        v-if="props.post.__t === 'sale'"
        class="flex h-full w-[28%] flex-col items-center justify-center bg-sigma px-2 py-3 text-center text-white"
      >
        <span class="font-extrabold">VENTA</span>
        <span class="relative top-[1px] text-base font-semibold leading-tight">{{
          formatAmount(props.post.price, true)
        }}</span>
        <span class="uppercase">{{ props.post.currency }}</span>
      </div>
      <!-- Rent Info -->
      <div
        v-else-if="props.post.__t === 'rent'"
        class="flex h-full w-[28%] flex-col items-center justify-center bg-sgreen-300 px-2 py-3 text-center text-white"
      >
        <span class="font-extrabold">RENTA</span>
        <span class="relative top-[1px] text-base font-semibold leading-tight">{{
          formatAmount(props.post.tax, true)
        }}</span>
        <span
          ><span class="uppercase">{{ props.post.currency }}</span> /
          {{ props.post.frequency === "daily" ? "día" : "mes" }}</span
        >
      </div>
      <!-- Features -->
      <div class="flex h-full flex-grow items-center justify-center px-2 py-3">
        <div class="grid h-full grid-cols-3 grid-rows-2 gap-x-3">
          <!-- Bed Room -->
          <div class="flex items-center gap-[2px]">
            <FeatureIcon
              :classes="defineFeatureStyles(props.post.features.bed_room)"
              icon="bed_room"
            />
            <span
              class="text-shadow text-xs"
              :class="props.post.features.bed_room > 0 ? 'text-sgray-400' : 'text-sgray-200'"
              >x{{ props.post.features.bed_room }}</span
            >
          </div>
          <!-- Bath Room -->
          <div class="flex items-center gap-[2px]">
            <FeatureIcon
              :classes="defineFeatureStyles(props.post.features.bath_room)"
              icon="bath_room"
            />
            <span
              class="text-shadow text-xs"
              :class="props.post.features.bath_room > 0 ? 'text-sgray-400' : 'text-sgray-200'"
              >x{{ props.post.features.bath_room }}</span
            >
          </div>
          <!-- Garage -->
          <div class="flex items-center gap-[2px]">
            <FeatureIcon :classes="defineFeatureStyles(props.post.features.garage)" icon="garage" />
            <BooleanIcon :icon="props.post.features.garage" :weigth="'ligth'" />
          </div>
          <!-- Garden -->
          <div class="flex items-center gap-[2px]">
            <FeatureIcon :classes="defineFeatureStyles(props.post.features.garden)" icon="garden" />
            <BooleanIcon :icon="props.post.features.garden" :weigth="'ligth'" />
          </div>
          <!-- Pool -->
          <div class="flex items-center gap-[2px]">
            <FeatureIcon :classes="defineFeatureStyles(props.post.features.pool)" icon="pool" />
            <BooleanIcon :icon="props.post.features.pool" :weigth="'ligth'" />
          </div>
          <!-- Furnished -->
          <div class="flex items-center gap-[2px]">
            <FeatureIcon
              :classes="defineFeatureStyles(props.post.features.furnished)"
              icon="furnished"
            />
            <BooleanIcon :icon="props.post.features.furnished" :weigth="'ligth'" />
          </div>
        </div>
      </div>
      <!-- Buttons -->
      <div class="flex h-full w-[28%] flex-col items-center justify-center gap-2 px-2 py-3">
        <div class="flex items-center justify-center gap-2">
          <!-- Edit -->
          <RouterLink v-if="props.type === 'post'" :to="`/post/edit/${post._id}`">
            <img src="../assets/edit-icon.svg" class="h-[18px] w-[18px]" />
          </RouterLink>

          <!-- Share -->
          <ShareButton :url="`http://localhost:5173/post/${post._id}`" />

          <!-- Remove -->
          <img
            v-if="props.type === 'post'"
            @click.prevent="unhideAlert"
            src="../assets/delete-icon.svg"
            class="h-[18px] w-[18px]"
          />
          <img
            v-if="props.type === 'favorite'"
            @click.prevent="removeFavorite"
            src="../assets/close-icon.svg"
            class="h-[16px] w-[16px]"
          />
        </div>
        <!-- Sell -->
        <button
          v-if="props.type === 'post'"
          class="gradient w-full rounded-md bg-sigma py-[3px] text-sm font-semibold"
        >
          <span class="text-shadow">VENDIDA</span>
        </button>
      </div>
    </div>
    <!-- Description -->
    <div class="flex h-[32px] w-full items-center bg-sgray-100">
      <span class="w-full truncate px-3">{{ descriptionWrap(post.description) }}</span>
    </div>
  </div>
</template>

<style scoped>
  .gradient {
    background: rgb(220, 220, 220);
    background: -moz-linear-gradient(
      162deg,
      rgba(220, 220, 220, 1) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    background: -webkit-linear-gradient(
      162deg,
      rgba(220, 220, 220, 1) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    background: linear-gradient(162deg, rgba(220, 220, 220, 1) 0%, rgba(255, 255, 255, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#dcdcdc",endColorstr="#ffffff",GradientType=1);
  }
</style>
