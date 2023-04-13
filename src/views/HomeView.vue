<script setup>
  import SigmaIcon from "../components/icons/SigmaIcon.vue";
  import NavBar from "../components/NavBar.vue";
  import Wave from "../components/Wave.vue";
</script>

<template>
  <header>
    <div class="relative h-[750px] overflow-hidden bg-background">
      <SigmaIcon
        class="absolute -top-5 h-full fill-sgray-100 lg:left-[53vw] xl:left-[60vw] 2xl:left-[65vw] min-[1921px]:hidden"
      />
      <NavBar />
    </div>
  </header>
  <main>
    <section class="relative h-[500px] bg-sigma">
      <div class="absolute w-full translate-y-[-8vw]">
        <Wave class="absolute fill-white" />
        <Wave class="translate-y-[10px] fill-sigma" />
      </div>
    </section>
  </main>
</template>
