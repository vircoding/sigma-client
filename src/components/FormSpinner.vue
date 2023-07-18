<script setup></script>

<template>
  <div class="overlay fixed top-0 flex h-screen w-screen items-center justify-center">
    <div
      class="spinner h-[40px] w-[40px] rounded-full border-4 border-solid border-x-sgray-200 border-b-sgray-200 border-t-white"
    ></div>
  </div>
</template>

<style scoped>
  .overlay {
    background-color: rgba(0, 0, 0, 0.2);
    animation: all 1s ease-in;
  }

  .spinner {
    animation: spin 0.75s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(360deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }
</style>
