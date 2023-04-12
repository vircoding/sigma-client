<script setup>
import NavBar from "../components/NavBar.vue";
import Wave from "../components/Wave.vue";
</script>

<template>
  <header class="px-6 first-gradient">
    <div class="h-[500px] second-gradient">
      <NavBar />
    </div>
  </header>
  <main>
    <section class="h-[500px] bg-sigma">
      <Wave class="fill-sigma absolute wave" />
    </section>
  </main>
</template>

<style scoped>
.first-gradient {
  background: rgb(220, 220, 220);
  background: -moz-linear-gradient(18deg, rgba(220, 220, 220, 1) 0%, rgba(255, 255, 255, 1) 77%);
  background: -webkit-linear-gradient(18deg, rgba(220, 220, 220, 1) 0%, rgba(255, 255, 255, 1) 77%);
  background: linear-gradient(18deg, rgba(220, 220, 220, 1) 0%, rgba(255, 255, 255, 1) 77%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#dcdcdc",endColorstr="#ffffff",GradientType=1);
}

.second-gradient {
  background: rgb(220, 220, 220);
  background: -moz-linear-gradient(342deg, rgba(220, 220, 220, 1) 0%, rgba(255, 255, 255, 1) 77%);
  background: -webkit-linear-gradient(
    342deg,
    rgba(220, 220, 220, 1) 0%,
    rgba(255, 255, 255, 1) 77%
  );
  background: linear-gradient(342deg, rgba(220, 220, 220, 1) 0%, rgba(255, 255, 255, 1) 77%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#dcdcdc",endColorstr="#ffffff",GradientType=1);
}

.wave {
  transform: translateY(-8vw);
}
</style>
