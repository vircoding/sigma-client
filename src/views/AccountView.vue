<script setup>
  import { ref, onMounted } from "vue";
  import { useUserStore } from "../stores/user.js";
  import { useLayoutStore } from "../stores/layout";
  import NavBar from "../components/NavBar.vue";
  import ClientInfo from "../components/ClientInfo.vue";
  import AgentInfo from "../components/AgentInfo.vue";
  import FooterSection from "../components/FooterSection.vue";

  const userStore = useUserStore();
  const layoutStore = useLayoutStore();

  const data = ref({});

  const getData = async () => {
    try {
      data.value = await userStore.getAccountViewData();
    } catch (error) {
      console.log(error);
    }
  };

  const reloadData = async () => {
    try {
      layoutStore.unhideLoading();
      await getData();
      layoutStore.hideLoading();
    } catch (error) {
      console.log(error);
    }
  };

  // getData();

  onMounted(async () => {
    try {
      layoutStore.unhideLoading();
      await getData();
      layoutStore.hideLoading();
    } catch (error) {
      console.log(error);
    }
  });

  // loadInfo();
</script>

<template>
  <div class="lg:px-2.5">
    <div class="flex min-h-screen flex-col lg:h-screen lg:py-2.5">
      <header>
        <div class="relative overflow-hidden bg-background">
          <NavBar class="z-20" />
        </div>
      </header>
      <main class="mb-[5px] grow bg-background lg:mb-0">
        <AgentInfo v-if="data.user?.__t === 'agent'" />
        <ClientInfo
          v-else-if="data.user?.__t === 'client'"
          @reload="reloadData"
          :user="data.user"
          :posts="data.posts"
        />
      </main>
    </div>
    <footer class="lg:mb-2.5">
      <FooterSection />
    </footer>
  </div>
</template>
