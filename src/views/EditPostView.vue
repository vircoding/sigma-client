<script setup>
  import NavBar from "../components/NavBar.vue";
  import UpdatePostForm from "../components/UpdatePostForm.vue";
  import FooterSection from "../components/FooterSection.vue";
  import { useUserStore } from "../stores/user";
  import { useRoute } from "vue-router";

  const route = useRoute();

  const userStore = useUserStore();
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
        <UpdatePostForm
          :post="userStore.userState.posts.find((item) => item._id == route.params.id)"
        />
      </main>
    </div>
    <footer class="lg:mb-2.5">
      <FooterSection />
    </footer>
  </div>
</template>
