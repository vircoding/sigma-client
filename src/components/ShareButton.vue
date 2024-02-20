<script setup>
  const props = defineProps(["url"]);

  const shareLink = () => {
    const shareData = {
      title: "Publicación en Sigma",
      text: "Mira esta casa",
      url: props.url,
    };

    navigator.share(shareData).catch((error) => console.log("Share Failed", error));
  };
</script>

<template>
  <button @click.prevent="shareLink">
    <img src="../assets/share-icon.svg" class="h-[18px] w-[18px]" />
  </button>
</template>
