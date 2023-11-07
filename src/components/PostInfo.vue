<script setup>
  import { ref, computed } from "vue";
  import { usePostStore } from "../stores/postStore.js";
  import { useUserStore } from "../stores/userStore.js";
  import { useAgentStore } from "../stores/agentStore.js";
  import Gallery from "./Gallery.vue";
  import FavoriteIcon from "./icons/FavoriteIcon.vue";
  import ShareButton from "./ShareButton.vue";
  import FeatureIcon from "./icons/FeatureIcon.vue";
  import { formatAmount } from "../utils/formatAmount.js";
  import { formatOffer } from "../utils/formatOffer.js";
  import BooleanIcon from "./icons/BooleanIcon.vue";

  const userStore = useUserStore();
  const postStore = usePostStore();
  const agentStore = useAgentStore();

  const favorite = ref(
    Boolean(userStore.userFavoritesState.find((item) => item.post_id === postStore.postState.id))
  );

  const favoriteEvent = async () => {
    favorite.value = !favorite.value;
    await userStore.addToFavorites(postStore.postState.id);
  };

  const color = computed(() => {
    if (postStore.postState.type === "sale") return "fill-sigma";
    else if (postStore.postState.type === "rent") return "fill-sgreen-300";
    else if (postStore.postState.type === "exchange") return "fill-solive-300";
  });

  const defineFeatureStyles = (count) => {
    let fill;
    if (Boolean(count)) fill = color.value;
    else fill = "fill-sgray-200";
    return `h-8 w-8 ${fill}`;
  };
</script>

