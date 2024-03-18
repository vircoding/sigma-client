<template>
  <div class="w-full px-5 py-10">
    <div class="flex h-[150px] w-full justify-center gap-1 bg-stone-400 p-2">
      <img src="../assets/quotes-icon.svg" class="w-14 self-start" />
      <cite
        class="cite w-[270px] self-center font-ubuntu text-3xl font-semibold not-italic text-sblue-500"
        >Encuentra tu <span class="text-sigma">casa</span> ideal con
        <span class="text-sigma">nosotros</span></cite
      >
    </div>
  </div>
</template>

<style scoped>
  @media (max-width: 380px) {
    .cite {
      font-size: 1.25rem;
      line-height: 1.75rem;
      width: 225px;
    }
  }
</style>
