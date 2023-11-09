<script setup>
  import { useUserStore } from "../stores/userStore.js";

  const userStore = useUserStore();
</script>

<template>
  <!-- Info -->
  <section class="px-5">
    <div class="flex flex-col items-center justify-center gap-5 rounded-md bg-white px-3 py-5">
      <!-- Top -->
      <div class="relative top-1 flex w-full items-center justify-center gap-3 min-[360px]:gap-4">
        <!-- Avatar -->
        <div class="relative left-[2px] min-w-[100px] max-w-[100px]">
          <img
            class="text-shadow w-full rounded-full border-2 border-sgray-100"
            src="../assets/agent-avatar.jpg"
            alt="Avatar del agente"
          />
        </div>
        <!-- Vertical Line -->
        <div class="h-[90px] border-l border-sgray-400"></div>
        <!-- Contact -->
        <div class="flex flex-col items-center gap-1 self-center">
          <h2 class="text-base font-semibold">
            {{ userStore.agentDataState.info.firstname }}
            {{ userStore.agentDataState.info.lastname }}
          </h2>
          <div class="w-full">
            <div class="flex gap-1">
              <img class="hidden min-[360px]:block" src="../assets/email-icon.svg" />
              <span class="relative top-[2px] text-sgray-300">{{
                userStore.agentDataState.info.public_email
              }}</span>
            </div>
            <div class="flex gap-1">
              <img class="hidden min-[360px]:block" src="../assets/whatsapp-icon.svg" />
              <span class="relative top-[2px] text-sgray-300">{{
                userStore.agentDataState.info.phone
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Horizontal Line -->
      <div class="relative top-[3px] w-[90%] border-b border-black"></div>
      <!-- Bio -->
      <div class="w-[90%] text-center">
        <p>{{ userStore.agentDataState.info.bio }}</p>
      </div>
    </div>
  </section>
</template>