<template>
  <!-- Gallery -->
  <section>
    <Gallery />
  </section>
  <!-- Details -->
  <div class="flex w-full flex-col gap-1 px-5 pb-4">
    <!-- Top -->
    <!-- Amount or Offer + Buttons -->
    <div class="flex items-center justify-between">
      <!-- Amount or Offer -->
      <!-- Sale Amount -->
      <h2 v-if="postStore.postState.type === 'sale'" class="text-shadow text-2xl font-extrabold">
        {{ formatAmount(postStore.postState.amount_details.amount) }}
        <span class="text-xl font-semibold uppercase">{{
          postStore.postState.amount_details.currency
        }}</span>
      </h2>
      <!-- Rent Amount -->
      <h2
        v-else-if="postStore.postState.type === 'rent'"
        class="text-shadow text-2xl font-extrabold"
      >
        {{ formatAmount(postStore.postState.amount_details.amount) }}
        <span class="text-xl font-semibold uppercase">{{
          postStore.postState.amount_details.currency
        }}</span>
        <span class="text-xl font-semibold lowercase">
          / {{ postStore.postState.amount_details.frequency === "daily" ? "día" : "mes" }}</span
        >
      </h2>
      <!-- Offer -->
      <h2
        v-else-if="postStore.postState.type === 'exchange'"
        class="text-shadow text-2xl font-extrabold"
      >
        PERMUTA -
        {{
          formatOffer(
            postStore.postState.offer_details.offers,
            postStore.postState.offer_details.needs
          ).string
        }}
        <span v-if="!postStore.postState.offer_details.needs.enable">{{
          formatOffer(
            postStore.postState.offer_details.offers,
            postStore.postState.offer_details.needs
          ).suffix
        }}</span>
      </h2>
      <!-- Buttons -->
      <div class="flex items-center justify-center gap-1">
        <ShareButton :url="`http://localhost:5173/post/${postStore.postState.id}`" />
        <FavoriteIcon
          v-if="userStore.isLoggedIn"
          @click="favoriteEvent"
          class="relative -top-[1px]"
          :favorite="favorite"
        />
      </div>
    </div>
    <!-- Property Details -->
    <div
      v-for="(item, index) in postStore.postState.property_details"
      :key="index"
      class="space-y-2"
      :class="index === postStore.postState.property_details.length - 1 ? 'mb-2' : 'mb-6'"
    >
      <!-- Address -->
      <h3 class="text-shadow font-normal text-sgray-300">
        {{ item.address.municipality }},
        {{ item.address.province }}
      </h3>
      <!-- Horizontal Line -->
      <div class="w-full border-t border-sgray-100"></div>
      <!-- Features -->
      <div class="grid w-4/5 grid-cols-3 grid-rows-2 gap-y-[10px]">
        <!-- Bed Room -->
        <div class="text-shadow flex flex-col gap-[3px] font-semibold">
          <span>Cuartos</span>
          <div class="flex items-center gap-2">
            <FeatureIcon :classes="defineFeatureStyles(item.features.bed_room)" icon="bed_room" />
            <span
              class="text-shadow text-base"
              :class="item.features.bed_room > 0 ? 'text-sgray-300' : 'text-sgray-200'"
              >x{{ item.features.bed_room }}</span
            >
          </div>
        </div>
        <!-- Bath Room -->
        <div class="text-shadow flex flex-col gap-[3px] font-semibold">
          <span>Baños</span>
          <div class="flex items-center gap-2">
            <FeatureIcon :classes="defineFeatureStyles(item.features.bath_room)" icon="bath_room" />
            <span
              class="text-shadow text-base"
              :class="item.features.bath_room > 0 ? 'text-sgray-300' : 'text-sgray-200'"
              >x{{ item.features.bath_room }}</span
            >
          </div>
        </div>
        <!-- Garage -->
        <div class="text-shadow flex flex-col gap-[3px] font-semibold">
          <span>Garage</span>
          <div class="flex items-center gap-2">
            <FeatureIcon :classes="defineFeatureStyles(item.features.garage)" icon="garage" />
            <BooleanIcon :icon="item.features.garage" :weigth="'bold'" />
          </div>
        </div>
        <!-- Garden -->
        <div class="text-shadow flex flex-col gap-[3px] font-semibold">
          <span>Jardín</span>
          <div class="flex items-center gap-2">
            <FeatureIcon :classes="defineFeatureStyles(item.features.garden)" icon="garden" />
            <BooleanIcon :icon="item.features.garden" :weigth="'bold'" />
          </div>
        </div>
        <!-- Pool -->
        <div class="text-shadow flex flex-col gap-[3px] font-semibold">
          <span>Piscina</span>
          <div class="flex items-center gap-2">
            <FeatureIcon :classes="defineFeatureStyles(item.features.pool)" icon="pool" />
            <BooleanIcon :icon="item.features.pool" :weigth="'bold'" />
          </div>
        </div>
        <!-- Furnished -->
        <div class="text-shadow flex flex-col gap-[3px] font-semibold">
          <span>Amueblada</span>
          <div class="flex items-center gap-2">
            <FeatureIcon :classes="defineFeatureStyles(item.features.furnished)" icon="furnished" />
            <BooleanIcon :icon="item.features.furnished" :weigth="'bold'" />
          </div>
        </div>
      </div>
      <!-- Horizontal Line -->
      <div
        v-if="index !== postStore.postState.property_details.length - 1"
        class="relative top-[6px] w-full border-t border-sgray-100"
      ></div>
    </div>
    <!-- Horizontal Line -->
    <div class="w-full border-t border-sgray-100"></div>
    <!-- Description -->
    <div class="mb-1 mt-1 w-full break-words">
      <p v-if="!postStore.postState.description.length" class="text-shadow">Sin descripción</p>
      <p v-else class="text-shadow">{{ postStore.postState.description }}</p>
    </div>
    <!-- Horizontal Line -->
    <div
      v-if="agentStore.authorState.role === 'agent'"
      class="w-full border-t border-sgray-100"
    ></div>
    <!-- Agent -->
    <div
      v-if="agentStore.authorState.role === 'agent'"
      class="mt-2 flex w-full justify-between gap-3"
    >
      <!-- Avatar -->
      <div class="w-1/5">
        <img
          src="../assets/agent-avatar.jpg"
          class="text-shadow rounded-full border-2 border-sgray-100"
          alt="Avatar del agente"
        />
      </div>
      <div class="flex w-4/5 flex-col gap-2">
        <div class="mb-[1px] leading-tight">
          <!-- Name -->
          <RouterLink :to="`/agents/${agentStore.authorState.id}`">
            <h4 class="text-shadow">
              Por
              <span class="font-semibold">{{
                agentStore.authorState.info.firstname + " " + agentStore.authorState.info.lastname
              }}</span>
            </h4>
          </RouterLink>
          <!-- Public Email -->
          <a
            class="text-sgray-300"
            :href="`mailto:${agentStore.authorState.contact_details.public_email}`"
            >{{ agentStore.authorState.contact_details.public_email }}</a
          >
        </div>
        <!-- Horizontal Line -->
        <div class="w-[98%] border-t border-sgray-100"></div>
        <!-- Bio -->
        <span class="text-shadow inline-block w-full">{{ agentStore.authorState.info.bio }}</span>
      </div>
    </div>
  </div>

  <!-- Phone -->
  <div
    class="sticky inset-x-0 bottom-0 flex items-center gap-3 bg-white px-3 py-[10px] shadow-[0_-7px_6px_rgba(0,_0,_0,_0.2)]"
  >
    <!-- Phone -->
    <div
      class="flex w-full items-center justify-center gap-1 rounded-md bg-sigma py-[5px] text-center"
    >
      <img src="../assets/phone-icon.svg" />
      <span class="font-semibold tracking-wide text-white">54017747</span>
    </div>

    <!-- Whatsapp -->
    <div
      class="flex w-full items-center justify-center gap-1 rounded-md bg-sgray-100 py-[5px] text-center"
    >
      <img src="../assets/whatsapp-icon.svg" />
      <span class="font-semibold tracking-wide">54017747</span>
    </div>
  </div>
</template>
