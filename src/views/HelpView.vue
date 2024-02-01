<script setup>
  import NavBar from "../components/NavBar.vue";
  import HelpIndexSection from "../components/HelpIndexSection.vue";
  import VideoTutorialSection from "../components/VideoTutorialSection.vue";
  import TextTutorialSection from "../components/TextTutorialSection.vue";
  import HelpAgentSection from "../components/HelpAgentSection.vue";
  import FAQ from "../components/FAQ.vue";
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
      <main class="mb-[5px] flex grow flex-col bg-background lg:mb-0">
        <div class="mb-[5px] bg-background text-center max-[1023px]:px-[10%] max-[499px]:px-[5%]">
          <!-- Hero -->
          <div class="pt-10">
            <h2
              class="text-shadow mb-5 text-center text-4xl font-extrabold max-[1023px]:text-4xl max-[505px]:text-3xl lg:mb-0 lg:text-left lg:text-4xl"
            >
              Ayuda
            </h2>
            <p
              class="text-shadow block text-center text-base text-sgray-300 lg:text-left lg:text-lg"
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque omnis odio amet?
            </p>
          </div>
        </div>

        <!-- Index -->
        <section id="index">
          <HelpIndexSection />
        </section>

        <!-- Video Tutorial -->
        <section id="videotut">
          <VideoTutorialSection />
        </section>

        <!-- Text Tutorial -->
        <section id="texttut">
          <TextTutorialSection />
        </section>

        <!-- Find Agent -->
        <section id="findagent">
          <HelpAgentSection />
        </section>

        <!-- FAQ -->
        <section id="faq">
          <FAQ />
        </section>
      </main>
    </div>
    <footer class="lg:mb-2.5">
      <FooterSection background="#333333" text="#dcdcdc" title="#ffffff" />
    </footer>
  </div>
</template>
