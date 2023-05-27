<script setup>
  import { computed, ref } from "vue";
  import router from "../router";
  import { useUserStore } from "../stores/user.js";
  import { usePostStore } from "../stores/post";
</script>

<template>
  <h1>Post View</h1>
  <h1>ID: {{ $route.params.id }}</h1>
</template>
