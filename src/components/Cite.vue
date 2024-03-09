<template>
  <div class="w-full px-5 py-10">
    <div class="flex h-[150px] w-full justify-center gap-1 bg-stone-400 p-2">
      <img src="../assets/quotes-icon.svg" class="w-14 self-start" />
      <cite
        class="cite w-[270px] self-center text-2xl font-semibold uppercase not-italic text-sblue-500"
        >Encuentra <span class="text-sigma">tu casa</span> ideal con
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
