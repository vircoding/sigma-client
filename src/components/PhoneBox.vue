<script setup>
  import { computed } from "vue";
  import { usePostStore } from "../stores/postStore";

  const postStore = usePostStore();

  const color = computed(() => {
    if (postStore.postState.type === "sale") return "sigma";
    else if (postStore.postState.type === "rent") return "sgreen-300";
    else if (postStore.postState.type === "exchange") return "solive-300";
  });
</script>

<template>
  <!-- Phone -->
  <div
    class="sticky inset-x-0 bottom-0 flex items-center gap-3 bg-white px-3 py-[10px] shadow-[0_-7px_6px_rgba(0,_0,_0,_0.2)]"
  >
    <!-- Whatsapp -->
    <a
      :href="`https://wa.me/${postStore.postState.contact_details.contact.code}${postStore.postState.contact_details.contact.phone}`"
      class="flex w-full items-center justify-center gap-1 rounded-md py-[5px] text-center"
      :class="`bg-${color}`"
    >
      <img src="../assets/whatsapp-icon.svg" />
      <span
        v-if="postStore.postState.contact_details.contact.code === '+53'"
        class="tracking-wide text-white"
        >{{ postStore.postState.contact_details.contact.phone }}</span
      >
      <span v-else class="tracking-wide text-white"
        >{{ postStore.postState.contact_details.contact.code }}
        {{ postStore.postState.contact_details.contact.phone }}</span
      >
    </a>

    <!-- Phone -->
    <a
      :href="`tel:${postStore.postState.contact_details.contact.code}${postStore.postState.contact_details.contact.phone}`"
      class="flex w-full items-center justify-center gap-1 rounded-md bg-sgray-100 py-[5px] text-center"
    >
      <img src="../assets/phone-icon.svg" />
      <span
        v-if="postStore.postState.contact_details.contact.code === '+53'"
        class="tracking-wide"
        >{{ postStore.postState.contact_details.contact.phone }}</span
      >
      <span v-else class="tracking-wide"
        >{{ postStore.postState.contact_details.contact.code }}
        {{ postStore.postState.contact_details.contact.phone }}</span
      >
    </a>
  </div>
</template>
