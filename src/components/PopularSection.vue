<script setup>
  import PostCard from "../components/PostCard.vue";
  import { usePostStore } from "../stores/postStore.js";
  import { useLayoutStore } from "../stores/layoutStore.js";
  import { ref, onMounted } from "vue";

  const props = defineProps({
    buy: Boolean,
  });

  const layoutStore = useLayoutStore();
  const postStore = usePostStore();

  const posts = ref([]);

  const getPosts = async () => {
    if (props.buy) {
      posts.value = await postStore.getPopularSales();
    } else {
      posts.value = await postStore.getPopularRents();
    }

    posts.value.forEach((item) => delete item.features._id);
  };

  onMounted(async () => {
    try {
      layoutStore.unhideLogoLoading();
      await getPosts();
      layoutStore.hideLogoLoading();
    } catch (error) {
      console.log(error);
    }
  });
</script>

<template>
  <div
    class="text-shadow flex w-full flex-col items-center justify-center gap-4 px-[6%] text-center lg:px-[6%]"
  >
    <h2 class="text-3xl font-extrabold uppercase">
      Descubre nuestras casas en {{ props.buy ? "venta" : "renta" }}
    </h2>
    <p class="font-archivo">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, necessitatibus!
    </p>
  </div>
  <div class="flex flex-col items-center justify-center px-5 py-20">
    <div class="flex flex-col items-center justify-center gap-8 lg:flex-row">
      <RouterLink :to="`/post/${item._id}`" v-for="(item, index) in posts" :key="index">
        <PostCard :post="item" />
      </RouterLink>
    </div>
    <RouterLink class="nav-link mt-14 block text-xl font-extrabold" to="/find">Ver Más</RouterLink>
  </div>
</template>
