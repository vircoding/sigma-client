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

  // const footerColors = computed(() => {
  //   if (userStore.credentialsState.role === "client")
  //     return { background: "#333333", text: "#dcdcdc", title: "#ffffff" };
  //   else if (userStore.credentialsState.role === "agent")
  //     return { background: "#ededed", text: "#333333", title: "#333333" };
  //   else return { background: "#333333", text: "#dcdcdc", title: "#ffffff" };
  // });

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
      <section class="relative mb-[5px] bg-sigma pb-12 pt-12 lg:mb-[10px]">
        <Wave class="absolute bottom-full translate-y-[-5px] fill-white lg:translate-y-[-10px]" />
        <Wave class="absolute bottom-full fill-sigma" />
        <!-- <StartHere :role="userStore.credentialsState.role" /> -->
        <!-- Find Section -->
        <div class="flex w-full flex-col items-center justify-center gap-6">
          <!-- Info -->
          <div
            class="text-shadow flex w-full flex-col items-center justify-center gap-4 px-[6%] text-center text-white lg:px-[6%]"
          >
            <h2 class="text-3xl font-extrabold uppercase">Descubre</h2>
            <p class="font-archivo text-base text-sgray-100">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, necessitatibus!
            </p>
          </div>
          <!-- Actions -->
          <div class="flex w-full items-center justify-center gap-2">
            <!-- Sales -->
            <RouterLink
              to="/find"
              class="w-[110px] rounded-lg border border-white py-2 text-center text-base font-semibold text-white"
              >Ventas</RouterLink
            >
            <!-- Rents -->
            <RouterLink
              to="/find"
              class="w-[110px] rounded-lg border border-white py-2 text-center text-base font-semibold text-white"
              >Rentas</RouterLink
            >
            <!-- Exchanges -->
            <RouterLink
              to="/find"
              class="w-[110px] rounded-lg border border-white py-2 text-center text-base font-semibold text-white"
              >Permutas</RouterLink
            >
          </div>
        </div>
      </section>

      <div class="first-gradient w-full">
        <!-- Insert -->
        <section class="flex w-full flex-col items-center justify-center gap-6 py-12">
          <!-- Info -->
          <div
            class="text-shadow text-sgray flex w-full flex-col items-center justify-center gap-4 px-[6%] text-center lg:px-[6%]"
          >
            <h2 class="text-3xl font-extrabold uppercase">Publica tu casa</h2>
            <p class="font-archivo text-base text-sgray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, necessitatibus!
            </p>
          </div>
          <!-- Actions -->
          <div class="flex w-full items-center justify-center gap-2">
            <!-- Sales -->
            <RouterLink
              to="/find"
              class="text-shadow w-[150px] rounded-lg border bg-white py-2 text-center text-base font-semibold text-sgray-400"
              >Propietario</RouterLink
            >
            <!-- Rents -->
            <RouterLink
              to="/find"
              class="text-shadow w-[150px] rounded-lg border bg-white py-2 text-center text-base font-semibold text-sgray-400"
              >Agente</RouterLink
            >
          </div>
        </section>

        <!-- Reviews -->
        <section class="mb-[5px] text-center max-[1023px]:px-[10%] max-[499px]:px-[5%]">
          <!-- Hero -->
          <div class="pb-10 pt-2">
            <h2
              class="text-shadow mb-5 text-center text-4xl font-extrabold max-[1023px]:text-4xl max-[505px]:text-3xl lg:mb-0 lg:text-left lg:text-4xl"
            >
              Section Title
            </h2>
            <p
              class="text-shadow block text-center text-base text-sgray-300 lg:text-left lg:text-lg"
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, aliquid.
            </p>
          </div>

          <!-- Revs -->
          <div class="mb-12 w-full space-y-8">
            <!-- First -->
            <div
              class="text-shadow w-full space-y-4 rounded-2xl border-sgray-100 bg-white px-9 py-6"
            >
              <!-- Top -->
              <div class="flex w-full items-center justify-center">
                <figure class="w-1/5">
                  <img
                    src="../assets/agent-avatar.jpg"
                    class="text-shadow w-full rounded-full border-2 border-sgray-100"
                  />
                </figure>
                <div class="flex w-4/5 flex-col items-center justify-center text-left">
                  <span class="w-full pl-4 text-lg font-semibold">Fulanito de Tal</span>
                  <span class="w-full pl-4 text-sgray-300">Influencer</span>
                </div>
              </div>

              <!-- Bottom -->
              <div class="w-full">
                <blockquote class="w-full text-left italic text-sgray-300">
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ullam voluptate
                  officiis facilis explicabo, ab eligendi sunt repellendus."
                </blockquote>
              </div>
            </div>

            <!-- Second -->
            <div
              class="text-shadow w-full space-y-4 rounded-2xl border-sgray-100 bg-white px-9 py-6"
            >
              <!-- Top -->
              <div class="flex w-full items-center justify-center">
                <figure class="w-1/5">
                  <img
                    src="../assets/agent-avatar.jpg"
                    class="text-shadow w-full rounded-full border-2 border-sgray-100"
                  />
                </figure>
                <div class="flex w-4/5 flex-col items-center justify-center text-left">
                  <span class="w-full pl-4 text-lg font-semibold">Fulanito de Tal</span>
                  <span class="w-full pl-4 text-sgray-300">Influencer</span>
                </div>
              </div>

              <!-- Bottom -->
              <div class="w-full">
                <blockquote class="w-full text-left italic text-sgray-300">
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ullam voluptate
                  officiis facilis explicabo, ab eligendi sunt repellendus."
                </blockquote>
              </div>
            </div>

            <!-- Third -->
            <div
              class="text-shadow w-full space-y-4 rounded-2xl border-sgray-100 bg-white px-9 py-6"
            >
              <!-- Top -->
              <div class="flex w-full items-center justify-center">
                <figure class="w-1/5">
                  <img
                    src="../assets/agent-avatar.jpg"
                    class="text-shadow w-full rounded-full border-2 border-sgray-100"
                  />
                </figure>
                <div class="flex w-4/5 flex-col items-center justify-center text-left">
                  <span class="w-full pl-4 text-lg font-semibold">Fulanito de Tal</span>
                  <span class="w-full pl-4 text-sgray-300">Influencer</span>
                </div>
              </div>

              <!-- Bottom -->
              <div class="w-full">
                <blockquote class="w-full text-left italic text-sgray-300">
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ullam voluptate
                  officiis facilis explicabo, ab eligendi sunt repellendus."
                </blockquote>
              </div>
            </div>

            <!-- Fourth -->
            <div
              class="text-shadow w-full space-y-4 rounded-2xl border-sgray-100 bg-white px-9 py-6"
            >
              <!-- Top -->
              <div class="flex w-full items-center justify-center">
                <figure class="w-1/5">
                  <img
                    src="../assets/agent-avatar.jpg"
                    class="text-shadow w-full rounded-full border-2 border-sgray-100"
                  />
                </figure>
                <div class="flex w-4/5 flex-col items-center justify-center text-left">
                  <span class="w-full pl-4 text-lg font-semibold">Fulanito de Tal</span>
                  <span class="w-full pl-4 text-sgray-300">Influencer</span>
                </div>
              </div>

              <!-- Bottom -->
              <div class="w-full">
                <blockquote class="w-full text-left italic text-sgray-300">
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ullam voluptate
                  officiis facilis explicabo, ab eligendi sunt repellendus."
                </blockquote>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Insert -->
      <!-- <section
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
      </section> -->
    </main>
    <footer>
      <FooterSection background="#333333" text="#dcdcdc" title="#ffffff" />
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
