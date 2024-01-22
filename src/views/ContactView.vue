<script setup>
  import NavBar from "../components/NavBar.vue";
  import FooterSection from "../components/FooterSection.vue";
</script>

<template>
  <div class="lg:px-2.5">
    <div class="flex min-h-screen flex-col lg:h-screen lg:py-2.5">
      <header>
        <div class="relative overflow-hidden bg-background">
          <NavBar class="z-20" />
        </div>
      </header>
      <main
        class="mb-[5px] flex grow flex-col items-center justify-center bg-background px-[22px] text-center lg:mb-0"
      >
        <!-- Hero -->
        <div class="mb-12 mt-8 w-full">
          <h1
            class="mb-2 text-center text-4xl font-extrabold max-[1023px]:text-4xl max-[505px]:text-3xl lg:mb-0 lg:text-left lg:text-4xl"
          >
            Contáctanos
          </h1>
          <span class="block text-center text-sgray-300 lg:text-left lg:text-lg"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit.</span
          >
        </div>

        <!-- List -->
        <ul class="mb-20 flex w-full flex-col items-center justify-center space-y-4">
          <!-- Whatsapp -->
          <li
            class="text-shadow flex w-full items-center justify-center rounded-md border bg-white p-4"
          >
            <figure class="flex w-[30%] flex-col items-center justify-center">
              <img src="../assets/color-whatsapp-icon.svg" class="w-12" />
            </figure>
            <div class="w-[70%]">
              <span class="w-full text-3xl font-semibold">Whatsapp</span>
            </div>
          </li>

          <!-- Gmail -->
          <li
            class="text-shadow flex w-full items-center justify-center rounded-md border bg-white p-4"
          >
            <figure class="flex w-[30%] flex-col items-center justify-center">
              <img src="../assets/color-gmail-icon.svg" class="w-12" />
            </figure>
            <div class="w-[70%]">
              <span class="w-full text-3xl font-semibold">Gmail</span>
            </div>
          </li>

          <!-- Instagram -->
          <li
            class="text-shadow flex w-full items-center justify-center rounded-md border bg-white p-4"
          >
            <figure class="flex w-[30%] flex-col items-center justify-center">
              <img src="../assets/color-instagram-icon.svg" class="w-12" />
            </figure>
            <div class="w-[70%]">
              <span class="w-full text-3xl font-semibold">Instagram</span>
            </div>
          </li>

          <!-- Facebook -->
          <li
            class="text-shadow flex w-full items-center justify-center rounded-md border bg-white p-4"
          >
            <figure class="flex w-[30%] flex-col items-center justify-center">
              <img src="../assets/color-facebook-icon.svg" class="w-12" />
            </figure>
            <div class="w-[70%]">
              <span class="w-full text-3xl font-semibold">Facebook</span>
            </div>
          </li>

          <!-- YouTube -->
          <li
            class="text-shadow flex w-full items-center justify-center rounded-md border bg-white p-4"
          >
            <figure class="flex w-[30%] flex-col items-center justify-center">
              <img src="../assets/color-youtube-icon-2.svg" class="w-12" />
            </figure>
            <div class="w-[70%]">
              <span class="w-full text-3xl font-semibold">Youtube</span>
            </div>
          </li>

          <!-- X -->
          <li
            class="text-shadow flex w-full items-center justify-center rounded-md border bg-white p-4"
          >
            <figure class="flex w-[30%] flex-col items-center justify-center">
              <img src="../assets/color-x-icon.svg" class="w-12" />
            </figure>
            <div class="w-[70%]">
              <span class="w-full text-3xl font-semibold">Twitter-X</span>
            </div>
          </li>

          <!-- TikTok -->
          <li
            class="text-shadow flex w-full items-center justify-center rounded-md border bg-white p-4"
          >
            <figure class="flex w-[30%] flex-col items-center justify-center">
              <img src="../assets/color-tiktok-icon.svg" class="w-12" />
            </figure>
            <div class="w-[70%]">
              <span class="w-full text-3xl font-semibold">TikTok</span>
            </div>
          </li>

          <!-- Threads -->
          <li
            class="text-shadow flex w-full items-center justify-center rounded-md border bg-white p-4"
          >
            <figure class="flex w-[30%] flex-col items-center justify-center">
              <img src="../assets/color-threads-icon.svg" class="w-12" />
            </figure>
            <div class="w-[70%]">
              <span class="w-full text-3xl font-semibold">Threads</span>
            </div>
          </li>
        </ul>
      </main>
    </div>
    <footer class="lg:mb-2.5">
      <FooterSection background="#333333" text="#dcdcdc" title="#ffffff" />
    </footer>
  </div>
</template>
