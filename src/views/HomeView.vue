<script setup>
  import SigmaIcon from "../components/icons/SigmaIcon.vue";
  import NavBar from "../components/NavBar.vue";
  import HeaderHero from "../components/HeaderHero.vue";
  import Wave from "../components/Wave.vue";
  import PopularSection from "../components/PopularSection.vue";
  import FooterSection from "../components/FooterSection.vue";
</script>

<template>
  <div class="lg:p-2.5">
    <header>
      <div class="relative flex h-[500px] flex-col overflow-hidden bg-background lg:h-[750px]">
        <SigmaIcon
          class="absolute -top-5 h-full fill-sgray-100 lg:left-[53vw] xl:left-[60vw] 2xl:left-[65vw] min-[1921px]:hidden"
        />
        <NavBar class="z-20" />
        <HeaderHero class="z-10 grow" />
      </div>
    </header>
    <main class="mb-[10px]">
      <section class="relative mb-[10px] bg-sigma pb-12 pt-24">
        <Wave class="absolute bottom-full translate-y-[-5px] fill-white lg:translate-y-[-10px]" />
        <Wave class="absolute bottom-full fill-sigma" />
        <div class="text-shadow flex w-full flex-col items-center justify-center gap-4 text-white">
          <h2 class="text-4xl font-extrabold uppercase">Comienza Por Aquí</h2>
          <p class="font-archivo">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, necessitatibus!
          </p>
        </div>

        <div
          class="grid h-full w-full grid-cols-3 gap-10 bg-sigma px-24 py-20 xl:gap-14 xl:px-32 2xl:px-44"
        >
          <div
            class="flex h-[362px] w-full flex-col items-center justify-center gap-4 rounded-2xl bg-white p-5 text-center"
          >
            <img src="../assets/house-icon.svg" class="text-shadow w-16 xl:w-20" />
            <h3 class="text-shadow text-2xl font-extrabold xl:text-3xl">Publica Tu Casa</h3>
            <p
              class="text-shadow mb-3 font-archivo text-sm tracking-tight text-sgray-200 xl:text-base"
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, recusandae magni.
              Laudantium deserunt molestias suscipit.
            </p>
            <RouterLink
              to="/insert"
              class="text-shadow rounded-md border border-sigma px-5 py-2 hover:text-black"
              >Adelante</RouterLink
            >
          </div>
          <div
            class="flex h-[362px] w-full flex-col items-center justify-center gap-4 rounded-2xl bg-white p-5 text-center"
          >
            <img src="../assets/credit-icon.svg" class="text-shadow w-16 xl:w-20" />
            <h3 class="text-shadow text-2xl font-extrabold xl:text-3xl">Descubre Casas</h3>
            <p
              class="text-shadow mb-3 font-archivo text-sm tracking-tight text-sgray-200 xl:text-base"
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, recusandae magni.
              Laudantium deserunt molestias suscipit.
            </p>
            <RouterLink
              to="/find"
              class="text-shadow rounded-md border border-sigma px-5 py-2 hover:text-black"
              >Adelante</RouterLink
            >
          </div>
          <div
            class="flex h-[362px] w-full flex-col items-center justify-center gap-4 rounded-2xl bg-white p-5 text-center"
          >
            <img src="../assets/bed-icon.svg" class="text-shadow w-16 xl:w-20" />
            <h3 class="text-shadow text-2xl font-extrabold xl:text-3xl">Consigue Renta</h3>
            <p
              class="text-shadow mb-3 font-archivo text-sm tracking-tight text-sgray-200 xl:text-base"
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, recusandae magni.
              Laudantium deserunt molestias suscipit.
            </p>
            <RouterLink
              to="/find"
              class="text-shadow rounded-md border border-sigma px-5 py-2 hover:text-black"
              >Adelante</RouterLink
            >
          </div>
        </div>
      </section>
      <section class="first-gradient mb-[10px] w-full pt-28">
        <PopularSection :buy="true" />
      </section>
      <section class="second-gradient w-full pb-12 pt-10">
        <PopularSection />
      </section>
    </main>
    <footer>
      <FooterSection />
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
