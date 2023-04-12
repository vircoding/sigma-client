<script setup>
import NavBar from "../components/NavBar.vue";
import Wave from "../components/Wave.vue";
import SigmaIcon from "../components/icons/SigmaIcon.vue";
</script>

<template>
  <header>
    <div class="h-[750px] bg-background relative overflow-hidden">
      <SigmaIcon
        class="fill-sgray-100 absolute bg-logo h-full -top-5 lg:left-[53vw] xl:left-[60vw] 2xl:left-[65vw]"
      />
      <NavBar class="z-10" />
    </div>
  </header>
  <main>
    <section class="h-[500px] bg-sigma relative">
      <div class="absolute first-wave w-full">
        <Wave class="fill-white absolute" />
        <Wave class="fill-sigma second-wave" />
      </div>
    </section>
  </main>
</template>

<style scoped>
.first-wave {
  transform: translateY(-8vw);
}

.second-wave {
  transform: translateY(10px);
}

@media (min-width: 1921px) {
  .bg-logo {
    display: none;
  }
}
</style>
