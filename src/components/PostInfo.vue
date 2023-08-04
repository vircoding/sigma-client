<script setup>
  import { computed } from "vue";
  import { usePostStore } from "../stores/post";
  import { useUserStore } from "../stores/user";
  import Gallery from "./Gallery.vue";
  import FavoriteIcon from "./icons/FavoriteIcon.vue";
  import ShareButton from "./ShareButton.vue";

  const postStore = usePostStore();
  const userStore = useUserStore();

  const iconBoxColor = computed(() => {
    if (postStore.postState.__t === "sale") return "bg-sigma";
    return "bg-sgreen-300";
  });

  const favorite = computed(() => {
    if (userStore.userState.favorites.find((item) => item.id === postStore.postState._id)) {
      return true;
    }
    return false;
  });

  const favoriteEvent = async () => {
    await userStore.favorite(postStore.postState._id, !favorite.value);
  };
</script>

<template>
  <!-- Gallery -->
  <section>
    <Gallery />
  </section>
  <!-- Details -->
  <div class="flex w-full flex-col gap-2 px-5 pb-4">
    <!-- Top -->
    <div class="mb-1">
      <!-- Amount/Buttons -->
      <div class="flex items-center justify-between">
        <!-- Amount -->
        <h2 class="text-shadow text-2xl font-extrabold">
          {{
            postStore.postState.__t === "sale" ? postStore.postState.price : postStore.postState.tax
          }}
          <span class="text-xl font-semibold uppercase">{{ postStore.postState.currency }}</span>
          <span class="text-xl font-semibold lowercase" v-if="postStore.postState.__t === 'rent'">
            / {{ postStore.postState.frequency === "daily" ? "día" : "mes" }}</span
          >
        </h2>
        <!-- Buttons -->
        <div class="flex items-center justify-center gap-1">
          <ShareButton :url="`http://localhost:5173/post/${postStore.postState._id}`" />
          <FavoriteIcon @click="favoriteEvent" class="relative -top-[1px]" :favorite="favorite" />
        </div>
      </div>
      <!-- Address -->
      <h3 class="text-shadow font-normal text-sgray-300">
        {{ postStore.postState.address.municipality }}, {{ postStore.postState.address.province }}
      </h3>
    </div>
    <!-- Horizontal Line -->
    <div class="w-full border-t border-sgray-100"></div>
    <!-- Features -->
    <div class="mb-3 mt-1 grid w-4/5 grid-cols-3 grid-rows-2 gap-y-[10px]">
      <!-- Bed Room -->
      <div class="text-shadow flex flex-col gap-[3px] font-semibold">
        <span>Cuartos</span>
        <div class="flex items-center gap-2">
          <div
            class="h-8 w-8 rounded-md"
            :class="
              postStore.postState.features.bed_room > 0
                ? iconBoxColor + ' text-shadow'
                : 'bg-sgray-100'
            "
          ></div>
          <span
            class="text-shadow text-base"
            :class="postStore.postState.features.bed_room > 0 ? 'text-sgray-300' : 'text-sgray-200'"
            >x{{ postStore.postState.features.bed_room }}</span
          >
        </div>
      </div>
      <!-- Bath Room -->
      <div class="text-shadow flex flex-col gap-[3px] font-semibold">
        <span>Baños</span>
        <div class="flex items-center gap-2">
          <div
            class="h-8 w-8 rounded-md"
            :class="
              postStore.postState.features.bed_room > 0
                ? iconBoxColor + ' text-shadow'
                : 'bg-sgray-100'
            "
          ></div>
          <span
            class="text-shadow text-base"
            :class="postStore.postState.features.bed_room > 0 ? 'text-sgray-300' : 'text-sgray-200'"
            >x{{ postStore.postState.features.bath_room }}</span
          >
        </div>
      </div>
      <!-- Garage -->
      <div class="text-shadow flex flex-col gap-[3px] font-semibold">
        <span>Garage</span>
        <div class="flex items-center gap-2">
          <div
            class="h-8 w-8 rounded-md"
            :class="
              postStore.postState.features.garage ? iconBoxColor + ' text-shadow' : 'bg-sgray-100'
            "
          ></div>
          <img
            v-if="postStore.postState.features.garage"
            src="../assets/true-icon.svg"
            class="text-shadow relative -left-[6px] -top-[1px]"
          />
          <img
            v-else
            src="../assets/false-icon.svg"
            class="text-shadow text-shadow relative -left-[4px] -top-[1px]"
          />
        </div>
      </div>
      <!-- Garden -->
      <div class="text-shadow flex flex-col gap-[3px] font-semibold">
        <span>Jardín</span>
        <div class="flex items-center gap-2">
          <div
            class="h-8 w-8 rounded-md"
            :class="
              postStore.postState.features.garden ? iconBoxColor + ' text-shadow' : 'bg-sgray-100'
            "
          ></div>
          <img
            v-if="postStore.postState.features.garden"
            src="../assets/true-icon.svg"
            class="text-shadow relative -left-[6px] -top-[1px]"
          />
          <img
            v-else
            src="../assets/false-icon.svg"
            class="text-shadow relative -left-[4px] -top-[1px]"
          />
        </div>
      </div>
      <!-- Pool -->
      <div class="text-shadow flex flex-col gap-[3px] font-semibold">
        <span>Piscina</span>
        <div class="flex items-center gap-2">
          <div
            class="h-8 w-8 rounded-md"
            :class="
              postStore.postState.features.pool ? iconBoxColor + ' text-shadow' : 'bg-sgray-100'
            "
          ></div>
          <img
            v-if="postStore.postState.features.pool"
            src="../assets/true-icon.svg"
            class="text-shadow relative -left-[6px] -top-[1px]"
          />
          <img
            v-else
            src="../assets/false-icon.svg"
            class="text-shadow relative -left-[4px] -top-[1px]"
          />
        </div>
      </div>
      <!-- Furnished -->
      <div class="text-shadow flex flex-col gap-[3px] font-semibold">
        <span>Amueblada</span>
        <div class="flex items-center gap-2">
          <div
            class="h-8 w-8 rounded-md"
            :class="
              postStore.postState.features.furnished
                ? iconBoxColor + ' text-shadow'
                : 'bg-sgray-100'
            "
          ></div>
          <img
            v-if="postStore.postState.features.furnished"
            src="../assets/true-icon.svg"
            class="text-shadow relative -left-[6px] -top-[1px]"
          />
          <img
            v-else
            src="../assets/false-icon.svg"
            class="text-shadow relative -left-[4px] -top-[1px]"
          />
        </div>
      </div>
    </div>
    <!-- Horizontal Line -->
    <div class="w-full border-t border-sgray-100"></div>
    <!-- Description -->
    <div class="mb-1 mt-1 w-full break-words">
      <p class="text-shadow">{{ postStore.postState.description }}</p>
    </div>
    <!-- Horizontal Line -->
    <div
      v-if="postStore.postState.published_by.role === 'agent'"
      class="w-full border-t border-sgray-100"
    ></div>
    <!-- Agent -->
    <div
      v-if="postStore.postState.published_by.role === 'agent'"
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
          <h4 class="text-shadow">
            Por
            <span class="font-semibold">{{
              postStore.postState.published_by.agent.firstname +
              " " +
              postStore.postState.published_by.agent.lastname
            }}</span>
          </h4>
          <!-- Public Email -->
          <a
            class="text-sgray-300"
            :href="`mailto:${postStore.postState.published_by.agent.public_email}`"
            >{{ postStore.postState.published_by.agent.public_email }}</a
          >
        </div>
        <!-- Horizontal Line -->
        <div class="w-[98%] border-t border-sgray-100"></div>
        <!-- Bio -->
        <span class="text-shadow inline-block w-full">{{
          postStore.postState.published_by.agent.bio
        }}</span>
      </div>
    </div>
  </div>
</template>
