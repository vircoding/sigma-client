<script setup>
  import NavBar from "../components/NavBar.vue";
  import UpdatePostForm from "../components/UpdatePostForm.vue";
  import FooterSection from "../components/FooterSection.vue";
  import { usePostStore } from "../stores/post";
  import { onBeforeRouteLeave } from "vue-router";
  import { onBeforeUnmount, ref } from "vue";

  const postStore = usePostStore();

  const resetPostStore = ref(true);

  onBeforeUnmount(() => {
    if (resetPostStore.value) {
      postStore.$reset;
    }
  });

  onBeforeRouteLeave((to, from) => {
    if (to.name === "post") resetPostStore.value = false;
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
        <UpdatePostForm :post="postStore.postState" />
      </main>
    </div>
    <footer class="lg:mb-2.5">
      <FooterSection background="#333333" text="#dcdcdc" title="#ffffff" />
    </footer>
  </div>
</template>
