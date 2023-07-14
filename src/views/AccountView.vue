<script setup>
  import { ref, onMounted } from "vue";
  import { useUserStore } from "../stores/user.js";
  import { usePostStore } from "../stores/post.js";
  import { useLayoutStore } from "../stores/layout";
  import NavBar from "../components/NavBar.vue";
  import ClientInfo from "../components/ClientInfo.vue";
  import AgentInfo from "../components/AgentInfo.vue";
  import FooterSection from "../components/FooterSection.vue";

  const posts = ref([]);

  const userStore = useUserStore();
  const postStore = usePostStore();
  const layoutStore = useLayoutStore();

  const getData = async () => {
    try {
      posts.value = await postStore.getUserPosts();
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(async () => {
    try {
      layoutStore.unhideLoading();
      await getData();
      layoutStore.hideLoading();
    } catch (error) {
      console.log(error);
    }
  });
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
        <AgentInfo
          v-if="userStore.userState.credentials.role === 'agent'"
          @reload=""
          :user="userStore.userState.info"
          :posts="posts"
        />
        <ClientInfo
          v-else-if="userStore.userState.credentials.role === 'client'"
          @reload=""
          :user="userStore.userState.info"
          :posts="posts"
        />
      </main>
    </div>
    <footer class="lg:mb-2.5">
      <FooterSection />
    </footer>
  </div>
</template>
