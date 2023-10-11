<script setup>
  import SigmaIcon from "../components/icons/SigmaIcon.vue";
  import NavBar from "../components/NavBar.vue";
  import HeaderHero from "../components/HeaderHero.vue";
  import Wave from "../components/Wave.vue";
  import StartHere from "../components/StartHere.vue";
  import PopularSection from "../components/PopularSection.vue";
  import FooterSection from "../components/FooterSection.vue";
  import { useUserStore } from "../stores/userStore.js";
  import { usePostStore } from "../stores/postStore.js";
  import { computed, onBeforeUnmount } from "vue";

  const userStore = useUserStore();
  const postStore = usePostStore();

  const footerColors = computed(() => {
    if (userStore.credentialsState.role === "client")
      return { background: "#333333", text: "#dcdcdc", title: "#ffffff" };
    else if (userStore.credentialsState.role === "agent")
      return { background: "#ededed", text: "#333333", title: "#333333" };
    else return { background: "#333333", text: "#dcdcdc", title: "#ffffff" };
  });

  onBeforeUnmount(() => {
    postStore.resetPopularSales();
    postStore.resetPopularRents();
    postStore.resetPopularExchanges();
  });
</script>

<template>
  <div class="lg:p-2.5">
    <header>
      <div class="relative flex h-[600px] flex-col overflow-hidden bg-background lg:h-[750px]">
        <SigmaIcon
          class="absolute -top-3 left-[20vw] h-full fill-sgray-100 lg:-top-5 lg:left-[53vw] xl:left-[60vw] 2xl:left-[65vw] min-[1921px]:hidden"
        />
        <NavBar class="z-20" />
        <HeaderHero :role="userStore.credentialsState.role" class="z-10 grow" />
      </div>
    </header>
    <main class="mb-[5px] lg:mb-[10px]">
      <section class="relative mb-[5px] bg-sigma pb-12 pt-24 lg:mb-[10px]">
        <Wave class="absolute bottom-full translate-y-[-5px] fill-white lg:translate-y-[-10px]" />
        <Wave class="absolute bottom-full fill-sigma" />
        <StartHere :role="userStore.credentialsState.role" />
      </section>
      <section
        v-if="!(userStore.credentialsState.role === 'agent')"
        class="first-gradient w-full pt-28"
      >
        <PopularSection type="sales" />
      </section>
      <section
        v-if="!(userStore.credentialsState.role === 'agent')"
        class="second-gradient w-full pt-28"
      >
        <PopularSection type="rents" />
      </section>
      <section
        v-if="!(userStore.credentialsState.role === 'agent')"
        class="first-gradient w-full pb-12 pt-10"
      >
        <PopularSection type="exchanges" />
      </section>
    </main>
    <footer>
      <FooterSection
        :background="footerColors.background"
        :text="footerColors.text"
        :title="footerColors.title"
      />
    </footer>
  </div>
</template>

<style scoped>
  .first-gradient {
    background: rgb(237, 237, 237);
    background: -moz-linear-gradient(
      180deg,
      rgba(237, 237, 237, 1) 30%,
      rgba(255, 255, 255, 1) 100%
    );
    background: -webkit-linear-gradient(
      180deg,
      rgba(237, 237, 237, 1) 30%,
      rgba(255, 255, 255, 1) 100%
    );
    background: linear-gradient(180deg, rgba(237, 237, 237, 1) 30%, rgba(255, 255, 255, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ededed",endColorstr="#ffffff",GradientType=1);
  }

  .second-gradient {
    background: rgb(255, 255, 255);
    background: -moz-linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 30%,
      rgba(237, 237, 237, 1) 100%
    );
    background: -webkit-linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 30%,
      rgba(237, 237, 237, 1) 100%
    );
    background: linear-gradient(180deg, rgba(255, 255, 255, 1) 30%, rgba(237, 237, 237, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#ededed",GradientType=1);
  }
</style>
