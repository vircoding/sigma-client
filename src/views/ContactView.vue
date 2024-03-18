<script setup>
  import NavBar from "../components/NavBar.vue";
  import FooterSection from "../components/FooterSection.vue";
</script>

<template>
  <!-- NavBar -->
  <header class="relative z-20 h-[68px] w-full shadow-md">
    <NavBar class="absolute" />
  </header>

  <main class="w-full">
    <!-- Hero -->
    <div id="who" class="flex w-full flex-col gap-2 px-5 py-10 text-center">
      <h2 class="text-shadow w-full font-ubuntu text-3xl font-bold text-sblue-500">Contáctanos</h2>
      <p class="text-shadow w-full px-2 text-sm text-sgray-300">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio praesentium in reprehenderit
        itaque asperiores.
      </p>
    </div>

    <!-- List -->
    <ul class="flex w-full flex-col items-center justify-center gap-[22px] px-5 pb-10">
      <!-- Whatsapp -->
      <a href="" class="w-full">
        <li class="flex w-full items-center justify-center gap-2">
          <figure class="flex w-[45%] justify-end">
            <img src="../assets/color-whatsapp-icon.svg" class="w-12" />
          </figure>
          <span class="w-[65%] font-ubuntu text-2xl font-bold text-sblue-500">Whatsapp</span>
        </li>
      </a>

      <!-- Instagram -->
      <a href="" class="w-full">
        <li class="flex w-full items-center justify-center gap-2">
          <figure class="flex w-[45%] justify-end">
            <img src="../assets/color-instagram-icon.svg" class="w-12" />
          </figure>
          <span class="w-[65%] font-ubuntu text-2xl font-bold text-sblue-500">Instagram</span>
        </li>
      </a>

      <!-- Facebook -->
      <a href="" class="w-full">
        <li class="flex w-full items-center justify-center gap-2">
          <figure class="flex w-[45%] justify-end">
            <img src="../assets/color-facebook-icon.svg" class="w-12" />
          </figure>
          <span class="w-[65%] font-ubuntu text-2xl font-bold text-sblue-500">Facebook</span>
        </li>
      </a>

      <!-- YouTube -->
      <a href="" class="w-full">
        <li class="flex w-full items-center justify-center gap-2">
          <figure class="flex w-[45%] justify-end">
            <img src="../assets/color-youtube-icon.svg" class="w-12" />
          </figure>
          <span class="w-[65%] font-ubuntu text-2xl font-bold text-sblue-500">YouTube</span>
        </li>
      </a>

      <!-- Twitter-X -->
      <a href="" class="w-full">
        <li class="flex w-full items-center justify-center gap-2">
          <figure class="flex w-[45%] justify-end">
            <img src="../assets/color-twitter-x-icon.svg" class="w-11 py-[2px]" />
          </figure>
          <span class="w-[65%] font-ubuntu text-2xl font-bold text-sblue-500">Twitter-X</span>
        </li>
      </a>

      <!-- TikTok -->
      <a href="" class="w-full">
        <li class="flex w-full items-center justify-center gap-2">
          <figure class="flex w-[45%] justify-end">
            <img src="../assets/color-tiktok-icon.svg" class="w-12" />
          </figure>
          <span class="w-[65%] font-ubuntu text-2xl font-bold text-sblue-500">TikTok</span>
        </li>
      </a>

      <!-- Threads -->
      <a href="" class="w-full">
        <li class="flex w-full items-center justify-center gap-2">
          <figure class="flex w-[45%] justify-end">
            <img src="../assets/color-threads-icon.svg" class="w-12" />
          </figure>
          <span class="w-[65%] font-ubuntu text-2xl font-bold text-sblue-500">Threads</span>
        </li>
      </a>
    </ul>
  </main>

  <!-- Footer -->
  <FooterSection background="#011b33" title="#ffffff" text="#ffffff" />
</template>
